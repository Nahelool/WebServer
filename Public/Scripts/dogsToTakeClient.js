window.onload = () =>{
let dogTrip = document.querySelector(".missionCont");
let dogText = dogTrip.content.querySelector(".missionText")

const dogNamesArray = JSON.parse(sessionStorage.dogs)
// const dogNamesArray = ["Ordol","Fred","Astro"]
console.log(dogNamesArray)


dogNamesArray.forEach(name => {
   let dogName = name;
   let a = document.importNode(dogText, true)
   a.textContent = dogName;
   document.querySelector(".missionCont").appendChild(a)

});
}