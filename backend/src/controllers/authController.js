const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      console.log("chegou");

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });

        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ error: "senha inválida" });
        }
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
};
