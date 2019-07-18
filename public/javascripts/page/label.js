$(function () {
    $('#category-add').click(function () {
        $('#myModalLabel').empty().text('添加标签');
        let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label for="input_name" id="label-name">标签名称</label>
                        <input type="text" class="form-control" id="label-name" placeholder="请输入标签名称">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });
    $('#modal_submit').click(function () {
        let name = $('#label-name').val();
        let type = $('.input_type').val();
        if (type === 'add') {
            create(name);
        } else if (type === 'update') {
            let id = $('#id').val();
            update(id, name);
        }
    });
});

function create(name) {
    $.ajax({
        url: "/label/add",
        type: "post",
        data: {name: name,},
        success: function (result) {
            console.log(result);
            if (result.code == 200) $('#do-success').removeClass('display');
            else $('#do-fail').removeClass('display');
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function update(id, name) {
    $.ajax({
        url: "/label/update/" + id,
        type: "post",
        data: {name: name},
        success: function (result) {
            console.log(result);
            alert(result.status ? "更新成功" : "更新失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function deleteClick(id) {
    $.ajax({
        url: "/category/del/" + id,
        type: "get",
        data: {},
        success: function (result) {
            if (result.code == 200) $('#do-success').css('dispaly','');
            else $('#do-fail').css('dispaly','');
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function modifyClick(category) {
    category = JSON.parse(category);
    $('#myModalLabel').empty().text('更新分类');
    let html = `<input type="hidden" class="input_type" value="update">          
                <div class="form-group">
                    <label for="input_name" id="input_uid">ID</label>
                    <input disabled type="text" class="form-control" id="id" value="${category.id}" placeholder="请输入uid">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_oid">名称</label>
                    <input type="text" class="form-control" id="name" value="${category.name}" placeholder="请输入oid">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_oid">名称</label>
                    <input type="text" class="form-control" id="name" value="${category.name}" placeholder="请输入oid">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_minip">创建时间</label>
                    <input disabled type="text" class="form-control" id="createTime" value="${category.createTime}" placeholder="请输入起始ip">
                </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

