import * as AuthSession from "expo-auth-session";
import { fetchAPI } from "./fetch";

export const googleOAuth = async (
  startSSOFlow: any,
  expoPushToken?: string
) => {
  try {
    const { createdSessionId, setActive, signUp } = await startSSOFlow({
      strategy: "oauth_google",
      redirectUrl: AuthSession.makeRedirectUri(),
    });

    // If sign in was successful, set the active session
    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          const firstName =
            signUp?.firstName ||
            signUp?.emailAddresses[0].emailAddress.split("@")[0];

          await fetchAPI("/(api)/user/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: firstName,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
              expoPushToken: expoPushToken,
            }),
          });
        }
        return {
          success: true,
          code: "session_exists",
          message: "You have successfully authentificated",
        };
      }
    }
    return {
      success: false,
      code: "success",
      message: "An error occurred",
    };
  } catch (error: any) {
    console.log("Error: ", error);
    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};
