import { Client, Produit, Fournisseur, Rubrique } from './definitions';

const clients: Client[] = [
  {
    ref_client: 1,
    nom: 'Martin',
    prenom: 'Alice',
    adresse: '12 Rue de la Musique',
    code_postal: '75001',
    ville: 'Paris',
    téléphone: '0123456789',
    email: 'alice@musicworld.com',
    commercial_rattache: 'Jean Dupont',
    password: 'alice123',
  },
  {
    ref_client: 2,
    nom: 'Johnson',
    prenom: 'Bob',
    adresse: '23 Avenue des Artistes',
    code_postal: '69000',
    ville: 'Lyon',
    téléphone: '0987654321',
    email: 'bob@musicworld.com',
    commercial_rattache: 'Marie Laurent',
    password: 'bob123',
  },
  {
    ref_client: 3,
    nom: 'Doe',
    prenom: 'John',
    adresse: '45 Boulevard des Harmonies',
    code_postal: '13000',
    ville: 'Marseille',
    téléphone: '0754321098',
    email: 'john@musicworld.com',
    commercial_rattache: 'Paul Martin',
    password: 'john123',
  },
];

const fournisseurs: Fournisseur[] = [
  {
    Id_Fournisseur: 1,
    email: 'yamaha@instruments.com',
    telephone: '0156783456',
    adresse: '88 Rue des Instruments, Paris',
    nom: 'Yamaha',
  },
  {
    Id_Fournisseur: 2,
    email: 'fender@instruments.com',
    telephone: '0178901234',
    adresse: '12 Guitar Street, New York',
    nom: 'Fender',
  },
  {
    Id_Fournisseur: 3,
    email: 'roland@instruments.com',
    telephone: '0187654321',
    adresse: '56 Synth Road, Tokyo',
    nom: 'Roland',
  },
  {
    Id_Fournisseur: 4,
    email: 'gibson@instruments.com',
    telephone: '0123456789',
    adresse: '100 Gibson Blvd, Nashville',
    nom: 'Gibson',
  },
];

const rubriques: Rubrique[] = [
  {
    Id_Rubrique: 1,
    libelle: 'Guitares',
    image: '/images/guitares.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 2,
    libelle: 'Guitares acoustiques',
    image: '/images/guitares_acoustiques.jpg',
    active: true,
    Id_Rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    Id_Rubrique: 3,
    libelle: 'Guitares électriques',
    image: '/images/guitares_electriques.jpg',
    active: true,
    Id_Rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    Id_Rubrique: 4,
    libelle: 'Guitares classiques',
    image: '/images/guitares_classiques.jpg',
    active: true,
    Id_Rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    Id_Rubrique: 5,
    libelle: 'Pianos',
    image: '/images/pianos.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 6,
    libelle: 'Pianos acoustiques',
    image: '/images/pianos_acoustiques.jpg',
    active: true,
    Id_Rubrique_1: 5, // Sous-rubrique de 'Pianos'
  },
  {
    Id_Rubrique: 7,
    libelle: 'Pianos numériques',
    image: '/images/pianos_numeriques.jpg',
    active: true,
    Id_Rubrique_1: 5, // Sous-rubrique de 'Pianos'
  },
  {
    Id_Rubrique: 8,
    libelle: 'Basses',
    image: '/images/basses.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 9,
    libelle: 'Basses électriques',
    image: '/images/basses_electriques.jpg',
    active: true,
    Id_Rubrique_1: 8, // Sous-rubrique de 'Basses'
  },
  {
    Id_Rubrique: 10,
    libelle: 'Batteries et Percussions',
    image: '/images/batteries_percussions.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 11,
    libelle: 'Batteries acoustiques',
    image: '/images/batteries_acoustiques.jpg',
    active: true,
    Id_Rubrique_1: 10, // Sous-rubrique de 'Batteries et Percussions'
  },
  {
    Id_Rubrique: 12,
    libelle: 'Batteries électroniques',
    image: '/images/batteries_electroniques.jpg',
    active: true,
    Id_Rubrique_1: 10, // Sous-rubrique de 'Batteries et Percussions'
  },
  {
    Id_Rubrique: 13,
    libelle: 'Claviers et Synthétiseurs',
    image: '/images/claviers_synthetiseurs.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 14,
    libelle: 'Synthétiseurs',
    image: '/images/synthetiseurs.jpg',
    active: true,
    Id_Rubrique_1: 13, // Sous-rubrique de 'Claviers et Synthétiseurs'
  },
  {
    Id_Rubrique: 15,
    libelle: 'Pianos de scène',
    image: '/images/pianos_scene.jpg',
    active: true,
    Id_Rubrique_1: 13, // Sous-rubrique de 'Claviers et Synthétiseurs'
  },
  {
    Id_Rubrique: 16,
    libelle: 'Instruments à Vent',
    image: '/images/instruments_vent.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 17,
    libelle: 'Cuivres',
    image: '/images/cuivres.jpg',
    active: true,
    Id_Rubrique_1: 16, // Sous-rubrique de 'Instruments à Vent'
  },
  {
    Id_Rubrique: 18,
    libelle: 'Bois',
    image: '/images/bois.jpg',
    active: true,
    Id_Rubrique_1: 16, // Sous-rubrique de 'Instruments à Vent'
  },
  {
    Id_Rubrique: 19,
    libelle: 'Instruments Traditionnels',
    image: '/images/instruments_traditionnels.jpg',
    active: true,
    Id_Rubrique_1: null, // Rubrique principale
  },
  {
    Id_Rubrique: 20,
    libelle: 'Cordes frottées',
    image: '/images/cordes_frottees.jpg',
    active: true,
    Id_Rubrique_1: 19, // Sous-rubrique de 'Instruments Traditionnels'
  },
  {
    Id_Rubrique: 21,
    libelle: 'Percussions traditionnelles',
    image: '/images/percussions_traditionnelles.jpg',
    active: true,
    Id_Rubrique_1: 19, // Sous-rubrique de 'Instruments Traditionnels'
  },
];

const produits: Produit[] = [
  {
    Id_Produit: 1,
    description: 'Guitare électrique Yamaha Pacifica 112V',
    photo: '/images/yamaha_pacifica.jpg',
    active: true,
    libelle: 'Guitare Yamaha',
    prix: 299.99,
    Id_Fournisseur: 1,
    Id_Rubrique: 3, // Lié à 'Guitares électriques'
  },
  {
    Id_Produit: 2,
    description: 'Piano numérique Yamaha P-45',
    photo: '/images/yamaha_p45.jpg',
    active: true,
    libelle: 'Piano Yamaha',
    prix: 499.99,
    Id_Fournisseur: 1,
    Id_Rubrique: 7, // Lié à 'Pianos numériques'
  },
  {
    Id_Produit: 3,
    description: 'Basse électrique Fender Precision',
    photo: '/images/fender_precision.jpg',
    active: true,
    libelle: 'Basse Fender',
    prix: 799.99,
    Id_Fournisseur: 2,
    Id_Rubrique: 9, // Lié à 'Basses électriques'
  },
  {
    Id_Produit: 4,
    description: 'Batterie acoustique Yamaha Stage Custom',
    photo: '/images/yamaha_stage_custom.jpg',
    active: true,
    libelle: 'Batterie Yamaha',
    prix: 999.99,
    Id_Fournisseur: 1,
    Id_Rubrique: 11, // Lié à 'Batteries acoustiques'
  },
  {
    Id_Produit: 5,
    description: 'Synthétiseur Roland Jupiter-X',
    photo: '/images/roland_jupiter_x.jpg',
    active: true,
    libelle: 'Synthétiseur Roland',
    prix: 2499.99,
    Id_Fournisseur: 3,
    Id_Rubrique: 14, // Lié à 'Synthétiseurs'
  },
  {
    Id_Produit: 6,
    description: 'Trompette Yamaha YTR-2330',
    photo: '/images/yamaha_trompette.jpg',
    active: true,
    libelle: 'Trompette Yamaha',
    prix: 699.99,
    Id_Fournisseur: 1,
    Id_Rubrique: 17, // Lié à 'Cuivres'
  },
  {
    Id_Produit: 7,
    description: 'Violon Stentor 1400',
    photo: '/images/stentor_violon.jpg',
    active: true,
    libelle: 'Violon Stentor',
    prix: 199.99,
    Id_Fournisseur: 4,
    Id_Rubrique: 20, // Lié à 'Cordes frottées'
  },
];

export { clients, fournisseurs, rubriques, produits };
