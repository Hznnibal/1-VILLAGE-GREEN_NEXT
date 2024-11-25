'use client';

import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="max-w-lg mx-auto my-8 p-4 border rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-50">Contactez-nous</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium text-white mb-1" htmlFor="name">Nom</label>
                    <input
                        className="w-full border p-2 rounded"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-white mb-1" htmlFor="email">Email</label>
                    <input
                        className="w-full border p-2 rounded"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-white mb-1" htmlFor="message">Message</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
            {status === 'success' && <p className="mt-4 text-green-500">Message envoyé avec succès !</p>}
            {status === 'error' && <p className="mt-4 text-red-500">Erreur lors de l'envoi du message.</p>}
        </div>
    );
};

export default ContactPage;
