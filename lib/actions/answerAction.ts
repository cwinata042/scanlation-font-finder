"use server";

import { db } from "../db/drizzle";
import { eq } from "drizzle-orm";
import { answers } from "../db/schema";
import { TAddAnswerValues } from "../types";

export const getAnswerData = async (questionId: number) => {
  const data = await db
    .select()
    .from(answers)
    .where(eq(answers.question_id, questionId));
  return data;
};

export const addAnswer = async (
  newAnswer: TAddAnswerValues,
  questionId: number,
) => {
  await db.insert(answers).values({
    answer: newAnswer.answer,
    cldimg_id: newAnswer.cldimg_id === "" ? null : newAnswer.cldimg_id,
    question_id: questionId,
  });
};
