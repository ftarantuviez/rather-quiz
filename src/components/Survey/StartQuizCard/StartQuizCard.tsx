import React from "react";
import Card from "../../Card/Card";
import styles from "./StartQuizCard.module.scss";
import Image from "next/image";
import useWalletContext from "@/hooks/useWalletContext";

type StartQuizCardProps = {
  handleStartQuiz: () => void;
  title: string;
};
const StartQuizCard = (props: StartQuizCardProps) => {
  const { handleStartQuiz, title } = props;
  const { isGoerliNetwork } = useWalletContext();
  return (
    <Card>
      <h3 className={styles.startQuizCard__header}>{title}</h3>

      <div className={styles.startQuizCard__divider} />
      <Image
        src="https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg"
        width={400}
        height={400}
        alt="Survey Image"
      />

      <div className="flex w-full justify-end mt-4">
        {isGoerliNetwork ? (
          <button
            className={styles.startQuizCard__start}
            onClick={handleStartQuiz}
            disabled={!isGoerliNetwork}
          >
            Start quiz
          </button>
        ) : (
          <p className="text-white text-sm">
            Switch to Goerli Network to start
          </p>
        )}
      </div>
    </Card>
  );
};

export default StartQuizCard;
