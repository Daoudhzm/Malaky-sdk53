import { icons } from "@/constants";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <View className="ml-14">
      <Text>Home</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        className=" justify-center items-center w-10 h-10 rounded-full bg-white"
      >
        <Image source={icons.out} className="w-4 h-4" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
