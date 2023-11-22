// I know, I know - this is truly disgusting. I'm sorry.
// If no one else wants to tackle this in a programatic way, I'll eventually return - BL

// on change for the title, update config.title and rerun init
var editorImage         = document.getElementById("edImage");
var editorBackground    = document.getElementById("edBackgroundImage");
var editorTitle         = document.getElementById("edTitle");
var editorTitleOnPage   = document.getElementById("edTitleOnPage");
var editorDescription   = document.getElementById("edDescription");

// colors
var editorColorPrimary      = document.getElementById("edColorPrimary");
var editorColorSecondary    = document.getElementById("edColorSecondary");
var editorColorTertiary     = document.getElementById("edColorTertiary");
var editorColorQuaternary   = document.getElementById("edColorQuaternary");
var editorColorQuinary      = document.getElementById("edColorQuinary");

// Socials
var editorFacebook      = document.getElementById("edFacebook");
var editorTwitter       = document.getElementById("edTwitter");
var editorInstagram     = document.getElementById("edInstagram");
var editorTikTok        = document.getElementById("edTiktok");
var editorTwitch        = document.getElementById("edTwitch");
var editorYoutube       = document.getElementById("edYoutube");
var editorGithub        = document.getElementById("edGithub");
var editorLinkedIn      = document.getElementById("edLinkedIn");


document.addEventListener('DOMContentLoaded', function () {
    var fileInput = editorImage;

    fileInput.addEventListener('change', function (event) {
        var myFile = event.target.files[0]; // Get the file
        var reader = new FileReader();

        reader.addEventListener('load', function (e) {
            var fileContent = e.target.result;

            // convert to webp
            convertDataURL(fileContent, function (fileContent) {
                config.image = fileContent;
                init(config);
            });
        });

        reader.readAsDataURL(myFile); // Read the file as Data URL (Base64)
    });
});

editorTitle.addEventListener("change", function() {
    config.title = editorTitle.value;
    init(config);
});

editorDescription.addEventListener("change", function() {
    config.description = editorDescription.value;
    init(config);
});

editorTitleOnPage.addEventListener("change", function() {
    config.style.displayTitle = editorTitleOnPage.checked;
    init(config);
});

editorBackground.addEventListener("change", function() {
    config.style.displayBackground = editorBackground.checked;
    init(config);
});

editorColorPrimary.addEventListener("change", function() {
    config.style.main_bg_color = editorColorPrimary.value;
    init(config);
});

editorColorSecondary.addEventListener("change", function() {
    config.style.main_image_bg_color = editorColorSecondary.value;
    init(config);
});

editorColorTertiary.addEventListener("change", function() {
    config.style.main_text_color = editorColorTertiary.value;
    init(config);
});

editorColorQuaternary.addEventListener("change", function() {
    config.style.main_link_color = editorColorQuaternary.value;
    init(config);
});

editorColorQuinary.addEventListener("change", function() {
    config.style.main_link_hover_color = editorColorQuinary.value;
    init(config);
});

editorFacebook.addEventListener("change", function() {
    config.social.facebook = editorFacebook.value;
    init(config);
});

editorTikTok.addEventListener("change", function() {
    config.social.tiktok = editorTikTok.value;
    init(config);
});

editorTwitter.addEventListener("change", function() {
    config.social.twitter = editorTwitter.value;
    init(config);
});

editorInstagram.addEventListener("change", function() {
    config.social.instagram = editorInstagram.value;
    init(config);
});

editorTwitch.addEventListener("change", function() {
    config.social.twitch = editorTwitch.value;
    init(config);
}); 

editorYoutube.addEventListener("change", function() {
    config.social.youtube = editorYoutube.value;
    init(config);
});

editorGithub.addEventListener("change", function() {
    config.social.github = editorGithub.value;
    init(config);
});

editorLinkedIn.addEventListener("change", function() {
    config.social.linkedin = editorLinkedIn.value;
    init(config);
});


// Links
// Add a new link
var edLinkHolder = document.getElementById("edLinkHolder");
var addLink = document.getElementById("addLink");
var linkCount = 0;

addLink.addEventListener("click", function() {
    var uniqueId = Date.now() + generateRandomLetter(); // This is a unique ID for the link
    createLink(uniqueId);
    // Create a new link in the config
    config.links.push({
        id: uniqueId,
        title: "",
        url: "",
        image: ""
    });
    init(config);
});

function createLink(uniqueId) {
    var edLink = document.createElement("div");
    edLink.setAttribute("id", "edLink" + uniqueId);
    edLink.setAttribute("class", "edLink");

    var edLinkTitle = document.createElement("input");
    edLinkTitle.setAttribute("type", "text");
    edLinkTitle.setAttribute("id", "edLinkTitle" + uniqueId);
    edLinkTitle.setAttribute("name", "linkTitle");
    edLinkTitle.setAttribute("placeholder", "Link Title");

    var edLinkURL = document.createElement("input");
    edLinkURL.setAttribute("type", "text");
    edLinkURL.setAttribute("id", "edLinkURL" + uniqueId);
    edLinkURL.setAttribute("name", "linkURL");
    edLinkURL.setAttribute("placeholder", "Link URL");

    var edLinkImage = document.createElement("input");
    edLinkImage.setAttribute("type", "file");
    edLinkImage.setAttribute("id", "edLinkImage" + uniqueId);
    edLinkImage.setAttribute("class", "edLinkImage");
    edLinkImage.setAttribute("name", "linkImage");
    edLinkImage.setAttribute("accept", "image/*");

    var edLinkRemove = document.createElement("button");
    edLinkRemove.setAttribute("id", "removeLink" + uniqueId);
    edLinkRemove.setAttribute("class", "red");
    edLinkRemove.innerHTML = "X";

    edLink.appendChild(edLinkTitle);
    edLink.appendChild(edLinkURL);
    edLink.appendChild(edLinkImage);
    edLink.appendChild(edLinkRemove);
    edLinkHolder.appendChild(edLink);
}

// Remove a link
edLinkHolder.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "BUTTON") {
        var linkToRemove = event.target.id.replace("removeLink", "");
        var linkElement = document.getElementById("edLink" + linkToRemove);
        linkElement.parentNode.removeChild(linkElement);

        // Remove the link from the config
        config.links.splice(findLink(linkToRemove), 1);
        init(config);
    }
});

// Create link entries for existing links in the config
function fillLinks() {
    var links = config.links;

    for (var i = 0; i < links.length; i++) {
        createLink(links[i].id);
        console.log(links[i].id);
        document.getElementById("edLinkTitle" + links[i].id).value = links[i].title;
        document.getElementById("edLinkURL" + links[i].id).value = links[i].url;
    }
}

function findLink(id) {
    var links = config.links;

    for (var i = 0; i < links.length; i++) {
        if (links[i].id == id) {
            return i;
        }
    }
}

// Allow changes in the link editor to update the config
edLinkHolder.addEventListener("change", function(event) {
    var linkToUpdate = event.target.id.replace("edLink", "");
    var linkUpdate = document.getElementById("edLink" + linkToUpdate).value;

    // Get the name of the input that was changed
    var key = linkToUpdate.replace(/[^a-zA-Z]/g, "").toLowerCase().slice(0, -1);

    // Just update the affected key
    var linkIndex = findLink(linkToUpdate.slice(-14));

    // if the key is image, we need to handle it differently
    if (key == "image") {
        var myFile = event.target.files[0]; // Get the file
        var reader = new FileReader();
        
        reader.addEventListener('load', function (e) {
            var fileContent = e.target.result;

            // Resize the image and once it's done set the config
            resizedataURL(fileContent, 80, function (fileContent) {
                console.log("Event has fired");
                config.links[linkIndex][key] = fileContent;
                init(config);
            });
        });

        reader.readAsDataURL(myFile); // Read the file as Data URL (Base64)
    } else {
        config.links[linkIndex][key] = linkUpdate;
        init(config);
    }
});

// When the saveButton is clicked, export the config as config.json
function saveAsFile(filename, data) {
    const blob = new Blob([JSON.stringify(data)]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()
};

function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function fillEditor() {
    editorBackground.checked    = config.style.displayBackground;
    editorTitle.value           = config.title;
    editorDescription.value     = config.description;
    editorTitleOnPage.checked   = config.style.displayTitle;

    editorColorPrimary.value    = config.style.main_bg_color;
    editorColorSecondary.value  = config.style.main_image_bg_color;
    editorColorTertiary.value   = config.style.main_text_color;
    editorColorQuaternary.value = config.style.main_link_color;
    editorColorQuinary.value    = config.style.main_link_hover_color;

    editorFacebook.value        = config.social.facebook;
    editorTwitter.value         = config.social.twitter;
    editorInstagram.value       = config.social.instagram;
    editorTikTok.value          = config.social.tiktok;
    editorTwitch.value          = config.social.twitch;
    editorYoutube.value         = config.social.youtube;
    editorGithub.value          = config.social.github;
    editorLinkedIn.value        = config.social.linkedin;

    fillLinks();
}

// original resizeddataURL Credit: Pierrick Martellière - https://stackoverflow.com/a/26884245
function resizedataURL(datas, wantedMaxDimension, callback) {
        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // Get original width and height of image
        img.src = datas;

        // When the event "onload" is triggered we can resize the image.
        img.onload = function() {

            // Keep original ratio
            var originalWidth = img.width;
            var originalHeight = img.height;
            var ratio = originalWidth / originalHeight;
            if (originalWidth > originalHeight) {
                var newWidth = wantedMaxDimension;
                var newHeight = wantedMaxDimension / ratio;
            } else {
                var newWidth = wantedMaxDimension * ratio;
                var newHeight = wantedMaxDimension;
            } 

            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width     = newWidth;
            canvas.height    = newHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, newWidth, newHeight);

            var dataURI = canvas.toDataURL('image/webp');

            // This is the return of the Function
            callback(dataURI);
        };
}

// convert a dataURL to webp
function convertDataURL(dataURL, callback) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = dataURL;
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        var newURL = canvas.toDataURL("image/webp");
        callback(newURL);
    };
}