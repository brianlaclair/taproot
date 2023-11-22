// build.js handles the process of importing data from /configuration into the page when loaded
// Import Config File

if (autoload) {
fetch('config.json')
    .then((response) => response.json())
    .then((json) => {
        init(json);
    });
}

function init(json) {
    // Clear title from previous init
    document.getElementById("profileName").innerHTML = "";
    // Clear links from previous init
    document.getElementById("linkList").innerHTML = "";
    // Clear socials from previous init
    document.getElementById("socialLinks").innerHTML = "";

    // Clear background image from previous init
    document.getElementById("background").src = "";

    // Set the page title
    document.title = json.title;

    // Set metadata
    document.querySelector('meta[name="description"]').setAttribute("content", json.description);
    document.querySelector('link[rel="icon"]').setAttribute("href", checkImage(json.image));

    // Set inline content (profile picture, profile name, description)
    document.getElementById("profilePicture").src               = checkImage(json.image);
    document.getElementById("profileDescription").innerHTML     = json.description;

    if (json.style.displayTitle) {
        document.getElementById("profileName").innerHTML        = json.title;
    }

    if (json.style.displayBackground) {
        document.getElementById("background").src               = checkImage(json.image);
    }

    // Convert all items in the style object to CSS variables
    var style = json.style;
    var styleKeys = Object.keys(style);
    for (var i = 0; i < styleKeys.length; i++) {
        document.documentElement.style.setProperty("--" + styleKeys[i].replaceAll("_", "-"), style[styleKeys[i]]);
    }

    // For each item in the socials object, create a social link, where the image is the social icon from /branding
    var socials = json.social;
    var socialKeys = Object.keys(socials);
    for (var i = 0; i < socialKeys.length; i++) {

        var brandingDir = "branding/";

        // Setting for Builder
        if (!autoload) {
            brandingDir = "../" + brandingDir;
        }

        var link = checkSocials(socials[socialKeys[i]]);

        if (link !== null) {
            var social = document.createElement("a");
            social.setAttribute("class", "socialLink");
            social.setAttribute("href", link);
            social.setAttribute("target", "_blank");

            var socialImage = document.createElement("img");
            socialImage.setAttribute("class", "socialImage");
            socialImage.setAttribute("src", brandingDir + socialKeys[i] + ".png");

            social.appendChild(socialImage);
            document.getElementById("socialLinks").appendChild(social);
        }
    }

    links(json.links);
}

function links(jsonLinks) {
    // We're building elements that look like this: <a class="linkOut" href="#"><div class="link"><img class="linkImage" src="media/avatar.png"><div class="linkText">Test Link 123</div></div></a>
    // and placing them inside of linkList

    var linkList = document.getElementById("linkList");

    for (var i = 0; i < jsonLinks.length; i++) {
        var link = document.createElement("a");
        link.setAttribute("class", "linkOut");
        link.setAttribute("href", jsonLinks[i].url);

        var linkElement = document.createElement("div");
        linkElement.setAttribute("class", "link");

        if (checkImage(jsonLinks[i].image)) {
            var linkImage = document.createElement("img");
            linkImage.setAttribute("class", "linkImage");
            linkImage.setAttribute("src", checkImage(jsonLinks[i].image));
            linkElement.appendChild(linkImage);
        }

        var linkText = document.createElement("div");
        linkText.setAttribute("class", "linkText");
        linkText.innerHTML = jsonLinks[i].title;

        linkElement.appendChild(linkText);
        link.appendChild(linkElement);
        linkList.appendChild(link);
    }
};

function checkSocials(url) {
    // Validate URL, if it looks like a URL, return it, otherwise return null
    var urlRegex = new RegExp("^(https?:\\/\\/)?"+ // protocol
        "(?:\\w{1,}\\.)?"+ // subdomain
        "(?:\\w{1,}\\.){1,}?"+ // domain name
        "[a-zA-Z]{2,63}\\/?"+ // TLD
        "(?:[\\w\\-\\.~:/?#\\[\\]@!$&'\\(\\)\\*\\+,;=]+)?$"); // port, path, query_string & anchor

    if (urlRegex.test(url)) {
        // URL is valid, but we need to check that it's not malformed
        if (url.includes("http")) {
            return url;
        } else {
            return "https://" + url;
        }
    }

    return null;
}

function checkImage(image) {
    // Validate image, if it looks like a full URL, return it - if it looks like just a filename, return the URL with the appended media/ path
    // It could also be a base64 encoded image, in which case we return that - otherwise return false

    var mediaDir = "media/";

    // Setting for Builder
    if (!autoload) {
        mediaDir = "../" + mediaDir;
    }

    var urlRegex = new RegExp("^(https?:\\/\\/)?"+ // protocol
        "(?:\\w{1,}\\.)?"+ // subdomain
        "(?:\\w{1,}\\.){1,}?"+ // domain name
        "[a-zA-Z]{2,63}\\/?"+ // TLD
        "(?:[\\w\\-\\.~:/?#\\[\\]@!$&'\\(\\)\\*\\+,;=]+)?$"); // port, path, query_string & anchor

    if (image !== undefined && image !== null) {
        if (urlRegex.test(image)) {
            // URL is valid, but we need to check that it's not local (i.e. it's not a filename)
            if (image.includes("http")) {
                return image;
            } else {
                return mediaDir + image;
            }
        }

        if (image.includes("data:image")) {
            return image;
        }
    }

    return false;
}