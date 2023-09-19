import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

// https://expo.dev/notifications -> pour faire des tests d'envoi de notifs
export async function registerForPushNotificationsAsync() {
    let token;
    //verification que l'on est sur un device physique (ne fonctionne pas sur emulateur)
    if (Device.isDevice) {
      // demande de permission de notifier à l'utilisateur
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      // cas de refus, on redemande une 2eme fois
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // 2eme refus, on renvoi une erreur
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // pas de refus, on a les permissions et on recupere le token
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("expoToken : ", token);
    } else {
      // erreur renvoyé si on est pas sur le device physique
      alert('Must use physical device for Push Notifications');
    }
  
    // config suplémentaire spécifique a android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }