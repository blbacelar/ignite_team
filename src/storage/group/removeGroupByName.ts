import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../config";

import { fetchAllGroups } from "./groupFecth";

export async function removeGroupByName(name: string){
  try {
    const storegeGroups = await fetchAllGroups()
    const groups = storegeGroups.filter(group => group !== name)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${name}`)
  } catch (error) {
    throw error;
  }
}
