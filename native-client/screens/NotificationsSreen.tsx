import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// https://expo.dev/notifications -> pour faire des tests d'envoi de notifs
async function registerForPushNotificationsAsync() {
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

export default function NotificationsSreen() {

  // stocke le token
  const [expoPushToken, setExpoPushToken] = useState('');
  // stocke la notif
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token || "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* affiche le token à l'ecran */}
      <Text>Your expo push token: {expoPushToken}</Text>
      {/* affiche infos de la notif */}
      <View style={styles.notif}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  notif: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
})