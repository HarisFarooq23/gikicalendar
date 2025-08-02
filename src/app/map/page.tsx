
import Image from "next/image";

export default function MapPage() {
    return (
        <div className="container py-8 sm:py-12">
            <section className="mb-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Campus Event Map
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Find events happening across the university with our campus map.
                </p>
            </section>
            
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border">
                <Image
                    src="https://placehold.co/1200x900.png"
                    alt="Campus Map"
                    fill
                    className="object-contain"
                    data-ai-hint="university campus map"
                />
            </div>
        </div>
    );
}
