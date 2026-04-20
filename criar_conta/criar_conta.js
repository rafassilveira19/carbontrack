import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const form = document.getElementById("registerForm");
const erroGeral = document.getElementById("erroGeral");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll(".erro").forEach(e => e.textContent = "");
  erroGeral.textContent = "";

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmarSenha").value.trim();

  let valido = true;

  if (!email) {
    document.querySelectorAll(".erro")[0].textContent = "Digite o email";
    valido = false;
  }

  if (senha.length < 6) {
    document.querySelectorAll(".erro")[1].textContent = "Mínimo 6 caracteres";
    valido = false;
  }

  if (senha !== confirmar) {
    document.querySelectorAll(".erro")[2].textContent = "Senhas não coincidem";
    valido = false;
  }

  if (!valido) return;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);

    alert("Conta criada com sucesso!");

    window.location.href = "/login/login.html";

  } catch (error) {
    erroGeral.textContent = "Erro ao criar conta (email pode já existir)";
  }
});