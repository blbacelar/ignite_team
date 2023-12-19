import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../config";
import { fetchPlayerByGroup } from "./fetchPlayerByGroup";

export async function removePlayerByGroup(playerName: string, group: string){
  try {
    const players = await fetchPlayerByGroup(group);
    const filteredPlayers = players.filter(p => p.name !== playerName)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filteredPlayers));
  } catch (error) {
    throw error
  }
}
