"""ArticleList URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from ArticleList.ArticleList import ArticleDataAcesser
from django.urls import path
from django.conf.urls import url
from . import views,ArticleService
urlpatterns = [

    path('index/', views.index),
    # path('articlelist/',ArticleService.getArticleForPage),
    # path('articlesource/', ArticleService.getArticleSource),
    # path('articlecategory/', ArticleService.getArticleCategory),
    # path('index1/', views.index),
    # path('index2/', views.index2),
    # path('index3/', views.index3),
    path('index_1/', views.index_1),
    # path('articlesource_all/', ArticleService.getArticleSource_all),     #获取数据库source
    # path('articlespecianame_all/', ArticleService.getArticleSpecialName_all),  #获取数据库specianame
    
    path('articlelist_all/',ArticleService.getArticleForPage_all),
    #path('test/', views.customers),
    path('updateArticleStatus/', ArticleService.updateArticleStatus),
    path('updateArticleDetail/', ArticleService.updateArticleDetail),
]
