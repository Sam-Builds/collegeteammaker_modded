const firebaseConfig = {
  apiKey: "AIzaSyAG6s_6G6vfREd0EJFkIAZFo611XXbgWOw",
  authDomain: "collegeteammaker.firebaseapp.com",
  projectId: "collegeteammaker",
  storageBucket: "collegeteammaker.firebasestorage.app",
  messagingSenderId: "858054620144",
  appId: "1:858054620144:web:bd946512a27c19179f2335"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUserData = null;

auth.onAuthStateChanged(async (user) => {
   if (user) {
    const doc = await db.collection('Users').doc(user.uid).get();
    currentUserData = doc.data();
    
    const needsSecondStep = !currentUserData.isAdmin && 
                           (!currentUserData.admissionNumber || currentUserData.admissionNumber === "");
    
    localStorage.setItem(
        "currentUser",
        JSON.stringify({
            ...user,
            ...currentUserData,
            isAdmin: currentUserData.isAdmin || false, 
            completedSecondStep: needsSecondStep
        })
    );
    } else {
        localStorage.removeItem('currentUser');
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('user_')) {
                localStorage.removeItem(key);
            }
        });
        //window.location.href = 'login.html';
    }
});