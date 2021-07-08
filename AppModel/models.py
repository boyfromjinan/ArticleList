from django.db import models

# class article(models.Model):
#     id = models.AutoField(primary_key=True)    #AutoFiel为自增长字段，必须设置为主键。primary_key=True，表明这是主键
#     article_title = models.CharField(max_length=255)
#     article_validity = models.TextField(null=True)
#     article_content = models.TextField(null=True) #null=True, 表示数据库的该字段可以为空
#     article_url = models.CharField(max_length=255,null=True)
#     article_pubdate = models.DateTimeField(max_length=255)
#     article_classify = models.CharField(max_length=255,null=False)
#     article_level = models.IntegerField()
#     article_source =  models.CharField(max_length=255,null=False)
#     article_author =  models.CharField(max_length=255,null=True)
#     article_page =  models.CharField(max_length=255,null=True)
#     article_page_NO = models.IntegerField(null=True)
#     article_page_name = models.CharField(max_length=255,null=True)

#     def to_json(self):
#         return {
#             "id":self.id,
#             "article_title": self.article_title,
#             #'article_validity':self.article_validity,
#             # 'article_content':self.article_content,
#             'article_url':self.article_url,
#             'article_pubdate':self.article_pubdate.strftime("%Y-%m-%d %H:%M:%S"),
#             "article_classify":self.article_classify,
#             "article_level":self.article_level,
#             "article_source":self.article_source,
#             #"article_author":self.article_author,
#             # "article_page":self.article_page,
#             # "article_page_NO":self.article_page_NO,
#             # "article_page_name":self.article_page_name
#         }

    
class article_all(models.Model):
    id = models.AutoField(primary_key=True)    #AutoFiel为自增长字段，必须设置为主键。primary_key=True，表明这是主键
    article_dept_name = models.CharField(max_length=255) #	文章部门时间
    article_author = models.CharField(max_length=255) #	文章作者
    article_author_id = models.CharField(max_length=255) #	文章作者id
    article_title = models.CharField(max_length=255) #	文章主标题
    article_has_related = models.CharField(max_length=255) #	文章是否被关联
    article_site_id = models.CharField(max_length=255) #	文章网站id
    article_site_name = models.CharField(max_length=255) #	文章网站名称
    article_type = models.CharField(max_length=255) #	文章类型
    article_status = models.CharField(max_length=255) #	文章状态
    article_channel = models.CharField(max_length=255) #	文章通道
    article_pub_time = models.CharField(max_length=255) #	文章发布时间  字符串
    article_is_timed = models.CharField(max_length=255) #	文章是否定时
    article_real_pub_time = models.DateTimeField()  #	文章真实发布时间  按时间段查询
    article_order = models.CharField(max_length=255) #	文章顺序
    article_priority = models.CharField(max_length=255)    #文章优先级
    article_link_title = models.CharField(max_length=255) #	文章引题
    article_sub_title = models.CharField(max_length=255) #	文章副题
    article_lead_title = models.CharField(max_length=255) #	文章提要题
    article_keyword = models.CharField(max_length=255) #	文章关键词
    article_tag = models.CharField(max_length=255) #	文章标签
    article_editor = models.CharField(max_length=255) #	文章编辑
    article_liability = models.CharField(max_length=255) #	文章责任编辑
    article_abstract = models.TextField() #	文章摘要 设置为longtext 处理mysql长度不够问题
    article_url = models.CharField(max_length=255) #	文章地址
    article_content = models.TextField() #	文章内容 设置为longtext 处理mysql长度不够问题
    article_word_count = models.CharField(max_length=255) #	文章字数统计
    article_source = models.CharField(max_length=255) #	文章来源
    article_source_id = models.IntegerField() #	文章来源id
    article_column = models.CharField(max_length=255) #	文章栏目
    article_column_id = models.IntegerField() #	文章栏目id
    article_column_relate = models.CharField(max_length=255) #	文章栏目关联
    article_column_relate_id = models.IntegerField() #	文章栏目关联id
    article_column_all = models.CharField(max_length=255) #	文章所有栏目
    #解决半月谈 图片地址过长问题
    article_pic_big = models.TextField() #	文章大图地址 设置为longtext 处理mysql长度不够问题
    article_pic_middle = models.TextField() #	文章中图地址
    article_pic_small = models.TextField() #	文章小图地址
    article_is_exclusive = models.CharField(max_length=255) #	文章是否独家
    article_is_big_pic = models.CharField(max_length=255) #	文章是否大图
    article_discuss_closed = models.CharField(max_length=255) #	文章评论关闭标志
    article_ref_num = models.IntegerField() #	文章被引用数目
    article_ref_count = models.IntegerField() #	文章被引用次数
    article_is_share = models.IntegerField() #	文章是否共享标志
    article_is_top = models.IntegerField() #	文章是否置顶标志
    article_position = models.CharField(max_length=255) #	文章位置
    article_special_id = models.IntegerField() #	机器选中文章计算后赋分
    article_special_name = models.CharField(max_length=255) #	文章特殊名称，标记
    article_count_discuss = models.IntegerField() #	文章评论数
    article_count_click = models.IntegerField() #	文章点击数
    article_count_click_initial = models.IntegerField() #	文章最初点击数
    article_count_praise = models.IntegerField() #	文章点赞数
    article_count_share = models.IntegerField() #	文章共享数
    article_count_share_click = models.IntegerField() #	文章共享点击数
    article_read_ratio = models.IntegerField() #	文章阅读率
    article_count_ratio = models.IntegerField() #	文章统计率
    article_note = models.CharField(max_length=255) #	文章笔记
    import_source_id = models.IntegerField() #	重要来源id
    import_article_id = models.IntegerField() #重要文章id  高于等于阈值为1  低于阈值为2 被机器选中但是人觉得不重要3 
    select_source_id = models.IntegerField() #	选中来源id
    ext_field = models.CharField(max_length=255) #	外部区域
    source_column_id = models.IntegerField() #	来源栏目id
    source_column_name = models.CharField(max_length=255) #	来源栏目名称
    source_check_status = models.CharField(max_length=255) #	来源检查状态
    title_crc = models.CharField(max_length=255) #	标题循环冗余校验
    article_is_select_by_machine = models.IntegerField() #	文章被机器选中标志位   0为非重点，1为重点稿件，2为列入报告
    article_is_select_by_human = models.IntegerField() #	文章被人选中标志位  0为未列入报告，1为已经列如报告
    article_geography = models.CharField(max_length=255) #	文章地理位置
    article_paper_order = models.CharField(max_length=255) #	文章报纸版次
    article_paper_pdf_url = models.CharField(max_length=255) #	文章报纸版面pdf链接
    article_paper_jpg_url = models.CharField(max_length=255) #	文章报纸版面图片链接
    article_paper_is_pdf = models.CharField(max_length=255) #	文章报纸是否有pdf标志
    article_paper_order_id = models.IntegerField() #	文章报纸版次id
    article_paper_order_name = models.CharField(max_length=255) #	文章报纸版次名称
  
    def to_json(self):
        return {
            "id":self.id,

            "article_source": self.article_source,

            "article_pub_time":self.article_pub_time,
            "article_real_pub_time":self.article_real_pub_time.strftime("%Y-%m-%d"),

            "article_link_title":self.article_link_title, #引题
            "article_title": self.article_title,
            "article_url": self.article_url,
            "article_sub_title":self.article_sub_title, #副题
            
            "article_author": self.article_author,#	文章作者
            
            "article_paper_order" : self.article_paper_order, #	文章报纸版面
            "article_paper_order_name":self.article_paper_order_name, #	文章报纸版名
            "article_column":self.article_column,  #	文章栏目

            "article_is_select_by_machine":self.article_is_select_by_machine,

            "article_special_name":self.article_special_name,#标记
            

            #'article_validity':self.article_validity,
            # 'article_content':self.article_content,
            #'article_url':self.article_url,
            # 'article_pubdate':self.article_pubdate.strftime("%Y-%m-%d %H:%M:%S"),
            # "article_classify":self.article_classify,
            # "article_level":self.article_level,
            # "article_source":self.article_source,
            #"article_author":self.article_author,
            # "article_page":self.article_page,
            # "article_page_NO":self.article_page_NO,
            # "article_page_name":self.article_page_name
        }

