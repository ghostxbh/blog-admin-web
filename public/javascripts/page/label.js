$(function () {
    $('#label-add').click(function () {
        $('#myModalLabel').empty().text('添加标签');
        let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label>标签名称</label>
                        <input type="text" class="form-control" id="label-name" placeholder="请输入标签名称">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });
    $('#modal_submit').click(function () {
        let name = $('#label-name').val();
        let type = $('.input_type').val();
        if (!name) {
            $('#label-name').css('border', '1px solid red');
            return;
        }
        if (type === 'add') {
            create(name);
        } else if (type === 'update') {
            let id = $('#label-id').val();
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

function deleteClick(id) {
    $.ajax({
        url: "/label/del/" + id,
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

function modifyClick(label) {
    label = JSON.parse(label);
    $('#myModalLabel').empty().text('更新分类');
    let html = `<input type="hidden" class="input_type" value="update">  
                <input type="hidden" id="label-id" value="${label.id}">        
                <div class="form-group">
                    <label for="input_name">名称</label>
                    <input type="text" class="form-control" id="label-name" value="${label.name}" placeholder="请输入名称">
                </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

