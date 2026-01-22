import { dbPromise, VIDEO_STORE } from "./db";

export async function getVideo(key) {
  const db = await dbPromise;
  return db.get(VIDEO_STORE, key);
}

export async function setVideo(key, blob) {
  const db = await dbPromise;
  return db.put(VIDEO_STORE, blob, key);
}
