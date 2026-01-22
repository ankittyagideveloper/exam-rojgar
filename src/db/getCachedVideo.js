import { getVideo, setVideo } from "./videoCache";

export async function getCachedVideo(url) {
  const cached = await getVideo(url);
  if (cached) {
    return URL.createObjectURL(cached);
  }
  // 2️⃣ If offline & not cached → fail
  if (!navigator.onLine) {
    throw new Error("Video not available offline");
  }
  // 2️⃣ Fetch MP4 from jsDelivr
  const res = await fetch(url);
  if (!res.ok) throw new Error("Video fetch failed");

  const blob = await res.blob(); // MP4 = Blob

  // 3️⃣ Store locally
  await setVideo(url, blob);

  return URL.createObjectURL(blob);
}
