import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
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
import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [isSigningUp, setIsSigningUp] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [verification_code, setVerification_code] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const closeModals = () => {
    setPendingVerification(false);
    setVerified(false);
    setCode("");
    setVerification_code(false);
  };

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsSigningUp(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsVerifying(true);
    setVerification_code(false);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification_code(false);
        router.replace("/(rout)/(tabs)/home");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification_code(true);
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification_code(true);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View>
      <>
        <ScrollView>
          <View className="relative w-full h-full">
            {/* Image en arrière-plan */}
            <Image
              source={images.gbConnection}
              className="absolute w-full h-full z-0"
            />

            <View className="flex-1 bg-white/90 z-10">
              <View className="relative w-full h-[210px]">
                <Image
                  source={images.signUp_Car}
                  className="z-0 w-full h-[210px]"
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
                    Créez votre compte
                  </Text>
                  <Text
                    style={{
                      textAlign: "justify",
                      lineHeight: 20,
                      letterSpacing: 0.5,
                    }}
                    className="text-white font-Jakarta mt-2 px-1 mb-3 "
                  >
                    Veuillez saisir vos informations pour créer votre{"\u00A0"}
                    compte.
                  </Text>
                </View>
              </View>
              <View className="p-5 h-full">
                <InputField
                  label="Nom"
                  placeholder="Entrez votre nom"
                  icon={icons.email}
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                  className="bg-white"
                />
                <InputField
                  label="Adresse e-mail"
                  placeholder="Entrez votre adresse e-mail"
                  icon={icons.email}
                  value={emailAddress}
                  onChangeText={(email) => setEmailAddress(email)}
                />
                <InputField
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  icon={icons.lock}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
                <CustomButton
                  title="Sign Up"
                  onPress={onSignUpPress}
                  className={`mt-6 ${isSigningUp ? "bg-gray-400" : ""}`}
                />

                {/* <OAuth /> */}

                <Link
                  href="/sign-in"
                  className="text-lg text-center text-general-200 mt-8 mb-5"
                >
                  <Text>Vous avez déjà un compte ? </Text>
                  <Text
                    className="text-primary-500"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Se connecter
                  </Text>
                </Link>
              </View>

              {/* Modal Verification */}
              <Modal isVisible={pendingVerification}>
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                  <TouchableOpacity
                    onPress={closeModals}
                    className="absolute top-1 right-1 z-10 bg-red-500 rounded rounded-tr-lg w-7 h-7 items-center justify-center"
                  >
                    <Text className="text-white text-sm">✕</Text>
                  </TouchableOpacity>
                  <View className="flex flex-row items-center mb-2">
                    <Image
                      source={icons.security}
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-2 relative bottom-[2px]"
                    />
                    <Text
                      style={{ letterSpacing: 0.8 }}
                      className="text-2xl font-JakartaExtraBold text-blue-900"
                    >
                      {/* Icône de sécurité */}
                      Vérification
                    </Text>
                  </View>
                  <View>
                    <Text className="font-Jakarta mb-5">
                      Un code de vérification a été envoyé à{" "}
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                      >
                        {emailAddress}
                      </Text>
                    </Text>
                  </View>

                  <InputField
                    label="Code"
                    placeholder="123456"
                    icon={icons.lock}
                    value={code}
                    keyboardType="numeric"
                    onChangeText={(code) => setCode(code)}
                    borderError={verification_code}
                  />

                  {verification_code && (
                    <Text className="text-red-500 text-sm mt-1 ml-3">
                      Code invalid
                    </Text>
                  )}

                  <CustomButton
                    title="Verify Email"
                    onPress={onVerifyPress}
                    className={`mt-6 ${
                      isVerifying ? "bg-gray-400" : "bg-success-500 "
                    }`}
                    disabled={isVerifying}
                  />
                </View>
              </Modal>

              {/* Modal Verified */}
              <Modal isVisible={verified}>
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                  <TouchableOpacity
                    onPress={closeModals}
                    className="absolute top-1 right-1 z-10 bg-red-500 rounded rounded-tr-lg w-7 h-7 items-center justify-center"
                  >
                    <Text className="text-white text-sm">✕</Text>
                  </TouchableOpacity>
                  <Image
                    source={images.checkDocument}
                    className="w-[110px] h-[110px] mx-auto my-5 bg-green-100 py-2 px-8 rounded-lg"
                  />
                  <Text
                    style={{ letterSpacing: 0.8 }}
                    className="text-3xl font-JakartaBold text-center"
                  >
                    Vérifié
                  </Text>
                  <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                    Votre compte a été vérifié avec succès
                  </Text>
                  <CustomButton
                    title="Commencer à explorer"
                    onPress={() => router.replace("/(rout)/(tabs)/home")}
                    className="mt-6"
                  />
                </View>
              </Modal>

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
                    {/* <Text>{errorMessage}</Text> */}
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
    </View>
  );
}
