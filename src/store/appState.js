import { useState } from "@neuralumina/lumina-ui";

// Global app state
export const [getUser, setUser, subscribeUser] = useState(null);
export const [getTheme, setTheme, subscribeTheme] = useState("light");
export const [getNotifications, setNotifications, subscribeNotifications] = useState([]);

// Track subscribed components per update function
const subscribedComponents = new WeakSet();

// Helper to bind state to any component
export function bindAppState(forceUpdate) {
  if (subscribedComponents.has(forceUpdate)) return;
  subscribeUser(forceUpdate);
  subscribeTheme(forceUpdate);
  subscribeNotifications(forceUpdate);
  subscribedComponents.add(forceUpdate);
}

// Actions
export function login(userData) {
  setUser(userData);
  addNotification({ type: "success", message: `Welcome back, ${userData.name}!` });
}

export function logout() {
  setUser(null);
  addNotification({ type: "info", message: "You've been logged out." });
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}

export function addNotification(notification) {
  const id = Date.now();
  setNotifications([...getNotifications(), { ...notification, id }]);
  // Auto-remove after 5 seconds
  setTimeout(() => {
    setNotifications(getNotifications().filter(n => n.id !== id));
  }, 5000);
}

export function removeNotification(id) {
  setNotifications(getNotifications().filter(n => n.id !== id));
}