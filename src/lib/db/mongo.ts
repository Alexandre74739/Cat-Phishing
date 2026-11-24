import "server-only";
import { MongoClient, type Db } from "mongodb";

// The client is reused between calls while the serverless function stays warm.
let client: Promise<MongoClient> | null = null;

export async function database(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) throw new Error("MONGODB_URI is missing");
  client ??= new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 6000,
  })
    .connect()
    .catch((error: unknown) => {
      client = null;
      throw error;
    });
  return (await client).db("cat-phishing");
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });
