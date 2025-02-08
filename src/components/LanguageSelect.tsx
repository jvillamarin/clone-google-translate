import Form from "react-bootstrap/Form";
import { AUTO_LANGUAGE, SUPPORT_LANGUAGES } from "../constants";
import { FC } from "react";
import { FromLanguages, Languages, SectionType } from "../types.d";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguages;
      onChange: (language: FromLanguages) => void;
      data: string;
    }
  | {
      type: SectionType.To;
      value: Languages;
      onChange: (language: Languages) => void;
      data: string;
    };

export const LanguageSelect: FC<Props> = ({
  type,
  value,
  data,
  onChange,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Languages);
  };

  return (
    <Form.Select onChange={handleChange} value={value} data-testid={data}>
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORT_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
