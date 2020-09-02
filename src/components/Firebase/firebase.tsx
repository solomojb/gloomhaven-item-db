import app from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDZjS32Jz6XHm56VxxvUyJHmdgEPFBvyU4",
    authDomain: "gloomhaven-item-db-db.firebaseapp.com",
    databaseURL: "https://gloomhaven-item-db-db.firebaseio.com",
    projectId: "gloomhaven-item-db-db",
    storageBucket: "gloomhaven-item-db-db.appspot.com",
    messagingSenderId: "1055959523566",
    appId: "1:1055959523566:web:c9e9dd38591be00ea493ff"
  };


  class Firebase {
    auth: app.auth.Auth;
    constructor() {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email: string , password: string) => 
      this.auth.createUserWithEmailAndPassword(email, password);
    
 
  doSignInWithEmailAndPassword = (email: string, password: string) => 
    this.auth.signInWithEmailAndPassword(email, password);
    
  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = (password: string) =>{
    if (!this.auth.currentUser)
      return;
    return this.auth.currentUser.updatePassword(password);
  }

    doSignInAsAnonymousUser = () => {
      this.auth.signInAnonymously().catch(error => {
        console.log(error);
      })
    }
  }

  
  export default Firebase;
