// on change for the title, update config.title and rerun init
var editorTitle         = document.getElementById("edTitle");
var editorTitleOnPage   = document.getElementById("edTitleOnPage");
var editorDescription   = document.getElementById("edDescription");

// colors
var editorColorPrimary      = document.getElementById("edColorPrimary");
var editorColorSecondary    = document.getElementById("edColorSecondary");
var editorColorTertiary     = document.getElementById("edColorTertiary");
var editorColorQuaternary   = document.getElementById("edColorQuaternary");
var editorColorQuinary      = document.getElementById("edColorQuinary");


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


function fillEditor() {
    editorTitle.value       = config.title;
    editorDescription.value = config.description;
    editorTitleOnPage.checked = config.style.displayTitle;

    editorColorPrimary.value    = config.style.main_bg_color;
    editorColorSecondary.value  = config.style.main_image_bg_color;
    editorColorTertiary.value   = config.style.main_text_color;
    editorColorQuaternary.value = config.style.main_link_color;
    editorColorQuinary.value    = config.style.main_link_hover_color;
}
