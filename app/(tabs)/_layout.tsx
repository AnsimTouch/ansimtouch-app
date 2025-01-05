import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="user" options={{ title: "User" }} />
      <Tabs.Screen name="addUser" options={{ title: "AddUser" }} />
      <Tabs.Screen name="Login" options={{ title: "Login" }}></Tabs.Screen>
      <Tabs.Screen
        name="Register"
        options={{ title: "Register" }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="ChangePassword"
        options={{ title: "ChangePassword" }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="ChangePhone"
        options={{ title: "ChangePhone" }}
      ></Tabs.Screen>
    </Tabs>
  );
}
