(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/syllabificate/index.js
  var require_syllabificate = __commonJS({
    "node_modules/syllabificate/index.js"(exports) {
      exports.countSyllables = function(inString) {
        let syllablesTotal = 0;
        let wordList = inString.match(/(?:(?:\w-\w)|[\wÀ-ÿ'’])+/g);
        if (wordList) {
          wordList.forEach((word) => {
            if (word === "'" || word === "\u2019") {
              return;
            }
            if (word.length <= 2) {
              syllablesTotal += 1;
              return;
            }
            let syllables = 0;
            if (word.endsWith("s'") || word.endsWith("s\u2019")) {
              word.slice(-1);
            }
            if (word.endsWith("s's") || word.endsWith("s\u2019s")) {
              word.slice(-1, -3);
            }
            const cEndings = word.match(/(?<=\w{3})(side|\wess|(?<!ed)ly|ment|ship|board|ground|(?<![^u]de)ville|port|ful(ly)?|berry|box|nesse?|such|m[ae]n|wom[ae]n|anne)s?$/mi);
            if (cEndings) {
              word = word.replace(cEndings[0], "\n" + cEndings[0]);
            }
            const cBeginnings = word.match(/^(ware|side(?![sd]$)|p?re(?!ach|agan|al|au)|[rf]ace(?!([sd]|tte)$)|place[^nsd])/mi);
            if (cBeginnings) {
              word = word.replace(cBeginnings[0], "");
              syllables++;
            }
            const esylp = word.match(/ie($|l|t|rg)|([cb]|tt|pp)le$|phe$|kle(s|$)|[^n]scien|sue|aybe$|[^aeiou]shed|[^lsoai]les$|([^e]r|g)ge$|(gg|ck|yw|etch)ed$|(sc|o)he$|seer|^re[eiuy]/gmi);
            if (esylp) {
              syllables += esylp.length;
            }
            const esylm = word.match(/every|some([^aeiouyr]|$)|[^trb]ere(?!d|$|o|r|t|a[^v]|n|s|x)|[^g]eous|niet/gmi);
            if (esylm) {
              syllables -= esylm.length;
            }
            const isylp = word.match(/rie[^sndfvtl]|(?<=^|[^tcs]|st)ia|siai|[^ct]ious|quie|[lk]ier|settli|[^cn]ien[^d]|[aeio]ing$|dei[tf]|isms?$/gmi);
            if (isylp) {
              syllables += isylp.length;
            }
            const osylp = word.match(/nyo|osm(s$|$)|oinc|ored(?!$)|(^|[^ts])io|oale|[aeiou]yoe|^m[ia]cro([aiouy]|e)|roe(v|$)|ouel|^proa|oolog/gmi);
            if (osylp) {
              syllables += osylp.length;
            }
            const osylm = word.match(/[^f]ore(?!$|[vcaot]|d$|tte)|fore|llio/gmi);
            if (osylm) {
              syllables -= osylm.length;
            }
            const asylp = word.match(/asm(s$|$)|ausea|oa$|anti[aeiou]|raor|intra[ou]|iae|ahe$|dais|(?<!p)ea(l(?!m)|$)|(?<!j)ean|(?<!il)eage/gmi);
            if (asylp) {
              syllables += asylp.length;
            }
            const asylm = word.match(/aste(?!$|ful|s$|r)|[^r]ared$/gmi);
            if (asylm) {
              syllables -= asylm.length;
            }
            const usylp = word.match(/uo[^y]|[^gq]ua(?!r)|uen|[^g]iu|uis(?![aeiou]|se)|ou(et|ille)|eu(ing|er)|uye[dh]|nuine|ucle[aeiuy]/gmi);
            if (usylp) {
              syllables += usylp.length;
            }
            const usylm = word.match(/geous|busi|logu(?!e|i)/gmi);
            if (usylm) {
              syllables -= usylm.length;
            }
            const ysylp = word.match(/[ibcmrluhp]ya|nyac|[^e]yo|[aiou]y[aiou]|[aoruhm]ye(tt|l|n|v|z)|pye|dy[ae]|oye[exu]|lye[nlrs]|olye|aye(k|r|$|u[xr]|da)|saye\w|iye|wy[ae]|[^aiou]ying/gmi);
            if (ysylp) {
              syllables += ysylp.length;
            }
            const ysylm = word.match(/arley|key|ney$/gmi);
            if (ysylm) {
              syllables -= ysylm.length;
            }
            const essuffix = word.match(/((?<!c[hrl]|sh|[iszxgej]|[niauery]c|do)es$)/gmi);
            if (essuffix) {
              syllables--;
            }
            const edsuffix = word.match(/([aeiouy][^aeiouyrdt]|[^aeiouy][^laeiouyrdtbm]|ll|bb|ield|[ou]rb)ed$|[^cbda]red$/gmi);
            if (edsuffix) {
              syllables--;
            }
            const csylp = word.match(/chn[^eai]|mc|thm/gmi);
            if (csylp) {
              syllables += csylp.length;
            }
            const eVowels = word.match(/[aiouy](?![aeiouy])|ee|e(?!$|-|[iua])/gmi);
            if (eVowels) {
              syllables += eVowels.length;
            }
            if (syllables <= 0) {
              syllables = 1;
            }
            if (word.match(/[^aeiou]n['’]t$/i)) {
              syllables++;
            }
            if (word.match(/en['’]t$/i)) {
              syllables--;
            }
            syllablesTotal += syllables;
          });
        }
        return syllablesTotal;
      };
      exports.countPolys = function(inString) {
        let polysTotal = 0;
        let wordList = inString.match(/(?:(?:\w-\w)|[\wÀ-ÿ'’])+/g);
        if (wordList) {
          wordList.forEach((word) => {
            if (word === "'" || word === "\u2019") {
              return;
            }
            if (word.length <= 3) {
              return;
            }
            let syllables = 0;
            if (word.endsWith("s'") || word.endsWith("s\u2019")) {
              word.slice(-1);
            }
            if (word.endsWith("s's") || word.endsWith("s\u2019s")) {
              word.slice(-1, -3);
            }
            const cEndings = word.match(/(?<=\w{3})(side|\wess|(?<!ed)ly|ment|ship|board|ground|(?<![^u]de)ville|port|ful(ly)?|berry|box|nesse?|such|m[ae]n|wom[ae]n|horse|anne)s?$/mi);
            if (cEndings) {
              word = word.replace(cEndings[0], "\n" + cEndings[0]);
            }
            const cBeginnings = word.match(/^(ware|side|p?re(?!ach|agan|al|au))/mi);
            if (cBeginnings) {
              word = word.replace(cBeginnings[0], "");
              syllables++;
            }
            const esylp = word.match(/ie($|l|t|rg)|([cb]|tt|pp)le$|phe$|kle(s|$)|[^n]scien|sue|aybe$|[^aeiou]shed|[^lsoai]les$|([^e]r|g)ge$|(gg|ck|yw|etch)ed$|(sc|o)he$|seer|^re[eiuy]/gmi);
            if (esylp) {
              syllables += esylp.length;
            }
            const esylm = word.match(/every|some([^aeiouyr]|$)|[^trb]ere(?!d|$|o|r|t|a[^v]|n|s|x)|[^g]eous|niet/gmi);
            if (esylm) {
              syllables -= esylm.length;
            }
            const isylp = word.match(/rie[^sndfvtl]|(?<=^|[^tcs]|st)ia|siai|[^ct]ious|quie|[lk]ier|settli|[^cn]ien[^d]|[aeio]ing$|dei[tf]|isms?$/gmi);
            if (isylp) {
              syllables += isylp.length;
            }
            const osylp = word.match(/nyo|osm(s$|$)|oinc|ored(?!$)|(^|[^ts])io|oale|[aeiou]yoe|^m[ia]cro([aiouy]|e)|roe(v|$)|ouel|^proa|oolog/gmi);
            if (osylp) {
              syllables += osylp.length;
            }
            const osylm = word.match(/[^f]ore(?!$|[vcaot]|d$|tte)|fore|llio/gmi);
            if (osylm) {
              syllables -= osylm.length;
            }
            const asylp = word.match(/asm(s$|$)|ausea|oa$|anti[aeiou]|raor|intra[ou]|iae|ahe$|dais|(?<!p)ea(l(?!m)|$)|(?<!j)ean|(?<!il)eage/gmi);
            if (asylp) {
              syllables += asylp.length;
            }
            const asylm = word.match(/aste(?!$|ful|s$|r)|[^r]ared$/gmi);
            if (asylm) {
              syllables -= asylm.length;
            }
            const usylp = word.match(/uo[^y]|[^gq]ua(?!r)|uen|[^g]iu|uis(?![aeiou]|se)|ou(et|ille)|eu(ing|er)|uye[dh]|nuine|ucle[aeiuy]/gmi);
            if (usylp) {
              syllables += usylp.length;
            }
            const usylm = word.match(/geous|busi|logu(?!e|i)/gmi);
            if (usylm) {
              syllables -= usylm.length;
            }
            const ysylp = word.match(/[ibcmrluhp]ya|nyac|[^e]yo|[aiou]y[aiou]|[aoruhm]ye(tt|l|n|v|z)|pye|dy[ae]|oye[exu]|lye[nlrs]|olye|aye(k|r|$|u[xr]|da)|saye\w|iye|wy[ae]|[^aiou]ying/gmi);
            if (ysylp) {
              syllables += ysylp.length;
            }
            const ysylm = word.match(/arley|key|ney$/gmi);
            if (ysylm) {
              syllables -= ysylm.length;
            }
            const essuffix = word.match(/((?<!c[hrl]|sh|[iszxgej]|[niauery]c|do)es$)/gmi);
            if (essuffix) {
              syllables--;
            }
            const edsuffix = word.match(/([aeiouy][^aeiouyrdt]|[^aeiouy][^laeiouyrdtbm]|ll|bb|ield|[ou]rb)ed$|[^cbda]red$/gmi);
            if (edsuffix) {
              syllables--;
            }
            const csylp = word.match(/chn[^eai]|mc|thm/gmi);
            if (csylp) {
              syllables += csylp.length;
            }
            const eVowels = word.match(/[aiouy](?![aeiouy])|ee|e(?!$|-|[iua])/gmi);
            if (eVowels) {
              syllables += eVowels.length;
            }
            if (syllables <= 0) {
              syllables = 1;
            }
            if (word.match(/[^aeiou]n['’]t$/i)) {
              syllables++;
            }
            if (word.match(/en['’]t$/i)) {
              syllables--;
            }
            if (syllables >= 3) {
              polysTotal++;
            }
          });
        }
        return polysTotal;
      };
      exports.countSyllablesAndPolys = function(inString) {
        let syllablesTotal = 0, polysTotal = 0;
        let wordList = inString.match(/(?:(?:\w-\w)|[\wÀ-ÿ'’])+/g);
        if (wordList) {
          wordList.forEach((word) => {
            if (word === "'" || word === "\u2019") {
              return;
            }
            if (word.length <= 2) {
              syllablesTotal += 1;
              return;
            }
            let syllables = 0;
            if (word.endsWith("s'") || word.endsWith("s\u2019")) {
              word.slice(-1);
            }
            if (word.endsWith("s's") || word.endsWith("s\u2019s")) {
              word.slice(-1, -3);
            }
            const cEndings = word.match(/(?<=\w{3})(side|\wess|(?<!ed)ly|ment|ship|board|ground|(?<![^u]de)ville|port|ful(ly)?|berry|box|nesse?|such|m[ae]n|wom[ae]n|horse|anne)s?$/mi);
            if (cEndings) {
              word = word.replace(cEndings[0], "\n" + cEndings[0]);
            }
            const cBeginnings = word.match(/^(ware|side|p?re(?!ach|agan|al|au))/mi);
            if (cBeginnings) {
              word = word.replace(cBeginnings[0], "");
              syllables++;
            }
            const esylp = word.match(/ie($|l|t|rg)|([cb]|tt|pp)le$|phe$|kle(s|$)|[^n]scien|sue|aybe$|[^aeiou]shed|[^lsoai]les$|([^e]r|g)ge$|(gg|ck|yw|etch)ed$|(sc|o)he$|seer|^re[eiuy]/gmi);
            if (esylp) {
              syllables += esylp.length;
            }
            const esylm = word.match(/every|some([^aeiouyr]|$)|[^trb]ere(?!d|$|o|r|t|a[^v]|n|s|x)|[^g]eous|niet/gmi);
            if (esylm) {
              syllables -= esylm.length;
            }
            const isylp = word.match(/rie[^sndfvtl]|(?<=^|[^tcs]|st)ia|siai|[^ct]ious|quie|[lk]ier|settli|[^cn]ien[^d]|[aeio]ing$|dei[tf]|isms?$/gmi);
            if (isylp) {
              syllables += isylp.length;
            }
            const osylp = word.match(/nyo|osm(s$|$)|oinc|ored(?!$)|(^|[^ts])io|oale|[aeiou]yoe|^m[ia]cro([aiouy]|e)|roe(v|$)|ouel|^proa|oolog/gmi);
            if (osylp) {
              syllables += osylp.length;
            }
            const osylm = word.match(/[^f]ore(?!$|[vcaot]|d$|tte)|fore|llio/gmi);
            if (osylm) {
              syllables -= osylm.length;
            }
            const asylp = word.match(/asm(s$|$)|ausea|oa$|anti[aeiou]|raor|intra[ou]|iae|ahe$|dais|(?<!p)ea(l(?!m)|$)|(?<!j)ean|(?<!il)eage/gmi);
            if (asylp) {
              syllables += asylp.length;
            }
            const asylm = word.match(/aste(?!$|ful|s$|r)|[^r]ared$/gmi);
            if (asylm) {
              syllables -= asylm.length;
            }
            const usylp = word.match(/uo[^y]|[^gq]ua(?!r)|uen|[^g]iu|uis(?![aeiou]|se)|ou(et|ille)|eu(ing|er)|uye[dh]|nuine|ucle[aeiuy]/gmi);
            if (usylp) {
              syllables += usylp.length;
            }
            const usylm = word.match(/geous|busi|logu(?!e|i)/gmi);
            if (usylm) {
              syllables -= usylm.length;
            }
            const ysylp = word.match(/[ibcmrluhp]ya|nyac|[^e]yo|[aiou]y[aiou]|[aoruhm]ye(tt|l|n|v|z)|dy[ae]|oye[exu]|lye[nlrs]|(ol|i|p)ye|aye(k|r|$|u[xr]|da)|saye\w|wy[ae]|[^aiou]ying/gmi);
            if (ysylp) {
              syllables += ysylp.length;
            }
            const ysylm = word.match(/arley|key|ney$/gmi);
            if (ysylm) {
              syllables -= ysylm.length;
            }
            const essuffix = word.match(/((?<!c[hrl]|sh|[iszxgej]|[niauery]c|do)es$)/gmi);
            if (essuffix) {
              syllables--;
            }
            const edsuffix = word.match(/([aeiouy][^aeiouyrdt]|[^aeiouy][^laeiouyrdtbm]|ll|bb|ield|[ou]rb)ed$|[^cbda]red$/gmi);
            if (edsuffix) {
              syllables--;
            }
            const csylp = word.match(/chn[^eai]|mc|thm/gmi);
            if (csylp) {
              syllables += csylp.length;
            }
            const eVowels = word.match(/[aiouy](?![aeiouy])|ee|e(?!$|-|[iua])/gmi);
            if (eVowels) {
              syllables += eVowels.length;
            }
            if (syllables <= 0) {
              syllables = 1;
            }
            if (word.match(/[^aeiou]n['’]t$/i)) {
              syllables++;
            }
            if (word.match(/en['’]t$/i)) {
              syllables--;
            }
            if (syllables >= 3) {
              polysTotal++;
            }
            syllablesTotal += syllables;
          });
        }
        return [syllablesTotal, polysTotal];
      };
    }
  });

  // webapp/src/js/main.js
  document.addEventListener("DOMContentLoaded", function() {
    fetch("/getDataFromDatabase").then((response) => response.json()).then((data) => {
      setupPagination(data);
      displayFilter();
    });
  });
  function displayData(data) {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
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
    fetch("/getMerklisteFromDatabase").then((response) => response.json()).then((data) => {
      displayMerkliste(data);
      displayFilterMerkliste();
      makeMerklisteSortable();
    });
  });
  function displayMerkliste(data) {
    console.log("- displayMerkliste");
    const nameList = document.getElementById("merkliste");
    nameList.innerHTML = "";
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.vornamen} - ${item.geschlecht}`;
      listItem.draggable = true;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "- l\xF6schen";
      deleteButton.addEventListener("click", () => {
        deleteFromMerkliste(item.vornamen, item.geschlecht);
      });
      const priorisierenButton = document.createElement("button");
      priorisierenButton.textContent = "*";
      priorisierenButton.addEventListener("click", () => {
        if (priorisierenButton.style.backgroundColor === "gold") {
          priorisierenButton.style.backgroundColor = "";
        } else {
          priorisierenButton.style.backgroundColor = "gold";
        }
      });
      listItem.appendChild(deleteButton);
      listItem.appendChild(priorisierenButton);
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
      displayUpdatedMerkliste();
    }).catch((error) => console.error("Fehler beim L\xF6schen aus der Merkliste:", error));
  }
  function displayUpdatedMerkliste() {
    fetch("/getMerklisteFromDatabase").then((response) => response.json()).then((data) => {
      const nameList = document.getElementById("merkliste");
      nameList.innerHTML = "";
      displayMerkliste(data);
      makeMerklisteSortable();
    });
  }
  function displayFilterMerkliste() {
    console.log("1 - displayFilterMerkliste");
    const filterForm = document.getElementById("filterFormMerkliste");
    filterForm.addEventListener("change", filterNamesMerkliste);
  }
  function filterNamesMerkliste() {
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    fetch("/getMerklisteFromDatabase").then((response) => response.json()).then((data) => {
      const filteredData = selectedGender === "all" ? data : data.filter((item) => item.geschlecht === selectedGender);
      displayMerkliste(filteredData);
      makeMerklisteSortable();
    });
  }
  function makeMerklisteSortable() {
    const nameList = document.getElementById("merkliste");
    let draggedItem = null;
    nameList.addEventListener("dragstart", function(event) {
      draggedItem = event.target;
      event.dataTransfer.setData("text/plain", null);
    });
    nameList.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
    nameList.addEventListener("drop", function(event) {
      event.preventDefault();
      if (event.target.tagName === "LI") {
        nameList.insertBefore(draggedItem, event.target);
      } else {
        nameList.appendChild(draggedItem);
      }
    });
  }
  function setupPagination(data) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let index = 1;
    const pageLabel = document.getElementById("pagelabel");
    pageLabel.textContent = `Seite ${index}`;
    const stopIndex = index;
    const totalPageCount = document.getElementById("totalPageCount");
    totalPageCount.textContent = ` Insgesamt ${totalPages} Seiten`;
    const stopTotalPages = totalPages;
    document.getElementById("prev-page").addEventListener("click", function() {
      if (index > 1) {
        index--;
        displayDataPaginated(data, index, itemsPerPage);
        pageLabel.textContent = `Seite ${index}`;
      }
    });
    document.getElementById("next-page").addEventListener("click", function() {
      if (stopIndex < stopTotalPages) {
        index++;
        displayDataPaginated(data, index, itemsPerPage);
        pageLabel.textContent = `Seite ${index}`;
      }
    });
    displayDataPaginated(data, index, itemsPerPage);
  }
  function displayDataPaginated(data, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    displayData(paginatedData);
  }
  var syllabicate = require_syllabificate();
  function displayFilter() {
    const filterForm = document.getElementById("filterForm");
    filterForm.addEventListener("change", filterNames);
  }
  function filterNames() {
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    const nameStart = document.getElementById("nameStart").value.toLowerCase();
    const notNameStart = document.getElementById("notNameStart").value.toLowerCase();
    const nameEnd = document.getElementById("nameEnd").value.toLowerCase();
    const notNameEnd = document.getElementById("notNameEnd").value.toLowerCase();
    const syllableCount = document.getElementById("syllableCount").value;
    fetch("/getDataFromDatabase").then((response) => response.json()).then((data) => {
      const filteredData = data.filter(
        (item) => (selectedGender === "all" || item.geschlecht === selectedGender) && (nameStart === "" || item.vornamen.toLowerCase().startsWith(nameStart)) && (nameEnd === "" || item.vornamen.toLowerCase().endsWith(nameEnd)) && (notNameStart === "" || !item.vornamen.toLowerCase().startsWith(notNameStart)) && (notNameEnd === "" || !item.vornamen.toLowerCase().endsWith(notNameEnd)) && (syllableCount === "" || syllabicate.countSyllables(item.vornamen) === parseInt(syllableCount))
      );
      setupPagination(filteredData);
    });
  }
})();
