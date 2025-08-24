import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={"/(rout)/(tabs)/home"} />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
