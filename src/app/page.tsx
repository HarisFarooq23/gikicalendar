"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { EventDetails } from "@/components/event-details";
import { isSameDay } from "date-fns";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = React.useState<Event[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = React.useState<Event[]>([]);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  
  React.useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    };
    fetchEvents();
  }, []);

  const eventDates = React.useMemo(() => events.map(e => e.date), [events]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    const eventsOnDate = events.filter(event => isSameDay(event.date, selectedDate));
    if (eventsOnDate.length > 0) {
      setSelectedDateEvents(eventsOnDate);
      setIsSheetOpen(true);
    } else {
      setSelectedDateEvents([]);
      setIsSheetOpen(false);
    }
  };

  return (
    <div className="container py-8 sm:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Campus Events Calendar
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover what's happening at the university. Your hub for all club and society events.
        </p>
      </section>

      <div className="flex justify-center">
        <Card className="w-full max-w-4xl p-4 sm:p-6 shadow-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="p-0"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
              day_today: "bg-accent/20 text-accent-foreground",
            }}
            modifiers={{
              hasEvent: eventDates,
            }}
            modifiersStyles={{
              hasEvent: {
                position: 'relative',
                fontWeight: 'bold',
                color: 'hsl(var(--accent))',
              }
            }}
            components={{
              DayContent: ({ date, ...props }) => {
                const hasEvent = eventDates.some(eventDate => isSameDay(date, eventDate));
                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <span>{props.children}</span>
                    {hasEvent && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
                  </div>
                );
              },
            }}
          />
        </Card>
      </div>

      <EventDetails
        events={selectedDateEvents}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

// Add Card component locally to avoid circular dependencies if it's moved later
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
