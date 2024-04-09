window.onload = async ()=>  {
    let tripTemp = document.getElementById("tripTemp")
    let tripDiv = tripTemp.content.querySelector("div");

    const tripArray = await fetch(serverAdress+"allTrips", {method: 'GET'});
    tripArray.forEach(trip => {
        let Animal_ID = trip.Animal_ID
        let leaveTime = trip.Left
        let arrivalTime = trip.Return

        let div = document.importNode(tripDiv,true)
        div.content.getElementById("Animal_ID").textContent = Animal_ID
        div.content.getElementById("leaveTime").textContent = leaveTime
        div.content.getElementById("arrivalTime").textContent = arrivalTime
        document.body.appendChild(div)
    });

  }