import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import NotFound from "./(tabs)/notFound";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
