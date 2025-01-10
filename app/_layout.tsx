import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState, AppStateStatus } from "react-native";
import Locate from "./(tabs)/locate";
import Taxi from "./(tabs)/taxi";
import Emergency from "./(tabs)/emergency";
import ChangePassword from "./(tabs)/changePassword";
import ChangePhone from "./(tabs)/changePhone";
import Chat from "./(tabs)/chat";
import Home from "./(tabs)/home";
import Check from "./(tabs)/check";
import Alarm from "./(tabs)/Alarm";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import Profile from "./(tabs)/Profile";
import Register from "./(tabs)/Register";
import Login from "./(tabs)/Login";
import ForgotPassword from "./(tabs)/ForgotPassword";
import { useGetLocation } from "@/hooks/useGetLoc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";
import axios from "axios";

const Stack = createStackNavigator();

export default function RootLayout() {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );
  const { location, updateLocation } = useGetLocation();
  const day = new Date();

  const onUserState = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${SERVER_URL}/user/status`,
        {
          lastUpdatedAt: day,
          lastLocationLa: location?.latitude,
          lastLocationLo: location?.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        console.log("보내기 성공");
      }
    } catch (e) {
      console.log("실패");
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // 포어그라운드
        updateLocation();
      } else if (nextAppState === "background") {
        // 백그라운드
        onUserState();
        console.log("dkssud");
        console.log(day);
      }
      setAppState(nextAppState);
    };

    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove();
    };
  }, [appState, updateLocation]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateLocation, location]);

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
