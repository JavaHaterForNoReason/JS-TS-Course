import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

const index = async (req, res) => {
  try {
    const students = await Aluno.findAll({
      attributes: [
        "id",
        "name",
        "lastname",
        "email",
        "age",
        "weight",
        "height",
      ],
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["file_name", "url"],
      },
    });

    if (!students) return res.json("Nenhum aluno encontrado");

    return res.json(students);
  } catch (e) {
    console.log(e);
    return res.json("Deu erro pae");
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        errors: ["Id não enviado"],
      });
    }

    const student = await Aluno.findByPk(id, {
      attributes: [
        "id",
        "name",
        "lastname",
        "email",
        "age",
        "weight",
        "height",
      ],
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["file_name", "url"],
      },
    });

    if (!student) {
      return res.status(401).json({
        errors: ["Aluno não encontrado"],
      });
    }

    return res.json(student);
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((error) => error.message),
    });
  }
};

const create = async (req, res) => {
  try {
    const student = await Aluno.create(req.body);
    const { name, lastname, email, age, weight, height } = student;
    return res.json({ name, lastname, email, age, weight, height });
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        errors: ["ID não enviado"],
      });
    }

    let student = await Aluno.findByPk(id);

    if (!student) {
      return res.json({
        errors: ["Aluno não encontrado ou não existe"],
      });
    }
    console.log(student);

    student = await student.update(req.body);

    const { name, lastname, email, age, weight, height } = student;

    return res.json({ name, lastname, email, age, weight, height });
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        errors: ["ID não enviado"],
      });
    }

    const student = await Aluno.findByPk(id);

    if (!student) {
      return res.json({
        errors: ["Aluno não encontrado ou não existe"],
      });
    }

    await student.destroy();
    return res.json("Apagado com sucesso");
  } catch (e) {
    return res.status(401).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export { index, show, create, update, remove };
