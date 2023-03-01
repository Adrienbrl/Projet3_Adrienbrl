const figures = [];

const filtersBtn = document.querySelectorAll(".filters-btn");
const all = document.querySelector(".all");

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
      figure.setAttribute("class", data[i].category.name);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = data[i].title;

      figure.append(img, figcaption);
      galleryGrid.append(figure);

      figures.push(figure)

    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}

getWorks();






for (let btn of filtersBtn) {
   btn.addEventListener("click", function () {
    for (let e of filtersBtn) {
        e.classList.remove("active");
    }
    btn.classList.add("active");

    for (let figure of figures){
      console.log(figure.getAttribute('class'),btn.getAttribute("class").includes(figure.getAttribute('class')))
    if (btn.getAttribute("class").includes(figure.getAttribute('class'))){
        figure.style.display="block"
    } else if (btn=== all){ 
        figure.style.display="block"
    } else{figure.style.display="none"}
  }
    })

}