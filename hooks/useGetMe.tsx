import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";

interface UserData {
  id: number;
  username: string;
  tel: string;
  userType: string;
}

interface GetMeState {
  user: UserData | null;
  setUser: (user: UserData) => void;
  fetchUser: () => Promise<void>;
}

export const useGetMe = create<GetMeState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${SERVER_URL}/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res) {
        set({ user: res.data });
      }
    } catch (error) {
      console.log(accessToken);
      console.error("사용자 데이터를 불러오지 못했습니다.", error);
    }
  },
}));
