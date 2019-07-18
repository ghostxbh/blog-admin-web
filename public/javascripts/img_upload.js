function upload_img() {
    var myfile = document.getElementById("img-input").files[0];
    console.log(myfile);
    var filename = myfile.name;
    var formData = new FormData();
    formData.append("myfile", myfile);
    $.ajax({
        url: "/upload/img",
        type: "post",
        data: formData,
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,   // 不设置内容类型
        success: function (data) {
            var url = 'http://127.0.0.1:8090/images/test/'+filename;
            $('#show-img').attr('src', url);
        },
        error: function (data) {
            console.log(data);
        }
    });
}
