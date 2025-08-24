import { icons } from "@/constants";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
// import { usePushNotifications } from "@/lib/usePushNotification";

const OAuth = () => {
  const { isSignedIn } = useAuth();
  // const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    WebBrowser.maybeCompleteAuthSession();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const handleGooleSignIn = useCallback(async () => {
    try {
      if (isSignedIn) {
        router.push("/(rout)/(tabs)/home");
        return;
      }

      // const result = await googleOAuth(startSSOFlow, expoPushToken);

      // if (result.code === "session_exists" || result.success) {
      //   router.push("/(rout)/(tabs)/home");
      //   return;
      // }

      // Si aucune session valide : afficher une erreur
      // alert(result.message || "An unexpected error occurred.");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      alert(err.message || "An unexpected error occurred.");
    }
  }, [isSignedIn]);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Se connecter avec Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGooleSignIn}
      />
    </View>
  );
};

export default OAuth;
