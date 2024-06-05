window.onload = () =>{
let dogTrip = document.querySelector(".missionCont");
let dogText = dogTrip.content.querySelector(".missionText")

dogNamesArray = sessionStorage.dogs
// dogNamesArray = ["Ordol","Fred","Astro"]

dogNamesArray.forEach(name => {
   let dogName = name;
   let a = document.importNode(dogText, true)
   a.textContent = dogName;
   document.querySelector(".missionCont").appendChild(a)

});
}