// import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
// import { useEffect } from "react";

const Layout = () => {
  // const { isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     router.replace("/(auth)/sign-in");
  //   }
  // }, [isSignedIn]);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="find-ride" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="confirm-ride" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="ride-payment" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="driver-details" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="scanner" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen
          name="driver-zone/info-driver"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="driver-zone/dashboard/info-dashoard"
          options={{ headerShown: false }}
        /> */}
      </Stack>
    </>
  );
};

export default Layout;
