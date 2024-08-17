import {Session} from '@supabase/supabase-js';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = Session | null;

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
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

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null, // Initially, the user is null
      setUser: user => set({user}), // Set the user state
      clearUser: () => set({user: null}), // Clear the user state
    }),
    {
      name: 'user-storage', // Name of the item in storage
      storage: customStorage,
    },
  ),
);
