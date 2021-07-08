from django.shortcuts import render
from . import ArticleDataAcesser   #调用DataAcesser.py文件，可以直接用.方法来使用DataAcesser.py中的def方法
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.shortcuts import HttpResponse

##实现简单分页效果
# def customers(request):
#     cus_list = ArticleDataAcesser.getArticle_all()
#     paginator = Paginator(cus_list,50,2)
#     page = request.GET.get('page')
#     try:
#         customer = paginator.page(page)
#     except PageNotAnInteger:
#         customer = paginator.page(1)
#     except EmptyPage:
#         customer = paginator.page(paginator.num_pages)
#     return render(request,'customers.html',{"cus_list":customer})


def index(request):   
    return render(request, "index.html")

# def index1(request):   
#     return render(request, "index1.html")

# def index2(request):   
#     return render(request, "index2.html")

# def index3(request):   
#     return render(request, "index3.html")

def index_1(request):   
    return render(request, "index_1.html")




