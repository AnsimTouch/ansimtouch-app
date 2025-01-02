import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddUser from "./(tabs)/addUser";
import User from "./(tabs)/user";
import NotFound from "./(tabs)/notFound";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function RootLayout() {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const routeNames = e.data.state.routeNames;
      const currentRoute = e.data.state.routes[e.data.state.index].name;

      if (!routeNames.includes(currentRoute)) {
        navigation.navigate("NotFound");
      }
    });

    return unsubscribe;
  }, [navigation]);

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
