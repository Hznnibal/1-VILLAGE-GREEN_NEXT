// pages/about.tsx


const AboutPage = () => {
    return (
        <div className="relative">
            {/* Section avec l'image de fond pour la partie "À propos de Village Green" */}
            <div className="relative">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('/village_green.png')` }}
                ></div>
                <div className="relative z-10 text-center text-white p-10 bg-opacity-60 bg-black">
                    <h1 className="text-4xl font-bold mb-4">À propos de Village Green</h1>

                    <p className="text-lg mb-6">
                        Bienvenue sur <span className="font-bold">Village Green</span>, un lieu où la musique rencontre la nature.
                        Nous sommes une équipe passionnée par l'art et l'harmonie, et nous croyons que chaque instrument de musique a une histoire à raconter.
                    </p>

                    <p className="text-lg mb-6">
                        Notre histoire a commencé dans un petit village pittoresque, entouré de verdure, où la musique et la nature se mêlaient parfaitement.
                        Inspirés par cet environnement paisible, nous avons décidé de créer <span className="font-bold">Village Green</span>, un espace dédié à la vente d'instruments de musique.
                        De la guitare acoustique aux percussions en bois, en passant par les instruments à vent, notre passion pour la musique nous pousse à offrir une sélection exceptionnelle de produits pour tous les musiciens.
                    </p>
                </div>
            </div>

            <div className="relative z-10 text-center text-black p-10 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">


                    <div className="flex justify-center">
                        <img src="/guitar.jpg" alt="Guitare" className="rounded-lg shadow-lg" />
                    </div>

                    <div className="flex justify-center">
                        <img src="/drums.jpg" alt="Batterie" className="rounded-lg shadow-lg" />
                    </div>

                    <div className="flex justify-center">
                        <img src="/piano.jpg" alt="Piano" className="rounded-lg shadow-lg" />
                    </div>
                </div>

                <p className="text-lg mt-6 text-blue-50">
                    Que vous soyez un débutant cherchant votre premier instrument ou un musicien expérimenté à la recherche de la perfection, <span className="font-bold">Village Green</span> est votre destination pour découvrir des instruments de musique de qualité supérieure. Rejoignez-nous et laissez la musique nourrir votre âme.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
