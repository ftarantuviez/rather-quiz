import React from "react";
import Card from "../../Card/Card";
import styles from "./StartQuizCard.module.scss";
import Image from "next/image";
import useWalletContext from "@/hooks/useWalletContext";

type StartQuizCardProps = {
  handleStartQuiz: () => void;
  title: string;
  image: string;
};
const StartQuizCard = (props: StartQuizCardProps) => {
  const { handleStartQuiz, title, image } = props;
  const { isGoerliNetwork } = useWalletContext();
  return (
    <Card>
      <h3 className={styles.startQuizCard__header}>{title}</h3>

      <div className={styles.startQuizCard__divider} />
      <Image src={image} width={400} height={400} alt="Survey Image" />

      <div className={styles.startQuizCard__buttonCont}>
        {isGoerliNetwork ? (
          <button
            className={styles.startQuizCard__start}
            onClick={handleStartQuiz}
            disabled={!isGoerliNetwork}
          >
            Start quiz
          </button>
        ) : (
          <p className="text-white mt-2">Switch to Goerli Network to start</p>
        )}
      </div>
    </Card>
  );
};

export default StartQuizCard;
