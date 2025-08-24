import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    } else {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <View className="flex h-full items-center justify-between bg-white">
      {/* Bouton Passer */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold bg-slate-100 pb-[2px] px-2 rounded">
          Passer
        </Text>
      </TouchableOpacity>

      {/* Slides avec FlatList */}
      <FlatList
        ref={flatListRef}
        data={onboarding}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image
              source={item.image}
              style={{ width: "100%", height: 350 }}
              contentFit="cover"
            />
            <View className="relative -top-8">
              <View className="flex flex-row items-center justify-center w-full mt-10">
                <Text className="text-black text-3xl font-bold mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex flex-row items-center justify-center mt-4">
        {onboarding.map((_, i) => (
          <View
            key={i}
            className={`h-1 mx-1 rounded-full ${
              i === activeIndex
                ? "bg-[#0286FF] w-[32px]"
                : "bg-[#E2E8F0] w-[32px]"
            }`}
          />
        ))}
      </View>

      {/* Bouton suivant / commencer */}
      <CustomButton
        title={isLastSlide ? "Commencer" : "Suivant"}
        onPress={handleNext}
        className="w-11/12 mt-10 mb-8 rounded-md"
      />
    </View>
  );
};

export default Onboarding;
