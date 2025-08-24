// import "react-native-get-random-values";
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { Slot } from 'expo-router'

// import { useColorScheme } from "@/hooks/useColorScheme";

import "@/global.css";

import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
// import { ToastProvider } from "@/components/Toast";
// import { DriverLocationTracker } from "@/components/DriverLocationTracker";
// import { RefreshProvider } from "@/components/RefreshContext";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
//   unsavedChangesWarning: false,
// });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const backgroundColor = colorScheme === "dark" ? "#000" : "#fff";
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        // backgroundColor={backgroundColor}
        translucent
      />
      {/* <ClerkProvider tokenCache={tokenCache}> */}
      {/* <ToastProvider position="top"> */}
      {/* <GluestackUIProvider> */}
      {/* <ConvexProvider client={convex}> */}
      <SafeAreaView className="flex flex-1">
        {/* <DriverLocationTracker /> */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(rout)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
      {/* </ConvexProvider> */}
      {/* </GluestackUIProvider> */}
      {/* </ToastProvider> */}
      {/* </ClerkProvider> */}
    </>
  );
}
