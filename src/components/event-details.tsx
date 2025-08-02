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
import { format } from "date-fns";

type EventDetailsProps = {
  events: Event[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

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
                {events.map((event) => (
                <div key={event.id} className="space-y-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            data-ai-hint="event image"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <Badge variant="secondary">{event.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">{event.society}</p>
                    </div>
                    
                    <p className="text-sm text-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
                ))}
            </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
