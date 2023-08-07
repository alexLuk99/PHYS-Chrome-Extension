let urlScores = [];
const specialChar = /[^A-Za-z0-9:\/.\-]/g;
let categories = ["xxx", "stream", "gambling", "porn", "bet", "betting", "sport", "download", "mp3", "free"];
let totalTimeInMinutes = 280; //startZeit
let startScore = 1; //Score startet bei 1
let endScore = 0;
let totalSeconds = 0;
let pScore = 0;

// Wird ausgelöst, wenn eine Tab aktiv wird.
chrome.tabs.onUpdated.addListener(trackURLRisk);
chrome.browserAction.onClicked.addListener(sendScoresToContentScript);
    
//Kalkulation des URL-Scores
function trackURLRisk(tabId, changeInfo, tab){
    if (changeInfo.status === 'loading' && tab.active) {
        let url = tab.url;
        let uScore = 0;

        //Prüfe, ob https Verbindung besteht
        if (url.startsWith('https')) {
            uScore += 0.25;
        }

        //Prüfe ob es eine unübliche Anordnung von Zeichen und Sonderzeichen gibt
        //Wenn es weniger als 20 Prozent Zeichen und Sonderzeichen gibt, erhöht sich der Score
        if (specialChar / url.length < 0.2) {
            uScore += 0.25;
        }

        //Prüfe, ob Webseite einer gefährlichen Kategorie angehört
        if (!categories.some(category => url.includes(category))) {
            uScore += 0.25;
        }

        // Prüfung mittels der Chrome API, ob die URL auf der Blacklist steht
        const endpoint = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + 'AIzaSyBshXMzDp4nv0QpBxmEiNVCzCtDjGEXSWU';
        const requestBody = {
            "client": {
                "clientId": "my-extension",
                "clientVersion": "1.0.0"
            },
            "threatInfo": {
                "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [{ "url": url }]
            }
        };

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {// Wenn URL blacklisted ist, dann wird der Score auf 0 gesetzt
            if (data.matches && data.matches.length > 0) {
                uScore = 0;
            } else {
                uScore += 0.25;
            }

            urlScores.push(uScore);
        })
        .catch(error => {
            console.log("Error checking URL safety: ", error);
        });
    }
}

//Funktionen zur Berechnung des Time-Scores
function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  //Hört ob Daten abgefragt werden
  function sendScoresToContentScript(tab) {
    chrome.runtime.sendMessage({action: "sendScores"});
  } 
  
  //Übersenden der Scores an popup.js
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "sendScores") {
      //nScore ist der Time-Score
      const nScore = (startScore - (totalSeconds / (totalTimeInMinutes * 60)) * (startScore - endScore));
      //
      const averageUscore = (urlScores.reduce((total, score) => total + score, 0) / urlScores.length);
      //avgScore ist der Behavioral-Score
      const avgScore = ((nScore + averageUscore + pScore) / 3);
      sendResponse({nScore, averageUscore, avgScore, pScore});
    }
  }); 

  //Kalkulation des Password-Scores
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.pScore) {
      pScore = message.pScore;
      console.log(`Password strength: ${pScore}`);
    }
  });



