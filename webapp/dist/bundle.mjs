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
      button.textContent = "+ hinzuf\xFCgen";
      button.addEventListener("click", () => {
        addNameToMerkliste(item.vornamen, item.geschlecht);
      });
      listItem.appendChild(button);
      nameList.appendChild(listItem);
    });
  }
  function addNameToMerkliste(vorname, geschlecht) {
    fetch("/addToMerkliste", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vorname, geschlecht })
    }).then((response) => response.json()).then((data) => {
      console.log("Name wurde zur Merkliste hinzugef\xFCgt:", data);
    }).catch((error) => console.error("Fehler beim Hinzuf\xFCgen zum Merkliste:", error));
  }
  document.addEventListener("DOMContentLoaded", function() {
    fetch("/getMerklisteFromDatabase").then((response) => response.json()).then((data) => displayMerkliste(data));
  });
  function displayMerkliste(data) {
    const nameList = document.getElementById("merkliste");
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;
      const button = document.createElement("button");
      button.textContent = "- l\xF6schen";
      button.addEventListener("click", () => {
        deleteFromMerkliste(item.vornamen, item.geschlecht);
      });
      listItem.appendChild(button);
      nameList.appendChild(listItem);
    });
  }
  function deleteFromMerkliste(vorname, geschlecht) {
    console.log("Test");
    fetch("/deleteFromMerkliste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vorname, geschlecht })
    }).then((response) => response.json()).then((data) => {
      console.log("Name wurde aus Merkliste gel\xF6scht:", data);
    }).catch((error) => console.error("Fehler beim Hinzuf\xFCgen zum Merkliste:", error));
  }
})();
