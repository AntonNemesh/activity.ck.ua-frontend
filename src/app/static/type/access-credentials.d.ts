declare var ACCESS_CREDENTIALS: IAccessCredentials;

interface IAccessCredentials {
  FIREBASE_OPTIONS: string;
}

interface IFirebaseOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
