const { runQuery, getData } = require('../services/db');

exports.createReservation = async (req, res) => {
  try {
    const { id_etudiant, id_plat } = req.body;

    console.log('🟢 Requête POST reçue avec:', req.body);

    if (!id_etudiant || !id_plat) {
      return res.status(400).json({ message: 'id_etudiant et id_plat sont requis' });
    }

    // Vérifier l'existence de l'étudiant
    const etudiant = await getData('SELECT * FROM etudiants WHERE id = ?', [id_etudiant]);
    if (etudiant.length === 0) {
      console.warn('⚠️ Étudiant introuvable pour ID:', id_etudiant);
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    // Vérifier l'existence du plat
    const plat = await getData('SELECT * FROM plats WHERE id = ?', [id_plat]);
    if (plat.length === 0) {
      console.warn('⚠️ Plat introuvable pour ID:', id_plat);
      return res.status(404).json({ message: 'Plat non trouvé' });
    }

    // Vérifier le solde
    if (etudiant[0].solde_repas < plat[0].prix) {
      console.warn(`⚠️ Solde insuffisant: ${etudiant[0].solde_repas} < ${plat[0].prix}`);
      return res.status(400).json({ message: 'Solde insuffisant' });
    }

    // Effectuer la réservation
    await runQuery('UPDATE etudiants SET solde_repas = solde_repas - ? WHERE id = ?', [plat[0].prix, id_etudiant]);
    const reservationId = await runQuery(
      'INSERT INTO reservations (id_etudiant, id_plat, date) VALUES (?, ?, ?)',
      [id_etudiant, id_plat, new Date().toISOString()]
    );

    console.log('✅ Réservation effectuée ID:', reservationId);

    res.status(201).json({
      message: 'Réservation effectuée avec succès',
      reservation: {
        id: reservationId,
        etudiant: etudiant[0].nom,
        plat: plat[0].nom,
        prix: plat[0].prix,
        date: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('❌ Erreur lors de la création de la réservation:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const rows = await getData(`
      SELECT r.id, e.nom AS etudiant, p.nom AS plat, r.date
      FROM reservations r
      JOIN etudiants e ON r.id_etudiant = e.id
      JOIN plats p ON r.id_plat = p.id
      ORDER BY r.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des réservations:', err);
    res.status(500).json({ message: err.message });
  }
};
