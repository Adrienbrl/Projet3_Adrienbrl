const formulaire = document.querySelector("form");
const emailInput = document.getElementById ("email");
const passwordInput = document.getElementById ("password");
const errorDiv = document.querySelector(".error-login");

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
        email: emailInput.value,
        password: passwordInput.value,
      }),
    };
    try {
      const response = await fetch (logsApi, fetchInit);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        location.href = "index.html";
      } else if (response.status === 401) {
          errorDiv.style.display = 'block';
          errorDiv.innerText = 'Mot de passe incorrect'
          console.log("Mot de passe incorrect");
      }   else if (response.status === 404) {
           errorDiv.style.display = 'block';
          errorDiv.innerText = 'Mot de passe et/ou identifiant incorrect'
          console.log("Mot de passe et/ou identifiant incorrect");
      }
    } catch (error) {
      console.error("Warning : " + error);
    }
});