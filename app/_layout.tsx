import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locate from "./(tabs)/locate";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Locate"
        component={Locate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
