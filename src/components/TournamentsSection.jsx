import React, { useState } from 'react';
import './TournamentsSection.css';
import {
  FaTrophy,
  FaPlus,
  FaTrash,
  FaPlay,
  FaRedo,
  FaFutbol,
  FaListOl,
  FaSitemap,
  FaUsers
} from 'react-icons/fa';

function TournamentsSection({ lang, t }) {
  // Config state
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState('');
  const [format, setFormat] = useState('bracket'); // 'bracket' or 'league'
  const [isStarted, setIsStarted] = useState(false);

  // Bracket state
  const [bracketRounds, setBracketRounds] = useState([]);
  const [winner, setWinner] = useState(null);

  // League state
  const [leagueRounds, setLeagueRounds] = useState([]);
  const [leagueStandings, setLeagueStandings] = useState([]);

  // Default presets
  const presets = {
    champions: ['Real Madrid', 'Man City', 'Bayern Munich', 'PSG', 'Barcelona', 'Arsenal', 'Liverpool', 'Inter Milan'],
    fut: ['FUT FC', 'Ultimate XI', 'Tikitaka FC', 'Galácticos', 'Samba Stars', 'Joga Bonito', 'Catenaccio XI', 'Samba Kings']
  };

  const loadPreset = (presetKey) => {
    setTeams(presets[presetKey]);
  };

  const addTeam = (e) => {
    e.preventDefault();
    const cleanName = newTeam.trim();
    if (!cleanName) return;
    if (teams.includes(cleanName)) return;
    if (teams.length >= 8) {
      alert(lang === 'es' ? 'El número máximo de equipos es 8.' : 'Maximum number of teams is 8.');
      return;
    }
    setTeams([...teams, cleanName]);
    setNewTeam('');
  };

  const removeTeam = (indexToRemove) => {
    setTeams(teams.filter((_, idx) => idx !== indexToRemove));
  };

  const handleStart = () => {
    if (teams.length < 4) {
      alert(lang === 'es' ? 'Necesitas al menos 4 equipos para iniciar.' : 'You need at least 4 teams to start.');
      return;
    }

    setIsStarted(true);

    if (format === 'bracket') {
      // Pad to nearest power of 2 (4 or 8)
      let paddedTeams = [...teams];
      const targetSize = paddedTeams.length <= 4 ? 4 : 8;
      while (paddedTeams.length < targetSize) {
        const index = paddedTeams.length + 1;
        paddedTeams.push(lang === 'es' ? `Rival CPU ${index}` : `CPU Rival ${index}`);
      }

      // Initialize rounds
      // 4 teams -> Semis (2 matches), Final (1 match)
      // 8 teams -> Quarters (4 matches), Semis (2 matches), Final (1 match)
      const rounds = [];
      const numRounds = Math.log2(targetSize);

      let currentRoundTeams = [...paddedTeams];
      // Shuffle teams for excitement
      currentRoundTeams.sort(() => Math.random() - 0.5);

      for (let r = 0; r < numRounds; r++) {
        const matchesInRound = targetSize / Math.pow(2, r + 1);
        const matches = [];
        for (let m = 0; m < matchesInRound; m++) {
          if (r === 0) {
            matches.push({
              id: m,
              team1: currentRoundTeams[m * 2],
              team2: currentRoundTeams[m * 2 + 1],
              score1: '',
              score2: '',
              winner: null,
              played: false
            });
          } else {
            matches.push({
              id: m,
              team1: '',
              team2: '',
              score1: '',
              score2: '',
              winner: null,
              played: false
            });
          }
        }
        rounds.push({
          name: getRoundName(r, numRounds),
          matches
        });
      }

      setBracketRounds(rounds);
      setWinner(null);
    } else {
      // Round Robin League
      let paddedTeams = [...teams];
      if (paddedTeams.length % 2 !== 0) {
        paddedTeams.push('BYE');
      }

      const numTeams = paddedTeams.length;
      const totalRounds = numTeams - 1;
      const list = [...paddedTeams];
      const generatedRounds = [];

      for (let r = 0; r < totalRounds; r++) {
        const roundFixtures = [];
        for (let i = 0; i < numTeams / 2; i++) {
          const home = list[i];
          const away = list[numTeams - 1 - i];
          if (home !== 'BYE' && away !== 'BYE') {
            roundFixtures.push({
              id: `${r}-${i}`,
              home,
              away,
              homeScore: '',
              awayScore: '',
              played: false
            });
          }
        }
        generatedRounds.push({
          roundNum: r + 1,
          fixtures: roundFixtures
        });
        // Rotate Berger
        list.splice(1, 0, list.pop());
      }

      setLeagueRounds(generatedRounds);
      calculateStandings(teams, generatedRounds);
    }
  };

  const getRoundName = (roundIdx, totalRounds) => {
    if (totalRounds === 2) {
      // 4 teams: Semis (0), Final (1)
      if (roundIdx === 0) return lang === 'es' ? 'Semifinales' : 'Semifinals';
      return lang === 'es' ? 'Gran Final' : 'Grand Final';
    } else {
      // 8 teams: Quarters (0), Semis (1), Final (2)
      if (roundIdx === 0) return lang === 'es' ? 'Cuartos de Final' : 'Quarterfinals';
      if (roundIdx === 1) return lang === 'es' ? 'Semifinales' : 'Semifinals';
      return lang === 'es' ? 'Gran Final' : 'Grand Final';
    }
  };

  const handleBracketScoreChange = (roundIdx, matchId, teamIndex, value) => {
    const updated = [...bracketRounds];
    const match = updated[roundIdx].matches[matchId];
    
    // Ensure numeric input or empty
    if (value !== '' && isNaN(value)) return;
    
    if (teamIndex === 1) {
      match.score1 = value;
    } else {
      match.score2 = value;
    }
    setBracketRounds(updated);
  };

  const advanceBracketTeam = (roundIdx, matchId) => {
    const updated = [...bracketRounds];
    const match = updated[roundIdx].matches[matchId];

    const s1 = parseInt(match.score1);
    const s2 = parseInt(match.score2);

    if (isNaN(s1) || isNaN(s2)) {
      alert(lang === 'es' ? 'Por favor introduce marcadores válidos.' : 'Please enter valid scores.');
      return;
    }

    if (s1 === s2) {
      alert(lang === 'es' ? 'Las eliminatorias no pueden terminar en empate.' : 'Elimination matches cannot end in a draw.');
      return;
    }

    const matchWinner = s1 > s2 ? match.team1 : match.team2;
    match.winner = matchWinner;
    match.played = true;

    // Check if it's final
    if (roundIdx === bracketRounds.length - 1) {
      setWinner(matchWinner);
    } else {
      // Advance to next round
      const nextRoundIdx = roundIdx + 1;
      const nextMatchId = Math.floor(matchId / 2);
      const isTeam1 = matchId % 2 === 0;

      if (isTeam1) {
        updated[nextRoundIdx].matches[nextMatchId].team1 = matchWinner;
      } else {
        updated[nextRoundIdx].matches[nextMatchId].team2 = matchWinner;
      }
    }

    setBracketRounds(updated);
  };

  const handleLeagueScoreChange = (roundIdx, fixtureId, isHome, value) => {
    if (value !== '' && isNaN(value)) return;

    const updated = [...leagueRounds];
    const fixture = updated[roundIdx].fixtures.find(f => f.id === fixtureId);
    
    if (isHome) {
      fixture.homeScore = value;
    } else {
      fixture.awayScore = value;
    }

    // Mark as played if both scores are filled
    if (fixture.homeScore !== '' && fixture.awayScore !== '') {
      fixture.played = true;
    } else {
      fixture.played = false;
    }

    setLeagueRounds(updated);
    calculateStandings(teams, updated);
  };

  const calculateStandings = (allTeams, rounds) => {
    // Initialize stats
    const stats = {};
    allTeams.forEach(team => {
      stats[team] = {
        name: team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        gc: 0,
        gd: 0,
        pts: 0
      };
    });

    // Populate stats from played fixtures
    rounds.forEach(r => {
      r.fixtures.forEach(f => {
        if (f.played) {
          const hs = parseInt(f.homeScore);
          const as = parseInt(f.awayScore);
          const home = f.home;
          const away = f.away;

          // Double check teams exist in custom stats (in case of BYE)
          if (stats[home] && stats[away]) {
            stats[home].played += 1;
            stats[away].played += 1;
            stats[home].gf += hs;
            stats[home].gc += as;
            stats[away].gf += as;
            stats[away].gc += hs;

            if (hs > as) {
              stats[home].won += 1;
              stats[home].pts += 3;
              stats[away].lost += 1;
            } else if (hs < as) {
              stats[away].won += 1;
              stats[away].pts += 3;
              stats[home].lost += 1;
            } else {
              stats[home].drawn += 1;
              stats[home].pts += 1;
              stats[away].drawn += 1;
              stats[away].pts += 1;
            }
          }
        }
      });
    });

    // Final calculations and sorting
    const standingsList = Object.values(stats).map(s => {
      s.gd = s.gf - s.gc;
      return s;
    });

    // Sort: Points (desc) -> Goal Diff (desc) -> Goals For (desc)
    standingsList.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });

    setLeagueStandings(standingsList);
  };

  const handleReset = () => {
    setIsStarted(false);
    setBracketRounds([]);
    setLeagueRounds([]);
    setWinner(null);
  };

  return (
    <div className="tournaments-section">
      <div className="section-header">
        <span className="beta-badge">BETA</span>
        <p className="section-subtitle">
          {lang === 'es' 
            ? 'Crea ligas y eliminatorias en tiempo real. Configura equipos, simula resultados y calcula clasificaciones dinámicas.' 
            : 'Create real-time leagues and brackets. Setup teams, simulate results, and calculate dynamic standings.'}
        </p>
      </div>

      {!isStarted ? (
        <div className="setup-container">
          <div className="setup-card">
            <h3>{lang === 'es' ? '1. Configurar Equipos' : '1. Configure Teams'}</h3>
            
            <form onSubmit={addTeam} className="team-form">
              <input
                type="text"
                placeholder={lang === 'es' ? 'Nombre del equipo...' : 'Team name...'}
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                maxLength={25}
              />
              <button type="submit" className="add-btn" aria-label="Add team">
                <FaPlus />
              </button>
            </form>

            {/* Quick Presets */}
            <div className="presets-wrapper">
              <span className="presets-title"><FaUsers /> {lang === 'es' ? 'Cargar Ajustes Rápidos:' : 'Quick Presets:'}</span>
              <div className="presets-btns">
                <button onClick={() => loadPreset('champions')}>Champions League</button>
                <button onClick={() => loadPreset('fut')}>FUT Rivals</button>
              </div>
            </div>

            {/* Team chips */}
            <div className="team-chips-container">
              {teams.length === 0 ? (
                <p className="no-teams-msg">
                  {lang === 'es' ? 'Agrega entre 4 y 8 equipos para empezar.' : 'Add between 4 and 8 teams to start.'}
                </p>
              ) : (
                <div className="chips-grid">
                  {teams.map((team, idx) => (
                    <div key={idx} className="team-chip">
                      <span>{team}</span>
                      <button onClick={() => removeTeam(idx)} className="delete-chip-btn">
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="setup-card flex-between">
            <div>
              <h3>{lang === 'es' ? '2. Formato del Torneo' : '2. Tournament Format'}</h3>
              <div className="format-selectors">
                <button
                  className={`format-btn ${format === 'bracket' ? 'active' : ''}`}
                  onClick={() => setFormat('bracket')}
                >
                  <FaSitemap size={20} />
                  <span>{lang === 'es' ? 'Eliminatoria Directa' : 'Single Elimination'}</span>
                </button>
                <button
                  className={`format-btn ${format === 'league' ? 'active' : ''}`}
                  onClick={() => setFormat('league')}
                >
                  <FaListOl size={20} />
                  <span>{lang === 'es' ? 'Liga / Todos contra Todos' : 'League / Round Robin'}</span>
                </button>
              </div>
            </div>

            <button 
              className={`start-tournament-btn ${teams.length < 4 ? 'disabled' : ''}`}
              onClick={handleStart}
              disabled={teams.length < 4}
            >
              <FaPlay />
              <span>{lang === 'es' ? 'Comenzar Torneo' : 'Start Tournament'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Tournament Active Mode */
        <div className="active-tournament-container">
          <div className="active-header">
            <h3>
              <FaFutbol className="spinning-ball" /> 
              {format === 'bracket' 
                ? (lang === 'es' ? 'Fase de Eliminatorias' : 'Elimination Bracket') 
                : (lang === 'es' ? 'Liga Regular' : 'Regular League')}
            </h3>
            <button className="reset-btn" onClick={handleReset}>
              <FaRedo />
              <span>{lang === 'es' ? 'Reiniciar' : 'Restart'}</span>
            </button>
          </div>

          {format === 'bracket' ? (
            /* Bracket View */
            <div className="bracket-wrapper">
              {winner && (
                <div className="winner-declaration fade-in">
                  <FaTrophy className="gold-trophy" />
                  <h2>🏆 ¡Campeón: {winner}! 🏆</h2>
                  <p>{lang === 'es' ? '¡Felicitaciones al ganador del torneo!' : 'Congratulations to the tournament winner!'}</p>
                </div>
              )}

              <div className="bracket-rounds">
                {bracketRounds.map((round, rIdx) => (
                  <div key={rIdx} className="bracket-round-column">
                    <h4>{round.name}</h4>
                    <div className="matches-list">
                      {round.matches.map((match, mIdx) => {
                        const hasWinner = match.winner !== null;
                        return (
                          <div key={mIdx} className={`bracket-match-box ${hasWinner ? 'match-completed' : ''}`}>
                            {/* Team 1 row */}
                            <div className={`match-team-row ${match.winner === match.team1 ? 'winner-row' : ''}`}>
                              <span className="team-name">{match.team1 || '???'}</span>
                              <input
                                type="text"
                                className="score-input"
                                value={match.score1}
                                onChange={(e) => handleBracketScoreChange(rIdx, match.id, 1, e.target.value)}
                                disabled={hasWinner || !match.team1 || !match.team2}
                                placeholder="0"
                              />
                            </div>
                            
                            {/* Team 2 row */}
                            <div className={`match-team-row ${match.winner === match.team2 ? 'winner-row' : ''}`}>
                              <span className="team-name">{match.team2 || '???'}</span>
                              <input
                                type="text"
                                className="score-input"
                                value={match.score2}
                                onChange={(e) => handleBracketScoreChange(rIdx, match.id, 2, e.target.value)}
                                disabled={hasWinner || !match.team1 || !match.team2}
                                placeholder="0"
                              />
                            </div>

                            {/* Advance button */}
                            {!hasWinner && match.team1 && match.team2 && (
                              <button 
                                className="advance-btn"
                                onClick={() => advanceBracketTeam(rIdx, match.id)}
                              >
                                {lang === 'es' ? 'Avanzar' : 'Advance'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* League View */
            <div className="league-wrapper">
              
              {/* Standings Table */}
              <div className="league-card table-card">
                <h4>{lang === 'es' ? 'Tabla de Clasificación' : 'Standings Leaderboard'}</h4>
                <div className="table-responsive">
                  <table className="standings-table">
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th className="align-left">{lang === 'es' ? 'Equipo' : 'Team'}</th>
                        <th>PJ</th>
                        <th>PG</th>
                        <th>PE</th>
                        <th>PP</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>DG</th>
                        <th className="pts-th">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leagueStandings.map((stat, idx) => (
                        <tr key={idx} className={idx === 0 ? 'top-leader-row' : ''}>
                          <td>
                            {idx === 0 ? <FaTrophy className="gold-medal" /> : idx + 1}
                          </td>
                          <td className="align-left team-cell">{stat.name}</td>
                          <td>{stat.played}</td>
                          <td>{stat.won}</td>
                          <td>{stat.drawn}</td>
                          <td>{stat.lost}</td>
                          <td>{stat.gf}</td>
                          <td>{stat.gc}</td>
                          <td className={stat.gd >= 0 ? 'pos-gd' : 'neg-gd'}>
                            {stat.gd > 0 ? `+${stat.gd}` : stat.gd}
                          </td>
                          <td className="pts-cell">{stat.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fixtures List */}
              <div className="league-card fixtures-card">
                <h4>{lang === 'es' ? 'Partidos por Jornada' : 'Fixtures by Round'}</h4>
                <div className="fixtures-scroll">
                  {leagueRounds.map((round, rIdx) => (
                    <div key={rIdx} className="fixture-round">
                      <h5>{lang === 'es' ? `Jornada ${round.roundNum}` : `Round ${round.roundNum}`}</h5>
                      <div className="fixtures-list">
                        {round.fixtures.map((fixture) => (
                          <div key={fixture.id} className="fixture-row">
                            <span className="fixture-team home">{fixture.home}</span>
                            
                            <input
                              type="text"
                              className="score-input"
                              value={fixture.homeScore}
                              onChange={(e) => handleLeagueScoreChange(rIdx, fixture.id, true, e.target.value)}
                              placeholder="-"
                            />
                            
                            <span className="score-divider">x</span>
                            
                            <input
                              type="text"
                              className="score-input"
                              value={fixture.awayScore}
                              onChange={(e) => handleLeagueScoreChange(rIdx, fixture.id, false, e.target.value)}
                              placeholder="-"
                            />
                            
                            <span className="fixture-team away">{fixture.away}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TournamentsSection;
