
"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { EventDetails } from "@/components/event-details";
import { isSameDay } from "date-fns";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";


export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = React.useState<Event[]>([]);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  
  React.useEffect(() => {
    // Set initial date only on the client to avoid hydration mismatch
    setDate(new Date());

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
          Welcome to GikiCalendar
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover what's happening at the university. Your hub for all club and society events.
        </p>
      </section>

      <div className="flex justify-center">
        <Card className="w-full max-w-4xl p-4 sm:p-6 shadow-lg border-border bg-background/50 backdrop-blur-sm">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="p-0"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-between",
              head_cell:"text-muted-foreground rounded-md w-full font-normal text-base",
              row: "flex w-full mt-2 justify-between",
              cell: "h-16 w-full text-center text-lg p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-16 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent/20 rounded-md",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
              day_today: "bg-accent/50 text-accent-foreground",
              day_disabled: "text-muted-foreground opacity-50",
            }}
            modifiers={{
              hasEvent: eventDates,
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: 'bold',
              }
            }}
            components={{
              DayContent: ({ date }) => {
                const hasEvent = eventDates.some(eventDate => isSameDay(date, eventDate));
                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <span>{format(date, "d")}</span>
                    {hasEvent && <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-accent" />}
                  </div>
                );
              },
            }}
            disabled={!date}
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
