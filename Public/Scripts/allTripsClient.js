window.onload = async ()=>  {
    let tripTemp = document.getElementById("tripTemp")
    let tripDiv = tripTemp.content.getElementByClassName("text-cont");

    const tripArray = await fetch(serverAdress+"allTrips", {method: 'GET'});
    tripArray.forEach(trip => {
        let Animal_ID = trip.Animal_ID
        let leaveTime = trip.Left
        let arrivalTime = trip.Return

        let div = document.importNode(tripDiv,true)
        div.content.getElementByClassName("dog-name").textContent = Animal_ID
        div.content.getElementByClassName("dog-walks-start").textContent = leaveTime
        div.content.getElementByClassName("dog-walks-end").textContent = arrivalTime
        document.getElementsByClassName("dog-walks-cont").appendChild(div)
    });

  }