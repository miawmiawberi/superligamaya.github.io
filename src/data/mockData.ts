// src/data/mockData.ts
import { Team, Match } from '../types'; // Assuming types.ts will be created later

export const mockTeams: Team[] = [
  { id: 'team1', name: 'Naga', logoColor: '#FF5252', points: 0, wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
  { id: 'team2', name: 'Phoenix', logoColor: '#FFD740', points: 0, wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
  { id: 'team3', name: 'Griffin', logoColor: '#40C4FF', points: 0, wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
  { id: 'team4', name: 'Unikorn', logoColor: '#9C27B0', points: 0, wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
];

export const mockMatches: Match[] = [
  { id: 'match1', homeTeamId: 'team1', awayTeamId: 'team2', homeScore: null, awayScore: null, date: '2026-05-01T19:00:00Z', status: 'upcoming' },
  { id: 'match2', homeTeamId: 'team3', awayTeamId: 'team4', homeScore: null, awayScore: null, date: '2026-05-01T21:00:00Z', status: 'upcoming' },
  { id: 'match3', homeTeamId: 'team2', awayTeamId: 'team3', homeScore: null, awayScore: null, date: '2026-05-08T19:00:00Z', status: 'upcoming' },
  { id: 'match4', homeTeamId: 'team4', awayTeamId: 'team1', homeScore: null, awayScore: null, date: '2026-05-08T21:00:00Z', status: 'upcoming' },
];
