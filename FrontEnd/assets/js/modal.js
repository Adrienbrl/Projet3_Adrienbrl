const openModal = document.querySelector(".open-modal")
const modal = document.querySelector(".modal")
const figureStyle = document.querySelector("figcaption")
const stepModal0 = document.querySelector(".step-0-modal")
const stepModal1 = document.querySelector(".step-1-modal")
const imageReplace = document.getElementById("imageUpload")
const titleModal = document.getElementById("title")

openModal.onclick = () => {
    document.body.style.backgroundColor = '#00000041';
    modal.style.display = 'block';
    getWorkModal()
}
 
closeModal = () => {
    document.body.style.backgroundColor = 'white';
    modal.style.display = 'none';
    document.querySelector(".container-img-modal").innerHTML = "";
    document.querySelector("#category").innerHTML = ""; 
    blockImageModal.style.display = "block";
    imageReplace.src = "./assets/icons/photo.svg";
    imageReplace.style.height = "100%";
    stepModal0.style.display ='block';
    stepModal1.style.display ='none';
    titleModal.value = "";
}
const hideStepModal = () => {
    stepModal0.style.display ='none'
    stepModal1.style.display ='block'
}

const envoyerImage = async (event) => {
   event.preventDefault(); 
   event.stopPropagation(); 
  const errorDiv = document.getElementById('error')
  const titleForm = document.getElementById('title').value;
  const selectorCategory = document.getElementById('selectorCategory');
  const categoryForm = selectorCategory.options[selectorCategory.selectedIndex].value;
  const imageForm = document.getElementById('image').value;
  
  if (titleForm === '' || categoryForm === '' || imageForm === '') {
    errorDiv.innerText = 'Veuillez remplir tous les champs';
    errorDiv.style.display = 'block';
    console.log(titleForm,categoryForm,imageForm)
  } else {
    errorDiv.style.display = 'none';
    const fichier = document.getElementById('image').files[0];
    const title = document.getElementById('title').value;
    const category = parseInt(categoryForm);
    const formData = new FormData();
    formData.append('image', fichier);
    formData.append('title', title);
    formData.append('category', category);
 
    await fetch('http://localhost:5678/api/works/', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': '*/*',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  })
    document.querySelector(".gallery").innerHTML = "";
    await getWorks()
  }
};

const back = async () => {
  stepModal1.style.display="none";
  stepModal0.style.display="block";
  const errorDiv = document.getElementById('error')
  errorDiv.style.display = 'none'
  document.querySelector(".container-img-modal").innerHTML = "";
  document.querySelector("#category").innerHTML = "";
  await getWorkModal()
}

const fileInput = document.getElementById("image");
const blockImageModal = document.querySelector(".block-image-modal")

fileInput.addEventListener("click", function () {
  this.value = null;
})

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      blockImageModal.style.display = "none";
      imageReplace.src = this.result;
      imageReplace.style.height = "200px"
    });
    reader.readAsDataURL(file);
  }
});





