(function($){
    var ms = {
        init:function(obj,args){
            return (function(){
                ms.fillHtml(obj,args);
                ms.bindEvent(obj,args);

            })();
        },
        //填充html
        fillHtml:function(obj,args){
            return (function(){
                obj.empty();

                //上一页
                if(parseInt(args.pageNum) > 1){
                    let lastPage = args.pageNum - 1;
                    obj.append('<a href="'+args.url+lastPage+'" class="prevPage"><p class="previous">上一页</p></a>');
                }else{
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled"><p class="previous">上一页</p></span>');
                }
                //中间页码
                if(parseInt(args.pageNum) != 1 && parseInt(args.pageNum) >= 4 && parseInt(args.totalPage) != 4){
                    obj.append('<a href="'+args.url+1+'" class="tcdNumber"><p>'+1+'</p></a>');
                }
                if(parseInt(args.pageNum-2) > 2 && parseInt(args.pageNum) <= parseInt(args.totalPage) && parseInt(args.totalPage) > 5){
                    obj.append('<span><p>...</p></span>');
                }
                var start = parseInt(args.pageNum) -2;
                var end = parseInt(args.pageNum) +2;
                if((start > 1 && parseInt(args.pageNum) < 4)||parseInt(args.pageNum) == 1){
                    end++;
                }
                if(parseInt(args.pageNum) > parseInt(args.totalPage)-4 && parseInt(args.pageNum) >= parseInt(args.totalPage)){
                    start--;
                }
                for (;start <= end; start++) {
                    if(start <= parseInt(args.totalPage) && start >= 1){
                        if(start != parseInt(args.pageNum)){
                            obj.append('<a href="'+args.url+start+'" class="tcdNumber"><p>'+ start +'</p></a>');
                        }else{
                            obj.append('<span class="current"><p class="current">'+ start +'</p></span>');
                        }
                    }
                }
                if(parseInt(args.pageNum) + 2 < parseInt(args.totalPage) - 1 && parseInt(args.pageNum) >= 1 && parseInt(args.totalPage) > 5){
                    obj.append('<span><p>...</p></span>');
                }
                if(parseInt(args.pageNum) != parseInt(args.totalPage) && parseInt(args.pageNum) < parseInt(args.totalPage) -2  && parseInt(args.totalPage) != 4){
                    obj.append('<a href="'+args.url+args.totalPage+'" class="tcdNumber"><p>'+args.totalPage+'</p></a>');
                }
                //下一页
                if(parseInt(args.pageNum) < parseInt(args.totalPage)){
                    let nextPage = args.pageNum*1 + 1;
                    obj.append('<a href="'+args.url+nextPage+'" class="nextPage"><p class="next">下一页</p></a>');
                }else{
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled"><p class="next">下一页</p></span>');
                }
                obj.append('<span><p style="border:none;">跳转<input type="text" id="pageIndex" onkeyup="var current = $(this).val();if (isNaN(current)) {$(this).val(\'\');}if (current.indexOf(\'.\') != -1) {$(this).val(\'\');}">页</p><a href="javascript:;" class="btn" id="paging_submit">确定</a></span>');
            })();
        },
        //绑定事件
        bindEvent:function(obj,args){
            return (function(){
                obj.off("click","a.tcdNumber");
                obj.on("click","a.tcdNumber",function(){
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj,{"current":current,"pageCount":args.totalPage});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
                //上一页
                obj.off("click","a.prevPage");
                obj.on("click","a.prevPage",function(){
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj,{"current":current-1,"pageCount":args.totalPage});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current-1);
                    }
                });
                //下一页
                obj.off("click","a.nextPage");
                obj.on("click","a.nextPage",function(){
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj,{"current":current+1,"pageCount":args.totalPage});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current+1);
                    }
                });
                obj.off("click","a.btn");
                obj.on("click","a.btn",function(){
                    var current =$("#pageIndex").val();

                    if(parseInt(current)>0 && parseInt(current)<=parseInt(args.totalPage) && current!=""){
                        ms.fillHtml(obj,{"current":args.pageNum,"pageCount":args.totalPage});
                        if(typeof(args.backFn)=="function"){
                            args.backFn(current);
                        }
                        $("#pageIndex").val(current);
                    }else{
                        $("#pageIndex").val("");
                    }
                });

            })();
        },


        init1:function(obj,args){
            return (function(){
                ms.fillHtml(obj,args);
            })();
        }
    };

    $.fn.createPage = function(options){
        var pageType =  $("input[name='pageType']").val();
        var pageNum = $("input[name='pageNum']").val();
        var totalPage = $("input[name='totalPage']").val();
        var url;
        if(pageType == 1){
            url  = '?pageNum=';
        }
        else{
            url = window.location.href+'?pageNum=';
        }
        var args = $.extend({
            totalPage : totalPage,
            pageNum : pageNum,
            url:url,
            backFn : function(){

            }
        },options);
        ms.init(this,args);
    };

})(jQuery,window,document);


