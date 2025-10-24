# API REST – Restaurant Universitaire

Cette API permet de gérer les étudiants, les plats et les réservations pour un restaurant universitaire.

**Technologies utilisées** : Node.js, Express, SQLite.

## Base URL
http://localhost:5000/api

yaml
Copier le code

---

##  Routes Étudiants

### 1. GET /students
- **Description** : Récupère tous les étudiants.
- **Requête** :
GET /api/students

css
Copier le code
- **Réponse (200 OK)** :
```json
[
  {
    "id": 1,
    "nom": "Alioune Ba",
    "email": "alioune@example.com",
    "solde_repas": 5000
  }
]
2. GET /students/:id
Description : Récupère un étudiant par son ID.

Exemple :

bash
Copier le code
GET /api/students/1
Réponse :

json
Copier le code
{
  "id": 1,
  "nom": "Alioune Ba",
  "email": "alioune@example.com",
  "solde_repas": 5000
}
3. POST /students
Description : Crée un nouvel étudiant.

Headers : Content-Type: application/json

Body :

json
Copier le code
{
  "nom": "Ousmane Diop",
  "email": "ousmane@example.com",
  "solde_repas": 4000
}
Réponse (201 Created) :

json
Copier le code
{
  "id": 2,
  "nom": "Ousmane Diop",
  "email": "ousmane@example.com",
  "solde_repas": 4000
}
4. PUT /students/:id
Description : Met à jour le solde repas d’un étudiant.

Headers : Content-Type: application/json

Body :

json
Copier le code
{
  "solde_repas": 5500
}
Réponse :

json
Copier le code
{
  "id": 1,
  "solde_repas": 5500
}


Routes Plats


GET /meals
Description : Récupère tous les plats disponibles.

Requête :

bash
Copier le code
GET /api/meals
Réponse :

json
Copier le code
[
  { "id": 1, "nom": "Thiebou Dieune", "prix": 1500, "categorie": "Déjeuner" },
  { "id": 2, "nom": "Sandwich", "prix": 800, "categorie": "Snack" },
  { "id": 3, "nom": "Café", "prix": 300, "categorie": "Boisson" }
]


Routes Réservations



1. GET /reservations
Description : Récupère toutes les réservations.

Requête :

bash
Copier le code
GET /api/reservations
Réponse :

json
Copier le code
[
  {
    "id": 1,
    "etudiant": "Alioune Ba",
    "plat": "Thiebou Dieune",
    "date": "2025-10-24T17:30:00.000Z"
  }
]
2. POST /reservations
Description : Crée une réservation si le solde est suffisant.

Headers : Content-Type: application/json

Body :

json
Copier le code
{
  "id_etudiant": 1,
  "id_plat": 1
}
Réponse (200 OK) :

json
Copier le code
{
  "message": "Réservation effectuée",
  "reservationId": 1
}
Réponse (400) : si solde insuffisant

json
Copier le code
{
  "message": "Solde insuffisant"
}
Réponse (404) : si étudiant ou plat introuvable

json
Copier le code
{
  "message": "Étudiant non trouvé"
}