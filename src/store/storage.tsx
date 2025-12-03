import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncData = async (keyName: string, dataArray: any) => {
  await AsyncStorage.setItem(keyName, JSON.stringify(dataArray));
};

export const getAsyncData = async (keyName: string) => {
  const data = await AsyncStorage.getItem(keyName);
  if (data === null) return null;
  return JSON.parse(data);
};

export const removeAsyncData = async (keyName: string) => {
  await AsyncStorage.removeItem(keyName);
};

export const clearAsyncData = async () => {
  await AsyncStorage.clear();
};

export const mmkvStorage = {
  setItem: async (key: string, value: string): Promise<void> => {
    return setAsyncData(key, value);
  },
  getItem: async (key: string): Promise<string | null> => {
    return getAsyncData(key);
  },
  removeItem: async (key: string): Promise<void> => {
    return removeAsyncData(key);
  },
};
