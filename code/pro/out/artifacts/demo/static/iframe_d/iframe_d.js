var iframe_d_header_fun_maxmin_is = false
var iframe_d_list = []

function iframe_d_open(list) {
    iframe_d_list = list
    $(".iframe_d").css({ "display": "flex", "z-index": iframe_d_list .z_index})

    var iframe_d_html =
        "<div class='iframe_d_mask' onclick='javascript:iframe_d_mask()'></div>" +
        "<div class='iframe_d_form'>" +
            "<div class='iframe_d_header'> " +
                "<div class='iframe_d_header_text'>" + iframe_d_list.title + "</div> " +
                "<div class='iframe_d_header_fun'>"
            
    if (list.maxmin) {
        iframe_d_html +=
                    "<div id='iframe_d_header_fun_maxmin' onclick='javascript:iframe_d_header_fun_maxmin()' class='iframe_d_header_fun_img'>放大</div>"
    }

    iframe_d_html +=
                    "<div id='iframe_d_header_fun_close' onclick='javascript:iframe_d_close()' class='iframe_d_header_fun_img'>关闭</div>" +
                "</div>" +
            "</div>" +
            "<div class='iframe_d_main'>" +

            "</div>" +
        "</div>";
    $(".iframe_d").append(iframe_d_html)

    $(".iframe_d_mask").css("z-index", iframe_d_list.z_index);
    $(".iframe_d_form").css({ "z-index": iframe_d_list.z_index + 1, "width": iframe_d_list.area.x+"px", "height": iframe_d_list.area.y+"px" })
    $(".iframe_d_iframe").css("height", (iframe_d_list.area.y - iframe_d_list.area.y*0.1)+"px")
}

function iframe_d_header_fun_maxmin() {
    if (!iframe_d_header_fun_maxmin_is) {
        $(".iframe_d_form").css({ "width": "100%", "height": "100%" })
        $("#iframe_d_header_fun_maxmin").text("缩小")
        iframe_d_header_fun_maxmin_is = true
    } else {
        $(".iframe_d_form").css({ "width": iframe_d_list.area.x + "px", "height": iframe_d_list.area.y + "px" })
        $("#iframe_d_header_fun_maxmin").text("放大")
        iframe_d_header_fun_maxmin_is = false
    }
}

function iframe_d_mask() {
    if (iframe_d_list.shadeClose) {
        iframe_d_close();
    }
}

function iframe_d_close() {
    iframe_d_list = [];
    iframe_d_header_fun_maxmin_is = false;
    $(".iframe_d").css("display", "none")
    $(".iframe_d_mask").css("display", "none")
    $(".iframe_d").html("")
}