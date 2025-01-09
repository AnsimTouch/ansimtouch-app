import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";

interface locationProps {
  latitude: number;
  longitude: number;
}

interface mapProps {
  setLocationName?: (name: string) => void;
}

export default function Map({ setLocationName }: mapProps) {
  const [region, setRegion] = useState<Region>({
    latitude: 37.541,
    longitude: 126.986,
    latitudeDelta: 0.000001,
    longitudeDelta: 0.001,
  });

  const changeRegion = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const fetchLocationName = async ({ latitude, longitude }: locationProps) => {
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchLocationName({
      latitude: region.latitude,
      longitude: region.longitude,
    });
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
});
