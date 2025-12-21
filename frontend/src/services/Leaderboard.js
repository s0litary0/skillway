import api from "./api";

export default class LeaderboardService {
  static async getLeaderboard() {
    const response = await api.get(`achievements/leaderboards`);
    return response.data[0];
  }

  static async getLeaderboardEntries(leaderboardId, userId) {
    const res = await api.get(
      `achievements/leaderboards/${leaderboardId}/entries/`,
      {
        params: { user__id: userId },
      },
    );
    return res.data;
  }

  static async createLeaderboardEntry(leaderboardId, userId) {
    const response = await api.post(`achievements/entries/`, {
      leaderboard: leaderboardId,
      user: userId,
      score: 0,
      rank: "Unranked",
    });
    return response.data;
  }

  static async getLeaderboardEntryByUserId(userId) {
    const response = await api.get(`achievements/entries`, {
      params: {
        user__id: userId,
      },
    });
    return response.data;
  }

  static async getLeaderboardEntriesByLeaderboardId(leaderboardId) {
    const response = await api.get(`achievements/entries`, {
        params: {
          leaderboard__id: leaderboardId
        },
      });
      return response.data;
  }
}
