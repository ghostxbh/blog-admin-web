function upload_img(upfile) {
    console.log(upfile);
    var formData = new FormData();
    for (var i = 0; i < upfile.length; i++) {
        formData.append("upfile[]", upfile[i]);
    }
    $.ajax({
        url: "/upload/img",
        type: "post",
        data: formData,
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,   // 不设置内容类型
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}