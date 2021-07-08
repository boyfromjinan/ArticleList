
//**********************************
//            全局變量
//**********************************
var basicDomain = "http://127.0.0.1:8001/";
var conditionForSearch = "";
var selectedCategory = "";
var selectedSource = "";
var selectedYear = "";
var selectedMonth = "";

//**********************************
//            觸發事件
//**********************************
// 页面加载时间： 第一个事件
$(function () {
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 400, // Animation in speed (ms)
        animationOutSpeed: 400, // Animation out speed (ms)
        scrollText: 'Scroll to top', // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });


    //Tooltip
    $('a').tooltip('hide');

    // 绑定数据
    BindingSource();
    BindingCategory();
    BindingData();
});

//**********************************
//            綁定數據
//**********************************
// 绑定文章来源
function BindingSource() {
    $.ajax({
        url: basicDomain + "articlesource_all/",
        type: 'GET',
        data: {
        },
        success: function (data) {
            if (data) {
                var obj = JSON.parse(data);
                
                var totalDiv = "<button class=\"btn btn-info bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnSourceChange('All')\">";
                totalDiv += "全部";
                totalDiv += "</button>";
                for (var i = 0; i < obj.length; i++) {

                    var subTotaDiv = "<button class=\"btn btn-info bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnSourceChange('" + obj[i].article_source + "')\">";
                    subTotaDiv += obj[i].article_source; // Todo: 替换成数据库中的字段 ： [来源]article_source
                    subTotaDiv += "</button>";
                    totalDiv += subTotaDiv;
                }
                $("#divArticleSource").html(totalDiv);
            }
        }
    });
}

// 绑定文章分类
function BindingCategory() {
    $.ajax({
        url: basicDomain + "articlecategory/",
        type: 'GET',
        data: {

        },
        success: function (data) {
            if (data) {
                var obj = JSON.parse(data);
                var totalDiv = "<button class=\"btn btn-warning bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnCategoryChange('All')\">";
                totalDiv += "全部";
                totalDiv += "</button>";
                for (var i = 0; i < obj.length; i++) {

                    var subTotaDiv = "<button class=\"btn btn-warning bottom-margin\" type=\"button\" style=\"margin-right:5px\" onclick=\"javascript:OnCategoryChange('" + obj[i].article_classify + "')\">";
                    subTotaDiv += obj[i].article_classify;// Todo: 替换成数据库中的字段 ： [分类]article_classify
                    subTotaDiv += "</button>";
                    totalDiv += subTotaDiv;
                }
                $("#divCategory").html(totalDiv);
            }
        }
    });
}

//绑定文章数据
function BindingData() {
    
    // 绑定 未选择的 文章列表
    $('#data-table-article').bootstrapTable('destroy');
    // Init the table and bind the data from server
    $("#data-table-article").bootstrapTable({
        method: "get",  //Use get method to get data
        //handler address
        url: basicDomain + "articlelist_all/",
        pagination: true, //pager
        pageSize: 20,  //pagesize
        pageNumber: 1, //current page
        search: false,  //search feature
        sidePagination: "server", //server pager
        width: "100%",
        // queryParamsType :
        // 1. undefined : required(pageNumber，pageSize，searchText，sortName，sortOrder)
        // 2. limit : required (limit, offset, search, sort, order)
        queryParamsType: "undefined",
        //Setup the search method, could define our own here
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                year: selectedYear,
                month: selectedMonth,
                source: selectedSource,
                category: selectedCategory,
                tableType: 0
            };
            return param;
        },
        columns: [{
            width: 50,
            field: 'id',
            title: "标识"
        },
        {
            field: 'article_title',
            title: "文章标题"
        },
        {
            field: 'article_pub_time',
            title: "发布时间"
        },
  
        {
            field: 'article_author',
            title: "文章作者"
                   
        },
        {
            field: 'article_url',
            title: "文章链接"
                   
        },
            {
                width: 150,
            field: 'id',
            title: "Action",
            formatter: function (value, row, index, field) {
                var display = "";
                display = "<a class=\"btn btn-cyan\" href=\"javascript:AddFav(" + value + ");\">加入收藏</a>";
                return display;

            }
        }
        ],
        onLoadSuccess: function () {
            console.log("full Success");
        },
        onLoadError: function () {
            console.log("full Fail");
        }
    });

    console.log("[end]article list");
}


//**********************************
//            條件設定
//**********************************

function OnSourceChange(val) {
    if(val == "All") {
        val = "";
    }
    selectedSource = val;
    BindingData();
}

function OnCategoryChange(val) {
    if(val == "All") {
        val = "";
    }
    selectedCategory = val;
    BindingData();
}

function OnYearChange() {
    var vsy = $('#ddlYear  option:selected').val();
    selectedYear = vsy;
    console.log(vsy);
    BindingData();
}

function OnMonthchange() {
    var vsm = $('#ddlMonth  option:selected').val();
    selectedMonth = vsm;
    console.log(vsm);
    BindingData();
}


//**********************************
//            操作执行 按钮响应方法
//**********************************
// 增加收藏 （从下面列表移到上面列表)
function AddFav(id) {
    // $.ajax({
    //     url: "【收藏url】",
    //     type: 'GET',
    //     data: {
    //         articleId: id,
    //         opt : 1
    //     },
    //     success: function (data) {
    //         console.log(data);
    //         BindingData();
    //     }
    // });
}

// 移除收藏 （从上面列表移到下面列表）
function RemoveFav(id) {
    // $.ajax({
    //     url: "【收藏url】",
    //     type: 'GET',
    //     data: {
    //         articleId: id,
    //         opt: 0
    //     },
    //     success: function (data) {
    //         console.log(data);
    //         BindingData();
    //     }
    // });
}
