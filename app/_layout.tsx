import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./(tabs)/chat";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
