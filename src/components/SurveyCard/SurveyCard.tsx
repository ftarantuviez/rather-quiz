"use client";

import React from "react";
import styles from "./SurveyCard.module.scss";
import Image from "next/image";
import useCounter from "@/hooks/useCounter";
import Card from "../Card/Card";

type SurveyCardProps = {
  question: string;
  lifetimeSeconds: number;
  image: string;
  options: { text: string }[];
  onNextQuestion: () => void;
  handleSelectAnswer: (answer: string) => void;
};
const SurveyCard = (props: SurveyCardProps) => {
  const {
    question,
    lifetimeSeconds,
    image,
    options,
    onNextQuestion,
    handleSelectAnswer,
  } = props;
  const counter = useCounter(lifetimeSeconds, onNextQuestion);

  const onAnswerSelect = (answer: string) => () => {
    handleSelectAnswer(answer);
  };
  return (
    <Card>
      <div className={styles.surveyCard__header}>
        <h3>{question}</h3>
        <p className={counter <= 3 ? styles.surveyCard__counter : ""}>
          {counter}s
        </p>
      </div>

      <div className={styles.surveyCard__divider} />
      <Image
        src={image}
        alt="Question image"
        width={155}
        height={155}
        className="my-4"
      />
      <div className={styles.surveyCard__optionsCont}>
        {options?.map((option) => (
          <div
            className={styles.surveyCard__option}
            key={option.text}
            onClick={onAnswerSelect(option.text)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SurveyCard;
