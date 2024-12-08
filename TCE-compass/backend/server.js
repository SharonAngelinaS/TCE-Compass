import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import to get current file's directory
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Current file path
const __dirname = path.dirname(__filename);       // Current directory path

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY; // Using API key from environment variables
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Upload file to Gemini
async function uploadToGemini(filePath, mimeType) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: path.basename(filePath),
    });

    const file = uploadResult.file;

    if (!file) {
      throw new Error('File upload failed: No file returned');
    }

    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  } catch (error) {
    console.error('Error during file upload:', error);
    throw error; // Re-throw error to be caught in the calling function
  }
}

// Wait for files to be active
async function waitForFilesActive(files) {
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      await new Promise((resolve) => setTimeout(resolve, 10_000)); // Wait for 10 seconds before checking file state again
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw new Error(`File ${file.name} failed to process`);
    }
  }
}

// Model setup
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Give the straight-forward answer. Give the entire row details. If floor 0 is the answer give as ground floor and not as floor 0. Be friendly. If user inputs abbreviations of labs from their first letters give accordingly like sse, iba, mad labs.\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// API endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  const userMessage = req.body.userInput;
  const datasetPath = path.join(__dirname, 'dataset_tce.csv'); // Use relative path

  try {
    // Upload file and wait for it to be processed
    const files = [await uploadToGemini(datasetPath, "text/csv")];

    if (!files[0]) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    // Wait for files to be active and processed
    await waitForFilesActive(files);

    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
            { text: userMessage },
          ],
        },
      ],
    });

    // Get bot's response and send it back
    const result = await chatSession.sendMessage(userMessage);
    const botMessage = result.response.text();

    res.json({ response: botMessage });

  } catch (error) {
    console.error('Error during chat processing:', error);
    res.status(500).json({ error: 'Internal server error during chat processing', details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
