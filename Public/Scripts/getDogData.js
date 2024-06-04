const dogName = document.getElementById("dogName");
const dogAge = document.getElementById("dogAge");
const dogColor = document.getElementById("dogColor")

if(buttonPressed){
    dogName.innerHTML = sessionStorage.dogName
    dogAge.innerHTML = sessionStorage.dogAge
    dogColor.innerHTML = sessionStorage.dogColor
}
