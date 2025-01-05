import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./(tabs)/home";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
