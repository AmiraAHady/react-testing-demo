import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const typeIntoInputElement = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByLabelText("Email address");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

describe("App Component", function () {
  beforeEach(() => {
    render(<App />);
  });

  test("testing input initially empty", () => {
    expect(screen.getByLabelText("Email address").value).toBe("");
  });

  test("testing inputEmail value changed after typing", () => {
    const { emailInputElement } = typeIntoInputElement({
      email: "amira@gmail.com",
    });
    const passwordInputElement = screen.getByLabelText("Password");

    expect(emailInputElement.value).toEqual("amira@gmail.com");
    expect(passwordInputElement.value).toEqual("");
  });

  test("test conditional render of error,whene email error", () => {
    // expect(screen.queryByText(/The email you input is invalid./i)).not.toBeInTheDocument()
    typeIntoInputElement({ email: "amiragmailcom" });
    const btn = screen.getByRole("button", { name: /submit/i });
    userEvent.click(btn);
    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).toBeInTheDocument();
  });
  test("test show no error when data are correct", () => {
    // expect(screen.queryByText(/The email you input is invalid./i)).not.toBeInTheDocument()
    typeIntoInputElement({
      email: "amira@gmail.com",
      password: "ASD123",
      confirmPassword: "ASD123",
    });
    const btn = screen.getByTestId('custom-element')
    userEvent.click(btn);
    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The passwords don't match. Try again./i)
    ).not.toBeInTheDocument();
  });
});
