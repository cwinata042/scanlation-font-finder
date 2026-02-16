"use server";

import { db } from "../db/drizzle";
import { questions } from "../db/schema";
import { TAddQuestionFormValues, TAnswer } from "../types";
import { addAnswer } from "./answerAction";

export const getQuestionData = async () => {
  const data = await db.select().from(questions);
  return data;
};

export const addQuestion = async (newQuestion: TAddQuestionFormValues) => {
  const addedQuestion = await db
    .insert(questions)
    .values({
      question: newQuestion.question,
      character: newQuestion.character === "" ? null : newQuestion.character,
      details: newQuestion.details === "" ? null : newQuestion.details,
    })
    .returning({ insertedId: questions.id });

  const questionId = addedQuestion[0].insertedId;

  for (const answer of newQuestion.answers) {
    addAnswer(answer, questionId);
  }
};
