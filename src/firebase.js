 // Import the functions you need from the SDKs you need

 import { initializeApp } from "firebase/app";

 import { getDatabase, ref, onValue, onDisconnect, update, } from "firebase/database";
 import {serverTimestamp as dbServerTimestamp} from "firebase/database";
 import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc, 
    //serverTimestamp, 
    arrayUnion
  } from "firebase/firestore";

  import {serverTimestamp as firestoreServerTimestamp, set as firestoreSet} from "firebase/firestore";


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAxtpvdS-Gxm9j5-XiXBujgQvRRQXskGlA",
    authDomain: "bulls-trading-dev.firebaseapp.com",
    databaseURL: "https://bulls-trading-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bulls-trading-dev",
    storageBucket: "bulls-trading-dev.appspot.com",
    messagingSenderId: "264804398696",
    appId: "1:264804398696:web:76ae8b39a577b76633addd",
    measurementId: "G-3JB06GZFQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const firestore = getFirestore(app);

export const dbRealTime = getDatabase(app);

export const rtdb_and_local_fs_presence = (uid) => {
    var userStatusDatabaseRef = ref(dbRealTime, '/status/' + uid);

    var isOfflineForDatabase = {
        state: 'offline',
        last_changed: dbServerTimestamp(),
    };

    var isOnlineForDatabase = {
        state: 'online',
        last_changed: dbServerTimestamp(),
    };

    // [END_EXCLUDE]
    var userStatusFirestoreRef = doc(firestore, 'promotion_confetti_user_status', uid);

    // Firestore uses a different server timestamp value, so we'll 
    // create two more constants for Firestore state.
    var isOfflineForFirestore = {
        state: 'offline',
        last_changed: firestoreServerTimestamp(),
    };

    var isOnlineForFirestore = {
        state: 'online',
        last_changed: firestoreServerTimestamp(),
    };

    var connectRef = ref(dbRealTime, '.info/connected');
    onValue(connectRef, (snapshot) => {
        
        if (snapshot.val() == false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to 'offline'. This ensures that our Firestore cache is aware
            // of the switch to 'offline.'
            updateDoc(userStatusFirestoreRef, isOfflineForFirestore);
            console.log('offline');
            return;
        };
        console.log('online');

      });

    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(function() {
        console.log('onDisconnect');

        update(userStatusDatabaseRef, isOnlineForDatabase);

        updateDoc(userStatusFirestoreRef, isOnlineForFirestore);
    });

    const presenceRef = ref(dbRealTime, "disconnectmessage");
    // Write a string when this client loses connection
    onDisconnect(presenceRef).set("I disconnected!");
};