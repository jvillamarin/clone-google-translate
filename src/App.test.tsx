import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import App from "./App";

test("My app works as expected", async () => {
  const user = userEvent.setup();
  const app = render(<App />);

  //   const selectElement = screen.getByTestId("from-language-select");

  //   await userEvent.selectOptions(selectElement, "es");
  //   // Verificamos que el valor seleccionado en el select es "ES"
  //   //   expect(selectElement.value).toBe("es");
  const testareaFrom = app.getByPlaceholderText("Introducir Texto");
  await user.type(testareaFrom, "hola");
  screen.debug();
  const result = await app.findByDisplayValue(/Hello/i, {}, { timeout: 4000 });
  //   expect(result.length).toBeGreaterThan(0);
  expect(result).toBeTruthy();
});
