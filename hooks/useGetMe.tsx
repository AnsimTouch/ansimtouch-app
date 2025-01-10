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

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("리프레시 토큰이 없습니다.");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      return null;
    }

    const res = await axios.post(`${SERVER_URL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken } = res.data;

    if (accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
      return accessToken;
    }

    return null;
  } catch (error) {
    console.error("Access token 갱신 실패:", error);
    return null;
  }
};

export const useGetMe = create<GetMeState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    let accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${SERVER_URL}/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res) {
        set({ user: res.data });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log("Access token 만료. Refresh token으로 갱신 시도...");
        accessToken = await refreshAccessToken();

        if (accessToken) {
          try {
            const res = await axios.get(`${SERVER_URL}/user/me`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res) {
              set({ user: res.data });
            }
          } catch (retryError) {
            console.error("갱신 후 fetchUser 재요청 실패:", retryError);
          }
        }
      } else {
        console.error("fetchUser 요청 실패:", error);
      }
    }
  },
}));
