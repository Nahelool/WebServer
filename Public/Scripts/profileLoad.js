const firstName = document.getElementById('firstName')

console.log(firstName.innerHTML)
window.onload = ()=>{
  if(!sessionStorage.name){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.name
  }
}