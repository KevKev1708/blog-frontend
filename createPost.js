//Funktion ruft die Funktion "document.getElementById" mit der Variable "id" auf und setzt diese in die Funktion ein
//sprich, q('textarea'), q ruft "document.getElementById" auf und der Wert in der Klammer ist die jeweilige ID
function q(id) {
    return document.getElementById(id);
}
//Weist der Variable "button",per ID, den Button von der HTML-Seite zu
let button = q("knopf");
let title = q("title");
let body = q("body");
let author = q("author");

//Variable "button" bekommt ein Event "click" mit anonymer Callback-Funktion,
//welche nur auf Klick die Daten aus Eingabefeldern in die Datenbank schickt
button.addEventListener('click', () => {
    let data = {};

    //Wenn in den jeweiligen Bereichen(Eingabefelder) etwas drinnen steht, dann werden diese an den Body übergeben
    if (title.value && body.value && author.value) {
        data = {
            title: title.value.trim(),
            body: body.value.trim(),
            author: author.value.trim()
        }
    }

    //Ternäre Operator(kurzschreibweise von if-else Anweisung), fragt, ob der vor dem Fragezeichen stehende Ausdruck
    //true ist, wenn das der Fall ist, wird der Ausdruck vor dem Doppelpunkt ausgeführt, wenn nicht der nach dem Doppelpunkt
    title.value ? title.classList.remove("warning") : title.classList.add("warning");
    body.value ? body.classList.remove("warning") : body.classList.add("warning");
    author.value ? author.classList.remove("warning") : author.classList.add("warning");
    //schickt die Daten an den Server mit dem Endpunkt "/blogs" "http://localhost:8080/blogs" mit der POST-Methode
    fetch('http://localhost:8080/blogs', {
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
        //bei Fehlschlag "Kein Erfolg!" und hängt den Container an den Body dran
        .then(json => {
            let div = document.createElement("div");
            if (json.success) {
                div.innerText = "Erfolg!";
                document.body.appendChild(div);
            } else {
                div.innerText = "Kein Erfolg!";
                //Erstelltes "div" wird nach dem "body" angeschoben
                document.body.appendChild(div);
            }
        });
});