
"use client";

import React, { useEffect, useState } from "react";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";

// react-leaflet components are dynamically imported to prevent SSR issues
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// A mapping from location names to coordinates.
// In a real app, this might come from a database or a separate configuration file.
const locationCoordinates: Record<string, [number, number]> = {
    'Engineering Building, Auditorium A': [33.9928, 72.4736],
    'Business School, Room 301': [33.9935, 72.4741],
    'University Sports Complex': [33.9905, 72.4718],
    'Central Library, Screening Room': [33.9911, 72.4755],
    'University Grand Ballroom': [33.9942, 72.4760],
    'Student Union, Cafe': [33.9919, 72.4748],
    'Science Center, Lab 5': [33.9922, 72.4729],
    'Humanities Building, Lecture Hall 2': [33.9908, 72.4765],
    'Main Quad': [33.9925, 72.4750],
};


export default function MapPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [Icon, setIcon] = useState<any>(null);

    useEffect(() => {
        // Dynamically import leaflet on the client side
        import('leaflet').then(L => {
            setIcon(new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }));
        });
        
        const fetchEvents = async () => {
            setLoading(true);
            const allEvents = await getEvents();
            setEvents(allEvents);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const mapCenter: [number, number] = [33.9925, 72.4750]; // Centered on the Main Quad

    if (loading || !Icon) {
        return (
            <div className="container py-8 sm:py-12">
                <Skeleton className="h-[600px] w-full" />
            </div>
        );
    }
    
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
            <Card className="w-full h-[600px] overflow-hidden">
                <MapContainer center={mapCenter} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {events.map(event => {
                        const coords = locationCoordinates[event.location];
                        if (!coords) return null;
                        
                        return (
                            <Marker key={event.id} position={coords} icon={Icon}>
                                <Popup>
                                    <div className="font-bold">{event.title}</div>
                                    <div>{event.location}</div>
                                    <div className="text-xs text-muted-foreground">{event.society}</div>
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </Card>
        </div>
    );
}

// Simple Card component to wrap the map
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className}`}>{children}</div>
}
