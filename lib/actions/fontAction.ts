"use server";

import { db } from "../db/drizzle";
import { fonts } from "../db/schema";

export const getFontData = async () => {
  const data = await db.select().from(fonts);
  return data;
};
