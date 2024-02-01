document.addEventListener('DOMContentLoaded', function () {
  fetch('/getDataFromDatabase')
    .then(response => response.json())
    .then(data => displayData(data));
});

function displayData (data) {
  const nameList = document.getElementById('nameList');
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;

    const button = document.createElement('button');
    button.textContent = '+ hinzufügen';
    button.addEventListener('click', () => {
      addNameToMerkliste(item.vornamen, item.geschlecht);
    });

    listItem.appendChild(button);

    nameList.appendChild(listItem);
  });
}

function addNameToMerkliste (vorname, geschlecht) {
  fetch('/addToMerkliste', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vorname, geschlecht })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Name wurde zur Merkliste hinzugefügt:', data);
      // Hier können Sie weitere Aktionen ausführen, wenn gewünscht
    })
    .catch(error => console.error('Fehler beim Hinzufügen zum Merkliste:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('/getMerklisteFromDatabase')
    .then(response => response.json())
    .then(data => displayMerkliste(data));
});

function displayMerkliste (data) {
  const nameList = document.getElementById('merkliste');
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;

    const button = document.createElement('button');
    button.textContent = '- löschen';
    button.addEventListener('click', () => {
      deleteFromMerkliste(item.vornamen, item.geschlecht);
    });

    listItem.appendChild(button);

    nameList.appendChild(listItem);
  });
}

function deleteFromMerkliste (vorname, geschlecht) {
  console.log('Test');
  fetch('/deleteFromMerkliste', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vorname, geschlecht })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Name wurde aus Merkliste gelöscht:', data);
      // Hier können Sie weitere Aktionen ausführen, wenn gewünscht
      displayUpdatedMerkliste(); // Funktion aufrufen, um die aktualisierte Merkliste anzuzeigen
    })
    .catch(error => console.error('Fehler beim Löschen aus der Merkliste:', error));
}

function displayUpdatedMerkliste () {
  fetch('/getMerklisteFromDatabase')
    .then(response => response.json())
    .then(data => {
      const nameList = document.getElementById('merkliste');
      nameList.innerHTML = ''; // Alte Einträge löschen
      displayMerkliste(data); // Neue Einträge anzeigen
    });
}
