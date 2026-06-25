import { create } from "zustand";

export const useStore = create((set) => ({
  // -------- Modal --------
  isOpenModal: false,

  handleOpenModal: () =>
    set((state) => ({
      isOpenModal: !state.isOpenModal,
    })),

  // -------- Auth --------

  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);

    set({
      token: data.token,
      username: data.username,
      role: data.role,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    set({
      token: null,
      username: null,
      role: null,
      isAuthenticated: false,
    });
    
  },
}));
