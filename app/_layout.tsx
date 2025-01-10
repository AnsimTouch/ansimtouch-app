import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locate from "./(tabs)/locate";
import Taxi from "./(tabs)/taxi";
import Emergency from "./(tabs)/emergency";
import ChangePassword from "./(tabs)/changePassword";
import ChangePhone from "./(tabs)/changePhone";
import Chat from "./(tabs)/chat";
import Home from "./(tabs)/home";
import Check from "./(tabs)/check";
import Alarm from "./(tabs)/Alarm";
const Stack = createStackNavigator();
import { AppState, AppStateStatus } from "react-native";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import Profile from "./(tabs)/Profile";
import Register from "./(tabs)/Register";
import Login from "./(tabs)/Login";
import ForgotPassword from "./(tabs)/ForgotPassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetMe } from "@/hooks/useGetMe";

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

  const { user, fetchUser } = useGetMe();
  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return null; // 로딩 중 정지해 놓기
  }

  return (
    <Stack.Navigator
      initialRouteName={
        user ? (user?.userType === "Protector" ? "Home" : "Check ") : "Login"
      }
    >
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Alarm"
        component={Alarm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Check"
        component={Check}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
