
// --- Alle Namen ---------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  fetch('/getData')
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
    .then(response => response.json());
}

// ---- Merkliste --------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  fetch('/getMerkliste')
    .then(response => response.json())
    .then(data => {
      displayMerkliste(data);
      filterMerkliste();
      merklisteSort();
    });
});

function displayMerkliste (data) {
  const nameList = document.getElementById('merkliste');
  nameList.innerHTML = ''; // Alte Einträge löschen
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;
    listItem.draggable = true;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '- löschen';
    deleteButton.addEventListener('click', () => {
      deleteFromMerkliste(item.vornamen, item.geschlecht);
    });

    listItem.appendChild(deleteButton);

    nameList.appendChild(listItem);
  });
}

function deleteFromMerkliste (vorname, geschlecht) {
  fetch('/deleteFromMerkliste', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vorname, geschlecht })
  })
    .then(response => response.json())
    .then(data => {
      updateMerkliste();
    });
}

function updateMerkliste () {
  fetch('/getMerkliste')
    .then(response => response.json())
    .then(data => {
      const nameList = document.getElementById('merkliste');
      nameList.innerHTML = ''; // Alte Einträge löschen
      displayMerkliste(data); // Neue Einträge anzeigen
      merklisteSort();
    });
}

function filterMerkliste () {
  const filterForm = document.getElementById('filterFormMerkliste');
  filterForm.addEventListener('change', filterNamesMerkliste);
}

function filterNamesMerkliste () {
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;

  fetch('/getMerkliste')
    .then(response => response.json())
    .then(data => {
      const filteredData = selectedGender === 'all' ? data : data.filter(item => item.geschlecht === selectedGender);
      displayMerkliste(filteredData);
      merklisteSort();
    });
}

function merklisteSort () {
  const nameList = document.getElementById('merkliste');
  let draggedItem = null;

  nameList.addEventListener('dragstart', function (event) {
    draggedItem = event.target;
    event.dataTransfer.setData('text/plain', null);
  });

  nameList.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  nameList.addEventListener('drop', function (event) {
    event.preventDefault();
    if (event.target.tagName === 'LI') {
      nameList.insertBefore(draggedItem, event.target);
    } else {
      nameList.appendChild(draggedItem);
    }
  });
}

// ---- Paginierung -------------------------------------------------
function setupPagination (data) {
  const items = 10;
  const totalPages = Math.ceil(data.length / items);
  let index = 1;

  const pageLabel = document.getElementById('pagelabel');
  pageLabel.textContent = `Seite ${index}`;
  const stopIndex = index;

  const totalPageCount = document.getElementById('totalPageCount');
  totalPageCount.textContent = ` Insgesamt ${totalPages} Seiten`;
  const stopTotalPages = totalPages;

  // Vorherige Seite
  document.getElementById('oldPage').addEventListener('click', function () {
    if (index > 1) {
      index--;
      displayDataPaginated(data, index, items);
      pageLabel.textContent = `Seite ${index}`;
    }
  });

  // Nächste Seite
  document.getElementById('newPage').addEventListener('click', function () {
    // Funktioniert noch nicht perfekt !
    if ((stopIndex < stopTotalPages)) {
      index++;
      displayDataPaginated(data, index, items);
      pageLabel.textContent = `Seite ${index}`;
    }
  });

  displayDataPaginated(data, index, items);
}

function displayDataPaginated (data, page, items) {
  const startIndex = (page - 1) * items;
  const endIndex = Math.min(startIndex + items, data.length);
  const paginatedData = data.slice(startIndex, endIndex);
  displayData(paginatedData);
}

// ---- Filter Funktion ----------------------------------

// Silbenzaehler
const syllabicate = require('syllabificate');

function displayFilter () {
  const filterFormAllNames = document.getElementById('filterFormAllNames');
  filterFormAllNames.addEventListener('change', filterAllNames);
}

function filterAllNames () {
  // Ausgewählte Geschlecht
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;
  // Der Name soll mit diesem String starten
  const nameStartWith = document.getElementById('nameStartWith').value.toLowerCase();
  // Der Name soll mit diesem String nicht starten
  const notNameStartWith = document.getElementById('notNameStartWith').value.toLowerCase();
  // Der Name soll mit diesem String enden
  const nameEndWith = document.getElementById('nameEndWith').value.toLowerCase();
  // Der Name soll mit diesem String nicht enden
  const notNameEndWith = document.getElementById('notNameEndWith').value.toLowerCase();
  // Der Name soll diese Anzahl an Silben haben
  const syllableCount = document.getElementById('syllableCount').value;

  fetch('/getData')
    .then(response => response.json())
    .then(data => {
      const filteredAllNames = data.filter(item =>
        (selectedGender === 'all' || item.geschlecht === selectedGender) &&
        (nameStartWith === '' || item.vornamen.toLowerCase().startsWith(nameStartWith)) &&
        (nameEndWith === '' || item.vornamen.toLowerCase().endsWith(nameEndWith)) &&
        (notNameStartWith === '' || !item.vornamen.toLowerCase().startsWith(notNameStartWith)) &&
        (notNameEndWith === '' || !item.vornamen.toLowerCase().endsWith(notNameEndWith)) &&
        (syllableCount === '' || syllabicate.countSyllables(item.vornamen) === parseInt(syllableCount))
      );
      setupPagination(filteredAllNames);
    });
}
