var averageUscore, avgScore, pScore, rabatt,consumerScore;
var maxRabatt = 10; // Festlegung des maximal zu erreichenden Rabatts
var premium = 50; // Festelgen des Verischerungstarifs

chrome.runtime.sendMessage({ action: "sendScores" }, function (response) {
  // erhalt die Variablen aus background.js und zeigt im Popup an
  document.getElementById("nScore").textContent = response.nScore.toFixed(2);
  document.getElementById("averageUscore").textContent = response.averageUscore.toFixed(2);
  document.getElementById("avgScore").textContent = response.avgScore.toFixed(2);
  document.getElementById("pScore").textContent = response.pScore.toFixed(2);

  //Deklaration der Variablen
  averageUscore = response.averageUscore;
  avgScore = response.avgScore;
  pScore = response.pScore;

  // Abfragen der Daten aus der Datenbank
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost/phys/datenbank.php?name=Pablo', true);
  xhr.onload = function () {
    if (this.status == 200) {
      var userData = JSON.parse(this.responseText);
      //Speichern des cvri und its Scores
      var cvri = userData.cvri;
      var its = userData.its;

      // Rabatt und Prämie berechnen
      rabatt = (maxRabatt * avgScore).toFixed(2);
      premium = (premium - rabatt).toFixed(2);

      // Overall Consumer Score berechnen
      consumerScore = ((avgScore + cvri + its) /3).toFixed(2);
      
      // Ergebnis anzeigen
      consumerScoreChanged(consumerScore)
      itsChanged(its)
      cvriChanged(cvri);
      rabattChanged(rabatt);
      premiumChanged(premium);
    }
  };
  xhr.send();

  document.getElementById('show-popup-2').addEventListener('click', function () {
    //Weiterleitung zur Infoseite
    chrome.tabs.create({ url: 'info.html' });
  });

  document.getElementById('submitBtn').addEventListener('click', function () {
    // Errechnete Variablen in die Datenbank speichern
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "http://localhost/phys/database.php", true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.send("score=" + avgScore.toFixed(2) + "&rabatt=" + rabatt + "&premium=" + premium + "&consumerScore=" + consumerScore);
  });
});

function consumerScoreChanged(consumerScore){
  //Anzeigen der Scores
  document.getElementById("consumerScore").textContent = consumerScore;
}

function itsChanged(its) {
    //Anzeigen der Scores
  document.getElementById("its").textContent = its;
}

function cvriChanged(cvri) {
    //Anzeigen der Scores
  document.getElementById("cvri").textContent = cvri;
}

function rabattChanged(rabatt) {
    //Anzeigen der Scores
  document.getElementById("rabatt").textContent = rabatt;
}

function premiumChanged(premium) {
    //Anzeigen der Scores
  document.getElementById("premium").textContent = premium;
}
