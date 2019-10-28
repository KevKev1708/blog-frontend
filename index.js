let createElement = function (element, content) {
    let createdElement = document.createElement(element);
    createdElement.innerHTML = content;
    return createdElement;
}

//holt die Daten von dem Server mit dem Endpunkt "/blogs" "http://localhost:8080/blogs" und formatiert sie zu JSON und ruft dann die
//Funktion buildPosts auf
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(buildPosts)
//Funktion geht durch alle Daten und erstellt für jeden Post einen div-Container, h2 und p-Container und schreibt dort
//die Daten rein
function buildPosts(posts) {
    posts.forEach(post => {

        let div = createElement("div", "");
        let h2 = createElement("h2", post.title);
        let p = createElement("p", post.body);
        let userId = post.userId;

        div.classList.add("post");
        div.appendChild(h2);
        h2.setAttribute('userId', userId);
        h2.addEventListener('click', () => {
            document.getElementById('authors').innerHTML = "";
            let loadingIndicator = createElement("div", "loading...");
            document.getElementById('authors').appendChild(loadingIndicator);
            fetch('https://jsonplaceholder.typicode.com/users/' + userId)
                .then(response => response.json())
                .then(buildAuthor)
        });
        div.appendChild(p);
        //hier wird der erstellte div-Bereich an den schon bestehenden div-Bereich angeschoben
        document.getElementById('posts').prepend(div);
    })
};

function buildAuthor(author) {
    let div = createElement("div", "");
    let name = createElement("p", author.name);
    let email = createElement("a", author.email);
    let website = createElement("a", author.website);
    let brElement = createElement("br", "");
    email.setAttribute("href", "mailto:" + author.email);
    website.setAttribute("href", author.website);

    name.classList.add("name");
    div.classList.add("author");
    div.appendChild(name);
    div.appendChild(email);
    div.appendChild(brElement);
    div.appendChild(website);
    document.getElementById('authors').innerHTML = "";
    document.getElementById('authors').prepend(div);
};