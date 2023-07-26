var pScore = 0;

// Funktion zur Aktualisierung und Ausgabe des Scores
function updateScore() {
  console.log("Passwort-Score:", pScore);
  chrome.runtime.sendMessage({pScore});
}

document.addEventListener('keydown', function(event) {
  var currentElement = event.target;
  var elementType = currentElement.type;

  if (elementType === "password") {
    currentElement.addEventListener('keyup', function() {
      var password = currentElement.value;

      pScore = 0; // setze den Score auf 0 zurück

      if (password.length > 6) {
        pScore += 0.25;
      }

      if (password.match(/\d+/)) {
        pScore += 0.25;
      }

      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        pScore += 0.25;
      }

      if (password.match(/[^\w\s]/)) {
        pScore += 0.25;
      }

      updateScore(); // rufe die Funktion zur Aktualisierung und Ausgabe des Scores auf
    });
  }
});
