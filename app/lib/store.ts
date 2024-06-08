import { create } from "zustand";
import { Customer } from "./definitions";

type Store = {
  customersData: Customer[];
  isSendForm: boolean;
  showCreateClient: boolean;
  isDark: boolean;
  isShowModalDelete: boolean;
  setIsModalDeleteShow: (isShowModalDelete: boolean) => void;
  setIsDark: (isDark: boolean) => void;
  setSendForm: (sendForm: boolean) => void;
  setShowCreateClient: (showCreateClient: boolean) => void;
  setCustomers: (customer: Customer[]) => void;
};
export const useStore = create<Store>()((set) => ({
  customersData: [],
  isSendForm: false,
  showCreateClient: false,
  isDark: false,
  isShowModalDelete: false,
  setIsModalDeleteShow: (isShowModalDelete) =>
    set({ isShowModalDelete: isShowModalDelete }),
  setIsDark: (isDark) => set({ isDark: isDark }),
  setSendForm: (sendForm) => set({ isSendForm: sendForm }),
  setShowCreateClient: (showCreateClient) =>
    set({ showCreateClient: showCreateClient }),
  setCustomers: (customer) => set(() => ({ customersData: customer })),
}));
