import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm.jsx";

describe("SettingsForm validation UI", () => {
  it("shows validation messages after submit when fields are invalid", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters."),
    ).toBeInTheDocument();
  });

  it("marks invalid inputs with aria-invalid and shows field errors on blur", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText(/^name$/i);
    await user.click(nameInput);
    await user.tab();

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
  });

  it("shows success message when all fields are valid", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Alex");
    await user.type(screen.getByLabelText(/^email$/i), "alex@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(screen.getByText("Settings saved successfully.")).toBeInTheDocument();
  });
});
