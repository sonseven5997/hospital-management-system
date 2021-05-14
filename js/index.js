window.onload = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDKqCLHZLWdy3N-KZTW8IUQ69ckFZrETVU",
    authDomain: "hospital-management-syst-fcc91.firebaseapp.com",
    projectId: "hospital-management-syst-fcc91",
    storageBucket: "hospital-management-syst-fcc91.appspot.com",
    messagingSenderId: "504878865822",
    appId: "1:504878865822:web:52da64d410674dfa208a8f",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app().name)
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      firebase.firestore().collection("users")
          .where("id", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data());
              model.currentUser = doc.data()
            });
          }).then(() => {
            view.setActiveScreen('mainScreen')
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
    } else {
      // No user is signed in.
      view.setActiveScreen("registerScreen");
    }
  });
};
