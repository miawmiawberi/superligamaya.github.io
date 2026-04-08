// src/data/seed.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { mockTeams, mockMatches } from './mockData';

export const seedDatabase = async () => {
  const teamsCollection = collection(db, 'teams');
  mockTeams.forEach(async (team) => {
    await addDoc(teamsCollection, team);
  });

  const matchesCollection = collection(db, 'matches');
  mockMatches.forEach(async (match) => {
    await addDoc(matchesCollection, match);
  });

  console.log('Database seeded!');
};
