"use client";

import SummaryCard from "@/components/SummaryCard/SummaryCard";
import SurveyCard from "@/components/SurveyCard/SurveyCard";
import { useState } from "react";

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
  ],
};
export default function Home() {
  const [survey, setSurvey] = useState(MOCK_DATA);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const onNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    /*  if (survey.questions.length < nextQuestion + 1) {
    } else {
    } */
  };

  const handleSelectAnswer = (answer: string) => {
    onNextQuestion();
  };

  const questionDetails = survey.questions[currentQuestion];

  return (
    <main className="flex h-[100vh] justify-around p-24 text-white">
      {currentQuestion === survey.questions.length ? (
        <SummaryCard
          questions={[{ answer: "Opt 1", question: "What fruit is this one?" }]}
        />
      ) : (
        <SurveyCard
          question={questionDetails.text}
          image={"/images/loginBgImage.png"}
          lifetimeSeconds={questionDetails.lifetimeSeconds}
          options={questionDetails.options}
          onNextQuestion={onNextQuestion}
          handleSelectAnswer={handleSelectAnswer}
        />
      )}
    </main>
  );
}
