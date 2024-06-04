window.onload = () =>{
    fetch(serverAdress + "weekSched", {
      method: 'GET'
  }).then( res => res.json())
  .then(data => {
    sessionStorage.voulenteers = data.voulenteersArray
  })
}
let voulenteerArrival = document.querySelector(".missionCont");
let Text = dogTrip.content.querySelector(".missionText")

voulenteersTimeArray = sessionStorage.voulenteers
for (let i = 0; index < 7; index++) {
    dayArray = []
    voulenteersTimeArray.forEach(voulenteer => {
        let voulenteer_ID = voulenteersTimeArray.Voulenteer_ID
        let arrivalTime = voulenteersTimeArray.arrivalTime
        if(arrivalTime.day == i){
            dayArray.push({voulenteer_ID})
            dayArray.push({arrivalTime})
        } 
        td.querySelector[i](".voulenteerList").textContent = dayArray;

});
}
