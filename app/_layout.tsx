import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./(tabs)/Login";
import Register from "./(tabs)/Register";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
