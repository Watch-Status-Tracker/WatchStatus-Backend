import { User } from '@prisma/client';

export const seedUsers: Omit<User, 'id'>[] = [
  {
    username: 'lajt',
    email: 'lajt@lajt',
    password: 'lajt',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'kira',
    email: 'kira@kira',
    password: 'kira',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'numer',
    email: 'numer@numer',
    password: 'numer',
    title: 'Movie watcher',
    favouriteGenre: '',
  },
  {
    username: 'tester',
    email: 'tester@tester',
    password: 'tester',
    title: 'tester',
    favouriteGenre: '',
  },
];
