import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./(tabs)/home";
import Check from "./(tabs)/check";
import Alarm from "./(tabs)/Alarm";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
