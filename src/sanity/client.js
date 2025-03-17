import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "10p69ozq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
