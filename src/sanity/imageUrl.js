import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId, dataset });
const urlFor = (source) => (source ? builder.image(source) : null);

export { urlFor };
