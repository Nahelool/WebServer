
const firstName = document.getElementById('firstName')
const Volunteer_ID = document.getElementById("Volunteer_ID")
const age = document.getElementById("age")
const phoneNumber = document.getElementById("phoneNumber")
const profileColor = document.querySelector(".profileColor")
window.onload = ()=>{
  if(!sessionStorage.name){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.name
    Volunteer_ID.innerHTML = sessionStorage.Volunteer_ID
    age.innerHTML = sessionStorage.age
    phoneNumber.innerHTML = sessionStorage.phoneNumber
    profileColor.style = `background-color: ${sessionStorage.color}`
  }
}
