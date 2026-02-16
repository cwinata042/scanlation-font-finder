import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const fonts = pgTable("fonts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  cldimg_id: text("cldimg_id").notNull(),
});

export const questions = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  question: text("question").notNull(),
  character: text("character"),
  details: text("details"),
});

export const answers = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  answer: text("answer").notNull(),
  cldimg_id: text("cldimg_id"),
  question_id: integer("question_id")
    .references(() => questions.id)
    .notNull(),
});

export const fontAnswers = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  answer_id: integer("answer_id")
    .references(() => answers.id)
    .notNull(),
  font_id: integer("font_id")
    .references(() => fonts.id)
    .notNull(),
  question_id: integer("question_id")
    .references(() => questions.id)
    .notNull(),
});
