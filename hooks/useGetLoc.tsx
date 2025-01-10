import { create } from "zustand";
import * as Location from "expo-location";
import { useEffect } from "react";

interface LocationStore {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  updateLocation: () => Promise<void>;
}

export const useGetLocation = create<LocationStore>((set) => ({
  location: null,
  updateLocation: async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("위치 권한이 거부되었습니다.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      set({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } catch (error) {
      console.error("위치 가져오기 실패:", error);
    }
  },
}));

export default function LocationComponent() {
  const { location, updateLocation } = useGetLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateLocation]);

  return (
    <div>
      <h1>현재 위치</h1>
      {location ? (
        <p>
          위도: {location.latitude}, 경도: {location.longitude}
        </p>
      ) : (
        <p>위치를 불러오는 중...</p>
      )}
    </div>
  );
}
