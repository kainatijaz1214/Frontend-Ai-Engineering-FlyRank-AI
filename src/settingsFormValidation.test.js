import { describe, expect, it } from "vitest";
import {
  isSettingsFormValid,
  validateEmail,
  validateName,
  validatePassword,
  validateSettingsForm,
} from "./settingsFormValidation.js";

describe("validateName", () => {
  it("returns an error when name is empty", () => {
    expect(validateName("")).toBe("Name is required.");
  });

  it("returns an error when name is only whitespace", () => {
    expect(validateName("   ")).toBe("Name is required.");
  });

  it("returns no error for a non-empty name", () => {
    expect(validateName("Alex")).toBe("");
  });
});

describe("validateEmail", () => {
  it("returns an error for an empty email", () => {
    expect(validateEmail("")).toBe("Enter a valid email address.");
  });

  it("returns an error for an invalid email format", () => {
    expect(validateEmail("not-an-email")).toBe("Enter a valid email address.");
    expect(validateEmail("missing@domain")).toBe("Enter a valid email address.");
  });

  it("returns no error for a valid email", () => {
    expect(validateEmail("user@example.com")).toBe("");
  });
});

describe("validatePassword", () => {
  it("returns an error when password is shorter than 8 characters", () => {
    expect(validatePassword("short")).toBe(
      "Password must be at least 8 characters.",
    );
    expect(validatePassword("1234567")).toBe(
      "Password must be at least 8 characters.",
    );
  });

  it("returns no error when password is at least 8 characters", () => {
    expect(validatePassword("12345678")).toBe("");
  });
});

describe("validateSettingsForm", () => {
  it("returns all field errors for invalid input", () => {
    const errors = validateSettingsForm({
      name: "",
      email: "bad-email",
      password: "123",
    });

    expect(errors.name).toBe("Name is required.");
    expect(errors.email).toBe("Enter a valid email address.");
    expect(errors.password).toBe("Password must be at least 8 characters.");
    expect(isSettingsFormValid(errors)).toBe(false);
  });

  it("returns empty errors when all fields are valid", () => {
    const errors = validateSettingsForm({
      name: "Alex",
      email: "alex@example.com",
      password: "securepass",
    });

    expect(errors).toEqual({
      name: "",
      email: "",
      password: "",
    });
    expect(isSettingsFormValid(errors)).toBe(true);
  });
});
