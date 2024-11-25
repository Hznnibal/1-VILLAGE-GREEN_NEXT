'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'; // Import du hook useRouter
import { useState } from 'react';
import { Button } from './button';

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [telephone, setTelephone] = useState('');

  const router = useRouter(); // Initialisation du router

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Appel à l'API pour créer un nouvel utilisateur
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: lastName,
          prenom: firstName,
          email: email,
          password: password,
          adresse: adresse,
          code_postal: codePostal,
          ville: ville,
          téléphone: telephone,
        }),
      });

      if (response.ok) {
        alert('Compte créé avec succès');
        router.push('/auth/sign-in'); // Redirection vers la page de connexion
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-8 ">

        {/* Grille pour les champs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Prénom */}
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-900 mt-4">
              Prénom
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Entrez votre prénom"
                required
              />
              <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-900 mt-4">
              Nom
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Entrez votre nom"
                required
              />
              <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
                required
              />
              <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="telephone" className="mb-1 block text-sm font-medium text-gray-900">
              Téléphone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="telephone"
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Entrez votre numéro de téléphone"
                required
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label htmlFor="adresse" className="mb-1 block text-sm font-medium text-gray-900">
              Adresse
            </label>
            <input
              className="peer block w-full rounded-md border py-[9px] pl-3"
              id="adresse"
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Entrez votre adresse"
              required
            />
          </div>

          {/* Code postal */}
          <div>
            <label htmlFor="codePostal" className="mb-1 block text-sm font-medium text-gray-900">
              Code Postal
            </label>
            <input
              className="peer block w-full rounded-md border py-[9px] pl-3"
              id="codePostal"
              type="text"
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              placeholder="Entrez votre code postal"
              required
            />
          </div>

          {/* Ville */}
          <div>
            <label htmlFor="ville" className="mb-1 block text-sm font-medium text-gray-900">
              Ville
            </label>
            <input
              className="peer block w-full rounded-md border py-[9px] pl-3"
              id="ville"
              type="text"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              placeholder="Entrez votre ville"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez un mot de passe"
                required
              />
              <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-900">
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
              />
              <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Bouton */}
        <Button className="mt-6 w-full">
          S'inscrire <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
