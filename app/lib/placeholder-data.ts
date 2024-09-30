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
];

const rubriques: Rubrique[] = [
  {
    Id_Rubrique: 1,
    libelle: 'Guitares',
    image: '/images/guitares.jpg',
    active: true,
    Id_Rubrique_1: null,
  },
  {
    Id_Rubrique: 2,
    libelle: 'Pianos',
    image: '/images/pianos.jpg',
    active: true,
    Id_Rubrique_1: null,
  },
  {
    Id_Rubrique: 3,
    libelle: 'Basses',
    image: '/images/basses.jpg',
    active: true,
    Id_Rubrique_1: null,
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
    Id_Rubrique: 1,
  },
  {
    Id_Produit: 2,
    description: 'Piano numérique Yamaha P-45',
    photo: '/images/yamaha_p45.jpg',
    active: true,
    libelle: 'Piano Yamaha',
    prix: 499.99,
    Id_Fournisseur: 1,
    Id_Rubrique: 2,
  },
  {
    Id_Produit: 3,
    description: 'Basse électrique Fender Precision',
    photo: '/images/fender_precision.jpg',
    active: true,
    libelle: 'Basse Fender',
    prix: 799.99,
    Id_Fournisseur: 2,
    Id_Rubrique: 3,
  },
];

export { clients, fournisseurs, rubriques, produits };
