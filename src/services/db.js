const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers la base SQLite (à partir du dossier services)
const dbPath = path.resolve(__dirname, '../../db/restaurant.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erreur de connexion à la base :', err.message);
  else console.log('✅ Connecté à la base SQLite : restaurant.db');
});

// Fonction pour exécuter des requêtes sans résultat
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

// Fonction pour récupérer des données
const getData = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = { db, runQuery, getData };
