function upload_img() {
    var myfile = document.getElementById("img-input").files[0];
    if (!myfile) {
        alert("请先上传文件");
        return;
    }
    var formData = new FormData();
    formData.append("myfile", myfile);
    $.ajax({
        url: "/upload/img",
        type: "post",
        data: formData,
        success: function (data) {
            if (data.success == 1) $('#show-img').attr('src', data.url);
            else alert(data.message);
        },
        error: function (data) {
            console.log(data);
        }
    });
}
