// Ce fichier contient les définitions des types basées sur la structure des tables SQL.
// Il décrit la forme des données et les types acceptés pour chaque propriété.

// Définit le type correspondant à la table "client"
export type Client = {
  ref_client: number;
  nom: string;
  prenom: string;
  adresse: string;
  code_postal: string;
  ville: string;
  téléphone: string;
  email: string;
  commercial_rattache: string;
  password: string;
};

// Définit le type correspondant à la table "Rubrique"
export type Rubrique = {
  id_rubrique: number;
  libelle: string;
  image: string;
  active: boolean;
  id_rubrique_1: number | null; // Peut être null si la rubrique est une catégorie principale
};

// Définit le type correspondant à la table "type_client"
export type TypeClient = {
  id_type_client: number;
  type_client: string;
  ref_client: number;
};

// Définit le type correspondant à la table "Fournisseur"
export type Fournisseur = {
  id_fournisseur: number;
  email: string;
  telephone: string;
  adresse: string;
  nom: string;
};

// Définit le type correspondant à la table "Bon_de_livraison"
export type BonDeLivraison = {
  id_bon_de_livraison: number;
  reference: string;
};

// Définit le type correspondant à la table "Produit"
export type Produit = {
  id_produit: number;
  description: string;
  photo: string;
  active: boolean;
  libelle: string;
  prix: number;
  id_fournisseur: number;
  id_rubrique: number;
};

// Définit le type correspondant à la table "Commande"
export type Commande = {
  id_commande: number;
  nom: string;
  total: number;
  etat: string;
  date_commande: string; // Utilise le format date (YYYY-MM-DD)
  adresse_livraison: string;
  ref_client: number;
};

// Définit le type correspondant à la table "concerne"
export type Concerne = {
  id_produit: number;
  id_commande: number;
  date_achat: string; // Format date comme chaîne
  quantite: number;
};

// Définit le type correspondant à la table "Asso_7"
export type Asso7 = {
  id_commande: number;
  id_bon_de_livraison: number;
};

// Définit le type correspondant à la table "livree"
export type Livree = {
  id_produit: number;
  id_bon_de_livraison: number;
  date_livraison: string;
};

// Types dérivés pour certaines interfaces spécifiques ou formatées
export type FormattedClient = Omit<Client, 'téléphone'> & {
  téléphone: string;
};

export type CommandeDetails = Commande & {
  produits: Concerne[];
};
