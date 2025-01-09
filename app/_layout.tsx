import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locate from "./(tabs)/locate";
import Taxi from "./(tabs)/taxi";
import Emergency from "./(tabs)/emergency";
import ChangePassword from "./(tabs)/changePassword";
import ChangePhone from "./(tabs)/changePhone";
import Chat from "./(tabs)/chat";
const Stack = createStackNavigator();
import { Alert, AppState, AppStateStatus } from "react-native";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import Profile from "./(tabs)/profile";
import Register from "./(tabs)/register";
import Login from "./(tabs)/login";
import ForgotPassword from "./(tabs)/forgotPassword";

export default function RootLayout() {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("앱이 포어그라운드로 전환됨");
      } else if (nextAppState === "background") {
        console.log("앱이 백그라운드로 전환됨");
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
    <Stack.Navigator initialRouteName="Login">
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
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
