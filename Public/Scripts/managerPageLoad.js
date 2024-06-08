window.onload = () =>{
    fetch(serverAdress + "weekSched", {
      method: 'GET'
  }).then( res => res.json())
  .then(data => {
    sessionStorage.voulenteers = data
  })
}

const tds = document.querySelectorAll(".voulenteerList")

voulenteersTimeArray = sessionStorage.voulenteers
for (let i = 0; index < 7; index++) {
    dayArray = []
    voulenteersTimeArray.forEach(voulenteer => {
        let voulenteer_ID = voulenteer[0]
        let arrivalTime = voulenteer[1]
        if(arrivalTime.day == i){
            dayArray.push({voulenteer_ID})
            dayArray.push({arrivalTime})
        } 
        tds[i].textContent = dayArray;

});
}
