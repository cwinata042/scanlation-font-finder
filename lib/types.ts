export type TFont = {
  id: number;
  name: string;
  cldimg_id: string;
};

export type TQuestion = {
  id: number;
  question: string;
  character: string;
  details: string;
};

export type TAnswer = {
  id: number;
  answer: string;
  cldimg_id: string;
  question_id: number;
};

export type TFontAnswer = {
  id: number;
  answer_id: number;
  font_id: number;
  question_id: number;
};

export type TAddQuestionFormValues = {
  question: string;
  character?: string | null;
  details?: string | null;
  answers: TAddAnswerValues[];
};

export type TAddAnswerValues = {
  answer: string;
  cldimg_id?: string | null;
};
