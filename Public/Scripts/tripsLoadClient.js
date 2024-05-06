window.onload = async ()=>  {
    let tripTemp = document.getElementById("tripTemp")
    let tripDiv = tripTemp.content.querySelector(".text-cont");
    const now = new Date()

    // const tripArray = await fetch(serverAdress+"allTrips", {method: 'GET'});
    const tripArray = [{"Animal_ID": 67,"Left": now, "Return": now},{"Animal_ID": 32,"Left": "11:00", "Return": "12:00"}]
    tripArray.forEach(trip => {
        let Animal_ID = trip.Animal_ID
        let leaveTime = trip.Left
        let arrivalTime = trip.Return

        let div = document.importNode(tripDiv,true)
        div.querySelector(".dog-name").textContent = Animal_ID
        div.querySelector(".dog-walks-start").textContent = leaveTime
        div.querySelector(".dog-walks-end").textContent = arrivalTime
        document.querySelector(".dog-walks-cont").appendChild(div)
    });

  }