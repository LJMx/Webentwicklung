(() => {
  // webapp/src/js/main.mjs
  document.addEventListener('DOMContentLoaded', function () {
    fetch('/getDataFromDatabase').then((response) => response.json()).then((data) => displayData(data)).catch((error) => console.error('There was a problem with the fetch operation:', error));
  });
  function displayData (data) {
    const databaseContent = document.getElementById('databaseContent');
    data.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;
      databaseContent.appendChild(listItem);
    });
  }
})();
