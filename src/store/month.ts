import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Month = MonthType | null;

type MonthState = {
  month: Month | null;
  setMonth: (room: Month) => void;
  clearMonth: () => void;
};

const customStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useMonthStorage = create<MonthState>()(
  persist(
    set => ({
      month: null, // Initially, the user is null
      setMonth: month => set({month: month}), // Set the user state
      clearMonth: () => set({month: null}), // Clear the user state
    }),
    {
      name: 'month-storage', // Name of the item in storage
      storage: customStorage,
    },
  ),
);
