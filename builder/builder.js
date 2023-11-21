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
            // Set config.image to the base64 string
            config.image = fileContent;
            init(config);
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
    createLink();
    // // Create a new link in the config
    config.links.push({
        title: "",
        url: "",
        image: ""
    });
    init(config);
});

function createLink() {
    var edLink = document.createElement("div");
    edLink.setAttribute("id", "edLink" + linkCount);
    edLink.setAttribute("class", "edLink");

    var edLinkTitle = document.createElement("input");
    edLinkTitle.setAttribute("type", "text");
    edLinkTitle.setAttribute("id", "edLinkTitle" + linkCount);
    edLinkTitle.setAttribute("name", "linkTitle");
    edLinkTitle.setAttribute("placeholder", "Link Title");

    var edLinkURL = document.createElement("input");
    edLinkURL.setAttribute("type", "text");
    edLinkURL.setAttribute("id", "edLinkURL" + linkCount);
    edLinkURL.setAttribute("name", "linkURL");
    edLinkURL.setAttribute("placeholder", "Link URL");

    var edLinkImage = document.createElement("input");
    edLinkImage.setAttribute("type", "file");
    edLinkImage.setAttribute("id", "edLinkImage" + linkCount);
    edLinkImage.setAttribute("name", "linkImage");
    edLinkImage.setAttribute("accept", "image/*");

    var edLinkRemove = document.createElement("button");
    edLinkRemove.setAttribute("id", "removeLink" + linkCount);
    edLinkRemove.setAttribute("class", "red");
    edLinkRemove.innerHTML = "X";

    edLink.appendChild(edLinkTitle);
    edLink.appendChild(edLinkURL);
    edLink.appendChild(edLinkImage);
    edLink.appendChild(edLinkRemove);
    edLinkHolder.appendChild(edLink);

    linkCount++;
}

// Remove a link
edLinkHolder.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "BUTTON") {
        var linkToRemove = event.target.id.replace("removeLink", "");
        var linkElement = document.getElementById("edLink" + linkToRemove);
        linkElement.parentNode.removeChild(linkElement);

        // Remove the link from the config
        config.links.splice(linkToRemove, 1);
        init(config);
    }
});

// Create link entries for existing links in the config
function fillLinks() {
    var links = config.links;

    for (var i = 0; i < links.length; i++) {
        createLink();
        document.getElementById("edLinkTitle" + i).value = links[i].title;
        document.getElementById("edLinkURL" + i).value = links[i].url;
    }
}

// Allow changes in the link editor to update the config
edLinkHolder.addEventListener("change", function(event) {
    var linkToUpdate = event.target.id.replace("edLink", "");

    var linkUpdate = document.getElementById("edLink" + linkToUpdate).value;

    // Get the name of the input that was changed
    var key = linkToUpdate.replace(/[^a-zA-Z]/g, "").toLowerCase();

    // Get just the number from linkToUpdate
    linkToUpdate = linkToUpdate.replace(/[^0-9]/g, "");

    // Just update the affected key
    config.links[linkToUpdate][key] = linkUpdate;

    init(config);
});

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
    editorTwitch.value          = config.social.twitch;
    editorYoutube.value         = config.social.youtube;
    editorGithub.value          = config.social.github;
    editorLinkedIn.value        = config.social.linkedin;

    fillLinks();
}
