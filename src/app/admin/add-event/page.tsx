
"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Event } from '@/lib/types';

const categories: Event['category'][] = ['Academic', 'Social', 'Sports', 'Cultural', 'Workshop'];

const addEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date({ required_error: 'Date is required' }),
  category: z.enum(categories, { required_error: 'Category is required' }),
  location: z.string().min(1, 'Location is required'),
  image: z.string().url('Must be a valid URL'),
  society: z.string().min(1, 'Society is required'),
});

type AddEventFormValues = z.infer<typeof addEventSchema>;

export default function AddEventPage() {
  const { toast } = useToast();

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      image: '',
      society: ''
    },
  });

  const onSubmit = (data: AddEventFormValues) => {
    console.log('New Event Data:', data);
    // Here you would typically send the data to your backend/Firebase to save the new event
    toast({
      title: 'Success!',
      description: `Event "${data.title}" has been created successfully.`,
    });
    form.reset();
  };

  return (
    <div className="container py-12 sm:py-16">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add New Event</CardTitle>
          <CardDescription>Fill out the form below to add a new event to the calendar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Annual Tech Summit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the event..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Auditorium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="society"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hosting Society</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science Society" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://example.com/image.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-12 text-base" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adding Event...' : 'Add Event'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
