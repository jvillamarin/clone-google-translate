import { type SUPPORT_LANGUAGES, type AUTO_LANGUAGE } from "./constants";

export type Languages = keyof typeof SUPPORT_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;

export type FromLanguages = Languages | AutoLanguage;

export interface State {
  fromLanguage: FromLanguages;
  toLanguage: Languages;
  text: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGE" }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguages }
  | { type: "SET_TO_LANGUAGE"; payload: Languages }
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

export enum SectionType {
  From = "from",
  To = "to",
}
