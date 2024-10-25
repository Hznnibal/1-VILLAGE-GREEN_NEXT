'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import du hook useRouter
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
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
        
        // Redirection vers la page de connexion
        router.push('/auth/sign-in');
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Create your account</h1>

        <div className="w-full">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="mb-3 block text-xs font-medium text-gray-900">
              First Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
              <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
            </div>
          </div>

          {/* Last Name */}
          <div className="mt-4">
            <label htmlFor="lastName" className="mb-3 block text-xs font-medium text-gray-900">
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="lastName"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
              <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label htmlFor="email" className="mb-3 block text-xs font-medium text-gray-900">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="mb-3 block text-xs font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="mb-3 block text-xs font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
              />
              <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
            </div>
          </div>

          {/* Adresse */}
          <div className="mt-4">
            <label htmlFor="adresse" className="mb-3 block text-xs font-medium text-gray-900">
              Adresse
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="adresse"
                type="text"
                name="adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Enter your address"
                required
              />
            </div>
          </div>

          {/* Code Postal */}
          <div className="mt-4">
            <label htmlFor="codePostal" className="mb-3 block text-xs font-medium text-gray-900">
              Code Postal
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="codePostal"
                type="text"
                name="codePostal"
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
                placeholder="Enter your postal code"
                required
              />
            </div>
          </div>

          {/* Ville */}
          <div className="mt-4">
            <label htmlFor="ville" className="mb-3 block text-xs font-medium text-gray-900">
              Ville
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="ville"
                type="text"
                name="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </div>
          </div>

          {/* Téléphone */}
          <div className="mt-4">
            <label htmlFor="telephone" className="mb-3 block text-xs font-medium text-gray-900">
              Téléphone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10"
                id="telephone"
                type="text"
                name="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <Button className="mt-4 w-full">
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </div>
      </div>
    </form>
  );
}
