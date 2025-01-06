import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";

export default function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 37.541,
    longitude: 126.986,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const changeRegion = (newRegion: Region) => {
    setRegion(newRegion);
    console.log(region);
  };

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
