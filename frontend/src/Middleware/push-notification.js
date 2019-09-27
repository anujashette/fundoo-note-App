import firebase from 'firebase';
import { firebaseToken } from '../services/NoteService';
import config from '../config'
import {} from 'dotenv/config'

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: config.senderId
  });

  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askForPermissioToReceiveNotifications = async() => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token do usuário:', token);
      let notifyToken = {}
      notifyToken.notifylink = token
      console.log("notification token",notifyToken);
      firebaseToken(notifyToken)
      return token;
    } catch (error) {
      console.error(error);
    }
  }