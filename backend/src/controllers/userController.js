const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      if (await User.findOne({ where: { email } })) {
        return res.status(400).send({ error: "Usuário já existe" });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, "#@guibarber_100%+acao", {
        expiresIn: 86400,
      });

      return res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
