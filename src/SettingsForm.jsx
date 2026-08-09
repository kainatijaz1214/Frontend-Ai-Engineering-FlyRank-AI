import { useState } from "react";
import {
  isSettingsFormValid,
  validateEmail,
  validateName,
  validatePassword,
  validateSettingsForm,
} from "./settingsFormValidation.js";
import "./SettingsForm.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const INITIAL_TOUCHED = {
  name: false,
  email: false,
  password: false,
};

export default function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  function validateField(field, nextValues) {
    if (field === "name") {
      return validateName(nextValues.name);
    }
    if (field === "email") {
      return validateEmail(nextValues.email);
    }
    return validatePassword(nextValues.password);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setSubmitMessage("");

    if (touched[name] || submitAttempted) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, nextValues),
      }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, nextValues),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validateSettingsForm(values);
    setErrors(nextErrors);

    if (!isSettingsFormValid(nextErrors)) {
      setSubmitMessage("");
      return;
    }

    setSubmitMessage("Settings saved successfully.");
  }

  function showError(field) {
    return (touched[field] || submitAttempted) && errors[field];
  }

  return (
    <section className="settings-form-section">
      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <header className="settings-form__header">
          <h1 className="settings-form__title">Settings</h1>
          <p className="settings-form__subtitle">
            Update your account details below.
          </p>
        </header>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="settings-name">
            Name
          </label>
          <input
            id="settings-name"
            className="settings-form__input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            aria-invalid={showError("name") ? "true" : "false"}
            aria-describedby={showError("name") ? "settings-name-error" : undefined}
          />
          {showError("name") ? (
            <p
              id="settings-name-error"
              className="settings-form__error"
              role="alert"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="settings-email">
            Email
          </label>
          <input
            id="settings-email"
            className="settings-form__input"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            aria-invalid={showError("email") ? "true" : "false"}
            aria-describedby={
              showError("email") ? "settings-email-error" : undefined
            }
          />
          {showError("email") ? (
            <p
              id="settings-email-error"
              className="settings-form__error"
              role="alert"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="settings-password">
            Password
          </label>
          <input
            id="settings-password"
            className="settings-form__input"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            aria-invalid={showError("password") ? "true" : "false"}
            aria-describedby={
              showError("password") ? "settings-password-error" : undefined
            }
          />
          {showError("password") ? (
            <p
              id="settings-password-error"
              className="settings-form__error"
              role="alert"
            >
              {errors.password}
            </p>
          ) : null}
        </div>

        <button className="settings-form__submit" type="submit">
          Save settings
        </button>

        {submitMessage ? (
          <p className="settings-form__success" role="status">
            {submitMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
