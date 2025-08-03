
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/lib/types";
import { format, formatISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ImageFallback } from "./image-fallback";
import { Button } from "./ui/button";
import { CalendarPlus } from "lucide-react";

type EventDetailsProps = {
  events: Event[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const categoryStyles: Record<Event['category'], string> = {
    Academic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Sports: "bg-green-500/10 text-green-500 border-green-500/20",
    Cultural: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Workshop: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

const createGoogleCalendarUrl = (event: Event) => {
    const formatGoogleDate = (date: Date) => {
        return formatISO(date, { format: 'basic' }).replace(/[-:]/g, '');
    }

    // Assuming events are 1 hour long for the end time
    const startDate = formatGoogleDate(event.date);
    const endDate = formatGoogleDate(new Date(event.date.getTime() + 60 * 60 * 1000));

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${startDate}/${endDate}`,
        details: event.description,
        location: event.location,
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
}


export function EventDetails({ events, isOpen, onOpenChange }: EventDetailsProps) {
  if (!events.length) return null;

  const date = events[0].date;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-bold">
            Events for {format(date, "MMMM do, yyyy")}
          </SheetTitle>
          <SheetDescription>
            {events.length} {events.length > 1 ? "events" : "event"} scheduled for this day.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow">
            <div className="px-6 pb-6 space-y-6">
                {events.map((event) => {
                  const isPlaceholder = typeof event.image === 'string' && event.image.includes('placehold.co');
                  const imageUrl = event.image instanceof File ? URL.createObjectURL(event.image) : event.image;
                  const googleCalendarUrl = createGoogleCalendarUrl(event);
                  return (
                    <div key={event.id} className="space-y-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                           {isPlaceholder ? (
                             <ImageFallback text={event.title} />
                           ) : (
                             <Image
                                src={imageUrl}
                                alt={event.title}
                                fill
                                className="object-cover"
                                data-ai-hint="event image"
                             />
                           )}
                        </div>
                        <div>
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-semibold flex-grow">{event.title}</h3>
                                <Badge variant="outline" className={cn("shrink-0", categoryStyles[event.category])}>
                                  {event.category}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{event.society}</p>
                        </div>
                        
                        <p className="text-sm text-foreground">{event.description}</p>
                        
                        <div className="space-y-3">
                            <p className="text-xs text-muted-foreground">{event.location}</p>
                             <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                                  <CalendarPlus className="mr-2 h-4 w-4" />
                                  Add to Google Calendar
                                </a>
                              </Button>
                        </div>
                    </div>
                  )
                })}
            </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
