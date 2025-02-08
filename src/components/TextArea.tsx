import Form from "react-bootstrap/Form";
import { SectionType } from "../types.d";
// import { FC } from "react";

type Props =
  | {
      type: SectionType.From;
      value: string;
      onChange: (value: string) => void;
      loading?: boolean;
      disabled?: boolean;
      autofocus: boolean;
    }
  | {
      type: SectionType.To;
      value: string;
      onChange: (value: string) => void;
      loading: boolean;
      disabled: boolean;
      autofocus?: boolean;
    };

const getPlaceholder = ({
  loading,
  type,
}: {
  loading?: boolean;
  type: SectionType;
}) => {
  if (loading === true) return "Cargando...";
  if (type === SectionType.From) return "Introducir Texto";
  return "Traduccion";
};
const TextArea = ({
  type,
  autofocus,
  value,
  loading,
  disabled,
  onChange,
}: Props) => {
  const commonStyles = { border: 0, height: "200px" };
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return (
    <Form.Control
      value={value}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={autofocus}
      onChange={handleSetText}
      style={styles}
      disabled={disabled}
    />
  );
};

export default TextArea;
