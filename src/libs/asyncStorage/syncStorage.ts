import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_ASYNC_KEY = '@ignitefleet:last_async';

export async function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime();
  await AsyncStorage.setItem(STORAGE_ASYNC_KEY, timestamp.toString());
}

export async function getLastAsyncTimestamp() {
  return Number(AsyncStorage.getItem(STORAGE_ASYNC_KEY));
}
