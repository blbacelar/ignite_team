import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/appError";
import { GROUP_COLLECTION } from "../config";
import { fetchAllGroups } from "./groupFecth";

export async function groupCreate(newGroup: string) {
  try {
    const groups = await fetchAllGroups();
    const groupExist = groups.find(g => g.toUpperCase() === newGroup.toUpperCase());

    if (groupExist) {
      throw new AppError("Group already exists");
    }

    const storage = JSON.stringify([...groups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION,storage );
  } catch (error) {
    throw error
  }
}
