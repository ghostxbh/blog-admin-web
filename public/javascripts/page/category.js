$(function () {
    $('#category-add').click(function () {
        $('#myModalLabel').empty().text('添加分类');
        let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label for="input_name" id="category-name-label">分类名称</label>
                        <input type="text" class="form-control" id="category-name" placeholder="请输入分类名称">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });
    $('#modal_submit').click(function () {
        let name = $('#category-name').val();
        let type = $('.input_type').val();
        if (!name) {
            $('#category-name').css('border', '1px solid red');
            return;
        }
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
        url: "/category/add",
        type: "post",
        data: {name: name,},
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

function update(id, name) {
    $.ajax({
        url: "/category/update/" + id,
        type: "post",
        data: {name: name},
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

function deleteClick(id) {
    $.ajax({
        url: "/category/del/" + id,
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

function modifyClick(category) {
    category = JSON.parse(category);
    $('#myModalLabel').empty().text('更新分类');
    let html = `<input type="hidden" class="input_type" value="update">          
                <input type="hidden" id="id" value="${category.id}">
                <div class="form-group">
                    <label>名称</label>
                    <input type="text" class="form-control" id="category-name" value="${category.name}" placeholder="请输入名称">
                </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

