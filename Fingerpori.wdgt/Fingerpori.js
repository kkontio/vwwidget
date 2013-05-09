/*
    Fingerpori widget - Fetches Fingerpori comic strip
    from <http://www.hs.fi/>
    
    --Mursu 

    Fingerpori widget is distributed in the hope that it will
    be useful, but WITHOUT ANY WARRANTY; without even the implied
    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

*/

widget.onshow = onshow;
var prev_url, next_url;
var base_url = "http://www.hs.fi";

function onshow() {
    load_comic("http://www.hs.fi/fingerpori/");
}

function load_comic(strip_url) {
    $.get(strip_url, null, parse_data);
}

function parse_data(data) {
    current_img_url = $(data).find("#full-comic > div + div + div > img").attr("src");
    prev_url = base_url + $(data).find(".prev-cm").attr("href");
    next_url = base_url + $(data).find(".next-cm").attr("href");    
    
    $("#fingerpori").attr("src", current_img_url);

    //Check if previous comics exist and hide controls if not
    if (prev_url !== "http://www.hs.fi/fingerpori/") {
        $("#previous").off("click");
        $("#previous").on("click", function() { load_comic(prev_url); });
        $("#previous").show();
    } else {
        $("#previous").off("click");
        $("#previous").hide();
    }
    if (next_url !== "http://www.hs.fi/fingerpori/") {
        $("#next").off("click");
        $("#next").on("click", function() { load_comic(next_url); });
        $("#next").show();
    } else {
        $("#next").off("click");
        $("#next").hide();
    }
}

