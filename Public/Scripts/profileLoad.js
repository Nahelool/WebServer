
const firstName = document.getElementById('firstName')
const Volunteer_ID = document.getElementById("Volunteer_ID")
const gmail = document.getElementById("gmail")
const age = document.getElementById("age")
const phoneNumber = document.getElementById("phoneNumber")
window.onload = ()=>{
  if(!sessionStorage.userData){
    location.href = '/'
  } else {
    firstName.innerHTML = sessionStorage.name
    Volunteer_ID.innerHTML = sessionStorage.Volunteer_ID
    gmail.innerHTML = sessionStorage.gmail
    age.innerHTML = sessionStorage.age
    phoneNumber.innerHTML = sessionStorage.phoneNumber
  }
}
