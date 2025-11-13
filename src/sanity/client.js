import { createClient } from "@sanity/client";

// Initialize Sanity client
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_DATASET;
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});
