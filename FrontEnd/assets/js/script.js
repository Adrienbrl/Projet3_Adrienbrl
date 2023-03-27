const figures = [];

const filtersBtn = document.querySelectorAll(".filters-btn");
const all = document.querySelector(".all");
const galleryGrid = document.querySelector(".gallery");
const galleryGridModal = document.querySelector(".container-img-modal");
const loginText = document.querySelector(".login-text");
const logoutText = document.querySelector(".logout-text");
const openModalText = document.querySelector(".open-modal");
const filtersProjects = document.querySelector(".filters-projects");
const editionMode = document.querySelector(".edition-mode");
const editIcon = document.querySelector(".edit-icon");

const worksApi = "http://localhost:5678/api/works";

if(sessionStorage.getItem("token")) {
  loginText.style.display = "none"
  logoutText.style.display = "block"
  openModalText.style.display = "block"
  filtersProjects.style.display = 'none'
  editionMode.style.display = "flex"
  editIcon.style.display = "block"
} else {
  loginText.style.display = "block"
  logoutText.style.display = "none"
  openModalText.style.display = "none"
  filtersProjects.style.display = 'flex'
  editionMode.style.display = "none"
  editIcon.style.display = "none"
}

const logout = () => {
  sessionStorage.removeItem("token")
  window.location.reload()
}

const getWorks = async() => {
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

const deleteProject = async (event) => {
  try {
    const workId = event.target.classList[0];
    const url = `http://localhost:5678/api/works/${workId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    });

    if (response.ok) {
      console.log(`L'élément avec l'ID ${workId} a été supprimé avec succès.`);
    } else {
      console.error('Erreur lors de la suppression de l\'élément:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément:', error);
  }
};

const getWorkModal = async() => {
  try {
    const response = await fetch(worksApi);
    const data = await response.json();
    const divCategory = document.getElementById('category')
    const selectorCategory = document.createElement('select')
    selectorCategory.setAttribute('id', "selectorCategory")
    divCategory.appendChild(selectorCategory)
    let uniqueCategories = data.map(item => ({id: item.category.id, name: item.category.name}))
                         .filter((value, index, self) => 
                             self.findIndex(item => item.id === value.id && item.name === value.name) === index);
      uniqueCategories.map((item) => {
        const option = document.createElement("option");
        option.setAttribute("value", item.id);
        option.text = item.name;
        selectorCategory.appendChild(option);
      })

    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const containerBin = document.createElement('div')
      const bin = document.createElement('img')
      const container = document.createElement('div')

      figure.setAttribute("class", "works");
      figure.setAttribute("class", data[i].category.name);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute('width', '100px');
      img.setAttribute('height', '100px');
      img.setAttribute("crossorigin", "anonymous");
      bin.setAttribute("src", "./assets/icons/bin.svg")
      bin.setAttribute('class', "bin")
      bin.setAttribute("alt", "bin")
      container.setAttribute("class", "container")
      containerBin.setAttribute('class', "delete-icon")
      bin.setAttribute("class", data[i].id);
      bin.addEventListener("click", deleteProject);
      container.appendChild(img)
      container.appendChild(containerBin)
      containerBin.appendChild(bin)
      figure.append(container);
      galleryGridModal.append(figure);

      figures.push(figure)

    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}


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