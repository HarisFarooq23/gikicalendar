
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function MapPage() {
    return (
        <div className="container py-8 sm:py-12">
            <section className="mb-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Campus Event Map
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A guide to the GIK Institute campus.
                </p>
            </section>
            
            <Card className="w-full aspect-[4/3] overflow-hidden shadow-lg border">
                 <div className="relative w-full h-full">
                    <Image
                        src="/gik-map.jpg"
                        alt="Campus Map"
                        fill
                        className="object-contain"
                    />
                </div>
            </Card>
        </div>
    );
}
