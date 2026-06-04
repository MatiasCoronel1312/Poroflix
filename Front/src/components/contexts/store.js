import React from "react";
import { create } from 'zustand'

export const useStore = create((set) => ({
  isOpenModal: false,
  handleOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
}))