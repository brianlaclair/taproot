// build.js handles the process of importing data from /configuration into the page when loaded

// Import Config File
fetch('configuration/config.json')
    .then((response) => response.json())
    .then((json) => {
        // Set the page title
        document.title = json.title;

        // Set metadata
        document.querySelector('meta[name="description"]').setAttribute("content", json.description);
        document.querySelector('link[rel="icon"]').setAttribute("href", "media/" + json.image);

        // Set inline content (profile picture, profile name, description)
        document.getElementById("profilePicture").src           = "media/" + json.image;
        document.getElementById("profileName").innerHTML        = json.title;
        document.getElementById("profileDescription").innerHTML = json.description;

        links();
    });

function links() {
    fetch('configuration/links.json')
    .then((response) => response.json())
    .then((json) => {
        // Populate the links based on the links.json file
        // We're building elements that look like this: <a class="linkOut" href="#"><div class="link"><img class="linkImage" src="media/avatar.png"><div class="linkText">Test Link 123</div></div></a>
        // and placing them inside of linkList
        var linkList = document.getElementById("linkList");

        var jsonLinks = json.links;

        for (var i = 0; i < jsonLinks.length; i++) {
            var link = document.createElement("a");
            link.setAttribute("class", "linkOut");
            link.setAttribute("href", jsonLinks[i].url);

            var linkElement = document.createElement("div");
            linkElement.setAttribute("class", "link");

            var linkImage = document.createElement("img");
            linkImage.setAttribute("class", "linkImage");
            linkImage.setAttribute("src", "media/" + jsonLinks[i].image);

            var linkText = document.createElement("div");
            linkText.setAttribute("class", "linkText");
            linkText.innerHTML = jsonLinks[i].title;

            if (jsonLinks[i].image !== "") {
                linkElement.appendChild(linkImage);
            }
            linkElement.appendChild(linkText);
            link.appendChild(linkElement);
            linkList.appendChild(link);
        }
    });
}

function checkImage(image) {
    if (image.includes("http")) {
        return image;
    } else {
        return "media/" + image;
    }
}