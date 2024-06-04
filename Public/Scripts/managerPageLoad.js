window.onload = () =>{
    fetch(serverAdress + "weekSched", {
      method: 'GET'
  }).then( res => res.json())
  .then(data => {
    sessionStorage.voulenteers = data.voulenteersArray
  })
}
voulenteersTimeArray = sessionStorage.voulenteers
voulenteersTimeArray.forEach(voulenteer => {
    
});
