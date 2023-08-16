"use client";

import SummaryCard from "@/components/Survey/SummaryCard/SummaryCard";
import SurveyCard from "@/components/Survey/SurveyCard/SurveyCard";
import useWalletContext from "@/hooks/useWalletContext";
import { useState } from "react";
import { redirect } from "next/navigation";
import StartQuizCard from "@/components/Survey/StartQuizCard/StartQuizCard";
import { IQuestion, ISurvey } from "@/types/survey";
import styles from "./Home.module.scss";
import survey from "./survey.json";

export default function Home() {
  const { activeAccount, submitAnswers, loading } = useWalletContext();
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

  const onSubmitSurvey = async () => {
    try {
      await submitAnswers(survey.id, answers);
      setAnswers([]);
      setCurrentQuestion(null);
      alert("Survey Submitted successfully");
    } catch (error) {}
  };

  const questionDetails =
    currentQuestion !== null
      ? survey.questions[currentQuestion]
      : ({} as IQuestion);

  if (!activeAccount) redirect("/login");

  const start = (
    <StartQuizCard
      title={survey.title}
      image={survey.image}
      handleStartQuiz={handleStartQuiz}
    />
  );
  const surveyCard = (
    <SurveyCard
      question={questionDetails?.text}
      image={questionDetails?.image}
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
    <main className={styles.home}>
      {!isCurrentQuestion && start}
      {isCurrentQuestion && !showSummary && surveyCard}
      {showSummary && summary}
    </main>
  );
}
