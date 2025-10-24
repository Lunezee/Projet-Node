const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Créer le dossier db à la racine du projet s'il n'existe pas
const dbDir = path.resolve(__dirname, 'db');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

// Chemin complet vers la base SQLite
const dbPath = path.join(dbDir, 'restaurant.db');

// Connexion à la base
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erreur DB :', err.message);
  else console.log('✅ Connecté à la base SQLite pour initialisation.');
});

// Créer les tables et insérer les données de test
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS etudiants');
  db.run('DROP TABLE IF EXISTS plats');
  db.run('DROP TABLE IF EXISTS reservations');

  db.run(`
    CREATE TABLE etudiants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      solde_repas REAL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE plats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prix REAL NOT NULL,
      categorie TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_etudiant INTEGER,
      id_plat INTEGER,
      date TEXT,
      FOREIGN KEY (id_etudiant) REFERENCES etudiants(id),
      FOREIGN KEY (id_plat) REFERENCES plats(id)
    )
  `);

  // Données de test
  db.run(`INSERT INTO etudiants (nom, email, solde_repas) VALUES ('Alioune Ba', 'alioune@example.com', 5000)`);
  db.run(`INSERT INTO etudiants (nom, email, solde_repas) VALUES ('Marie Ndiaye', 'marie@example.com', 3000)`);

  db.run(`INSERT INTO plats (nom, prix, categorie) VALUES ('Thiebou Dieune', 1500, 'Déjeuner')`);
  db.run(`INSERT INTO plats (nom, prix, categorie) VALUES ('Sandwich', 800, 'Snack')`);
  db.run(`INSERT INTO plats (nom, prix, categorie) VALUES ('Café', 300, 'Boisson')`);

  console.log('✅ Base de données initialisée avec succès.');
});

db.close();
