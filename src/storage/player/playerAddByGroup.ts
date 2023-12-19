import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "../config";

import { AppError } from "../../utils/appError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { fetchPlayerByGroup } from "./fetchPlayerByGroup";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {
    const players = await fetchPlayerByGroup(group);
    const playerExists = players.find(player => player.name.toUpperCase() === newPlayer.name.toUpperCase());

    if (playerExists) {
      throw new AppError("Player already exists");
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPlayer]));

  } catch (error) {
    throw (error)
  }

}
