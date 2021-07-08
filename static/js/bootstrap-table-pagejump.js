(function ($) {
    'use strict';
    $.extend($.fn.bootstrapTable.defaults, {
        // Ĭ�ϲ���ʾ
        paginationShowPageGo: false
    });
 
    $.extend($.fn.bootstrapTable.locales, {
        pageGo: function () {
            // ����Ĭ����ʾ���֣�����������Ҫ��չ
            return '跳转到';
        }
    });
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);
 
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initPagination = BootstrapTable.prototype.initPagination;
 
    // ��չ���еĳ�ʼ����ҳ����ķ���
    BootstrapTable.prototype.initPagination = function() {
        _initPagination.apply(this, Array.prototype.slice.apply(arguments));
        // �ж��Ƿ���ʾ��ת��ָ��ҳ������
        if(this.options.paginationShowPageGo){
            var html = [];
            // ��Ⱦ��ת��ָ��ҳ��Ԫ��
            html.push(
                '<ul class="pagination-jump">',
                '<li class=""><span>' + this.options.pageGo() + ':</span></li>',
                '<li class=""><input type="text" class="page-input" value="' + this.options.pageNumber + '"   /></li>',
                '<li class="page-go"><a class="jump-go" href="">GO</a></li>',
                '</ul>');
 
        // �ŵ�ԭ�ȵķ�ҳ�������
      this.$pagination.find('ul.pagination').after(html.join(''));
            // �����ť������ת��ָ��ҳ����
            this.$pagination.find('.page-go').off('click').on('click', $.proxy(this.onPageGo, this));
            // �ֶ�����ҳ��У�飬ֻ��������������
            this.$pagination.find('.page-input').off('keyup').on('keyup', function(){
                this.value = this.value.length == 1 ? this.value.replace(/[^1-9]/g,'') : this.value.replace(/\D/g,'');
            });
        }
    };
 
    // �Զ�����ת��ĳҳ�ĺ���
    BootstrapTable.prototype.onPageGo = function (event) {
        // ��ȡ�ֶ������Ҫ��ת����ҳ��Ԫ��
        var $toPage=this.$pagination.find('.page-input');
        // ��ǰҳ��������
        if (this.options.pageNumber === +$toPage.val()) {
            return false;
        }
        // ���ùٷ��ĺ���
        this.selectPage(+$toPage.val());
        return false;
    };
})(jQuery);
