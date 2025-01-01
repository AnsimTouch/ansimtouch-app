import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { createStackNavigator } from "@react-navigation/stack";

import User from "./(tabs)/user";
import AddUser from "./(tabs)/addUser";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();
export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
