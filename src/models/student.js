const { runQuery, getData } = require('../services/db');

const createStudent = (nom, email, solde = 50.0) => {
    return runQuery(`INSERT INTO etudiants (nom, email, solde_repas) VALUES (?, ?, ?)`, [nom, email, solde])
        .then(id => ({ id, nom, email, solde }));
};

const getStudentById = (id) => getData(`SELECT * FROM etudiants WHERE id = ?`, [id]).then(rows => rows[0]);

const getAllStudents = () => getData(`SELECT * FROM etudiants`);

const updateMealBalance = (id, newBalance) => runQuery(`UPDATE etudiants SET solde_repas = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`, [newBalance, id]);

module.exports = { createStudent, getStudentById, getAllStudents, updateMealBalance };
