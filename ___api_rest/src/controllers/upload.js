import multer from "multer";
import fs from "fs";
import multerConfig from "../config/multer";
import Foto from "../models/Foto";

const upload = multer(multerConfig).single("image");

const create = (req, res) =>
  upload(req, res, async (err) => {
    if (err) {
      return res.status(401).json({
        errors: [err.code],
      });
    }

    try {
      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;

      const picture = await Foto.create({
        original_name: originalname,
        file_name: filename,
        aluno_id,
      });

      return res.json(picture);
    } catch (e) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(401).json({
        errors: ["Aluno não encontrado"],
      });
    }
  });

export default create;
