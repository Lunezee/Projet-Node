const { runQuery, getData } = require('../services/db');

const createReservation = (id_etudiant, id_plat) => runQuery(
    `INSERT INTO reservations (id_etudiant, id_plat) VALUES (?, ?)`, [id_etudiant, id_plat]
).then(id => ({ id, id_etudiant, id_plat }));

const getAllReservations = () => getData(`SELECT * FROM reservations`);

module.exports = { createReservation, getAllReservations };
