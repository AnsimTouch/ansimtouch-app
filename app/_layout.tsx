import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./(tabs)";
import Login from "./(tabs)/Login";
import Register from "./(tabs)/Register";
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
    </Stack.Navigator>
  );
}
