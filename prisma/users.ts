import { User } from '@prisma/client';

export const seedUsers: Omit<User, 'id'>[] = [
  {
    username: 'lajt',
    email: 'lajt@lajt',
    password: '$2b$10$9a/IwlQdULX4W1Yy8st.bOseqwIvM5myCN89O5YNVyG1HVAlP3K/G',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'kira',
    email: 'kira@kira',
    password: '$2b$10$9a/IwlQdULX4W1Yy8st.bOjZ/VKpU9DW/74IpoOEzz/jFy6kpF.8a',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'numer',
    email: 'numer@numer',
    password: '$2b$10$9a/IwlQdULX4W1Yy8st.bOpivymf1AvD/ryJpRpjegbWyi0Q1crji',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'tester',
    email: 'tester@tester',
    password: '$2b$10$9a/IwlQdULX4W1Yy8st.bOuG3Dm4.7j76gpkDlgrd6ACxFqkvmddq',
    title: 'tester',
    favouriteGenre: '',
  },
];
