const closeModal = document.querySelector('.close-modal')
const openModal = document.querySelector(".open-modal")
const modal = document.querySelector(".modal")
const figureStyle = document.querySelector("figcaption")


openModal.onclick = () => {
    document.body.style.backgroundColor = '#00000041';
    modal.style.display = 'block';
    getWorkModal()
}
 
closeModal.onclick = () => {
    document.body.style.backgroundColor = 'white';
    modal.style.display = 'none'; 
    window.location.reload()
}




const envoyerImage = async () => {
  const errorDiv = document.getElementById('error')
  const titleForm = document.getElementById('title').value;
  const selectorCategory = document.getElementById('selectorCategory');
  const categoryForm = selectorCategory.options[selectorCategory.selectedIndex].value;
  const imageForm = document.getElementById('image').value;
  
  if (titleForm === '' || categoryForm === '' || imageForm === '') {
    errorDiv.innerText = 'Veuillez remplir tous les champs';
    errorDiv.style.display = 'block';
  } else {
    errorDiv.style.display = 'none';
    const fichier = document.getElementById('image').files[0];
    const title = document.getElementById('title').value;
    const category = parseInt(categoryForm);
    const formData = new FormData();
    formData.append('image', fichier);
    formData.append('title', title);
    formData.append('category', category);

  const response = await fetch('http://localhost:5678/api/works/', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': '*/*',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  });

  const responseData = await response.json();
  console.log(responseData);
  }

};




