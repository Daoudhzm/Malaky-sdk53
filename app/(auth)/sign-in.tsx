import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const errorTranslations: Record<string, string> = {
  "Enter password.": "Veuillez entrer votre mot de passe.",
  "`identifier` is required when `strategy` is `password`.":
    "Un email est requis pour la connexion par mot de passe.",
  "Identifier is invalid.":
    "Identifiants invalides. Vérifiez votre email et mot de passe.",
  "Couldn't find your account.": "Aucun compte trouvé avec ces informations.",
  "The verification strategy is not valid for this account":
    "Vous ne pouvez pas vous connecter avec un email et mot de passe car votre compte est associé à la connexion via Google Authentification.",
};

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(rout)/(tabs)/home");
      } else {
        // console.error("Sign-in step incomplete:", signInAttempt);
        Alert.alert("Erreur", "Veuillez finaliser la connexion.");
        // console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setShowAlertDialog(true);
      const firstError =
        err?.errors?.[0]?.longMessage || "Une erreur est survenue.";
      const translatedError = errorTranslations[firstError] || firstError;
      setErrorMessage(translatedError);
      // console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signUp_Car}
              className="z-0 w-full h-[250px]"
              style={{
                shadowColor: "white",
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
              }}
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "transparent"]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.4 }}
              className="absolute bottom-0 left-0 right-0 h-24"
            />
            <View className="absolute bottom-0 pl-5 w-full bg-black/70 py-1">
              <Text className="text-2xl text-white font-JakartaSemiBold ">
                Bienvenue
              </Text>
              <Text
                style={{
                  textAlign: "justify",
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}
                className="text-white font-Jakarta mt-2 px-1 mb-3 "
              >
                Identifiez-vous par formulaire ✍️ ou avec{"\u00A0"}Google
              </Text>
            </View>
          </View>
          <View className="p-5">
            <View className="flex flex-row items-start bg-orange-50 border border-orange-500 rounded py-1 px-1 w-full">
              <MaterialIcons
                name="info-outline"
                size={22}
                color="#DC2626"
                className="relative top-[1px]"
              />
              <Text className="text-red-950 text-base px-1">
                Veuillez utiliser la même méthode que celle choisie lors de
                votre{"\u00A0"}inscription.
              </Text>
            </View>

            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={emailAddress}
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className={`mt-6 ${isSigningIn ? "bg-gray-400" : ""}`}
            />

            <OAuth />

            <Link
              href="/sign-up"
              className="text-lg text-center text-general-200 mt-8 mb-5"
            >
              <Text>Vous n’avez pas encore de compte? </Text>
              <Text
                style={{ textDecorationLine: "underline" }}
                className="text-primary-500"
              >
                S’inscrire
              </Text>
            </Link>

            <AlertDialog
              isOpen={showAlertDialog}
              onClose={handleClose}
              size="md"
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Text className="text-typography-950 font-semibold">
                    Erreur
                  </Text>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                  <Text>{errorMessage}</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={handleClose}
                    size="sm"
                    className="border border-red-200"
                  >
                    <ButtonText>Annuler</ButtonText>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
