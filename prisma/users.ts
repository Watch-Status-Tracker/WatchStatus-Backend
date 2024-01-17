import { User } from '@prisma/client';

export const seedUsers: Omit<User, 'id'>[] = [
  {
    username: 'lajt',
    email: 'lajt@lajt',
    password: 'lajt',
  },
  {
    username: 'kira',
    email: 'kira@kira',
    password: 'kira',
  },
  {
    username: 'numer',
    email: 'numer@numer',
    password: 'numer',
  },
];
