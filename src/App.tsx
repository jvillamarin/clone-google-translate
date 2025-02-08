import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LanguageSelect } from "./components/LanguageSelect";
import { useStore } from "./hooks/useStore";
import { SectionType } from "./types.d";
import TextArea from "./components/TextArea";
import { useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLanguage,
    toLanguage,
    loading,
    result,
    text,
    handleChangeFromLanguage,
    handleInterchangeLanguages,
    handleChangeToLanguage,
    handleSetText,
    handleSetResult,
  } = useStore();

  const debouncedValueText = useDebounce(text, 100);

  useEffect(() => {
    if (debouncedValueText === "") return;

    const source = axios.CancelToken.source();
    const getTranlations = async () => {
      try {
        const response = await axios.get(
          "https://api.mymemory.translated.net/",
          {
            params: {
              q: debouncedValueText,
              langpair: `${fromLanguage}|${toLanguage}`,
            },
            cancelToken: source.token,
          }
        );

        handleSetResult(response.data.responseData.translatedText);
      } catch (error) {
        console.error("Error fetching translations", error);
      }
    };
    if (text) {
      getTranlations();
    }
    // getTranlations();
  }, [fromLanguage, toLanguage, text]);

  const handleClipborad = () => {
    navigator.clipboard.writeText(result);
  };
  const handleSpeakerBoard = () => {
    const speech = new SpeechSynthesisUtterance(result);
    speech.lang = toLanguage;
    speech.volume = 1; // 0 to 1
    speech.rate = 1; // 0.1 to 10
    speech.pitch = 1; // 0 to 2
    speech.text = result;
    speechSynthesis.speak(speech);
  };
  return (
    <>
      <Container fluid>
        <h1>Clone Google Translate</h1>
        <Row>
          <Col>
            <h2>From</h2>
            <LanguageSelect
              type={SectionType.From}
              value={fromLanguage}
              data={"from-language-select"}
              onChange={handleChangeFromLanguage}
            />
            {fromLanguage}
            <TextArea
              type={SectionType.From}
              autofocus={true}
              value={text}
              onChange={handleSetText}
            />
          </Col>
          <Col xs="auto">
            <Button variant="link" onClick={handleInterchangeLanguages}>
              🔛
            </Button>
          </Col>

          <Col style={{ position: "relative" }}>
            <h2>to</h2>
            <LanguageSelect
              type={SectionType.To}
              value={toLanguage}
              data={"to-language-select"}
              onChange={handleChangeToLanguage}
            />
            {toLanguage}
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={handleSetResult}
              loading={loading}
              disabled={fromLanguage === "auto"}
            />
            <Button
              variant="link"
              onClick={handleClipborad}
              style={{ position: "absolute", bottom: 0, left: 0 }}
            >
              📄
            </Button>
            <Button
              variant="link"
              onClick={handleSpeakerBoard}
              style={{ position: "absolute", bottom: 0, right: 0 }}
            >
              🔈
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
