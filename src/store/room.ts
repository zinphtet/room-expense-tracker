import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Room = RoomType | null;

type RoomState = {
  room: Room | null;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
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

export const useRoomStore = create<RoomState>()(
  persist(
    set => ({
      room: null, // Initially, the user is null
      setRoom: room => set({room: room}), // Set the user state
      clearRoom: () => set({room: null}), // Clear the user state
    }),
    {
      name: 'room-storage', // Name of the item in storage
      storage: customStorage,
    },
  ),
);
