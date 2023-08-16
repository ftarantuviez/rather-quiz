import React from "react";
import Card from "../../Card/Card";
import styles from "./SummaryCard.module.scss";
import { ISurvey } from "@/types/survey";

type SummaryCardProps = {
  answers: (number | null)[];
  onSubmit: () => void;
  survey: ISurvey;
  loading: boolean;
};

const SummaryCard = (props: SummaryCardProps) => {
  const { answers, onSubmit, survey, loading } = props;

  const questions = survey.questions.map((quest, i) => {
    return {
      question: quest.text,
      answer: quest.options[answers[i] as number]?.text ?? "",
    };
  });

  return (
    <Card>
      <h3 className={styles.summaryCard__header}>Survey summary</h3>

      <div className={styles.summaryCard__divider} />

      <div className={styles.summaryCard__summaryCont}>
        {questions?.map((question) => (
          <div className={styles.summaryCard__question} key={question.question}>
            <h4 className="mb-2 text-lg">{question.question}</h4>
            <div
              className={`${styles.summaryCard__answer} ${styles.summaryCard__answer__error} ${styles.summaryCard__answer__success}`}
            >
              {question.answer}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-end mt-4">
        {!loading && (
          <button className={styles.summaryCard__submit} onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </Card>
  );
};

export default SummaryCard;
