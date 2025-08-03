
import type { Society } from '@/lib/types';

export const mockSocieties: Society[] = [
  {
    id: '1',
    name: 'Computer Science Society',
    description: 'Fostering a community of tech enthusiasts, coders, and innovators. We host workshops, hackathons, and talks by industry leaders.',
  },
  {
    id: '2',
    name: 'Entrepreneurship Club',
    description: 'The hub for aspiring entrepreneurs. We provide resources, mentorship, and networking opportunities to turn your ideas into reality.',
  },
  {
    id: '3',
    name: 'Athletics Department',
    description: 'Promoting sports and physical well-being on campus. We organize tournaments, training camps, and fitness challenges.',
  },
  {
    id: '4',
    name: 'Film Appreciation Club',
    description: 'A community for cinephiles. We screen and discuss films from around the world, from timeless classics to modern masterpieces.',
  },
  {
    id: '5',
    name: 'Student Government',
    description: 'The official voice of the student body. We work to enhance student life, address concerns, and organize major campus-wide events.',
  },
  {
    id: '6',
    name: 'Literary Society',
    description: 'Celebrating the written and spoken word. We organize poetry slams, book clubs, creative writing workshops, and author talks.',
  },
  {
    id: '7',
    name: 'AI Club',
    description: 'Exploring the frontiers of Artificial Intelligence and Machine Learning. Join us for hands-on workshops, projects, and discussions.',
  },
  {
    id: '8',
    name: 'History Association',
    description: 'Delving into the past to understand our present. We host lectures, historical site visits, and symposiums on various eras.',
  },
  {
    id: '9',
    name: 'Campus Charity Group',
    description: 'Making a difference in our community. We organize fundraising events, volunteer drives, and awareness campaigns for social causes.',
  },
];

export const getSocieties = async (): Promise<Society[]> => {
  // In a real app, you would fetch this from a database
  return new Promise(resolve => setTimeout(() => resolve(mockSocieties), 200));
};
