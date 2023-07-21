let amount = document.getElementById("amount");
let des = document.getElementById("description");
let cat = document.getElementById("sel1");
var form = document.getElementById("form");
let foodList = document.getElementById("foodItems");
let electronicList = document.getElementById("electronicsItems");
let groceryList = document.getElementById("groceryItems");
let allItems = document.getElementById("allItems");
form.addEventListener("submit", OrderFun);
axios
  .get("https://crudcrud.com/api/dad252ecf21d4f4d851917fe0a499a60/Products")
  .then(res => {
    var data = res.data;
    data.forEach(item => {
      let li = document.createElement("li");
      li.appendChild(
        document.createTextNode(
          `Price : ${item.amount}, Description : ${item.description} `
        )
      );
      let button = document.createElement("button");
      button.appendChild(document.createTextNode("Delete"));
      button.className = "btn btn-danger btn-sm float-right delete";
      li.appendChild(button);
      li.className = "list-group-item";
      li.setAttribute("id", item._id);
      if (item.category == "Food") {
        foodList.appendChild(li);
      } else if (item.category == "Electronics") {
        electronicList.appendChild(li);
      } else {
        groceryList.appendChild(li);
      }
    });
  })
  .catch(err => console.log(err));
function OrderFun(e) {
  e.preventDefault();
  var obj = {
    amount: amount.value,
    description: des.value,
    category: cat.value
  };
  axios
    .post(
      "https://crudcrud.com/api/dad252ecf21d4f4d851917fe0a499a60/Products",
      obj
    )
    .then(res => {
      alert("Added to Cart");
      window.location.reload();
    })
    .catch(err => console.log(err));
}
allItems.addEventListener("click", RemoveItem);
function RemoveItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure")) {
      let li = e.target.parentElement;
      let key = li.getAttribute("id");
      axios
        .delete(
          `https://crudcrud.com/api/dad252ecf21d4f4d851917fe0a499a60/Products/${key}`
        )
        .then(res => {
          alert("SuccessFully Deleted");
          window.location.reload();
        })
        .catch(err => console.log("Not Deleted"));
    }
  }
}
