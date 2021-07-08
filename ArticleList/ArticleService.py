
from re import search
from django.db.models.fields import DateTimeField
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse  #用来在网页端显示
from django.views.decorators.csrf import csrf_exempt
from . import ArticleDataAcesser   #调用DataAcesser.py文件，可以直接用.方法来使用DataAcesser.py中的def方法
# import json
#from django.core import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.timezone import make_aware # 新增
from datetime import datetime
from django.core.paginator import Paginator

# @csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
# ##前台展示页面
# def getArticleForPage(request):
#     result = ""
#     #print(request)
#     ##获取前台js文件中的字段代码，便于后面传回相关数据
#     if request.GET:
#         isFav = request.GET["tableType"]
#         selectedCatogory = request.GET["category"]
#         selectedSource= request.GET["source"]
#         selectedMonth= request.GET["month"]
#         # selectedYear= request.GET["year"]
#         pageSize = request.GET["pageSize"]
#         currentPage = request.GET["pageNumber"]

#         #print("type:" + isFav + ",category=" + selectedCatogory + ",source=" + selectedSource + ",Month=" + selectedMonth)
#          # 生成SQL条件
#         searchcondition = {}
#         # param = "WHERE 1=1"
#         searchcondition["article_level"] = isFav
#         # param += " AND article_level = " + tableType
#         # if (selectedYear != "0" and selectedYear != ""):
#         #     searchcondition["article_pubdate__year"] = selectedYear
#         if (selectedMonth != "0" and selectedMonth != ""):
#             searchcondition["article_pubdate__month"] = selectedMonth
#         if (selectedSource != ""):
#             searchcondition["article_source"] = selectedSource
#         if (selectedCatogory != ""):
#             searchcondition["article_classify"] = selectedCatogory
        
#         #print(searchcondition)
#         articleDisplayList = ArticleDataAcesser.getArticleByMultiplyCondition(searchcondition)
        
#         news_list=[]
#         for n in articleDisplayList:
#             news_list.append(n.to_json())
#         #print(news_list)
#         # p = Paginator(news_list,3)
#         result = "{\"total\":" + str(len(articleDisplayList)) + "," + "\"rows\":" + str(news_list)  + "}"
#         result = result.replace("'","\"")
#         #print(result)
#         # 把articleList转成json， 赋值给result， 然后返回给前端js
#     #result="Test"
#     return HttpResponse(result)

# #获取来源
# @csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
# def getArticleSource(request):
#     result = ""
#     articleSourceList = ArticleDataAcesser.getArticleSource()
#     sourceArray = []
#     for n in articleSourceList:
#         sourceArray.append(n)
#     result = str(sourceArray)
#     result = result.replace("'","\"")
#     return HttpResponse(result)

# #获取分类
# @csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
# def getArticleCategory(request):
#     result = ""
#     articleSourceList = ArticleDataAcesser.getArticleCategory()
#     sourceArray = []
#     for n in articleSourceList:
#         sourceArray.append(n)
#     result = str(sourceArray)
#     result = result.replace("'","\"")
#     return HttpResponse(result)

#获取来源，最终表
# @csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
# def getArticleSource_all(request):
#     result = ""
#     articleSourceList = ArticleDataAcesser.getArticleSource_all()
#     sourceArray = []
#     for n in articleSourceList:
#         sourceArray.append(n)
#     result = str(sourceArray)
#     result = result.replace("'","\"")
#     return HttpResponse(result)

# #获取标记，最终表
# @csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
# def getArticleSpecialName_all(request):
#     result = ""
#     articleSpecialNameList = ArticleDataAcesser.getArticleSpecialName_all()
#     SpecialNameArray = []
#     for n in articleSpecialNameList:
#         SpecialNameArray.append(n)
#     result = str(SpecialNameArray)
#     result = result.replace("'","\"")
#     return HttpResponse(result)

@csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
##前台展示页面，最终表
def getArticleForPage_all(request):
    result = ""
    #print(request)
    ##获取前台js文件中的字段代码，便于后面传回相关数据
    if request.GET:
        isFav = request.GET["tableType"]
        #selectedCatogory = request.GET["category"]
        selectedSource= request.GET["source"]
        selectedStartDate = request.GET["startDate"]
        selectedEndDate= request.GET["endDate"]
        pageSize = request.GET["pageSize"]
        currentPage = request.GET["pageNumber"]
        searchText = request.GET["searchText"]   
        selectedSpecialName = request.GET["specialName"]    

        #print("type:" + isFav + ",category=" + selectedCatogory + ",source=" + selectedSource + ",Month=" + selectedMonth)
         # 生成SQL条件
        searchcondition = {}
        # param = "WHERE 1=1"
        searchcondition["article_is_select_by_machine"] = isFav
        # if(searchText != ""):
        #     searchcondition["article_title__contains"]=searchText
        #searchcondition["article_content__contains"]=searchText
        
        # param += " AND article_level = " + tableType
        if (selectedStartDate != ""):
            searchcondition["article_real_pub_time__gte"] = selectedStartDate  ##gte greater than and equal 是大于等于
        if (selectedEndDate != ""):
            searchcondition["article_real_pub_time__lte"] = selectedEndDate  ##lte less than and equal 是小于等于
        if (selectedSource != ""):
            searchcondition["article_source"] = selectedSource
        if(selectedSpecialName != ""):
            searchcondition["article_special_name"] = selectedSpecialName
        # if (selectedCatogory != ""):
        #     searchcondition["article_classify"] = selectedCatogory
        
        #print(searchcondition)
        ##分页操作 
        #articleDisplayList = ArticleDataAcesser.getArticleByMultiplyCondition_all(searchcondition)#.order_by=('id')
        articleDisplayList = ArticleDataAcesser.getArticleByMultiplyCondition(searchcondition,searchText)
        #articleDisplayList = ArticleDataAcesser.getArticleSorting()
        p = Paginator(articleDisplayList, pageSize)
        detailPage = p.get_page(currentPage)        
        #print(len(detailPage.object_list))

        news_list=[]
        for n in detailPage.object_list:
            news_list.append(n.to_json())
        #print(news_list)
        # p = Paginator(news_list,3)
        ##返回前台ajax格式代码
        result = "{\"total\":" + str(len(articleDisplayList)) + "," + "\"rows\":" + str(news_list)  + "}"
        result = result.replace("'","\"")
        #print(result)
        # 把articleList转成json， 赋值给result， 然后返回给前端js
    #result="Test"
    return HttpResponse(result)

##设置文章状态按钮代码，最终表
@csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
def updateArticleStatus(request):
    result = ""
    #print(request)
    ##获取前台js文件中的字段代码，便于后面传回相关数据
    if request.POST:
        articleId = request.POST["articleId"]
        targetStatus = request.POST["status"]
        result = ArticleDataAcesser.updateArticleStatus(articleId, targetStatus)
        #print(result)
    return HttpResponse(result)

##编辑按钮代码，最终表
@csrf_exempt    ##不使用CSRF验证,防止前台无法获取数据
def updateArticleDetail(request):
    result = ""
    #print(request)
    ##获取前台js文件中的字段代码，便于后面传回相关数据
    if request.POST:
        id = request.POST["id"]
        title = request.POST["title"]
        linkTitle = request.POST["linkTitle"]
        subTitle = request.POST["subTitle"]
        articleAuthor =request.POST["articleAuthor"]
        articlePaperOrder =request.POST["articlePaperOrder"]
        articlePaperOrderName =request.POST["articlePaperOrderName"]
        articleColumn =request.POST["articleColumn"]
        
        result = ArticleDataAcesser.updateArticleDetail(id, title, linkTitle, subTitle,articleAuthor,articlePaperOrder,articlePaperOrderName,articleColumn)
        #print(result)
    return HttpResponse(result)
