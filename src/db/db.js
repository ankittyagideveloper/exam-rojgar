import { openDB } from "idb";

export const DB_NAME = "asset-cache-db";
export const DB_VERSION = 1;
export const VIDEO_STORE = "videos";

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(VIDEO_STORE)) {
      db.createObjectStore(VIDEO_STORE);
    }
  },
});
