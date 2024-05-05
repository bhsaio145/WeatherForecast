const tempButton = document.getElementsByClassName("temperature_button")[0];

tempButton.addEventListener("click" , () =>{
    if(tempButton.classList.contains("temp_C")){
        console.log("C")
        tempButton.classList.toggle("temp_C")
    }
    else{
        console.log("F")
        tempButton.classList.toggle("temp_C")
    }
})
