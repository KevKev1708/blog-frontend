//Funktion ruft die Funktion "document.getElementById" mit der Variable "id" auf und setzt diese in die Funktion ein
//sprich, q('textarea'), q ruft "document.getElementById" auf und der Wert in der Klammer ist die jeweilige ID
function q(id) {
  return document.getElementById(id);
}
//Weist der Variable "button",per ID, den Button von der HTML-Seite zu
let button = q("knopf");
let firstn = q("firstn");
let lastn = q("lastn");
let email = q("email");

//Variable "button" bekommt ein Event "click" mit anonymer Callback-Funktion,
//welche nur auf Klick die Daten aus Eingabefeldern in die Datenbank schickt
button.addEventListener('click', () => {
  let data = {};

  //Wenn in den jeweiligen Bereichen(Eingabefelder) etwas drinnen steht, dann werden diese an den lastn übergeben
  if (firstn.value && lastn.value && email.value) {
    data = {
      firstn: firstn.value.trim(),
      lastn: lastn.value.trim(),
      email: email.value.trim()
    }
  }

  //Ternäre Operator(kurzschreibweise von if-else Anweisung), fragt, ob der vor dem Fragezeichen stehende Ausdruck
  //true ist, wenn das der Fall ist, wird der Ausdruck vor dem Doppelpunkt ausgeführt, wenn nicht der nach dem Doppelpunkt
  firstn.value ? firstn.classList.remove("warning") : firstn.classList.add("warning");
  lastn.value ? lastn.classList.remove("warning") : lastn.classList.add("warning");
  email.value ? email.classList.remove("warning") : email.classList.add("warning");
  //schickt die Daten an den Server mit dem Endpunkt "/users" "http://localhost:8080/users" mit der POST-Methode
  fetch(window.config.SERVER_URL + '/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  })

    //Variable "response" wird zu JSON formatiert, es nimmt die Daten aus "response" und ließt es klompett,
    //danach gibt es ein promise zurück, welches den geparsten JSON-Text beinhaltet
    //Zudem gibt es noch: .arrayBuffer(), .blob(), .formData(), .text() 
    .then(response => response.json())
    //Funktion mit Übergabewert "json" erstellt einen div-Container, welcher bei Erfolg "Erfolg!" schreibt und
    //bei Fehlschlag "Kein Erfolg!" und hängt den Container an den lastn dran
    .then(json => {
      let div = document.createElement("div");
      if (json.success) {
        div.innerText = "Erfolg!";
        document.body.appendChild(div);
      } else {
        div.innerText = "Kein Erfolg!";
        //Erstelltes "div" wird nach dem "lastn" angeschoben
        document.body.appendChild(div);
      }
    });
});