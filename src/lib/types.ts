export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'Academic' | 'Social' | 'Sports' | 'Cultural' | 'Workshop';
  location: string;
  image: string;
  society: string;
};
