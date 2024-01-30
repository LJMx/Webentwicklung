(() => {
  // webapp/src/js/main.js
  document.addEventListener("DOMContentLoaded", function() {
    fetch("/getDataFromDatabase").then((response) => response.json()).then((data) => displayData(data));
  });
  function displayData(data) {
    const nameList = document.getElementById("nameList");
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;
      const button = document.createElement("button");
      button.textContent = "+";
      button.addEventListener("click", () => {
      });
      listItem.appendChild(button);
      nameList.appendChild(listItem);
    });
  }
})();
