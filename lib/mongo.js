import { MongoClient } from "mongodb";

// One shared client per process (survives dev hot-reloads via globalThis).
export async function getDb() {
  const uri = process.env.MONGODB_URL;
  if (!uri) throw new Error("MONGODB_URL is not set");
  if (!globalThis._mongoPromise) {
    globalThis._mongoPromise = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 8000 })
      .connect()
      .catch((e) => {
        globalThis._mongoPromise = undefined;
        throw e;
      });
  }
  const client = await globalThis._mongoPromise;
  return client.db(process.env.MONGODB_DB || "sreesivani");
}
