import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function RootLayout() {
  return <Stack.Navigator initialRouteName="Home"></Stack.Navigator>;
}
