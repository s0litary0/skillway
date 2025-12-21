import { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import "./Leaderboard.css";
import LeaderboardService from "../../../services/Leaderboard";
import AuthService from "../../../services/AuthService";
import { useAuth } from "../../../hooks";
import Block from "../../UI/Block/Block"


export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        if (!user) return;
        const leaderboardData = await LeaderboardService.getLeaderboard();
        setLeaderboard(leaderboardData);

        const entryData = await LeaderboardService.getLeaderboardEntries(
          leaderboardData.id,
          user.id,
        );
        console.log(entryData);

        const entries =
          await LeaderboardService.getLeaderboardEntriesByLeaderboardId(
            leaderboardData.id,
          );
          
            const enrichedEntries = await Promise.all(
              entries.map(async (entry) => {
                const userData = await AuthService.getUser(entry.user)
                return {
                  ...entry,
                  user: userData,
                }
              })
            )
            
            setEntries(enrichedEntries)
      } catch (err) {
        console.error(err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [user]);

  if (loading || !leaderboard) return <Spinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <Block className="leaderboard-page">
      <h1>Leaderboard: {leaderboard.type}</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Username</th>
            <th>Courses Completed</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id || entry.user_id}>
              <td className="place">{index + 1}</td>
              <td>{entry.user.user.username}</td>
              <td className="score">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Block>
  );
}
