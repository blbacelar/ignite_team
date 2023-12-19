import { fetchPlayerByGroup } from "./fetchPlayerByGroup";

export async function fetchPlayerByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await fetchPlayerByGroup(group);
    const players = storage.filter((player) => player.team === team);

    return players
  } catch (error) {
    throw error
  }
}
