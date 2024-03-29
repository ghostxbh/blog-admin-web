$(document).ready(function () {
    let pageNum = $("input[name='pageNum']").val();
    let totalPage = $("input[name='totalPage']").val();
    //初始化加载分页
    getPage(pageNum, totalPage);
});
function getPage(pageNum, totalPage) {    //
    var pageType = $("input[name='pageType']").val();
    var url;
    if (pageType === 1) {
        url = '?pageNum=';
    } else {
        if (window.location.href.indexOf('?pageNum=') !== -1) {
            url = window.location.href.split('?')[0] + '?pageNum=';
        }
    }
    $(".information_page").createPage({    //创建分页
        totalPage: totalPage,      //总页数
        pageNum: pageNum,         //当前页
        url: url,
        backFn: function (p) {    //p不用管
            getPage(p, totalPage);         //点击页码或者跳转页码时的回掉函数，p为要跳转的页码
        }
    });
}
