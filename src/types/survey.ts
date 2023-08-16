export interface IQuestion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: { text: string }[];
}

export interface ISurvey {
  title: string;
  image: string;
  questions: IQuestion[];
}
