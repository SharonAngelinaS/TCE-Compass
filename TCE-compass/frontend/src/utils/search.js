import { departmentData } from "../data/departmentData";

export const searchRoomOrLab = (query) => {
  return departmentData.filter(
    (item) =>
      item.room.toLowerCase().includes(query.toLowerCase()) ||
      item.department.toLowerCase().includes(query.toLowerCase()) ||
      item.floor.toLowerCase().includes(query.toLowerCase())
  );
};
