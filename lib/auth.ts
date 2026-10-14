export type AuthUser = {
  name: string;
  email: string;
  createdAt: string;
};

type StoredUser = AuthUser & {
  password: string;
};

const USERS_KEY = "algoviz.users";
const SESSION_KEY = "algoviz.session";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser(): AuthUser | null {
  const session = readStorage<AuthUser | null>(SESSION_KEY, null);
  return session;
}

export function getUsers(): StoredUser[] {
  return readStorage<StoredUser[]>(USERS_KEY, []);
}

export function hasActiveSession() {
  return Boolean(getCurrentUser());
}

export function signUpUser(name: string, email: string, password: string) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    return { ok: false, error: "Please fill in all fields." };
  }

  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  if (trimmedPassword.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  const existingUsers = getUsers();
  if (existingUsers.some((user) => user.email.toLowerCase() === trimmedEmail)) {
    return { ok: false, error: "An account already exists for that email." };
  }

  const newUser: StoredUser = {
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    createdAt: new Date().toISOString(),
  };

  writeStorage(USERS_KEY, [...existingUsers, newUser]);
  writeStorage(SESSION_KEY, { name: trimmedName, email: trimmedEmail, createdAt: newUser.createdAt });

  return { ok: true, user: { name: trimmedName, email: trimmedEmail, createdAt: newUser.createdAt } };
}

export function loginUser(email: string, password: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, error: "Email and password are required." };
  }

  const matchingUser = getUsers().find(
    (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword,
  );

  if (!matchingUser) {
    return { ok: false, error: "Incorrect email or password." };
  }

  const sessionUser = {
    name: matchingUser.name,
    email: matchingUser.email,
    createdAt: matchingUser.createdAt,
  };

  writeStorage(SESSION_KEY, sessionUser);
  return { ok: true, user: sessionUser };
}

export function logoutUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}
