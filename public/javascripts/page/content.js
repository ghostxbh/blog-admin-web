$(function () {
    editormd("test-editormd", {
        width: "90%",
        height: 640,
        syncScrolling: "single",
        //你的lib目录的路径，
        path: "/editor.md/lib/",
        //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
        saveHTMLToTextarea: true,
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "/upload/image",
    });
    $('#content-save-click').click(function () {
        let title = $('#content-title').val();
        let introduction = $('#content-introduction').val();
        let images = $('#content-images').val();
        let source = $('#content-source').val();
        let content = $('.editormd-html-textarea').val();
        let labels = $('#content-labels').val();
        let typeId = $('.type-list-picker').val();
        let specialId = $('.special-list-picker').val();
        let top = $('.top-list-picker').val();
        let recommend = $('.recommend-list-picker').val();
        let status = $('.status-list-picker').val();
        if (!title) {
            $('#content-title').css('border', '1px solid red');
            return;
        }
        if (!typeId) {
            $('.type-list-picker').css('border', '1px solid red');
            return;
        }
        create({title, introduction, images, source, content, status, typeId, specialId, labels});
    })
});

function create(content) {
    $.ajax({
        url: "/content/add",
        type: "post",
        data: content,
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function catePicker(index, treeList) {
    treeList = JSON.parse(treeList);
    let typeList = treeList[index].children;
    if (typeList && typeList.length > 0) {
        $('.type-list-picker').empty();
        let html = '';
        for (var i = 0; i < typeList.length; i++) {
            var type = typeList[i];
            html += `<option value="${type.id}">${type.name}</option>`;
        }
        $('.type-list-picker').append(html);
    }
}

function showImage(url) {
    $('#content-images').attr('src', url);
}