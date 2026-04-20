const firebaseConfig = {
  apiKey: "AIzaSyB3BogFx31JZoky_39uU95eyFhljZoc4ig",
  authDomain: "carbontrack-62e14.firebaseapp.com",
  projectId: "carbontrack-62e14",
  storageBucket: "carbontrack-62e14.firebasestorage.app",
  messagingSenderId: "891363379337",
  appId: "1:891363379337:web:6fa7d4f3b919b7a76cde58",
  measurementId: "G-TPCBRYM1V2"
};



const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const erroGeral = document.getElementById("erroGeral");

const toggleSenha = document.getElementById("toggleSenha");

// mostrar ou ocultar a senha
toggleSenha.addEventListener("click", () => {
  senhaInput.type = senhaInput.type === "password" ? "text" : "password";
});

// pra validar o email
function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}


import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  let valido = true;

  document.querySelectorAll(".erro").forEach(e => e.textContent = "");
  erroGeral.textContent = "";

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!email) {
    emailInput.nextElementSibling.textContent = "Digite seu email";
    valido = false;
  } else if (!validarEmail(email)) {
    emailInput.nextElementSibling.textContent = "Email inválido";
    valido = false;
  }

  if (!senha) {
    senhaInput.parentElement.querySelector(".erro").textContent = "Digite sua senha";
    valido = false;
  } else if (senha.length < 6) {
    senhaInput.parentElement.querySelector(".erro").textContent = "Mínimo 6 caracteres";
    valido = false;
  }

  if (!valido) return;

  try {
    await signInWithEmailAndPassword(window.auth, email, senha);

    if (document.getElementById("lembrar").checked) {
      localStorage.setItem("usuario", email);
    }

    window.location.href = "../plataforma/plataforma.html";

  } catch (error) {
    erroGeral.textContent = "Email ou senha inválidos";
  }
});

