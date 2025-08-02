import type { Event } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Summit',
    description: 'Join us for a day of tech talks, workshops, and networking with industry leaders. A must-attend for all computer science and engineering students.',
    date: addDays(today, 5),
    category: 'Academic',
    location: 'Engineering Building, Auditorium A',
    image: 'https://placehold.co/600x400.png',
    society: 'Computer Science Society',
  },
  {
    id: '2',
    title: 'Startup Pitch Night',
    description: 'Have a startup idea? Pitch it to a panel of venture capitalists and angel investors. Win seed funding and mentorship.',
    date: addDays(today, 12),
    category: 'Workshop',
    location: 'Business School, Room 301',
    image: 'https://placehold.co/600x400.png',
    society: 'Entrepreneurship Club',
  },
  {
    id: '3',
    title: 'Inter-Department Football Tournament',
    description: 'The most awaited sporting event of the year! Cheer for your department or show off your skills on the field. May the best team win!',
    date: addDays(today, 20),
    category: 'Sports',
    location: 'University Sports Complex',
    image: 'https://placehold.co/600x400.png',
    society: 'Athletics Department',
  },
  {
    id: '4',
    title: 'International Film Festival',
    description: 'A week-long celebration of world cinema. Screenings of acclaimed international films, Q&A sessions with directors, and more.',
    date: addDays(today, 30),
    category: 'Cultural',
    location: 'Central Library, Screening Room',
    image: 'https://placehold.co/600x400.png',
    society: 'Film Appreciation Club',
  },
  {
    id: '5',
    title: 'Spring Gala',
    description: 'Our biggest social event of the semester. A night of music, dance, and fine dining. Dress to impress!',
    date: addDays(today, 12),
    category: 'Social',
    location: 'University Grand Ballroom',
    image: 'https://placehold.co/600x400.png',
    society: 'Student Government',
  },
  {
    id: '6',
    title: 'Poetry Slam Night',
    description: 'An open mic night for all the budding poets on campus. Share your work or just come and enjoy the verses.',
    date: addDays(today, 8),
    category: 'Cultural',
    location: 'Student Union, Cafe',
    image: 'https://placehold.co/600x400.png',
    society: 'Literary Society',
  },
  {
    id: '7',
    title: 'AI & Machine Learning Workshop',
    description: 'A hands-on workshop covering the fundamentals of AI and ML. No prior experience required. Laptops are a must.',
    date: addDays(today, 5),
    category: 'Workshop',
    location: 'Science Center, Lab 5',
    image: 'https://placehold.co/600x400.png',
    society: 'AI Club',
  },
  {
    id: '8',
    title: 'History Symposium: Ancient Civilizations',
    description: 'A deep dive into the histories of ancient Rome, Greece, and Egypt with our renowned history professors.',
    date: subDays(today, 15),
    category: 'Academic',
    location: 'Humanities Building, Lecture Hall 2',
    image: 'https://placehold.co/600x400.png',
    society: 'History Association',
  },
    {
    id: '9',
    title: 'Charity Bake Sale',
    description: 'Support a good cause while enjoying delicious homemade treats. All proceeds go to the local animal shelter.',
    date: subDays(today, 3),
    category: 'Social',
    location: 'Main Quad',
    image: 'https://placehold.co/600x400.png',
    society: 'Campus Charity Group',
  },
];

export const getEvents = async (): Promise<Event[]> => {
  // In a real app, you would fetch this from Firebase
  return new Promise(resolve => setTimeout(() => resolve(mockEvents), 500));
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockEvents.find(event => event.id === id)), 200));
};
