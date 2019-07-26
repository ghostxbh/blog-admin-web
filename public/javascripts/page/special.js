$(function () {
    $('#special-create-click').click(function () {
        let name = $('#special-name').val();
        let image = $('#special-url').val();
        let description = $('#description').val();
        let sort = $('#special-sort').val();
        if (!name) {
            $('#special-name').css('border', '1px solid red');
            return;
        }
        create({name, image, description, sort});
    });
    $('#special-update-click').click(function () {
        let id = $('#special-id').val();
        let name = $('#special-name').val();
        let image = $('#special-url').val();
        let description = $('#description').val();
        let sort = $('#special-sort').val();
        let readNum = $('#special-read-num').val();
        if (!name) {
            $('#special-name').css('border', '1px solid red');
            return;
        }
        update({id, name, image, description, sort, readNum});
    });
});

function create(special) {
    $.ajax({
        url: "/special/create",
        type: "post",
        data: special,
        success: function (result) {
            location.href = '/special';
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function update(special) {
    $.ajax({
        url: "/special/update/" + special.id,
        type: "post",
        data: special,
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
    if (!id) {
        alert('缺少必要参数');
        return;
    }
    $.ajax({
        url: "/special/del/" + id,
        type: "get",
        data: {},
        success: function (result) {
            location.href = '/special';
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}


function showImage(url) {
    $('#show-img').attr('src', url);
}

