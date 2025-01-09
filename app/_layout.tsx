import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locate from "./(tabs)/locate";
import Taxi from "./(tabs)/taxi";
import Emergency from "./(tabs)/emergency";

const Stack = createStackNavigator();
import { Alert, AppState, AppStateStatus } from "react-native";

export default function RootLayout() {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("앱이 포어그라운드로 전환됨");
        Alert.alert("앱이 백그라운드로 전니다");
      } else if (nextAppState === "background") {
        console.log("앱이 백그라운드로 전환됨");
        Alert.alert("앱이 백그라운드로 전환되었습니다");
      }
      setAppState(nextAppState);
    };

    // 앱 상태 변경 이벤트 리스너 추가
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove(); // 이벤트 리스너 제거
    };
  }, [appState]);

  return (
    <Stack.Navigator initialRouteName="Taxi">
      <Stack.Screen
        name="Locate"
        component={Locate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Taxi"
        component={Taxi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
