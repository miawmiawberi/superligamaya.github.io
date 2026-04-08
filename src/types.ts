// src/types.ts
export interface Team {
  id: string;
  name: string;
  logoColor: string; // Used for generating placeholder SVG
  points: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string; // ISO string
  status: 'upcoming' | 'completed';
}
