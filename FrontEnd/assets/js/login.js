const formulaire = document.querySelector("form");
const email = document.getElementById ("mail");
const password = document.getElementById ("password");
const errorConnect =document.querySelector (".error-connect");

formulaire.addEventListener("submit", async function(event){
    event.preventDefault()

    const logsApi = "http://localhost:5678/api/users/login";
    const fetchInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    };
    try {
      const response = await fetch (logsApi, fetchInit);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        location.href = "index.html";
      } if (response.status === 401) {
          errorConnect.console.log("Mot de passe incorrect");
      }   else if (response.status === 404) {
          errorConnect.console.log("Mot de passe et/ou identifiant incorrect");
      }
    } catch (error) {
      console.error("Warning : " + error);
    }
});