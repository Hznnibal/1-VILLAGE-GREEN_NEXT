'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

type GoogleMapComponentProps = {
    center: {
        lat: number; // Latitude de l'emplacement
        lng: number; // Longitude de l'emplacement
    };
    zoom?: number; // Niveau de zoom (facultatif, par défaut à 10)
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
    center,
    zoom = 10, // Zoom par défaut
}) => {
    const mapContainerStyle = {
        width: '100%', // Largeur de la carte
        height: '500px', // Hauteur de la carte
        borderRadius: '16px', // Bordures arrondies
        overflow: 'hidden', // Cache les débordements dus au border-radius
    };

    const mapOptions = {
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#838383"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#c4c4c4"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#aaaaaa"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#151516"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#6e6e6e"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#575757"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#c3c3c3"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5f5f5f"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#717171"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]

        // disableDefaultUI: true, // Désactive les contrôles par défaut (facultatif)
    };

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return <p className="text-red-500">Clé API manquante</p>;
    }

    return (
        <LoadScript googleMapsApiKey={apiKey} >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                options={mapOptions}
            />
        </LoadScript >
    );
};

const PageWithMap: React.FC = () => {
    const center = { lat: -18.920465623277273, lng: 47.512854097576756 }; // Coordonnées pour Paris -18.920465623277273, 47.512854097576756

    return (
        <div className="flex h-screen">
            {/* Contenu à gauche */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4 text-blue-50">Bienvenue à Village Green</h1>
                <p className="mb-4 text-lg text-blue-50">
                    Découvrez l'univers de <strong>Village Green</strong>, un havre de paix pour les amateurs de jardinage et de décoration extérieure depuis 1995.
                    Où nature et passion se rencontrent !
                </p>
                <p className="text-md text-blue-50">
                    Adresse : 123 Avenue des Fleurs, 75008 Paris, France.
                </p>
            </div>

            {/* Carte à droite */}
            <div className="flex-1 h-full">
                <GoogleMapComponent center={center} zoom={12} />
            </div>
        </div>
    );
};

export default PageWithMap;
