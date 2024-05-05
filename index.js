const tempButton = document.getElementsByClassName("temperature_button")[0];

tempButton.addEventListener("click" , () =>{
    if(tempButton.classList.contains("temp_C")){
        celToFaren()
        tempButton.classList.toggle("temp_C")
    }
    else{
        farenToCel()
        tempButton.classList.toggle("temp_C")
    }
})

function celToFaren(){
    let tempCel = document.getElementsByClassName("FC")
    var temp;
    for(let i = 0 ; i < tempCel.length ; i++){
        temp = parseInt(tempCel[i].textContent);
        tempCel[i].textContent = Math.round((temp*9/5)+32);
    }
}
function farenToCel(){
    let tempFaren = document.getElementsByClassName("FC")
    var temp;
    for(let i = 0 ; i < tempFaren.length ; i++){
        temp = parseInt(tempFaren[i].textContent);
        tempFaren[i].textContent = Math.round((temp-32)*5/9);
    }
}
