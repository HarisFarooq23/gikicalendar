
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";

// react-leaflet components are dynamically imported to prevent SSR issues
import dynamic from 'next/dynamic';
import type { Icon as LeafletIcon, LatLngExpression } from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const locationCoordinates: Record<string, [number, number]> = {
    'Faculty Club': [33.9931, 72.4729],
    'Library': [33.9928, 72.4741],
    'Brabers Building': [33.9926, 72.4752],
    'Medical Centre & Girls Hostel': [33.9923, 72.4763],
    'Auditorium': [33.9918, 72.4746],
    'FCME': [33.9913, 72.4754],
    'TUC': [33.9911, 72.4770],
    'Guest House': [33.9899, 72.4772],
    'LOGIK': [33.9902, 72.4761],
    'Main Gate': [33.9897, 72.4750],
    'Admin Block': [33.9904, 72.4740],
    'Sports Ground': [33.9907, 72.4730],
    'Sports Complex': [33.9909, 72.4719],
    'Mess & Mosque': [33.9918, 72.4715],
    'Boys Hostels': [33.9929, 72.4705],
    'Academic Block': [33.9925, 72.4723],
    'FES': [33.9915, 72.4728],
    'FEE': [33.9911, 72.4738],
    'FME': [33.9915, 72.4746],
};

type MapProps = {
    events: Event[];
    icon: LeafletIcon;
    center: LatLngExpression;
}

// Memoize the map component to prevent re-renders from parent state changes
const Map = React.memo(function Map({ events, icon, center }: MapProps) {
    return (
        <MapContainer center={center} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map(event => {
                const coords = locationCoordinates[event.location];
                if (!coords) return null;
                
                return (
                    <Marker key={event.id} position={coords} icon={icon}>
                        <Popup>
                            <div className="font-bold">{event.title}</div>
                            <div>{event.location}</div>
                            <div className="text-xs text-muted-foreground">{event.society}</div>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
});
Map.displayName = 'Map';

export default function MapPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Using useMemo to ensure the icon is created only once
    const markerIcon = useMemo<LeafletIcon | null>(() => {
        if (typeof window === 'undefined') return null;
        const L = require('leaflet');
        return new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }, []);
    
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const allEvents = await getEvents();
            setEvents(allEvents);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const mapCenter: LatLngExpression = [33.9915, 72.4740];

    return (
        <div className="container py-8 sm:py-12">
            <section className="mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Campus Event Map
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                    Find events happening across the university on our interactive map.
                </p>
            </section>
            
            {loading || !markerIcon ? (
                <Skeleton className="h-[600px] w-full rounded-lg" />
            ) : (
                <Card className="w-full h-[600px] overflow-hidden rounded-lg">
                    <Map events={events} icon={markerIcon} center={mapCenter} />
                </Card>
            )}
        </div>
    );
}
