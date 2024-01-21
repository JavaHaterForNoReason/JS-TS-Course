import multer from "multer";
import { extname, resolve } from "path";

const rand = () => Math.floor(Math.random() * 1000 + 1000);

export default {
  fileFilter: async (req, file, callback) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return callback(
        new multer.MulterError("Arquivo precisa ser de extensão PNG ou JPEG")
      );
    }

    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${rand()}${extname(file.originalname)}`);
    },
  }),
};
