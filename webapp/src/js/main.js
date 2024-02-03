
// --- Alle Namen ---------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  fetch('/getDataFromDatabase')
    .then(response => response.json())
    .then(data => {
      setupPagination(data);
      displayFilter();
    });
});

function displayData (data) {
  const nameList = document.getElementById('nameList');
  nameList.innerHTML = ''; // Alte Einträge löschen

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
    })
    .catch(error => console.error('Fehler beim Hinzufügen zum Merkliste:', error));
}

// ---- Merkliste --------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  fetch('/getMerklisteFromDatabase')
    .then(response => response.json())
    .then(data => {
      displayMerkliste(data);
      displayFilterMerkliste();
    });
});

function displayMerkliste (data) {
  console.log('- displayMerkliste');
  const nameList = document.getElementById('merkliste');
  nameList.innerHTML = ''; // Alte Einträge löschen
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '- löschen';
    deleteButton.addEventListener('click', () => {
      deleteFromMerkliste(item.vornamen, item.geschlecht);
    });

    const priorisierenButton = document.createElement('button');
    priorisierenButton.textContent = '*';
    priorisierenButton.addEventListener('click', () => {
      if (priorisierenButton.style.backgroundColor === 'gold') {
        priorisierenButton.style.backgroundColor = '';
      } else {
        priorisierenButton.style.backgroundColor = 'gold';
      }
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(priorisierenButton);

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
      displayUpdatedMerkliste();
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

function displayFilterMerkliste () {
  console.log('1 - displayFilterMerkliste');
  const filterForm = document.getElementById('filterFormMerkliste');
  filterForm.addEventListener('change', filterNamesMerkliste);
}

function filterNamesMerkliste () {
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;

  fetch('/getMerklisteFromDatabase')
    .then(response => response.json())
    .then(data => {
      const filteredData = selectedGender === 'all' ? data : data.filter(item => item.geschlecht === selectedGender);
      displayMerkliste(filteredData);
    });
}

// ---- Paginierung -------------------------------------------------
function setupPagination (data) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let index = 1;

  const pageLabel = document.getElementById('pagelabel');
  pageLabel.textContent = `Seite ${index}`;

  const totalPageCount = document.getElementById('totalPageCount');
  totalPageCount.textContent = ` Insgesamt ${totalPages} Seiten`;

  // Vorherige Seite
  document.getElementById('prev-page').addEventListener('click', function () {
    if (index > 1) {
      index--;
      displayDataPaginated(data, index, itemsPerPage);
      pageLabel.textContent = `Seite ${index}`;
    }
  });

  // Nächste Seite
  document.getElementById('next-page').addEventListener('click', function () {
    if (index < totalPages) {
      index++;
      displayDataPaginated(data, index, itemsPerPage);
      pageLabel.textContent = `Seite ${index}`;
    }
  });

  displayDataPaginated(data, index, itemsPerPage);
}

function displayDataPaginated (data, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const paginatedData = data.slice(startIndex, endIndex);
  displayData(paginatedData);
}

// ---- Filter Funktion ----------------------------------

function displayFilter () {
  const filterForm = document.getElementById('filterForm');
  filterForm.addEventListener('change', filterNames);
}

function filterNames () {
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;

  fetch('/getDataFromDatabase')
    .then(response => response.json())
    .then(data => {
      const filteredData = selectedGender === 'all' ? data : data.filter(item => item.geschlecht === selectedGender);
      setupPagination(filteredData);
    });
}
