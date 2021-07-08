from re import search
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
#from AppModel.models import article     #import 的article目标必须是models.py中class定义的类
from AppModel.models import article_all     #import 的article目标必须是models.py中class定义的类
from django.db.models import Q
# #获取表全部数据
# def getArticle():
#     articleList = article.objects.all()
#     return articleList

# #获取分类 （去重）
# def getArticleCategory():
#     articleCategoryList = article.objects.values('article_classify').distinct()
#     return articleCategoryList

# #获取来源 （去重）
# def getArticleSource():
#     articleSourceList = article.objects.values('article_source').distinct()
#     return articleSourceList


# #获取数据库来源，最终表 （去重）
# def getArticleSource_all():
#     articleSourceList = article_all.objects.values('article_source').distinct()
#     return articleSourceList

# #获取数据库标记，最终表 （去重）
# def getArticleSpecialName_all():
#     articleSpecialNameList = article_all.objects.values('article_special_name').distinct()
#     return articleSpecialNameList
# #获取表全部数据，最终表
# def getArticle_all():
#     articleList = article_all.objects.all()
#     return articleList

#根据多条件搜索 ：最终表 
# searchcondition 是一个dict, 需要注意的是filter内必须要两个*
def getArticleByMultiplyCondition(searchcondition, searchText):
    source=["人民日报","人民日报海外版","新华社","新华网","新华每日电讯","新华网山东频道","新华社微博","中央广播电视总台","央广网","求是","解放军报","光明日报","经济日报","中国日报","中国日报网","科技日报","人民政协报","中国纪检监察报","中国新闻社","中国新闻网","学习时报","工人日报","中国青年报",'中国妇女报',"农民日报","法制日报","半月谈","中国文化报"]
    source.reverse()
    ordering = 'FIELD(`article_source`, {})'.format(','.join([ "'{}'".format(i) for i in source]))
    articleList = []
    if(searchText == ""):
        articleList = article_all.objects.filter(Q(**searchcondition)).extra(
    select={'ordering': ordering}, order_by=('-ordering','article_real_pub_time'))
    else:
        articleList = article_all.objects.filter(Q(**searchcondition)).filter(
        Q(article_title__contains = searchText) | 
        Q(article_content__contains = searchText) |
        Q(article_link_title__contains = searchText) |
        Q(article_author__contains = searchText) |
        Q(article_sub_title__contains = searchText)).extra(        
    select={'ordering': ordering}, order_by=('-ordering','article_real_pub_time'))
    return articleList


#设置文章状态的按钮代码，最终表
def updateArticleStatus(id, status):
    result = article_all.objects.filter(id=id).update(article_is_select_by_machine = status) #找到id=id的列，将article_is_select_by_machine改为0，1，2
    return result

#修改文章的按钮代码，最终表
def updateArticleDetail(id, title, linkTitle,subTitle,articleAuthor,articlePaperOrder,articlePaperOrderName,articleColumn):
    
    result = article_all.objects.filter(id=id).update(article_title = title, article_link_title = linkTitle,article_sub_title = subTitle, article_author = articleAuthor, article_paper_order = articlePaperOrder, article_paper_order_name = articlePaperOrderName, article_column = articleColumn) #找到id=id的列，修改其他数据
    return result

