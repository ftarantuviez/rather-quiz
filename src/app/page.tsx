"use client";

import SummaryCard from "@/components/Survey/SummaryCard/SummaryCard";
import SurveyCard from "@/components/Survey/SurveyCard/SurveyCard";
import useWalletContext from "@/hooks/useWalletContext";
import { useState } from "react";
import { redirect } from "next/navigation";
import StartQuizCard from "@/components/Survey/StartQuizCard/StartQuizCard";
import { IQuestion, ISurvey } from "@/types/survey";

const MOCK_DATA = {
  title: "Sample Survey",
  image: "https://48tools.com/wp-content/uploads/2015/09/shortlink.png",
  questions: [
    {
      text: "Question1",
      image:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      lifetimeSeconds: 4,
      options: [
        {
          text: "Opt1",
        },
        {
          text: "Opt2",
        },
        {
          text: "Opt",
        },
      ],
    },
    {
      text: "Question2",
      image:
        "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        {
          text: "Opt1",
        },
        {
          text: "Opt2",
        },
        {
          text: "Opt",
        },
      ],
    },
    {
      text: "Pregunta 3",
      image:
        "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 15,
      options: [
        {
          text: "Opt1",
        },
        {
          text: "Opt2",
        },
        {
          text: "Opt",
        },
      ],
    },
  ],
};
export default function Home() {
  const { activeAccount, submitAnswers, loading } = useWalletContext();
  const [survey, setSurvey] = useState<ISurvey>(MOCK_DATA);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const onNextQuestion = (answered?: boolean) => {
    const nextQuestion = currentQuestion !== null ? currentQuestion + 1 : null;
    setCurrentQuestion(nextQuestion);
    if (!answered) {
      setAnswers([...answers, 999]);
    }
  };

  const handleSelectAnswer = (answer: number) => {
    setAnswers([...answers, answer]);
    onNextQuestion(true);
  };

  const handleStartQuiz = () => setCurrentQuestion(0);

  const onSubmitSurvey = () => {
    submitAnswers(9, answers);
  };

  const questionDetails =
    currentQuestion !== null
      ? survey.questions[currentQuestion]
      : ({} as IQuestion);

  if (!activeAccount) redirect("/login");

  const start = (
    <StartQuizCard title={survey.title} handleStartQuiz={handleStartQuiz} />
  );
  const surveyCard = (
    <SurveyCard
      question={questionDetails?.text}
      image={"/images/loginBgImage.png"}
      lifetimeSeconds={questionDetails?.lifetimeSeconds}
      options={questionDetails?.options}
      onNextQuestion={onNextQuestion}
      handleSelectAnswer={handleSelectAnswer}
    />
  );
  const summary = (
    <SummaryCard
      loading={loading}
      answers={answers}
      survey={survey}
      onSubmit={onSubmitSurvey}
    />
  );

  const isCurrentQuestion = currentQuestion !== null;
  const showSummary = currentQuestion === survey.questions.length;

  return (
    <main className="flex h-[100vh] justify-around p-24 text-white">
      {!isCurrentQuestion && start}
      {isCurrentQuestion && !showSummary && surveyCard}
      {showSummary && summary}
    </main>
  );
}
