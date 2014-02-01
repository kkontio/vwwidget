/*
    Viivi ja Wagner widget - Fetches Viivi ja Wagner comic strip
    from <http://www.hs.fi/>
    
    Viivi ja Wagner Copyright (c) Juba Tuomola
    
    Project home: https://github.com/kkontio/vwwidget
    
    The MIT License (MIT)

    Copyright (c) 2014 Kai Kontio

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

widget.onshow = onshow;
var base_url = "http://www.hs.fi";

function onshow() {
    load_comic("http://www.hs.fi/viivijawagner/");
}

function load_comic(strip_url) {
    $.get(strip_url, null, parse_data);
}

function parse_data(data) {
    var current_img_url = $(data).find("#full-comic > div + div + div > img").attr("src");
    var prev_url = base_url + $(data).find(".prev-cm").attr("href");
    var next_url = base_url + $(data).find(".next-cm").attr("href");    
    
    $("#viivijawagner").attr("src", current_img_url);
    
    var prev_arrow = $("#previous");
    var next_arrow = $("#next");
    
    //Check if previous comics exist and hide controls if not
    if (prev_url !== "http://www.hs.fi/viivijawagner/") {
        prev_arrow.off("click");
        prev_arrow.on("click", function() { load_comic(prev_url); });
        prev_arrow.show();
    } else {
        prev_arrow.off("click");
        prev_arrow.hide();
    }
    if (next_url !== "http://www.hs.fi/viivijawagner/") {
        next_arrow.off("click");
        next_arrow.on("click", function() { load_comic(next_url); });
        next_arrow.show();
    } else {
        next_arrow.off("click");
        next_arrow.hide();
    }
}
