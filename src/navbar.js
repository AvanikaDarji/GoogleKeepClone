const navInput = document.querySelector(".name-input");
const linkName = document.querySelector(".link-name");

function setName(name) {
    linkName.innerText = "Welcome, ";
    let nameInner = document.createElement("span");
    nameInner.innerText = name;
    nameInner.setAttribute("class", "name");
    linkName.appendChild(nameInner);
    return nameInner;
}
navInput.addEventListener("change", () => {
        setName(navInput.value);
    })
    /*navInput.addEventListener("onchange", function(){
        console.log(navInput.value);
    })*/

// const navInput = document.getElementById("navbarinput");
//console.log(navInput);