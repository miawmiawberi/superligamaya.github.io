import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Team, Match } from './types';

function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const unsubscribeTeams = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Team[];
      setTeams(teamsData);
    });

    const unsubscribeMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
      const matchesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Match[];
      setMatches(matchesData);
    });

    return () => {
      unsubscribeTeams();
      unsubscribeMatches();
    };
  }, []);

  const completedMatches = matches.filter(m => m.status === 'completed');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');

  return (
    <main className="container">
      <div className="col">
        <h2>Klasemen Liga</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Tim</th>
                <th>M</th>
                <th>S</th>
                <th>K</th>
                <th>GM</th>
                <th>GK</th>
                <th>SG</th>
                <th>Poin</th>
              </tr>
            </thead>
            <tbody>
              {teams
                .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference)
                .map((team, index) => (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td className="team-name">
                      <div
                        className="team-logo"
                        style={{ backgroundColor: team.logoColor }}
                      ></div>
                      {team.name}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{team.goalDifference}</td>
                    <td className="points">{team.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col">
        <h2>Hasil Terkini</h2>
        <div className="matches-container">
          {completedMatches.map(match => {
            const homeTeam = teams.find(t => t.id === match.homeTeamId);
            const awayTeam = teams.find(t => t.id === match.awayTeamId);
            return (
              <div key={match.id} className="match">
                <span className="team">{homeTeam?.name}</span>
                <span className="score">{match.homeScore} - {match.awayScore}</span>
                <span className="team">{awayTeam?.name}</span>
              </div>
            );
          })}
        </div>

        <h2>Jadwal Mendatang</h2>
        <div className="matches-container">
          {upcomingMatches.map(match => {
            const homeTeam = teams.find(t => t.id === match.homeTeamId);
            const awayTeam = teams.find(t => t.id === match.awayTeamId);
            return (
              <div key={match.id} className="match">
                <span className="team">{homeTeam?.name}</span>
                <span className="vs">vs</span>
                <span className="team">{awayTeam?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Home;
