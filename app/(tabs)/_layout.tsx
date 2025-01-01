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
    </Tabs>
  );
}
