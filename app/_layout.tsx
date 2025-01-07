import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Locate from "./(tabs)/locate";
import Taxi from "./(tabs)/taxi";
import Emergency from "./(tabs)/emergency";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Taxi">
      <Stack.Screen
        name="Locate"
        component={Locate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Taxi"
        component={Taxi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
