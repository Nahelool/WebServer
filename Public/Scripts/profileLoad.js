
const firstName = document.getElementById('firstName')
const Volunteer_ID = document.getElementById("Volunteer_IDs")
const gmail = document.getElementById("gmail")
const age = document.getElementById("age")
const phoneNumber = document.getElementById("phoneNumber")
window.onload = ()=>{
  if(!sessionStorage.name){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.name
    Volunteer_ID.innerHTML = sessionStorage.Volunteer_ID
  }
}
