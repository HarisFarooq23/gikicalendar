
import Image from "next/image";

export default function MapPage() {
    return (
        <div className="container py-8 sm:py-12 flex flex-col items-center">
            <section className="mb-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Campus Event Map
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A guide to the GIK Institute campus.
                </p>
            </section>
            
            <div className="w-full max-w-5xl aspect-video relative shadow-lg rounded-lg overflow-hidden border">
                <Image
                    src="/image.png"
                    alt="Campus Map"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}
