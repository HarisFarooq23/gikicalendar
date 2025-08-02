
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, MapPin, Award } from "lucide-react";
import type { Event } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ImageFallback } from "./image-fallback";

type EventCardProps = {
  event: Event;
};

const categoryStyles: Record<Event['category'], string> = {
    Academic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Sports: "bg-green-500/10 text-green-500 border-green-500/20",
    Cultural: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Workshop: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};


export function EventCard({ event }: EventCardProps) {
  const isPlaceholder = event.image.includes('placehold.co');

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
           {isPlaceholder ? (
             <ImageFallback text={event.title} />
           ) : (
             <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint="event photo"
             />
           )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-bold leading-tight mb-1">{event.title}</CardTitle>
            <Badge variant="outline" className={cn("shrink-0", categoryStyles[event.category])}>{event.category}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Award className="h-4 w-4 mr-2" />
            <span>{event.society}</span>
        </div>
        <p className="text-sm text-foreground flex-grow">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t flex flex-col items-start gap-2">
         <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(event.date, "MMMM do, yyyy 'at' h:mm a")}</span>
         </div>
         <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
         </div>
      </CardFooter>
    </Card>
  );
}
