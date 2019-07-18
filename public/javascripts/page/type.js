$(function () {
    $('#modal_submit').click(function () {
        let name = $('#type-name').val();
        let categoryId = $('#select_category').val();
        let type = $('.input_type').val();
        if (type === 'add') {
            if (!name) {
                $('#type-name').css('border', '1px solid red');
                return;
            }
            create(name, categoryId);
        } else if (type === 'update') {
            let id = $('#id').val();
            update(id, name, categoryId);
        }
    });
});

function createType(cateList) {
    cateList = JSON.parse(cateList);
    $('#myModalLabel').empty().text('添加类型');
    let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label for="input_name" id="type-name-label">类型名称</label>
                        <input type="text" class="form-control" id="type-name" placeholder="请输入类型名称">
                    </div>
                    <div class="form-group">
                        <label class="frm_label" id="lbl_category">分类列表</label>
                        <select class="selectpicker" id="select_category" data-size="8">`;
    for (var i = 0; i < cateList.length; i++) {
        var t = cateList[i];
        html += '<option value=' + t.id + '>' + t.name + '</option>';
    }
    html += `</select></div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

function create(name, categoryId) {
    $.ajax({
        url: "/type/add",
        type: "post",
        data: {name: name, categoryId: categoryId},
        success: function (result) {
            console.log(result);
            if (result.code == 200) $('#do-success').css('dispaly', '');
            else $('#do-fail').css('dispaly', '');
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function update(id, name, categoryId) {
    $.ajax({
        url: "/type/update/" + id,
        type: "post",
        data: {name: name, categoryId: categoryId},
        success: function (result) {
            console.log(result);
            if (result.code == 200) $('#do-success').css('dispaly', '');
            else $('#do-fail').css('dispaly', '');
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
        url: "/type/del/" + id,
        type: "get",
        data: {},
        success: function (result) {
            if (result.code == 200) $('#do-success').css('dispaly', '');
            else $('#do-fail').css('dispaly', '');
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function modifyClick(type, cateList) {
    type = JSON.parse(type);
    cateList = JSON.parse(cateList);
    $('#myModalLabel').empty().text('更新分类');
    let html = `<input type="hidden" class="input_type" value="update">          
                <input type="hidden" id="id" value="${type.id}">
                <div class="form-group">
                    <label for="input_name">名称</label>
                    <input type="text" class="form-control" id="type-name" value="${type.name}" placeholder="请输入类型名称">
                </div>
                <div class="form-group">
                    <label for="input_name">课程数</label>
                    <input type="text" class="form-control" id="name" value="${type.contentNum}" disabled>
                </div>
                <div class="form-group">
                    <label class="frm_label">分类列表</label>
                    <select class="selectpicker" id="select_category" data-size="8">`;
    for (var i = 0; i < cateList.length; i++) {
        var t = cateList[i];
        if (t.id == type.categoryId) {
            html += '<option value=' + t.id + ' selected>' + t.name + '</option>';
        } else html += '<option value=' + t.id + '>' + t.name + '</option>';
    }
    html += `</select></div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

