import { useEffect } from "react";
import { StatusBar } from "react-native";
import OneSignal from "react-native-onesignal";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

import { CartContextProvider } from "./src/contexts/CartContext";

OneSignal.setAppId("ed3fe0b5-9a8f-49e9-8059-77fe4c6062ac");
OneSignal.setEmail("gabriel@email.com");
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any;

      switch (actionId) {
        case "1":
          console.log("Ver todas");
        case "2":
          console.log("Ver pedido");
        default:
          return console.log("Não foi clicado em botão de ação");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
