import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Gabriel',
    'user_email': 'gabriel@email.com'
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cartItemsCount', itemsCount)
}