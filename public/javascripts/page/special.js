function upload_img() {
    var myfile = document.getElementById("img-input").files[0];
    console.log(myfile);
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
            console.log(data);
            if (data.code == 200) {
                console.log(data.message);
                $('#show-img').attr('src', data.url);
            } else {
                alert(data.message);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}