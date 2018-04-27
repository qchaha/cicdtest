var navModel = function (options) {

    var o = {
        addNavigator: function (obj) {
            var view = this.view;
            obj.display([], view, function (item) {
                $(item).find('[selectapproute]').appRoutePicker();
                $(item).find('[param-datetime]').datetimepicker();

                $(item).find('input.more_route').parent().hide();

                type = $(item).parent().parent().children('li').children('select[data-type="type"]')[0];

                // 不是滑动商品组则删掉商品ID输入框
                if (type === undefined || ($(type).val() !== undefined && $(type).val() !== 'C2')) {
                    $(item).find('li.goods_id').hide();
                }

                // 滑动商品组和轮播小banner个数限制最多5个
                if ($(type).val() === 'C1' || $(type).val() === 'C2') {
                    subNavItems = $(item).parent().parent().children('li.navigator-area').children('ul.navigator_item');

                    if (subNavItems.length > 0) {
                        subNavItems.each(function (index, element) {
                            if (index > 4) {    // 最多5个
                                $(element).remove();
                            }
                        });
                    }
                }

            });
            //重新加载路由选择的js文件
            /*$.getScript(app.selectAppRoute, function () {
             //这个函数是在new.js里面的，当点击click后运行这个函数
             });*/
            return false;
        },

        removeNavigator: function (obj) {
            $(obj).parent().parent().remove();
        },

        render: function (data, view, nameJson, obj, addBtn, callback) {
            var item = this;
            var oView;
            var i = 0;
            $(data).each(function () {
                oView = view;

                //input的value替换
                oView = $(item.valueReplace(oView, this));

                var tempObj = obj.children(app.navigator_area_selector).append(oView);

                if (item.sonNavs) {
                    item.navigator = new navModel({
                        model_type: item.sonNavs.model_type,
                        prefix: item.sonNavs.prefix + i + '_',
                        level: 2,
                        base: tempObj.find(item.sonNavs.base_selector + ':last'),
                        addBtn: tempObj.find(item.sonNavs.addBtn_selector + ':last'),
                        sonNavs: item.sonNavs.sonNavs ? item.sonNavs.sonNavs : null,
                        selectConf: item.sonNavs.selectConf ? item.sonNavs.selectConf : []
                    });

                    var navigators = this.navigators;
                    if (typeof navigators == 'undefined' && typeof this.mall_navigators != 'undefined') {
                        navigators = this.mall_navigators;
                    }
                    item.navigator.initial(navigators);

                    ++i;
                }

                if (typeof callback === 'function') {
                    callback(oView);
                }
            });
            app.sortAll();

        },

        display: function (data, view, callback) {
            var nameJson = this.nameJson;
            var oData = [];
            if (data.length === 0) {
                oData = this.emptyData;
            } else {
                oData = data;
            }

            this.render(oData, view, nameJson, this.base, {}, callback);
        },

        initial: function (data) {
            var view = this.view;
            var _this = this;
            var addBtn = _this.addBtn;
            if (!data) {
                data = [];
            }
            _this.display(data, view);

            addBtn.bind('click', function () {
                _this.addNavigator(_this);
            });

            //app.sortable(this.base[0], this.sortConfig);
        }
    };

    //数据字段另放到配置文件 TODO
    o.prefix = options.prefix ? options.prefix : '';
    o.level = options.level ? options.level : '';
    o.base = options.base ? options.base : '';
    o.addBtn = options.addBtn ? options.addBtn : '';
    o.sortConfig = options.sortConfig ? options.sortConfig : {};
    o.sonNavs = options.sonNavs ? options.sonNavs : '';
    o.namePlaceholder = options.namePlaceholder ? options.namePlaceholder : '建议最长不超过6个字';
    o.selectConf = options.selectConf ? options.selectConf : [];

    switch (options.model_type) {
        case 'special_nav':
            o.view =
                '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>标题：<input type="text" data-type="name" value="{{$name}}" required placeholder="{{$namePlaceholder}}"/></li>' +
                '<li>描述：<input type="text" data-type="desc" value="{{$desc}}" placeholder="建议最长不超过9个字"/></li>' +
                '<li>价格：<input type="text" data-type="price" value="{{$price}}"/></li>' +
                '<li>ID：&nbsp;&nbsp;&nbsp;<input type="text" data-type="id" value="{{$id}}"/></li>' +
                '<li>标签：<input type="text" data-type="label" value="{{$label}}" placeholder="不得超过4个字"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" data-type="image" onchange="app.uploadImage(this)"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{
                "name": '',
                "desc": '',
                "price": '',
                "id": '',
                "label": '',
                "app_route": '',
                "image": ''
            }];
            o.nameJson = [];
            o.fields = [
                {field_name: 'name'},
                {field_name: 'desc'},
                {field_name: 'price'},
                {field_name: 'id'},
                {field_name: 'label'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'},
                {field_name: 'savename'},
                {field_name: 'width'},
                {field_name: 'height'},
            ];
            o.valueReplace = function (view, _this) {

                view = view.replace('{{$namePlaceholder}}', o.namePlaceholder);
                view = view.replace('{{$name}}', _this.name);
                view = view.replace('{{$desc}}', _this.desc);
                view = view.replace('{{$price}}', _this.price);
                view = view.replace('{{$id}}', _this.id);
                view = view.replace('{{$label}}', _this.label);
                view = view.replace('{{$app_route}}', _this.app_route);
                if (_this.image) {
                    view = view.replace('{{$imageShow}}', _this.image.s.url);
                    view = view.replace('{{$image}}', _this.image.s.url);
                } else {
                    view = view.replace('{{$imageShow}}', _this.image);
                    view = view.replace('{{$image}}', _this.image);
                }

                return view;
            }

            break;

        case 'special_nav_with_goods':
            o.view =
                '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li class="goods_id">商品ID<input type="text" data-type="goods_id" value="{{$goods_id}}" onchange="setGoods(this)" /></li>' +
                '<li>标题：<input type="text" data-type="name" value="{{$name}}" required placeholder="{{$namePlaceholder}}"/></li>' +
                '<li>描述：<input type="text" data-type="desc" value="{{$desc}}" placeholder="建议最长不超过9个字"/></li>' +
                '<li>价格：<input type="text" data-type="price" value="{{$price}}"/></li>' +
                '<li>ID：&nbsp;&nbsp;&nbsp;<input type="text" data-type="id" value="{{$id}}"/></li>' +
                '<li>标签：<input type="text" data-type="label" value="{{$label}}" placeholder="不得超过4个字"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" data-type="image" onchange="app.uploadImage(this)"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{
                "goods_id": '',
                "name": '',
                "desc": '',
                "price": '',
                "id": '',
                "label": '',
                "app_route": '',
                "image": ''
            }];
            o.nameJson = [];
            o.fields = [
                {field_name: 'goods_id'},
                {field_name: 'name'},
                {field_name: 'desc'},
                {field_name: 'price'},
                {field_name: 'id'},
                {field_name: 'label'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'},
                {field_name: 'savename'},
                {field_name: 'width'},
                {field_name: 'height'},
            ];
            o.valueReplace = function (view, _this) {

                view = view.replace('{{$namePlaceholder}}', o.namePlaceholder);
                view = view.replace('{{$name}}', _this.name);
                view = view.replace('{{$desc}}', _this.desc);
                view = view.replace('{{$price}}', _this.price);
                view = view.replace('{{$id}}', _this.id);
                view = view.replace('{{$label}}', _this.label);
                view = view.replace('{{$app_route}}', _this.app_route);
                if (_this.image) {
                    view = view.replace('{{$imageShow}}', _this.image.s.url);
                    view = view.replace('{{$image}}', _this.image.s.url);
                } else {
                    view = view.replace('{{$imageShow}}', _this.image);
                    view = view.replace('{{$image}}', _this.image);
                }

                if (_this.goods_id) {
                    view = view.replace('{{$goods_id}}', _this.goods_id);
                } else {
                    view = view.replace('{{$goods_id}}', '');
                }

                return view;
            }

            break;

        case 'special_banner':
            o.view =
                '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>广告ID：<input type="text" data-type="ad" value="{{$ad}}" required/></li>' +
                '</ul>';
            o.emptyData = [{"banner_id": ''}];
            o.nameJson = [];
            o.fields = [
                {field_name: 'ad'}
            ];
            o.valueReplace = function (view, _this) {

                view = view.replace('{{$ad}}', _this.banner_id);

                return view;
            };

            break;
        case 'goods_nav':
            o.view = '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>标题：<input type="text" data-type="title" value="{{$title}}"/></li>' +
                '<li>等级：<input type="text" data-type="rating" value="{{$rating}}"/></li>' +
                '<li>内容：<input type="text" data-type="comment" value="{{$comment}}"/></li>' +
                '<li>用户：<input type="text" data-type="user" value="{{$user}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="image"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"title": '', "rating": '', "comment": '', "user": '', "app_route": '', "image": ''}];
            o.nameJson = [];
            o.valueReplace = function (view, _this) {

                view = view.replace('{{$title}}', _this.title);
                view = view.replace('{{$rating}}', _this.rating);
                view = view.replace('{{$comment}}', _this.comment);
                view = view.replace('{{$app_route}}', _this.app_route);
                if (_this.user) {
                    view = view.replace('{{$user}}', _this.user.uid);
                } else {
                    view = view.replace('{{$user}}', _this.user);
                }

                if (_this.image) {
                    view = view.replace('{{$imageShow}}', _this.image.s.url);
                    view = view.replace('{{$image}}', _this.image.s.url);
                } else {
                    view = view.replace('{{$imageShow}}', _this.image);
                    view = view.replace('{{$image}}', _this.image);
                }

                return view;
            };
            o.fields = [
                {field_name: 'title'},
                {field_name: 'rating'},
                {field_name: 'comment'},
                {field_name: 'user'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'},
                {field_name: 'savename'},
                {field_name: 'width'},
                {field_name: 'height'}
            ];

            break;
        case 'goods_group':
            o.view = '<ul class="navigator_group_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li class="ng__name drag_point">拖移</li>' +//此处用户拖拽的起始点
                '<li>标题：<input type="text" data-type="title" value="{{$title}}"/></li>' +
                '<li>颜色：<input type="text" data-type="title_color" value="{{$title_color}}"/></li>' +
                '<li>导航：<a class="add-navigator">添加</a></li>' +

                '<li class="navigator-area">' +
                    //navigators 区域

                '</li>' +
                '<li>广告：<input type="text" data-type="ad" value="{{$ad}}"/></li>' +
                '</ul>';
            o.emptyData = [{"title": '', "title_color": 'ff5577', "ad": '', "navigators": []}];
            o.nameJson = [];

            o.valueReplace = function (view, _this) {
                view = view.replace('{{$title}}', _this.title);
                view = view.replace('{{$title_color}}', _this.title_color);
                if (_this.ad) {
                    var adIds = '';
                    $(_this.ad.banners).each(function () {
                        adIds += this.banner_id + ',';
                    });
                    adIds = adIds.replace(/(^,*)|(,*$)/g, '');
                    view = view.replace('{{$ad}}', adIds);
                } else {
                    view = view.replace('{{$ad}}', _this.ad);
                }

                return view;
            };
            o.fields = [
                {field_name: 'title'},
                {field_name: 'title_color'},
                {field_name: 'ad'}
            ];

            break;
        case 'goods_navigator_group':   //3.8.2商城首页导航板块
            o.view = '<ul class="navigator_group_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li class="ng__name drag_point">拖移</li>' +//此处用户拖拽的起始点
                '<li><input type="hidden" data-type="index" value=""/></li>' +
                '<li>标题：<input type="text" data-type="title" value="{{$title}}" style="width: 20%"/>' +
                '&nbsp;&nbsp;' +
                '<div class="sui-msg msg-large msg-warning"><div class="msg-con">此项必填，用于统计</div><s class="msg-icon"></s></div></li>' +
                '<li>颜色：<input type="text" data-type="line_color" value="{{$line_color}}" style="width: 20%"/>' +
                '&nbsp;&nbsp;' +
                '<div class="sui-msg msg-large msg-warning"><div class="msg-con">清空则没有间隔线</div><s class="msg-icon"></s></div></li>'+
                '<li>导航：<a class="add-navigator">添加</a></li>' +

                '<li class="navigator-area">' +
                    //navigators 区域

                '</li>' +
                    //'<li>广告：<input type="text" data-type="ad" value="{{$ad}}"/></li>'+
                '</ul>';
            o.emptyData = [{"title": '',"navigators": [], "line_color": 'dddddd'}];
            o.nameJson = [];

            o.valueReplace = function (view, _this) {
                _this.title = _this.title ? _this.title : '';
                view = view.replace('{{$title}}', _this.title);
                view = view.replace('{{$line_color}}', _this.line_color);
                return view;
            };
            o.fields = [
                {field_name: 'index'},
                {field_name: 'title'},
                {field_name: 'line_color'}
            ];

            break;
        case 'goods_navigator_group_item':   //3.8.2商城首页导航板块的子模块
            o.view = '<ul class="navigator_group_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li class="ng__name drag_point">拖移</li>' +//此处用户拖拽的起始点
                '<li>类型：{{$select_element}}</li>' +
                '<li>查看更多路由：<input type="text" class="more_route" data-type="more_route" selectapproute value="{{$more_route}}"/></li>' +
                '<li>长宽比：<input type="text" data-type="ratio" value="{{$ratio}}"/></li>' +
                '<li>倒计时：<input type="hidden" class="hide-dataTime"/><li>' +
                '<li>开始时间<input type="text" data-type="start_time" value="{{$start_time}}" param-datetime class="hide-dataTime"/></li>' +
                '<li>结束时间<input type="text" data-type="end_time" value="{{$end_time}}" param-datetime class="hide-dataTime"/></li>' +
                '<li>背景颜色<input type="text" data-type="bg_color" value="{{$bg_color}}" class="hide-dataTime"/></li>' +
                '<li>导航：<a class="add-navigator">添加</a></li>' +
                '<li class="navigator-area">' +
                    //navigators 区域
                '</li>' +
                    //'<li>广告：<input type="text" data-type="ad" value="{{$ad}}"/></li>'+
                '</ul>';
            o.emptyData = [{"type": '', "more_route": '', "ratio": '1', "navigators": [], "bg_color": '', "start_time": '', "end_time": ''}];
            o.nameJson = [];

            o.valueReplace = function (view, _this) {
                var selectElem = '';
                if (o.selectConf) {
                    selectElem = '<select data-type="type" onchange="selectDateTime(this)">';
                    $(o.selectConf).each(function () {
                        var tempConf = this;
                        var defaultValue = _this.type == tempConf.value ? 'selected=selected' : '';
                        selectElem += '<option value="' + tempConf.value + '" ' + defaultValue + '>' + tempConf.name + '</option>';
                    });
                    selectElem += '</select>';
                }

                if (_this.more_route) {
                    view = view.replace('{{$more_route}}', _this.more_route);
                } else {
                    view = view.replace('{{$more_route}}', '');
                }

                view = view.replace('{{$select_element}}', selectElem);
                view = view.replace('{{$ratio}}', _this.ratio);
                view = view.replace('{{$bg_color}}', _this.bg_color);
                view = view.replace('{{$start_time}}', _this.start_time);
                view = view.replace('{{$end_time}}', _this.end_time);
                return view;
            };
            o.fields = [
                {field_name: 'type'},
                {field_name: 'more_route'},
                {field_name: 'ratio'},
                {field_name: 'bg_color'},
                {field_name: 'start_time'},
                {field_name: 'end_time'}
            ];

            break;
        case 'home_coupon':
            o.view =
                '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>优惠券ID：<input type="text" data-type="cd" value="{{$cd}}" required/></li>' +
                '</ul>';
            o.emptyData = [{"coupon_id": ''}];
            o.nameJson = [];
            o.fields = [
                {field_name: 'cd'},
            ];
            o.valueReplace = function(view, _this){

                view = view.replace('{{$cd}}', _this.coupon_id);

                return view;
            };

            break;
        case 'home_headline':
            o.view =
                '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>标题：<input type="text" data-type="name" value="{{$name}}" required placeholder="{{$namePlaceholder}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" data-type="image" onchange="app.uploadImage(this)"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"name": '', "app_route": '', "image": ''}];
            o.nameJson = [];
            o.fields = [
                {field_name: 'name'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'},
                {field_name: 'savename'},
                {field_name: 'width'},
                {field_name: 'height'},
            ];
            o.valueReplace = function (view, _this) {

                view = view.replace('{{$namePlaceholder}}', o.namePlaceholder);
                view = view.replace('{{$name}}', _this.name);
                view = view.replace('{{$app_route}}', _this.app_route);
                if(_this.image){
                    view = view.replace('{{$imageShow}}', _this.image.s.url);
                    view = view.replace('{{$image}}', _this.image.s.url);
                }else{
                    view = view.replace('{{$imageShow}}', _this.image);
                    view = view.replace('{{$image}}', _this.image);
                }

                return view;
            }
            break;
    }

    return o;
};

var app = {

    navs: [],

    /**
     *    格式化navigator的name
     *    一层 {prefix}_{field_name}[]
     *    二层 {prefix}_{$i}{field_name}[]
     */
    formatNavigatorsName: function () {
        //获取所有大模块
        var modules = app.navs;
        var navs;
        var _this;
        var flag = 1;
        $(modules).each(function () {
            _this = this;
            if (!_this.base.find('.navigator-groups-area')[0]) {
                //一层的导航
                navs = _this.base.find('.navigator-area > ul');

            } else {
                //两层或以上
                navs = _this.base.find('.navigator-groups-area > ul');

            }

            app.replaceFieldName(navs, _this.fields, _this.prefix, '');

            if (navs.children('.navigator-area')[0]) {
                var sonModule = new navModel({model_type: this.sonNavs.model_type});
                //console.log(sonModule.fields);
                var i = 0;
                navs.children('.navigator-area').each(function () {
                    var __this = this;
                    app.replaceFieldName(__this, sonModule.fields, _this.prefix, i);
                    //一组商品数量至少3个
                    if ($(__this).children().length < 3 && app.navs[0].prefix == 'groups_') {
                        flag = -1;
                        return;
                    }
                    //一组商品数量必须为奇数
                    if ($(__this).children().length % 2 == 0 && app.navs[0].prefix == 'groups_') {
                        flag = 0;
                        return;
                    }

                    if (_this.sonNavs.sonNavs) { //替换第三层
                        var subSonNavs = _this.sonNavs.sonNavs;
                        var subSonModule = new navModel({model_type: subSonNavs.model_type});
                        $($(__this).children()).each(function () {
                            var indexStr = i + '' + $(this).index();
                            app.replaceFieldName($(this), subSonModule.fields, subSonNavs.prefix, indexStr);
                        });
                    }

                    ++i;
                });

            }
        });
        return flag;

    },

    replaceFieldName: function (obj, fields, prefix, i) {
        $(fields).each(function () {
            $(obj).find('[data-type=' + this.field_name + ']').attr('name', prefix + i + this.field_name + '[]');
        });
    },

    sortAll: function () {
        $(app.navs).each(function () {
            app.sortable(this.base[0], this.sortConfig);
        });
    },

    sortable: function (obj, config) {
        new Sortable($(obj).children('.navigator-area')[0], config);
        if (config.sonClass) {
            [].forEach.call($(obj).find('.navigator-groups-area').find('.' + config.sonClass), function (el) {
                new Sortable(el, {group: 'ng_sn_sort', ghostClass: "sortable-ghost"});
            });
        }
    },

    uploadImage: function (obj) {
        var tempId = 'img' + Date.parse(new Date());

        $(obj).attr('id', tempId);
        $(obj).attr('name', tempId);

        $.ajaxFileUpload
        (
            {
                url: "/admin.php?c=StaticApi&a=uploadImage",
                secureuri: false,
                fileElement: obj,
                dataType: 'json',
                success: function (data, status) {
                    if (data.image_url != '') {
                        var imageInfo =
                            '<input type="hidden" data-type="path" value="' + data.image_path + '" />' +
                            '<input type="hidden" data-type="width" value="' + data.image_width + '" />' +
                            '<input type="hidden" data-type="height" value="' + data.image_height + '" />' +
                            '<input type="hidden" data-type="savename" value="' + data.image_savename + '" />';

                        $('#' + tempId).parent().find('input').not(':first').remove();
                        $('#' + tempId).after(imageInfo);
                        $('#' + tempId).parent().parent().find('.img_preview').attr('src', data.image_url);

                    }
                },
                error: function (data, status, e) {
                    alert(e);
                }
            }
        )
        return false;
    },

    mySubmit: function () {
        var flag = app.formatNavigatorsName();

        if (app.navs[0].prefix == 'groups_') {
            //主推商品的限制
            if (flag == -1) {
                alert('一组至少添加3个商品');
                return false;
            }

            if (flag == 0) {
                alert('商品数量必须为奇数');
                return false;
            }

            if (flag == 1) {
                $('#' + app.formName)[0].submit();
            }
            return false;
        } else {
            $('#' + app.formName)[0].submit();
        }
    }
};