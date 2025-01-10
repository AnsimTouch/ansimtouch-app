import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import * as Location from "expo-location";

interface mapProps {
  setLocationName?: (name: string) => void;
  setRegion?: (region: Region) => void;
}

export default function Map({ setLocationName, setRegion }: mapProps) {
  const [region, setLocalRegion] = useState<Region | null>(null);

  const changeRegion = (newRegion: Region) => {
    setLocalRegion(newRegion);
    setRegion?.(newRegion); 
  };

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocalRegion(initialRegion);
      setRegion?.(initialRegion);
    } catch (e) {
      console.error("현재 위치 가져오기 실패:", e);
    }
  };

  // 위치 이름 가져오기
  const fetchLocationName = async ({ latitude, longitude }: Region) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const address =
          data.results[0]?.formatted_address || "주소를 찾을 수 없음";
        setLocationName?.(address);
      } else {
        setLocationName?.("알 수 없는 위치");
      }
    } catch (error) {
      console.error("주소 가져오기 실패:", error);
      setLocationName?.("주소를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (region) {
      fetchLocationName(region);
    }
  }, [region]);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          region={region}
          onRegionChangeComplete={changeRegion}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
        >
          <Marker coordinate={region}></Marker>
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>위치를 불러오는 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
