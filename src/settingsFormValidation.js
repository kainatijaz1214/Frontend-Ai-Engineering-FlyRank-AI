const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name) {
  if (typeof name !== "string" || name.trim() === "") {
    return "Name is required.";
  }
  return "";
}

export function validateEmail(email) {
  if (typeof email !== "string" || email.trim() === "") {
    return "Enter a valid email address.";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Enter a valid email address.";
  }
  return "";
}

export function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return "";
}

export function validateSettingsForm({ name, email, password }) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

export function isSettingsFormValid(errors) {
  return !errors.name && !errors.email && !errors.password;
}
