import React from "react";
import Card from "../../Card/Card";
import styles from "./SummaryCard.module.scss";

type SummaryCardProps = {
  questions: { question: string; answer: string }[];
};
const SummaryCard = (props: SummaryCardProps) => {
  const { questions } = props;
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
        <button className={styles.summaryCard__submit}>Submit</button>
      </div>
    </Card>
  );
};

export default SummaryCard;
