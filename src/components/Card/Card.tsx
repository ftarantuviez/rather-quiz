import React, { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = {
  children: ReactNode;
};
const Card = (props: CardProps) => {
  const { children } = props;
  return <div className={styles.card}>{children}</div>;
};

export default Card;
