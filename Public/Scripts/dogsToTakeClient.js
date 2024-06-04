window.onload = () =>{
let dogTrip = document.querySelector(".missionCont");
let dogText = dogTrip.content.querySelector(".missionText")
dogNamesArray = ["Ordol","Fred","Astro"]

dogNamesArray.forEach(name => {
   let dogName = name;
   console.log("ni")
   let a = document.importNode(dogText, true)
   a.textContent = dogName;
   document.querySelector(".missionCont").appendChild(a)

});
}