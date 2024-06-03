window.onload = async() =>{
let dogTrip = div.querySelector("missionCont");
dogNamesArray = []

dogNamesArray.forEach(name => {
   let dogName = name;
   let div = document.importNode(dogTrip, true)
   div.querySelector("missionText").textContent = dogName;
   document.querySelector("missionCont").appendChild(div)

});
}