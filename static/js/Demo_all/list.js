
//**********************************
//            全局變量
//**********************************
var basicDomain = "http://127.0.0.1:8001/";
var conditionForSearch = "";  //条件综合查询，显示结果列表
var selectedCategory = "";   //选择分类
var selectedSource = "";   //选择来源
var selectedStartDate = "";  //选择开始时间
var selectedEndDate = "";   //选择结束时间
var searchText = "";  //搜索框
var selectedSpecialName = ""; //标识


//**********************************
//            觸發事件
//**********************************
// 页面加载时间： 第一个事件
$(function () {
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '500', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 400, // Animation in speed (ms)
        animationOutSpeed: 400, // Animation out speed (ms)
        scrollText: '返回顶部', // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

    $('.myTabBeauty a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      })

    //Tooltip
    $('a').tooltip('hide');

// 时间控件
//设置时间选择框
$("#datetimeStart").datetimepicker({    
       
    format: 'yyyy-mm-dd',
    minView:'month',
    language: 'zh-CN', 
    autoclose:true,
    //startDate:new Date()
}).on("click",function(){
    $("#datetimeStart").datetimepicker("setEndDate",$("#datetimeEnd").val());
}).on("changeDate",function(){
    selectedStartDate = $("#datetimeStart").val();
    selectedStartDate = selectedStartDate + " 00:00:00";  //精确到分钟，否则查询会报错
});
//$('.table-condensed').css("background-color","#ffffff");

$("#datetimeEnd").datetimepicker({
    format: 'yyyy-mm-dd',
    minView:'month',
    language: 'zh-CN',
    autoclose:true,
    startDate:new Date()
}).on("click",function(){
    $("#datetimeEnd").datetimepicker("setStartDate",$("#datetimeStart").val());
}).on("changeDate",function(ev){
    selectedEndDate = $("#datetimeEnd").val();
    selectedEndDate = selectedEndDate + " 23:59:59";
});
$('.table-condensed').css("background-color","#d9edf7");  //设置背景色

//显示当前月
// var current = new Date();
// var currentYear = current.getFullYear();
// var currentMonth = current.getMonth();
// var firstDay = new Date(currentYear, currentMonth, 1); // 第一天
// selectedStartDate =  currentYear  + "-" + (currentMonth+1) + "-" + "01 00:00:00";

// var lastDay;
// if(currentMonth + 1 > 11){
//     lastDay = new Date(currentYear + 1, 0,0);
// } else {
//     lastDay = new Date(currentYear, currentMonth + 1, 0);
// }
// selectedEndDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() +1) + "-" + lastDay.getDate() + " 23:59:59";
// $("#datetimeStart").datetimepicker("setDate",firstDay);
// $("#datetimeEnd").datetimepicker("setDate",lastDay);

    // 绑定数据
    // 设置当前月
    //selectedMonth = 6;
    // BindingSource(); //调用获取数据库source方法
    // BindingCategory();
    // BindingSpecialname(); //调用获取数据库specialname方法
    BindingData();

});

//**********************************
//            綁定數據
//**********************************


// // 绑定文章来源source，从数据库读取，未修改
// function BindingSource() {
//     $.ajax({
//         url: basicDomain + "articlesource_all/",
//         type: 'GET',
//         data: {
//         },
//         success: function (data) {
//             if (data) {
//                 var obj = JSON.parse(data);
                
//                 var totalDiv = "<option value=\"All\">";
//                 totalDiv += "- 刊发媒体 -";
//                 totalDiv += "</option>";
//                 for (var i = 0; i < obj.length; i++) {

//                     var subTotaDiv = "<option value=\"" + obj[i].article_source + "\">";
//                     subTotaDiv += obj[i].article_source; // Todo: 替换成数据库中的字段 ： [来源]article_source
//                     subTotaDiv += "</option>";
//                     totalDiv += subTotaDiv;
//                 }
//                 $("#ddlSource").html(totalDiv);
//             }
//         }
//     });
// }

// 绑定标记specianame,从数据库读取
// function BindingSpecialname() {
//     $.ajax({
//         url: basicDomain + "articlespecianame_all/",
//         type: 'GET',
//         data: {
//         },
//         success: function (data) {
//             if (data) {
//                 var obj = JSON.parse(data);
                
//                 var totalDiv = "<option value=\"All\">";
//                 totalDiv += "- 标记 -";
//                 totalDiv += "</option>";
//                 for (var i = 0; i < obj.length; i++) {

//                     var subTotaDiv = "<option value=\"" + obj[i].article_special_name + "\">";
//                     subTotaDiv += obj[i].article_special_name;  //  Todo: 替换成数据库中的字段 ： [标记]article_special_name
//                     subTotaDiv += "</option>";
//                     totalDiv += subTotaDiv;
//                 }
//                 $("#ddlSpecialname").html(totalDiv);
//             }
//         }
//     });
// }

// // 绑定查询分类,从数据库获取
// function BindingCategory() {
//     $.ajax({
//         url: basicDomain + "articlecategory/",
//         type: 'GET',
//         data: {},
//         success: function (data) {
//             if (data) {
//                 var obj = JSON.parse(data);
//                 var totalDiv = "<button class=\"btn btn-info bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnCategoryChange('All')\">";
//                 totalDiv += "全部";
//                 totalDiv += "</button>";
//                 for (var i = 0; i < obj.length; i++) {
//                     var subTotaDiv = "<button class=\"btn btn-info bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnCategoryChange('" + obj[i].article_classify + "')\">";
//                     subTotaDiv += obj[i].article_classify;// Todo: 替换成数据库中的字段 ： [分类]article_classify
//                     subTotaDiv += "</button>";
//                     totalDiv += subTotaDiv;
//                 }
//                 $("#divCategory").html(totalDiv);
//             }
//         }
//     });
// }

//绑定文章数据

function BindingData() {
    var textForSearch = searchText;// $("#txtSearchBox").val(); //搜索框
    // 绑定 非重点 文章列表
    $('#data-table-article').bootstrapTable('destroy');
    $("#data-table-article").bootstrapTable({
        method: "get",  //Use get method to get data
        //handler address
        url: basicDomain + "articlelist_all/",
        pagination: true, //pager 是否分页
        pageSize: 30,  //pagesize 每页条数
        pageList: [10,25,50,100],
        striped: true,
        pageNumber:1, //current page 默认显示第几页
        search: false,  //search feature
        sidePagination: "server", //server pager
        width: "100%",
    
        paginationShowPageGo: true, //分页跳转页面
        //******前端分页设置****
        formatShowingRows:function(pageFrom, pageTo, totalRows)
        {
            return "第"+pageFrom+"-"+pageTo+"行，共"+totalRows+"行。每页";
        },
        formatRecordsPerPage:function(pageNumber)
        {
            return pageNumber+'行';
        },
       
        // queryParamsType :
        // 1. undefined : required(pageNumber，pageSize，searchText，sortName，sortOrder)
        // 2. limit : required (limit, offset, search, sort, order)
        queryParamsType: "undefined",
        //Setup the search method, could define our own here
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                source: selectedSource,
                //category: selectedCategory,
                specialName : selectedSpecialName,
                tableType: 0,
                searchText : textForSearch
            };
            return param;
        },
        columns: [{
            width: 60,
            field: 'id',
            title: "标识",  
            align: "center",         
            formatter: function (value, row, index, field) {
                var display = "";
                var idTitle = ((row.id=="") |(row.id=="0")) ? "" : row.id;  //判断是否为0，如果是0显示空格
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+idTitle+"</span>";
                return display;
            }
        },
        {
            width: 180,
            field: 'article_source',
            title: "刊发媒体",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var sourceTitle = ((row.article_source=="") |(row.article_source=="0")) ? "" : row.article_source;
                display = "<span style=\"text-align:center;font-size:16px;font-family:'宋体';color:#3e8f3e;\">"+sourceTitle+"</span>";
                return display;
            }
        },
        {
            width: 100,
            field: 'article_real_pub_time',
            title: "发布时间",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var pub_timeTitle = ((row.article_real_pub_time=="") |(row.article_real_pub_time=="0")) ? "" : row.article_real_pub_time;
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+pub_timeTitle+"</span>";
                return display;
            }
        },
        {
           
            field: 'article_title',
            title: "文章标题",
            formatter: function (value, row, index, field) {
                var display = "";
                var urlTitle = ((row.article_url=="") |(row.article_url=="0")) ? "#" : row.article_url;
                if((row.article_link_title!="") && (row.article_link_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_link_title+ "</a>";
                    // display += "<a href=\"#\">edit</a>";
                    display += "<br/>";
                }
                if((row.article_title!="") && (row.article_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:16px;font-family:'宋体'\" target=\"_blank\" >" +row.article_title+ "</a><br/>";
                }
                if((row.article_sub_title!="")&& (row.article_sub_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_sub_title + "</a>";
                }

                return display;
            }
        },
        {
            width: 80,
            field: 'article_author',
            title: "作者",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var authorTitle = ((row.article_author=="") |(row.article_author=="0")) ? "" : row.article_author;
                display = "<span style=\"font-size:16px;font-family:'宋体'\">"+authorTitle+"</span>"; 
                return display;
            }
        },
        {
            width: 250,
            field: 'article_paper_order',
            title: "版面和栏目",
            formatter: function (value, row, index, field) {
                var display = "";
                var orderTitle = ((row.article_paper_order=="") |(row.article_paper_order=="0")) ? "" : row.article_paper_order;
                var order_nameTitle = (( row.article_paper_order_name=="") |( row.article_paper_order_name=="0")) ? "" : row.article_paper_order_name;
                var article_column = ((row.article_column=="") |(row.article_column=="0")) ? "" : row.article_column;
                display = "<span style=\"font-size:16px;font-family:'宋体';color:#3e8f3e\">"+orderTitle+ "：" +order_nameTitle+"｜" +article_column+"</span>"; 
                return display;
            }
        },  
        {
            width: 20,
            field: 'article_is_select_by_machine',
            title: "T",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<span style=\"font-size:16px;;font-family:'宋体'\">"+value+"</span>";
                return display;
            }
        },
        {
            width: 80,
            field: 'article_special_name',
            title: "标记",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var special_nameTitle = ((row.article_special_name=="") |( row.article_special_name=="0")) ? "" : row.article_special_name;
                display = "<span style=\"font-size:16px\">"+special_nameTitle+"</span>";
                return display;
            }
        },
        {
            width: 110,
            field: 'someId',
            title: "操作",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<a class=\"btn btn-success\" href=\"javascript:UpdateListStatus(" + row.id + ",1)\"  style=\"font-size:15px;color:black\">加入重点</a>";
                return display;
            }
        }
        ],
        //隔行变色
        rowStyle: function (row, index) {
            var classesArr = ['success', 'info'];
            var strclass = "";
            if (index % 2 === 0) {//偶数行
                strclass = classesArr[0];
            } else {//奇数行
                strclass = classesArr[1];
            }
            return { classes: strclass };
        },//隔行变色

        onLoadSuccess: function () {
            //console.log("full Success");
        },
        onLoadError: function () {
            //console.log("full Fail");
        }

    });
    
    
    // 绑定 重点 文章列表
    $('#data-table-fav').bootstrapTable('destroy');
    // Init the table and bind the data from server
    $("#data-table-fav").bootstrapTable({
        method: "get",  //Use get method to get data
        //handler address
        url: basicDomain + "articlelist_all/",
        pagination: true, //pager
        pageSize: 30,  //pagesize
        pageNumber: 1, //current page
        search: false,  //search feature
        sidePagination: "server", //server pager
        width: "100%",

        paginationShowPageGo: true, //分页跳转页面
           //******前端分页设置****
           formatShowingRows:function(pageFrom, pageTo, totalRows)
        {
            return "第"+pageFrom+"-"+pageTo+"行，共"+totalRows+"行。每页";
        },
        formatRecordsPerPage:function(pageNumber)
        {
            return pageNumber+'行';
        },
        // queryParamsType :
        // 1. undefined : required(pageNumber，pageSize，searchText，sortName，sortOrder)
        // 2. limit : required (limit, offset, search, sort, order)
        queryParamsType: "undefined",
        //Setup the search method, could define our own here
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                source: selectedSource,
                //category: selectedCategory,
                tableType: 1,
                specialName : selectedSpecialName,
                searchText : textForSearch
            };
            return param;
        },
        columns: [{
            width: 60,
            field: 'id',
            title: "标识",    
            align: "center",       
            formatter: function (value, row, index, field) {
                var display = "";
                var idTitle = ((row.id=="") |(row.id=="0")) ? "" : row.id;  //判断是否为0，如果是0显示空格
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+idTitle+"</span>";
                return display;
            }
        },
        {
            width: 180,
            field: 'article_source',
            title: "刊发媒体",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var sourceTitle = ((row.article_source=="") |(row.article_source=="0")) ? "" : row.article_source;
                display = "<span style=\"text-align:center;font-size:16px;font-family:'宋体';color:#3e8f3e\">"+sourceTitle+"</span>";
                return display;
            }
        },
        {
            width: 100,
            field: 'article_real_pub_time',
            title: "发布时间",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var pub_timeTitle = ((row.article_real_pub_time=="") |(row.article_real_pub_time=="0")) ? "" : row.article_real_pub_time;
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+pub_timeTitle+"</span>";
                return display;
            }
        },
        {
            
            field: 'article_title',
            title: "文章标题",
            formatter: function (value, row, index, field) {
                var display = "";
                var urlTitle = ((row.article_url=="") |(row.article_url=="0")) ? "#" : row.article_url;
                if((row.article_link_title!="") && (row.article_link_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_link_title+ "</a>";
                    // display += "<a href=\"#\">edit</a>";
                    display += "<br/>";
                }
                if((row.article_title!="") && (row.article_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:16px;font-family:'宋体'\" target=\"_blank\" >" +row.article_title+ "</a><br/>";
                }
                if((row.article_sub_title!="")&& (row.article_sub_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_sub_title + "</a>";
                }

                return display;
            }
        },
        {
            width: 80,
            field: 'article_author',
            title: "作者",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var authorTitle = ((row.article_author=="") |(row.article_author=="0")) ? "" : row.article_author;
                display = "<span style=\"font-size:16px;font-family:'宋体'\">"+authorTitle+"</span>"; 
                return display;
            }
        },
        {
            width: 250,
            field: 'article_paper_order',
            title: "版面和栏目",
            formatter: function (value, row, index, field) {
                var display = "";
                var orderTitle = ((row.article_paper_order=="") |(row.article_paper_order=="0")) ? "" : row.article_paper_order;
                var order_nameTitle = (( row.article_paper_order_name=="") |( row.article_paper_order_name=="0")) ? "" : row.article_paper_order_name;
                var article_column = ((row.article_column=="") |(row.article_column=="0")) ? "" : row.article_column;
                display = "<span style=\"font-size:16px;font-family:'宋体';color:#3e8f3e\">"+orderTitle+ "：" +order_nameTitle+"｜" +article_column+"</span>"; 
                return display;
            }
        },  
        {
            width: 20,
            field: 'article_is_select_by_machine',
            title: "T",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<span style=\"font-size:16px;;font-family:'宋体'\">"+value+"</span>";
                return display;
            }
        },
        {
            width: 80,
            field: 'article_special_name',
            title: "标记",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var special_nameTitle = ((row.article_special_name=="") |( row.article_special_name=="0")) ? "" : row.article_special_name;
                display = "<span style=\"font-size:16px\">"+special_nameTitle+"</span>";
                return display;
            }
        },
        {
            width: 200,
            field: 'id',
            title: "操作",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<a class=\"btn btn-warning\" href=\"javascript:UpdateListStatus(" + row.id + ",0);\" style=\"font-size:15px;color:black;float:left;\">取消重点</a>";
                display +=  "<a class=\"btn btn-success\" href=\"javascript:UpdateListStatus(" + row.id + ",2);\" style=\"font-size:15px;color:black;float:right;\">加入报告</a>";
                return display;
            }
        },
        ],

        //隔行变色
        rowStyle: function (row, index) {
            var classesArr = ['success', 'info'];
            var strclass = "";
            if (index % 2 === 0) {//偶数行
                strclass = classesArr[0];
            } else {//奇数行
                strclass = classesArr[1];
            }
            return { classes: strclass };
        },//隔行变色
        onLoadSuccess: function () {
            //console.log("fav Success");
        },
        onLoadError: function () {
            //console.log("fav Fail");
        }
    });

    // 绑定 已经选择的 文章列表
    $('#data-table-chosen').bootstrapTable('destroy');
    $("#data-table-chosen").bootstrapTable({
        method: "get",  //Use get method to get data
        //handler address
        url: basicDomain + "articlelist_all/",
        pagination: true, //pager
        pageSize: 30,  //pagesize
        pageNumber: 1, //current page
        search: false,  //search feature
        sidePagination: "server", //server pager
        width: "100%",
        
        paginationShowPageGo: true, //分页跳转页面
           //******前端分页设置****
           formatShowingRows:function(pageFrom, pageTo, totalRows)
        {
            return "第"+pageFrom+"-"+pageTo+"行，共"+totalRows+"行。每页";
        },
        formatRecordsPerPage:function(pageNumber)
        {
            return pageNumber+'行';
        },
        
        // queryParamsType :
        // 1. undefined : required(pageNumber，pageSize，searchText，sortName，sortOrder)
        // 2. limit : required (limit, offset, search, sort, order)
        queryParamsType: "undefined",
        //Setup the search method, could define our own here
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                source: selectedSource,
                //category: selectedCategory,
                tableType: 2,
                specialName : selectedSpecialName,
                searchText : textForSearch
            };
            return param;
        },
        columns: [{
            width: 60,
            field: 'id',
            title: "标识",         
            align: "center",  
            formatter: function (value, row, index, field) {
                var display = "";
                var idTitle = ((row.id=="") |(row.id=="0")) ? "" : row.id;  //判断是否为0，如果是0显示空格
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+idTitle+"</span>";
                return display;
            }
        },
        {
            width: 180,
            field: 'article_source',
            title: "刊发媒体",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var sourceTitle = ((row.article_source=="") |(row.article_source=="0")) ? "" : row.article_source;
                display = "<span style=\"text-align:center;font-size:16px;font-family:'宋体';color:#3e8f3e\">"+sourceTitle+"</span>";
                return display;
            }
        },
        {
            width: 100,
            field: 'article_real_pub_time',
            title: "发布时间",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var pub_timeTitle = ((row.article_real_pub_time=="") |(row.article_real_pub_time=="0")) ? "" : row.article_real_pub_time;
                display = "<span style=\"font-size:16px;font-family:'宋体';\">"+pub_timeTitle+"</span>";
                return display;
            }
        },
        {
        
            field: 'article_title',
            title: "文章标题",
            formatter: function (value, row, index, field) {
                var display = "";
                var urlTitle = ((row.article_url=="") |(row.article_url=="0")) ? "#" : row.article_url;
                if((row.article_link_title!="") && (row.article_link_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_link_title+ "</a>";
                    // display += "<a href=\"#\">edit</a>";
                    display += "<br/>";
                }
                if((row.article_title!="") && (row.article_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:16px;font-family:'宋体'\" target=\"_blank\" >" +row.article_title+ "</a><br/>";
                }
                if((row.article_sub_title!="")&& (row.article_sub_title !="0")){
                    display += "<a href=\"" + urlTitle + "\" style=\"font-size:14px;font-family:'宋体'\" target=\"_blank\" >" +row.article_sub_title + "</a>";
                }

                return display;
            }
        },
        {
            width: 80,
            field: 'article_author',
            title: "作者",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var authorTitle = ((row.article_author=="") |(row.article_author=="0")) ? "" : row.article_author;
                display = "<span style=\"font-size:16px;font-family:'宋体'\">"+authorTitle+"</span>"; 
                return display;
            }
        },
        {
            width: 250,
            field: 'article_paper_order',
            title: "版面和栏目",
            formatter: function (value, row, index, field) {
                var display = "";
                var orderTitle = ((row.article_paper_order=="") |(row.article_paper_order=="0")) ? "" : row.article_paper_order;
                var order_nameTitle = (( row.article_paper_order_name=="") |( row.article_paper_order_name=="0")) ? "" : row.article_paper_order_name;
                var article_column = ((row.article_column=="") |(row.article_column=="0")) ? "" : row.article_column;
                display = "<span style=\"font-size:16px;font-family:'宋体';color:#3e8f3e\">"+orderTitle+ "：" +order_nameTitle+"｜" +article_column+"</span>"; 
                return display;
            }
        },  
        {
            width: 20,
            field: 'article_is_select_by_machine',
            title: "T",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<span style=\"font-size:16px;;font-family:'宋体'\">"+value+"</span>";
                return display;
            }
        },
        {
            width: 80,
            field: 'article_special_name',
            title: "标记",
            align: "center",
            formatter: function (value, row, index, field) {
                var display = "";
                var special_nameTitle = ((row.article_special_name=="") |( row.article_special_name=="0")) ? "" : row.article_special_name;
                display = "<span style=\"font-size:16px\">"+special_nameTitle+"</span>";
                return display;
            }
        },
        {
            width: 180,
            field: 'id',
            title: "操作",
            formatter: function (value, row, index, field) {
                var display = "";
                var current = new Date();
                //if(row.article_pub_time )
                display = "<a class=\"btn btn-warning\" href=\"javascript:UpdateListStatus(" + row.id + ",1);\" style=\"font-size:15px;color:black;float:left\">移出报告</a>";
                display +=  "<a class=\"btn btn-success\" style=\"font-size:15px;color:black;float:right\" onclick=\"javascript:EditRow(" + row.id + ",'" + row.article_title + "','" + row.article_link_title + "','" + row.article_sub_title + "','" + row.article_author + "','" + row.article_paper_order + "','" + row.article_paper_order_name + "','" + row.article_column + "')\">编辑</a>";
                //,'" + row.article_paper_order_name + "','" + row.article_column + "'
                return display;

            }
        }
        ],

        //隔行变色
        rowStyle: function (row, index) {
            var classesArr = ['success', 'info'];
            var strclass = "";
            if (index % 2 === 0) {//偶数行
                strclass = classesArr[0];
            } else {//奇数行
                strclass = classesArr[1];
            }
            return { classes: strclass };
        },//隔行变色

        onLoadSuccess: function () {
            //console.log("fav Success");
        },
        onLoadError: function () {
            //console.log("fav Fail");
        }
    });
}


//**********************************
//            條件設定
//**********************************

//来源选择查询
function OnSourceChange(val) {
    

    var vsy = $('#ddlSource  option:selected').val();
    selectedSource = vsy;
    if(selectedSource == "All") {
        selectedSource = "";
    }
    //BindingData();
    //console.log(vsy);
}

//标记选择查询
function OnSpecialNameChange(val) {
    

    var vsy = $('#ddlSpecialname  option:selected').val();
    selectedSpecialName = vsy;
    if(selectedSpecialName == "All") {
        selectedSpecialName = "";
    }
    //BindingData();
    //console.log(vsy);
}

//编辑功能测试
// $(function () {
//     $('.editbutton').editable();
// });



// function OnCategoryChange(val) {
//     if(val == "All") {
//         val = "";
//     }
//     selectedCategory = val;
//     BindingData();
// }

// function OnYearChange() {
//     var vsy = $('#ddlYear  option:selected').val();
//     selectedYear = vsy;
//     console.log(vsy);
//     BindingData();
// }

// function OnMonthchange() {
//     var vsm = $('#ddlMonth  option:selected').val();
//     selectedMonth = vsm;
//     console.log(vsm);
//     BindingData();
// }


//**********************************
//            操作执行 按钮响应方法
//**********************************
// 文章状态操作按钮
function UpdateListStatus(id, targetStatus) {
     $.ajax({
         url: basicDomain + "updateArticleStatus/",
         type: 'POST',
         data: {
             articleId: id,
             status : targetStatus
         },
         success: function (data) {
            //console.log(data);
            
            BindingData();
                
         }
     });

}

//文本搜索框后面的查询按钮
function Searchclick(){
    searchText = $("#txtSearchBox").val();
    BindingData();
}
//文本搜索框后面的刷新按钮
function Refresh(){
    window.location.href = basicDomain + "index/";
}

//文本搜索框下面的按钮查询
function OnTextSearchButtonClick(val){
    if(val=="All"){
        // selectedSource = "";
        // selectedStartDate = "";
        // selectedEndDate = "";
        // searchText = "";
        // $("#txtSearchBox").val("");
        window.location.href = basicDomain + "index/";
    } else{
        searchText = val;
        $("#txtSearchBox").val(searchText);
    }   
    BindingData(); 
}

//---------------------------------------------------------
//编辑按钮框
function EditRow(id,title,linkTitle,subTitle,articleAuthor,articlePaperOrder,articlePaperOrderName,articleColumn){
    $("#hdArticleId").val(id); // 把id放入隐藏域
    $("#txtTitle").val(title);
    $("#txtLinkTitle").val(linkTitle);
    $("#txtSubTitle").val(subTitle);
    $("#txtarticleAuthor").val(articleAuthor);
    $("#txtarticlePaperOrder").val(articlePaperOrder);
    $("#txtarticlePaperOrderName").val(articlePaperOrderName);
    $("#txtarticleColumn").val(articleColumn);
    
    
    $("#editRowModal").modal('show');
}

function UpdateRow(){
    var id = $("#hdArticleId").val();
    var title = $("#txtTitle").val();
    var linkTitle = $("#txtLinkTitle").val();
    var subTitle = $("#txtSubTitle").val();
    var articleAuthor = $("#txtarticleAuthor").val();
    var articlePaperOrder = $("#txtarticlePaperOrder").val();
    var articlePaperOrderName = $("#txtarticlePaperOrderName").val();
    var articleColumn = $("#txtarticleColumn").val();

    $.ajax({
        url: basicDomain + "updateArticleDetail/",
        type: 'POST',
        data: {
            id: id,
            title: title,
            linkTitle: linkTitle,
            subTitle: subTitle,
            articleAuthor:articleAuthor,
            articlePaperOrder:articlePaperOrder,
            articlePaperOrderName:articlePaperOrderName,
            articleColumn:articleColumn

        },
        success: function (data) {
            $("#editRowModal").modal('hide');
            BindingData();
        }
    });

}
//----------------------------------------------------------



