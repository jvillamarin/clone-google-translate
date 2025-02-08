import { useReducer } from "react";
import {
  type State,
  type Action,
  type Languages,
  type FromLanguages,
} from "../types.d";
import { AUTO_LANGUAGE } from "../constants";

const initialState: State = {
  fromLanguage: "es",
  toLanguage: "en",
  text: "",
  result: "",
  loading: false,
};

const reducer = (state: State, action: Action) => {
  const { type } = action;
  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
    };
  }
  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading: true,
    };
  }
  if (type === "SET_TEXT") {
    const loading = action.payload !== "";
    return {
      ...state,
      text: action.payload,
      loading,
      result: "",
    };
  }
  if (type === "SET_RESULT") {
    return {
      ...state,
      result: action.payload,
      loading: false,
    };
  }
  if (type === "INTERCHANGE_LANGUAGE") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  return state;
};

export const useStore = () => {
  const [{ fromLanguage, toLanguage, text, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const handleInterchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGE" });
  };
  const handleChangeFromLanguage = (payload: FromLanguages) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };
  const handleChangeToLanguage = (payload: Languages) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };
  const handleSetText = (payload: string) => {
    dispatch({ type: "SET_TEXT", payload });
  };
  const handleSetResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };
  return {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    handleInterchangeLanguages,
    handleChangeFromLanguage,
    handleChangeToLanguage,
    handleSetText,
    handleSetResult,
  };
};
