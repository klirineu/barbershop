const User = require("../models/User");
const Schedule = require("../models/Schedule");

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
      const { cutype, cutvalue, date, hour } = req.body;
      const user_id = req.userId;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const scheduleCount = await Schedule.findAndCountAll({
        where: { user_id },
      });

      if (scheduleCount.count === 1) {
        const userCount = await User.findByPk(user_id, {
          include: {
            association: "schedule",
            attributes: ["cutype", "cutvalue", "date", "hour"],
          },
          attributes: ["name"],
        });
        return res.json({ Alert: "você já tem uma hora marcada", userCount });
      }

      if (await Schedule.findOne({ where: { date, hour } })) {
        return res.status(400).json({ error: "Data e hora indisponíveis" });
      }

      const schedule = await Schedule.create({
        user_id,
        cutype,
        cutvalue,
        date,
        hour,
      });

      return res.json({ schedule });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async delete(req, res) {
    try {
      const { sche_id } = req.params;
      const user_id = req.userId;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const schedule = await Schedule.findOne({ where: { id: sche_id } });

      if (!schedule) {
        return res
          .status(400)
          .json({ error: "Não existe registro de agendamento" });
      }

      await schedule.destroy();

      return res.json({ ok: true });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
