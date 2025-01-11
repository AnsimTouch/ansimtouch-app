import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import * as Location from "expo-location";

interface mapProps {
  setLocationName?: (name: string) => void;
  setRegion?: (region: Region) => void;
  initialRegion: Region; // 초기 지도 중심
}

export default function Map({
  setLocationName,
  setRegion,
  initialRegion,
}: mapProps) {
  const [region, setLocalRegion] = useState<Region>(initialRegion);

  const changeRegion = (newRegion: Region) => {
    setLocalRegion(newRegion);
    setRegion?.(newRegion);
  };

  const fetchLocationName = async ({ latitude, longitude }: Region) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCL57ujUQIFfI1nLM6AIzdqvv1ovQd301A`
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
    fetchLocationName(region);
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={changeRegion}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
      >
        <Marker coordinate={region}></Marker>
      </MapView>
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
