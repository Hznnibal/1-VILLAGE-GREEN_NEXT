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
    id_fournisseur: 1,
    email: 'yamaha@instruments.com',
    telephone: '0156783456',
    adresse: '88 Rue des Instruments, Paris',
    nom: 'Yamaha',
  },
  {
    id_fournisseur: 2,
    email: 'fender@instruments.com',
    telephone: '0178901234',
    adresse: '12 Guitar Street, New York',
    nom: 'Fender',
  },
  {
    id_fournisseur: 3,
    email: 'roland@instruments.com',
    telephone: '0187654321',
    adresse: '56 Synth Road, Tokyo',
    nom: 'Roland',
  },
  {
    id_fournisseur: 4,
    email: 'gibson@instruments.com',
    telephone: '0123456789',
    adresse: '100 Gibson Blvd, Nashville',
    nom: 'Gibson',
  },
];

const rubriques: Rubrique[] = [
  {
    id_rubrique: 1,
    libelle: 'Guitares',
    image: '/images_instruments/guitares.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 2,
    libelle: 'Guitares acoustiques',
    image: '/images_instruments/guitares_acoustiques.jpg',
    active: true,
    id_rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    id_rubrique: 3,
    libelle: 'Guitares électriques',
    image: '/images_instruments/guitares_electriques.jpg',
    active: true,
    id_rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    id_rubrique: 4,
    libelle: 'Guitares classiques',
    image: '/images_instruments/guitares_classiques.jpg',
    active: true,
    id_rubrique_1: 1, // Sous-rubrique de 'Guitares'
  },
  {
    id_rubrique: 5,
    libelle: 'Pianos',
    image: '/images_instruments/pianos.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 6,
    libelle: 'Pianos acoustiques',
    image: '/images_instruments/pianos_acoustiques.jpg',
    active: true,
    id_rubrique_1: 5, // Sous-rubrique de 'Pianos'
  },
  {
    id_rubrique: 7,
    libelle: 'Pianos numériques',
    image: '/images_instruments/pianos_numeriques.jpg',
    active: true,
    id_rubrique_1: 5, // Sous-rubrique de 'Pianos'
  },
  {
    id_rubrique: 8,
    libelle: 'Basses',
    image: '/images_instruments/basses.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 9,
    libelle: 'Basses électriques',
    image: '/images_instruments/basses_electriques.jpg',
    active: true,
    id_rubrique_1: 8, // Sous-rubrique de 'Basses'
  },
  {
    id_rubrique: 10,
    libelle: 'Batteries et Percussions',
    image: '/images_instruments/batteries_percussions.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 11,
    libelle: 'Batteries acoustiques',
    image: '/images_instruments/batteries_acoustiques.jpg',
    active: true,
    id_rubrique_1: 10, // Sous-rubrique de 'Batteries et Percussions'
  },
  {
    id_rubrique: 12,
    libelle: 'Batteries électroniques',
    image: '/images_instruments/batteries_electroniques.jpg',
    active: true,
    id_rubrique_1: 10, // Sous-rubrique de 'Batteries et Percussions'
  },
  {
    id_rubrique: 13,
    libelle: 'Claviers et Synthétiseurs',
    image: '/images_instruments/claviers_synthetiseurs.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 14,
    libelle: 'Synthétiseurs',
    image: '/images_instruments/synthetiseurs.jpg',
    active: true,
    id_rubrique_1: 13, // Sous-rubrique de 'Claviers et Synthétiseurs'
  },
  {
    id_rubrique: 15,
    libelle: 'Pianos de scène',
    image: '/images_instruments/pianos_scene.jpg',
    active: true,
    id_rubrique_1: 13, // Sous-rubrique de 'Claviers et Synthétiseurs'
  },
  {
    id_rubrique: 16,
    libelle: 'Instruments à Vent',
    image: '/images_instruments/instruments_vent.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 17,
    libelle: 'Cuivres',
    image: '/images_instruments/cuivres.jpg',
    active: true,
    id_rubrique_1: 16, // Sous-rubrique de 'Instruments à Vent'
  },
  {
    id_rubrique: 18,
    libelle: 'Bois',
    image: '/images_instruments/bois.jpg',
    active: true,
    id_rubrique_1: 16, // Sous-rubrique de 'Instruments à Vent'
  },
  {
    id_rubrique: 19,
    libelle: 'Instruments Traditionnels',
    image: '/images_instruments/instruments_traditionnels.jpg',
    active: true,
    id_rubrique_1: null, // Rubrique principale
  },
  {
    id_rubrique: 20,
    libelle: 'Cordes frottées',
    image: '/images_instruments/cordes_frottees.jpg',
    active: true,
    id_rubrique_1: 19, // Sous-rubrique de 'Instruments Traditionnels'
  },
  {
    id_rubrique: 21,
    libelle: 'Percussions traditionnelles',
    image: '/images_instruments/percussions_traditionnelles.jpg',
    active: true,
    id_rubrique_1: 19, // Sous-rubrique de 'Instruments Traditionnels'
  },
];

const produits: Produit[] = [
  {
    id_produit: 1,
    description: 'Guitare électrique Yamaha Pacifica 112V',
    photo: '/images_instruments/yamaha_pacifica.jpg',
    active: true,
    libelle: 'Guitare Yamaha',
    prix: 299.99,
    id_fournisseur: 1,
    id_rubrique: 3, // Lié à 'Guitares électriques'
  },
  {
    id_produit: 2,
    description: 'Piano numérique Yamaha P-45',
    photo: '/images_instruments/yamaha_p45.jpg',
    active: true,
    libelle: 'Piano Yamaha',
    prix: 499.99,
    id_fournisseur: 1,
    id_rubrique: 7, // Lié à 'Pianos numériques'
  },
  {
    id_produit: 3,
    description: 'Basse électrique Fender Precision',
    photo: '/images_instruments/fender_precision.jpg',
    active: true,
    libelle: 'Basse Fender',
    prix: 799.99,
    id_fournisseur: 2,
    id_rubrique: 9, // Lié à 'Basses électriques'
  },
  {
    id_produit: 4,
    description: 'Batterie acoustique Yamaha Stage Custom',
    photo: '/images_instruments/yamaha_stage_custom.jpg',
    active: true,
    libelle: 'Batterie Yamaha',
    prix: 999.99,
    id_fournisseur: 1,
    id_rubrique: 11, // Lié à 'Batteries acoustiques'
  },
  {
    id_produit: 5,
    description: 'Synthétiseur Roland Jupiter-X',
    photo: '/images_instruments/roland_jupiter_x.jpg',
    active: true,
    libelle: 'Synthétiseur Roland',
    prix: 2499.99,
    id_fournisseur: 3,
    id_rubrique: 14, // Lié à 'Synthétiseurs'
  },
  {
    id_produit: 6,
    description: 'Trompette Yamaha YTR-2330',
    photo: '/images_instruments/yamaha_trompette.jpg',
    active: true,
    libelle: 'Trompette Yamaha',
    prix: 699.99,
    id_fournisseur: 1,
    id_rubrique: 17, // Lié à 'Cuivres'
  },
  {
    id_produit: 7,
    description: 'Violon Stentor 1400',
    photo: '/images_instruments/stentor_violon.jpg',
    active: true,
    libelle: 'Violon Stentor',
    prix: 199.99,
    id_fournisseur: 4,
    id_rubrique: 20, // Lié à 'Cordes frottées'
  },
];

export { clients, fournisseurs, rubriques, produits };
