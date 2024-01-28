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
      nameList.appendChild(listItem);
    });
  }
})();
