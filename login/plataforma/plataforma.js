
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3BogFx31JZoky_39uU95eyFhljZoc4ig",
  authDomain: "carbontrack-62e14.firebaseapp.com",
  projectId: "carbontrack-62e14",
  storageBucket: "carbontrack-62e14.firebasestorage.app",
  messagingSenderId: "891363379337",
  appId: "1:891363379337:web:6fa7d4f3b919b7a76cde58",
  measurementId: "G-TPCBRYM1V2"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userAtual = null;



onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login.html";
  } else {
    userAtual = user;
    document.getElementById("userEmail").textContent = user.email;
    carregarProjetos();
  }
});


function logout() {
  signOut(auth).then(() => {
    window.location.href = "../login.html";
  });
}

window.logout = logout;


window.calcularCarbono = function () {
  const energia = +document.getElementById('energia').value || 0;
  const diesel = +document.getElementById('diesel').value || 0;
  const gasolina = +document.getElementById('gasolina').value || 0;
  const transporte = +document.getElementById('transporte').value || 0;

  const total =
    energia * 0.084 +
    diesel * 2.68 +
    gasolina * 2.31 +
    transporte * 0.192;

  const creditos = total / 1000;

  document.getElementById('resultadoCalc').innerHTML = `
    <strong>Total:</strong> ${total.toFixed(2)} kg CO₂<br>
    <strong>Créditos:</strong> ${creditos.toFixed(2)}
  `;
};
