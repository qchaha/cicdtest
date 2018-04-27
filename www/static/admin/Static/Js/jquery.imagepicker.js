/**
 * Created by fadmin on 2016/1/27.
 */

(function($){

    $().ready(function() {
        var content = '<style>.hide{display:none}.image-helper-mask{z-index: 99;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.image-helper-mask .image-helper-main{z-index: 99;position:fixed;top:50%;left:50%;width:800px;height:600px;margin-left:-400px;margin-top:-300px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;overflow:hidden;background-color:#fff}.image-helper-mask .image-helper-main iframe{z-index:2;border:none;background-color:transparent}.image-helper-mask .image-helper-main .image-helper-header{background-color:#fff;padding:10px;font-size:16px;border-bottom:1px solid #ccc}.image-helper-mask .image-helper-main .image-helper-header span{position:absolute;right:10px;top:0;padding:10px;font-size:16px;cursor:pointer;color:#bbb}.image-helper-mask .image-helper-main .image-helper-header span:hover{position:absolute;right:10px;top:0;padding:10px;font-size:16px;cursor:pointer;color:#444}</style><div class="image-helper-mask hide"><div class="image-helper-main hide"><div class="image-helper-header">图片管理插件 <span class="image-helper-close">x</span></div><iframe id="image-selector" width="800" height="600" frameborder="0"></iframe></div></div>';

        //将content查到页面中
        $('body').append(content);

        window.imagePickerLoaded = 0;

        $('.image-helper-main .image-helper-close').bind('click', function () {
            $('.image-helper-mask').hide();
            $('.image-helper-main').hide();
        });

        window.imagePickerParam = {hide: function () {
            $('.image-helper-mask').hide();
            $('.image-helper-main').hide();
        }};

    });

    $.fn.imagePicker = function(options){

        //设置iframe中需要获取的参数
        window.imagePickerParam.el = options.el;
        window.imagePickerParam.mode = options.mode;
        window.imagePickerParam.format = options.format;

        $('.image-helper-mask').show();
        $('.image-helper-main').show();
        if (imagePickerLoaded == 0) {
            $('.image-helper-main iframe').attr('src', '/admin.php?c=Image&a=index');
            imagePickerLoaded = 1;
        }

        return this;
    }

})(jQuery);