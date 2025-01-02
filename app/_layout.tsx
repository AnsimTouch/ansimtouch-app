import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Emergency from "./(tabs)/emergency";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
