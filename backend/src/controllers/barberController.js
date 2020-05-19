const Barber = require("../models/Barber");
const Schedule = require("../models/Schedule");

const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    try {
      const schedule = await Schedule.findAll({
        include: [{ association: "user", attributes: ["name"] }],
        attributes: ["cutype", "cutvalue", "date", "hour"],
      });

      return res.json(schedule);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async store(req, res) {
    try {
      const { name, email, password, phone, insta } = req.body;

      if (await Barber.findOne({ where: { email } })) {
        return res.status(400).send({ error: "Usuário já existe" });
      }

      const barber = await Barber.create({
        name,
        email,
        password,
        phone,
        insta,
      });

      console.log("chegou");

      barber.password = undefined;

      const token = jwt.sign({ id: barber.id }, "#@guibarber_100%+acao", {
        expiresIn: 86400,
      });

      return res.json({ barber, token });
    } catch (error) {
      return res.json({ error: "chegou" });
    }
  },
};
