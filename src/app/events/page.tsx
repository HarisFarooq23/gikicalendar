"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";
import { EventCard } from "@/components/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories: Event['category'][] = ['Academic', 'Social', 'Sports', 'Cultural', 'Workshop'];

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('upcoming');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const events = await getEvents();
      // Sort events by date descending by default
      const sortedEvents = events.sort((a, b) => b.date.getTime() - a.date.getTime());
      setAllEvents(sortedEvents);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return allEvents
      .filter(event => {
        if (timeFilter === 'upcoming') return event.date >= now;
        if (timeFilter === 'past') return event.date < now;
        return true;
      })
      .filter(event => {
        if (categoryFilter === 'all') return true;
        return event.category === categoryFilter;
      });
  }, [allEvents, timeFilter, categoryFilter]);

  return (
    <div className="container py-8 sm:py-12">
      <section className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          All Events
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Browse through all upcoming and past events hosted by our vibrant student societies.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Tabs value={timeFilter} onValueChange={setTimeFilter} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
            <h2 className="text-xl font-medium text-muted-foreground">No events found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
