// I know, I know - this is truly disgusting. I'm sorry.
// If no one else wants to tackle this in a programatic way, I'll eventually return - BL
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

// Social box
var edSocialBox = document.getElementById("edSocials");

// File uploader for JUST the main image (not links) - this was very early on and needs love
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

// Links
// Add a new link
var edLinkHolder = document.getElementById("edLinkHolder");
var addLink = document.getElementById("addLink");

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

    // Create a div to hold add image, move link up, move link down, remove link
    var edLinkControls = document.createElement("div");
    edLinkControls.setAttribute("id", "edLinkControls" + uniqueId);
    edLinkControls.setAttribute("class", "edLinkControls");

    // Move link up button
    var edLinkUp = document.createElement("button");
    edLinkUp.onclick = function() { moveLinkUp(uniqueId); };
    edLinkUp.innerHTML = "Up";
    edLinkControls.appendChild(edLinkUp);
    
    // Move link down button
    var edLinkDown = document.createElement("button");
    edLinkDown.onclick = function() { moveLinkDown(uniqueId); };
    edLinkDown.innerHTML = "Down";
    edLinkControls.appendChild(edLinkDown);

    // Image button
    var edLinkImageAdd = document.createElement("button");
    edLinkImageAdd.setAttribute("id", "addLinkImage" + uniqueId);
    edLinkImageAdd.onclick = function() { imageUpload(uniqueId); };
    edLinkImageAdd.innerHTML = "Change Image";
    edLinkControls.appendChild(edLinkImageAdd);

    // Remove link button
    var edLinkRemove = document.createElement("button");
    edLinkRemove.setAttribute("id", "removeLink" + uniqueId);
    edLinkRemove.onclick = function() { removeLink(uniqueId); };
    edLinkRemove.innerHTML = "X";
    edLinkControls.appendChild(edLinkRemove);

    edLink.appendChild(edLinkTitle);
    edLink.appendChild(edLinkURL);
    edLink.appendChild(edLinkControls);
    edLinkHolder.appendChild(edLink);
}

// Remove a link
function removeLink(linkToRemove) {
    var linkElement = document.getElementById("edLink" + linkToRemove);
    linkElement.parentNode.removeChild(linkElement);
    
    // Remove the link from the config
    config.links.splice(findLink(linkToRemove), 1);
    init(config);
}

function moveLinkUp(linkToMove) {
    var linkIndex = findLink(linkToMove.slice(-14));
    var link = config.links[linkIndex];
    config.links.splice(linkIndex, 1);
    config.links.splice(linkIndex - 1, 0, link);
    init(config);

    // remove the builder links and recreate them
    edLinkHolder.innerHTML = "";
    fillLinks();
}

function moveLinkDown(linkToMove) {
    var linkIndex = findLink(linkToMove.slice(-14));
    var link = config.links[linkIndex];
    config.links.splice(linkIndex, 1);
    config.links.splice(linkIndex + 1, 0, link);
    init(config);
    
    // remove the builder links and recreate them
    edLinkHolder.innerHTML = "";
    fillLinks();
}

// Create link entries for existing links in the config
function fillLinks() {
    var links = config.links;

    for (var i = 0; i < links.length; i++) {
        createLink(links[i].id);
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

    config.links[linkIndex][key] = linkUpdate;
    init(config);
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

    edSocialBox.value           = returnSocials(config.social);



    fillLinks();
}

// Return the content of json.social array as a string, separated by commas
function returnSocials(json) {
    var socialsString = json.join("\n");

    return socialsString;
}

function compileSocials() {
    var socials = edSocialBox.value.split("\n");
    var socialsArray = [];
    
    for (var i = 0; i < socials.length; i++) {
        if (socials[i] !== "") {
            socialsArray.push(socials[i]);
        }
    }

    return socialsArray;
}

// on change of the socials box, update the config
edSocialBox.addEventListener("change", function() {
    config.social = compileSocials();
    init(config);
});

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

// Credit: BananaAcid - https://stackoverflow.com/a/56607553
function imageUpload(ev) {
    console.log(ev);
    var el = window._protected_reference = document.createElement("INPUT");
    el.type = "file";
    el.accept = "image/*";
    
    // (cancel will not trigger 'change')
    el.addEventListener('change', function(ev2) {
      // access el.files[] to do something with it (test its length!)
      
    var linkId = ev;
    var linkIndex = findLink(linkId);

      // add first image, if available
      if (el.files.length) {
        var myFile = el.files[0];
        var reader = new FileReader();
        
        reader.addEventListener('load', function (e) {
            var fileContent = e.target.result;

            // Resize the image and once it's done set the config
            resizedataURL(fileContent, 80, function (fileContent) {
                console.log("Event has fired");
                config.links[linkIndex]["image"] = fileContent;
                init(config);
            });
        });

        reader.readAsDataURL(myFile); // Read the file as Data URL (Base64)

      }

      // test some async handling
      new Promise(function(resolve) {
        setTimeout(function() { console.log(el.files); resolve(); }, 1000);
      })
      .then(function() {
        // clear / free reference
        el = window._protected_reference = undefined;
      });
  
    });
  
    el.click(); // open
  }
