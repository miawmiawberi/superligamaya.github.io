import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Team, Match } from './types';

function EditTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Team[];
      setTeams(teamsData);
    });
    return () => unsubscribe();
  }, []);

  const handleNameChange = (teamId: string, newName: string) => {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      const updatedTeams = teams.map(t => t.id === teamId ? { ...t, name: newName } : t);
      setTeams(updatedTeams);
    }
  };

  const handleSave = async (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      const teamRef = doc(db, 'teams', teamId);
      await updateDoc(teamRef, { name: team.name });
    }
  };

  return (
    <div>
      <h3>Edit Teams</h3>
      {teams.map(team => (
        <div key={team.id}>
          <input
            type="text"
            value={team.name}
            onChange={(e) => handleNameChange(team.id, e.target.value)}
          />
          <button onClick={() => handleSave(team.id)}>Save</button>
        </div>
      ))}
    </div>
  );
}

function EditMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'matches'), (snapshot) => {
      const matchesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Match[];
      setMatches(matchesData);
    });
    return () => unsubscribe();
  }, []);

  const handleScoreChange = (matchId: string, scoreType: 'homeScore' | 'awayScore', value: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const updatedMatches = matches.map(m => m.id === matchId ? { ...m, [scoreType]: value } : m);
      setMatches(updatedMatches);
    }
  };

  const handleStatusChange = (matchId: string, newStatus: 'upcoming' | 'completed') => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const updatedMatches = matches.map(m => m.id === matchId ? { ...m, status: newStatus } : m);
      setMatches(updatedMatches);
    }
  };

  const handleSave = async (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const matchRef = doc(db, 'matches', matchId);
      await updateDoc(matchRef, {
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
      });
    }
  };

  return (
    <div>
      <h3>Edit Matches</h3>
      {matches.map(match => (
        <div key={match.id}>
          <span>{match.homeTeamId} vs {match.awayTeamId}</span>
          <input
            type="number"
            value={match.homeScore || ''}
            onChange={(e) => handleScoreChange(match.id, 'homeScore', e.target.value)}
          />
          <input
            type="number"
            value={match.awayScore || ''}
            onChange={(e) => handleScoreChange(match.id, 'awayScore', e.target.value)}
          />
          <select value={match.status} onChange={(e) => handleStatusChange(match.id, e.target.value as 'upcoming' | 'completed')}>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => handleSave(match.id)}>Save</button>
        </div>
      ))}
    </div>
  );
}

function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to log in');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div>
        <h2>Admin Panel</h2>
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
        <EditTeams />
        <EditMatches />
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Admin;
