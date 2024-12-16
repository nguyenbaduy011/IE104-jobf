import { InsertIndustries } from "./industries/insertIndustries";
import { InsertAreas } from "./areas/insertAreas";
const seed = async () => {
  try {
    await InsertIndustries();
    await InsertAreas();
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};

seed();
