"use client";

import { addQuestion, getQuestionData } from "@/lib/actions/questionAction";
import { GET_QUESTIONS_QUERY_KEY } from "@/lib/queryKeys";
import { TAddQuestionFormValues } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import Header from "../_components/Header";

export default function Admin() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues, control, reset } =
    useForm<TAddQuestionFormValues>({
      defaultValues: { character: null, details: null, answers: [] },
    });
  const { mutate, status: addQuestionStatus } = useMutation({
    mutationFn: async () => addQuestion(getValues()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_QUESTIONS_QUERY_KEY] });
      reset();
    },
  });

  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({ control, name: "answers", rules: { required: true } });

  const { data, status: fetchStatus } = useQuery({
    queryKey: [GET_QUESTIONS_QUERY_KEY],
    queryFn: async () => getQuestionData(),
  });

  if (!data) {
    return <LuLoaderCircle className="loader lg" />;
  }

  const questionList = data.map((question) => {
    return <div>{question.question}</div>;
  });

  const answersList = answers.map((answer, index) => {
    return (
      <div key={answer.id}>
        <label htmlFor={answer.id}>Answer</label>
        <input
          type="text"
          key={`${answer.id}-answer`}
          {...register(`answers.${index}.answer`, { required: true })}
        />
        <label htmlFor={answer.id}>Cloudinary ID</label>
        <input
          type="text"
          key={`${answer.id}-cldimg_id`}
          {...register(`answers.${index}.cldimg_id`)}
        />
        <FaRegTrashAlt
          className="trash-icon"
          onClick={() => removeAnswer(index)}
        />
      </div>
    );
  });

  const onSubmit = (data: any) => {
    console.log("clicked");
    mutate();
  };

  return (
    <>
      <Header currTab="Contribute" />
      <form
        autoComplete="off"
        className="add-question-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>Add New Question</div>
        <label htmlFor={"question"}>Question*:</label>
        <input
          type="text"
          key="question"
          {...register("question", { required: true })}
        />
        <label htmlFor={"question"}>Associated Character:</label>
        <input type="text" key="character" {...register("character")} />
        <label htmlFor={"question"}>Details:</label>
        <input type="text" key="details" {...register("details")} />
        <div className="answers-list">
          {answersList}
          <button
            className="add"
            type="button"
            onClick={() => appendAnswer({ answer: "", cldimg_id: null })}
          >
            Add Answer
          </button>
        </div>
        <input className="button" type="submit" value="Add Question" />
      </form>
      <br></br>
      <div className="questions-list">All Questions{questionList}</div>
    </>
  );
}
