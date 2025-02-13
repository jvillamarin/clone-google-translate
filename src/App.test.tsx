// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { test, expect } from "vitest";
// import App from "./App";

// test("My app works as expected", async () => {
//   const user = userEvent.setup();
//   const app = render(<App />);

//   //   const selectElement = screen.getByTestId("from-language-select");

//   //   await userEvent.selectOptions(selectElement, "es");
//   //   // Verificamos que el valor seleccionado en el select es "ES"
//   //   //   expect(selectElement.value).toBe("es");
//   const testareaFrom = app.getByPlaceholderText("Introducir Texto");
//   await user.type(testareaFrom, "hola");
//   screen.debug();
//   const result = await app.findByDisplayValue(/Hello/i, {}, { timeout: 4000 });
//   //   expect(result.length).toBeGreaterThan(0);
//   expect(result).toBeTruthy();
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";

import App from "./App";

// Mock de la respuesta de la API
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockImplementation(() => {
      console.log("Mock de axios llamado");
      return Promise.resolve({
        data: { responseData: { translatedText: "Hello" } },
      });
    }),
  },
}));

// Mock de SpeechSynthesis
Object.defineProperty(window, "speechSynthesis", {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
  },
  writable: true,
});

// vi.spyOn(window.speechSynthesis, "speak").mockImplementation(() => {});

test("La aplicación traduce texto correctamente y copia al portapapeles", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Simula escribir "hola" en el textarea
  const textareaFrom = screen.getByPlaceholderText("Introducir Texto");
  await user.type(textareaFrom, "hola");

  // Verifica que la traducción "Hello" aparezca
  await waitFor(() => {
    const result = screen.getByDisplayValue("Hello");
    expect(result).toBeInTheDocument();
  });
  // Simula hacer clic en el botón de copiar
  const copyButton = screen.getByText("📄");
  await user.click(copyButton);

  // Verifica que el texto se copió al portapapeles
  const copiedText = await navigator.clipboard.readText();
  expect(copiedText).toBe("Hello");
});

// Mock de SpeechSynthesis y SpeechSynthesisUtterance
// Object.defineProperty(window, "speechSynthesis", {
//   value: {
//     speak: vi.fn(),
//   },
// });

global.SpeechSynthesisUtterance = class {
  text: string;
  lang: string;
  volume: number;
  rate: number;
  pitch: number;
  constructor(text: string) {
    this.text = text;
    this.lang = "en";
    this.volume = 1;
    this.rate = 1;
    this.pitch = 1;
  }
};

test("La aplicación reproduce el texto traducido con síntesis de voz", async () => {
  const user = userEvent.setup();
  render(<App />);

  const textareaFrom = screen.getByPlaceholderText("Introducir Texto");
  await user.type(textareaFrom, "hola");

  // Espera la traducción simulada
  await waitFor(() =>
    expect(screen.getByDisplayValue("Hello")).toBeInTheDocument()
  );

  // Simula hacer clic en el botón de síntesis de voz
  const speakerButton = screen.getByText("🔈");
  await user.click(speakerButton);

  // Verifica que `speechSynthesis.speak` fue llamado
  expect(window.speechSynthesis.speak).toHaveBeenCalled();
});
