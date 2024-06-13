const tds = document.querySelectorAll(".voulenteerList")
let voulenteersTimeArray = []

window.onload = async () =>{
    fetch(serverAddress + "weekSched", {
      method: 'GET'
  }).then( res => res.json())
  .then(data => {
     voulenteersTimeArray = data
     console.log(voulenteersTimeArray)
     for (let i = 0; i < 6; i++) {
        let dayArray = []
        voulenteersTimeArray.forEach(voulenteer => {
            let voulenteer_ID = voulenteer[0]
            let arrivalTime = new Date(voulenteer[1])
            let day = arrivalTime.getDay()
            if(day == i){
                dayArray.push(voulenteer_ID)
                dayArray.push("|")
                dayArray.push(voulenteer[1].slice(11,16))
            } 
            tds[i].innerHTML = dayArray;
    
    });
    }
    
  })
  let tripTemp = document.getElementById("tripTemp")
  let tripDiv = tripTemp.content.querySelector(".text-cont");
  const now = new Date()

  const res = await fetch(serverAddress+"allTrips", {method: 'GET'});
  const tripArray = await res.json()
  console.log(tripArray)
  // const tripArray = [{"Animal_ID": 67,"Left": now, "Return": now},{"Animal_ID": 32,"Left": "11:00", "Return": "12:00"}]
  tripArray.forEach(trip => {
      let Animal_ID = trip.Animal_ID
      let leaveTime = trip.Left
      let arrivalTime = trip.Returned

      let div = document.importNode(tripDiv,true)
      div.querySelector(".dog-name").textContent = Animal_ID
      div.querySelector(".dog-walks-start").textContent = leaveTime.slice(11,19)
      div.querySelector(".dog-walks-end").textContent = arrivalTime.slice(11,19)
      div.querySelector(".dog-walks-total").textContent = `${(new Date(arrivalTime) - new Date(leaveTime))/60000} דקות`
      document.querySelector(".dog-walks-cont").appendChild(div)
  });

}


