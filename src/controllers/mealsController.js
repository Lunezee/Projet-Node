const { getData } = require('../services/db');

exports.getAllMeals = async (req, res) => {
  try {
    const rows = await getData('SELECT * FROM plats');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
