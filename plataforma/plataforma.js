
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
    window.location.href = "../login/login.html";
  } else {
    userAtual = user;
    document.getElementById("userEmail").textContent = user.email;
    carregarProjetos();
  }
});


function logout() {
  signOut(auth).then(() => {
    window.location.href = "../login/login.html";
  });
}

window.logout = logout;


document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!userAtual) {
    console.log("Usuário ainda não carregou");
    return;
  }

  const nome = document.getElementById("nomeProjeto").value;
  const creditos = document.getElementById("creditos").value;

  if (!nome || !creditos) return;

  try {

    await addDoc(collection(db, "projetos"), {
      nome: nome,
      creditos: Number(creditos),
      userId: userAtual.uid,
      criadoEm: new Date()
    });

    document.getElementById("projectForm").reset();

    carregarProjetos();

  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
});



let chart = null;

async function carregarProjetos() {
  try {
    if (!userAtual) return;

    const lista = document.getElementById("listaProjetos");
    lista.innerHTML = "Carregando...";

    const q = query(
      collection(db, "projetos"),
      where("userId", "==", userAtual.uid)
    );

    const snapshot = await getDocs(q);

    lista.innerHTML = "";

    let totalCreditos = 0;
    let totalProjetos = snapshot.size;

    const nomes = [];
    const valores = [];

    snapshot.forEach(doc => {
      const data = doc.data();

      totalCreditos += data.creditos;

      nomes.push(data.nome);
      valores.push(data.creditos);

      lista.innerHTML += `
        <div class="projeto">
          <strong>${data.nome}</strong><br>
          Créditos: ${data.creditos}
        </div>
      `;
    });

   
    document.getElementById("totalCreditos").textContent = totalCreditos;
    document.getElementById("totalProjetos").textContent = totalProjetos;

    const media = totalProjetos > 0 ? (totalCreditos / totalProjetos).toFixed(1) : 0;
    document.getElementById("mediaCreditos").textContent = media;

    if (snapshot.empty) {
      lista.innerHTML = "Nenhum projeto ainda.";
    }

    
    const ctx = document.getElementById("grafico");

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: nomes,
        datasets: [{
          label: "Créditos por Projeto",
          data: valores
        }]
      },
      options: {
        responsive: true
      }
    });

  } catch (error) {
    console.log("Erro ao carregar:", error);
  }
}