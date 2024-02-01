
const firstName = document.getElementById('firstName')

window.onload = ()=>{
  if(!sessionStorage.name){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.name
  }
}