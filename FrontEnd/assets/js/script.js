const gallery = document.querySelector(".gallery");

let tonApi = "http://localhost:5678/api/works";

async function getWorks() {
    try {
        response = await fetch(tonApi);
        works = await response.json();

        for (let i in works) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption"); 

            img.setAttribute("src", works[i].imageUrl);
            img.setAttribute("alt", works[i].title);
            img.setAttribute("cross-origin", "anonymous");

            figcaption.innerHTML = works[i].title;

            figure.append(img, figcaption);
            gallery.append(figure);
               }
  } catch (error) {
    console.error(" Attention il y a une erreur");
  }
}

getWorks();