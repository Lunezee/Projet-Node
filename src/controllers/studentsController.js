const { runQuery, getData } = require('../services/db');

exports.createStudent = async (req, res) => {
  try {
    const { nom, email, solde_repas } = req.body;
    const id = await runQuery(
      'INSERT INTO etudiants (nom, email, solde_repas) VALUES (?, ?, ?)',
      [nom, email, solde_repas]
    );
    res.status(201).json({ id, nom, email, solde_repas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await getData('SELECT * FROM etudiants WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMealBalance = async (req, res) => {
  try {
    const id = req.params.id;
    const { solde_repas } = req.body;
    await runQuery('UPDATE etudiants SET solde_repas = ? WHERE id = ?', [solde_repas, id]);
    res.json({ id, solde_repas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const rows = await getData('SELECT * FROM etudiants');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
