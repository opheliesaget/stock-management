let accordionFunction = function () {
  let rightColumn = document.getElementById("rightColumn");
  let newProduct = document.getElementById("newProduct");
  let tableContent = document.getElementById("tableContent");
  let up = document.querySelector(".up");
  let menubtn = document.getElementById("menubtn");
  //console.log(acc);
  //console.log(pan);
  menu.addEventListener("click", function (e) {
    //toggle ajoute ou enlève la classe active
    rightColumn.classList.toggle("active");
    tableContent.classList.toggle("activeContent");
    up.classList.toggle("activeContent");
    if (rightColumn.className == "active") {
      rightColumn.style.width = "30%";
      newProduct.style.display = "block";
      menubtn.innerText = "-";
      //console.log("OK");
    } else {
      rightColumn.style.width = "4%";
      newProduct.style.display = "none";
      menubtn.innerText = "+";
      //console.log("NOK");
    }
  });
};
