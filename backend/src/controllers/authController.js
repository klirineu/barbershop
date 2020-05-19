const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Barber = require("../models/Barber");

module.exports = {
  async userAuthenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "senha inválida" });
      }

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, "#@guibarber_100%+acao", {
        expiresIn: 86400,
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async barberAuthenticate(req, res) {
    try {
      const { email, password } = req.body;

      const barber = await Barber.findOne({ where: { email } });

      if (!barber) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      if (!(await bcrypt.compare(password, barber.password))) {
        return res.status(400).json({ error: "senha inválida" });
      }

      barber.password = undefined;

      const token = jwt.sign({ id: barber.id }, "#@guibarber_100%+acao", {
        expiresIn: 86400,
      });

      return res.json({ barber, token });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
