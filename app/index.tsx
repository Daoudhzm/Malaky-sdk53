import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View className="flex h-full items-center justify-between bg-white">
      {/* Bouton "Passer" */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold bg-slate-100 pb-[2px] px-2 rounded">
          Passer
        </Text>
      </TouchableOpacity>

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        width={width}
        height={500}
        data={onboarding}
        loop={false} // 👈 pas de boucle infinie
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress; // 👈 clé pour les dots
          setActiveIndex(Math.round(absoluteProgress));
        }}
        renderItem={({ item }) => (
          <View className="flex items-center">
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

      {/* Pagination synchronisée */}
      <Pagination.Basic
        progress={progress}
        data={onboarding}
        dotStyle={{
          backgroundColor: "#E2E8F0",
          borderRadius: 50,
          width: 32,
          height: 6,
        }}
        activeDotStyle={{ backgroundColor: "#0286FF" }}
        containerStyle={{ gap: 8, marginVertical: 10 }}
      />

      {/* Bouton suivant */}
      <CustomButton
        title={isLastSlide ? "Commencer" : "Suivant"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : carouselRef.current?.scrollTo({
                count: 1,
                animated: true,
              })
        }
        className="w-11/12 mt-10 mb-8"
      />
    </View>
  );
};

export default Onboarding;
