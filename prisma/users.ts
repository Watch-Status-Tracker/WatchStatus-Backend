import { User } from '@prisma/client';

export const seedUsers: Omit<User, 'id'>[] = [
  {
    userName: 'lajt',
    email: 'lajt@lajt',
    password: 'lajt',
  },
  {
    userName: 'kira',
    email: 'kira@kira',
    password: 'kira',
  },
  {
    userName: 'numer',
    email: 'numer@numer',
    password: 'numer',
  },
];
