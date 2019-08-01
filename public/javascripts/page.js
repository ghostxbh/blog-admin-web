// let pageNum = 1;
// let pageSize = 10;
//
// function render() {
//     $.ajax({
//         url: "/content",
//         type: "get",
//         data: {
//             pageNum: pageNum,
//             pageSize: pageSize
//         },
//         dataType: "json",
//         success: function (result) {
//             // 将数据渲染到页面
//             $("content-tbody").html(template("tableTemp", {item: result}));
//             // 调用分页函数.参数:当前所在页, 总页数(用总条数 除以 每页显示多少条,在向上取整), ajax函数
//             setPage(pageNum, Math.ceil(result[0].size / pageSize), render)
//         }
//     })
// }
//
// /**
//  *
//  * @param pageCurrent 当前所在页
//  * @param pageSum 总页数
//  * @param callback 调用ajax
//  */
// function setPage(pageNum, pageSum, callback) {
//     $(".pagination").bootstrapPaginator({
//         //设置版本号
//         bootstrapMajorVersion: 3,
//         // 显示第几页
//         currentPage: pageNum,
//         // 总页数
//         totalPages: pageSum,
//         //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
//         onPageClicked: function (event, originalEvent, type, pageNum) {
//             // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
//             let currentPage = pageNum;
//             callback && callback();
//         }
//     })
// }

$(function () {
    getPageOfMemo(1);  //初始化页面
})

// 分页函数
function getPageOfMemo(pageNum) {

    var pageSize = 10;
    $.ajax({
            url: "/content", //你的接口
            data: {
                pageNum: pageNum,  //页数
                pageSize: pageSize,  //每页几条
            },
            type: 'get',
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                var html = '';
                for (var i = 0; i < list.length; i++) {
                    var content = list[i];
                    html += `<tr>
                            <td>${i + 1}</td>
                            <td>${content.title}</td>
                            <td>${content.source}</td>
                            <td>${content.readNum}</td>
                            <td>${content.remarkNum}</td>
                            <td>${content.admireNum}</td>
                            <td>${content.status}</td>
                            <td>${content.createTime}</td>
                            <td>
                                <a class="btn btn-primary" href="/content/${content.id}">详情</a>
                                <a class="btn btn-danger" onclick="delContent('${content.id}')">删除</a>
                            </td>
                        </tr>`;
                }
                $('#content-tbody').empty().html(html);

                var totalPages = data.totalPage; //条数除以页数，是总页数
                var element = $('.pagination');  //ul的id
                var options = {
                    bootstrapMajorVersion: 3,
                    currentPage: page, // 当前页数
                    //numberOfPages: 5, // 显示按钮的数量
                    totalPages: totalPages, // 总页数
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    // 点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function (event, originalEvent, type, page) {
                        getPageOfMemo(page);
                    }
                };
                element.bootstrapPaginator(options);
            }
        }
    );
}