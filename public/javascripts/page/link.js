$(function () {
    $('#link-add').click(function () {
        $('#myModalLabel').empty().text('添加友链');
        let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label>名称</label>
                        <input type="text" class="form-control" id="link-name" placeholder="请输入名称">
                    </div>
                    <div class="form-group">
                        <label>url</label>
                        <input type="text" class="form-control" id="link-url" placeholder="请输入url">
                    </div>
                    <div class="form-group">
                        <label>排序</label>
                        <input type="text" class="form-control" id="link-sort" placeholder="请输入排序">
                    </div>
                    <div class="form-group">
                        <label>联系方式</label>
                        <input type="text" class="form-control" id="link-contact" placeholder="请输入联系方式">
                    </div>
                    <div class="form-group">
                        <label>备注</label>
                        <textarea id="link-remark" placeholder="请输入备注信息"></textarea>
                    </div>
                    <div class="form-group">
                        <label>状态</label>
                        <select class="selectpicker" id="select_status" data-size="8">
                            <option value='1'>上线</option>
                            <option value='-1'>下线</option>
                        </select>
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });
    $('#modal_submit').click(function () {
        let name = $('#link-name').val();
        let url = $('#link-url').val();
        let sort = $('#link-sort').val();
        let contact = $('#link-contact').val();
        let remark = $('#link-remark').val();
        let status = $('#select_status').val();
        let type = $('.input_type').val();
        if (type === 'add') {
            if (!name) {
                $('#link-name').css('border', '1px solid red');
                return;
            }
            if (!url) {
                $('#link-url').css('border', '1px solid red');
                return;
            }
            create({name, url, sort, contact, remark, status});
        } else if (type === 'update') {
            let id = $('#link-id').val();
            update({id, name, url, sort, contact, remark, status});
        }
    });
});

function create(link) {
    $.ajax({
        url: "/link/add",
        type: "post",
        data: link,
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

function update(link) {
    $.ajax({
        url: "/link/update/" + link.id,
        type: "post",
        data: link,
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
        url: "/link/del/" + id,
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

function modifyClick(link) {
    link = JSON.parse(link);
    $('#myModalLabel').empty().text('更新友链');
    let html = `<input type="hidden" class="input_type" value="update">
                <input type="hidden" id="link-id" value="${link.id}">
                    <div class="form-group">
                        <label>名称</label>
                        <input type="text" value="${link.name}" class="form-control" id="link-name" placeholder="请输入名称">
                    </div>
                    <div class="form-group">
                        <label>url</label>
                        <input type="text" value="${link.url}" class="form-control" id="link-url" placeholder="请输入url">
                    </div>
                    <div class="form-group">
                        <label>排序</label>
                        <input type="text" value="${link.sort}" class="form-control" id="link-sort" placeholder="请输入排序">
                    </div>
                    <div class="form-group">
                        <label>联系方式</label>
                        <input type="text" value="${link.contact}" class="form-control" id="link-contact" placeholder="请输入联系方式">
                    </div>
                    <div class="form-group">
                        <label>备注</label>
                        <textarea id="link-remark" placeholder="请输入备注信息">${link.remark}</textarea>
                    </div>
                    <div class="form-group">
                        <label>状态</label>
                        <select class="selectpicker" id="select_status" data-size="8">
                            <option value='1' ${link.status == 1 ? 'selected' : ''}>上线</option>
                            <option value='-1' ${link.status == -1 ? 'selected' : ''}>下线</option>
                        </select>
                    </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

