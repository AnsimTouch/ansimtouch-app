import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./(tabs)";
Index;

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
