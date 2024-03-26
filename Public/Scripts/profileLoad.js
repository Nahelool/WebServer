
const firstName = document.getElementById('firstName')
const Volunteer_ID = document.getElementById("Volunteer_IDs")
const gmail = document.getElementById("gmail")
const age = document.getElementById("age")
const phoneNumber = document.getElementById("phoneNumber")
window.onload = ()=>{
  if(!sessionStorage.name){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.userData.name
    Volunteer_ID.innerHTML = sessionStorage.userData.Volunteer_ID
    gmail.innerHTML = sessionStorage.userData.gmail
    age.innerHTML = sessionStorage.age
    phoneNumber.innerHTML = sessionStorage.userData.phoneNumber
  }
}
