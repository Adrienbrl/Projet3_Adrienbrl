const galleryGrid = document.querySelector(".gallery");

const worksApi = "http://localhost:5678/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    const data = await response.json();

    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      figure.setAttribute("class", "works");
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = data[i].title;

      figure.append(img, figcaption);
      galleryGrid.append(figure);

    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}

getWorks();