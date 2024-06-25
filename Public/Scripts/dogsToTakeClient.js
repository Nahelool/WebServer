window.onload = () =>{
let dogTrip = document.getElementById("missionTemp");
let dogText = dogTrip.content.querySelector(".missionText")
let check = dogTrip.content.querySelector(".taskbox")

const dogNamesArray = JSON.parse(sessionStorage.dogs)
// const dogNamesArray = ["Ordol","Fred","Asro"]
console.log(dogNamesArray)


dogNamesArray.forEach(async id => {
   let dogID = id;
   
   const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({id: dogID}) // Stringify the JSON data
  };
  const response = await fetch(serverAddress+"dogInfo", requestOptions);
  var name = await response.json()
  var name = name.Animal_Name

   let a = document.importNode(dogText, true)
   let b = document.importNode(check,true)
   a.textContent = `${dogID} - ${name}`;
   dogTrip.appendChild(b)
   dogTrip.appendChild(a)
});
}