import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./(tabs)/login";
import Register from "./(tabs)/register";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import ChangePassword from "./(tabs)/changePassword";
import ChangePhone from "./(tabs)/changePhone";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
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
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
