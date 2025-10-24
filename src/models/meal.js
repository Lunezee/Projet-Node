const { runQuery, getData } = require('../services/db');

const createMeal = (nom, prix, categorie) => runQuery(`INSERT INTO plats (nom, prix, categorie) VALUES (?, ?, ?)`, [nom, prix, categorie])
    .then(id => ({ id, nom, prix, categorie }));

const getMealById = (id) => getData(`SELECT * FROM plats WHERE id = ?`, [id]).then(rows => rows[0]);

const getAllMeals = () => getData(`SELECT * FROM plats`);

module.exports = { createMeal, getMealById, getAllMeals };
