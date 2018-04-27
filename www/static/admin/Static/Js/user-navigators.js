var navModel = function (options) {

    var o = {
        addNavigator: function (obj) {
            var view = this.view;
            obj.display([], view, function (item) {
                $(item).find('[selectapproute]').appRoutePicker();
                $(item).find('[param-datetime]').datetimepicker();
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

    //数据字段另放到配置文件
    o.prefix = options.prefix ? options.prefix : '';
    o.level = options.level ? options.level : '';
    o.base = options.base ? options.base : '';
    o.addBtn = options.addBtn ? options.addBtn : '';
    o.sortConfig = options.sortConfig ? options.sortConfig : {};
    o.sonNavs = options.sonNavs ? options.sonNavs : '';
    o.namePlaceholder = options.namePlaceholder ? options.namePlaceholder : '建议最长不超过6个字';
    o.selectConf = options.selectConf ? options.selectConf : [];

    switch (options.model_type) {
        case 'home_pop_ad':   //首页弹窗广告
            o.view = '<ul class="navigator_item">' +
                '<input type="hidden" data-type="banner_id" value="{{$banner_id}}"/>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="image"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"name": '', "app_route": '', "image": '', "banner_id": 3}];
            o.nameJson = [];
            o.valueReplace = function (view, _this) {
                view = view.replace('{{$app_route}}', _this.app_route);
                view = view.replace('{{$imageShow}}', _this.image);
                view = view.replace('{{$image}}', _this.image);
                view = view.replace('{{$banner_id}}', _this.banner_id);
                return view;
            };
            o.fields = [
                {field_name: 'banner_id'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'}
            ];
            break;
        case 'home_navigators':   //首页主图标
            o.view = '<ul class="navigator_item">' +
                '<li>名称：<input type="text" data-type="name" value="{{$name}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="image"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"name": '', "app_route": '', "image": ''}];
            o.nameJson = [];
            o.valueReplace = function (view, _this) {
                view = view.replace('{{$app_route}}', _this.app_route);
                view = view.replace('{{$name}}', _this.name);

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
                {field_name: 'name'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'}
            ];
            break;
        case 'splash_screen':   //启动广告
            o.view = '<ul class="navigator_item">' +
                '<li>名称：<input type="text" data-type="memo" value="{{$memo}}" readonly style="background-color: rgb(235, 235, 228);" />' +
                '<input type="hidden" data-type="name" value="{{$name}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}" /></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="image"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"app_route": '', "image": ''}];
            o.nameJson = [];

            o.valueReplace = function (view, _this) {
                view = view.replace('{{$app_route}}', _this.data.advertising.app_route);
                view = view.replace('{{$imageShow}}', _this.data.advertising.image);
                view = view.replace('{{$image}}', _this.data.advertising.image);
                view = view.replace('{{$memo}}', _this.memo);
                view = view.replace('{{$name}}', _this.name);
                return view;
            };
            o.fields = [
                {field_name: 'memo'},
                {field_name: 'name'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'}
            ];
            break;
        case 'user_navigators':
            o.view = '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<li>名称：<input type="text" data-type="name" value="{{$name}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="image"/><input type="hidden" data-type="path" value="{{$image}}"/></li>' +
                '</ul>';
            o.emptyData = [{"name": '', "app_route": '', "image": ''}];
            o.nameJson = [];
            o.valueReplace = function (view, _this) {
                view = view.replace('{{$name}}', _this.name);
                view = view.replace('{{$app_route}}', _this.app_route);

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
                {field_name: 'name'},
                {field_name: 'app_route'},
                {field_name: 'image'},
                {field_name: 'path'}
            ];
            break;

        case 'navigator_group':
            o.view = '<ul class="navigator_item">' +
                '<span><a href="javascript:0;" onclick="navModel({}).removeNavigator(this)"><img src="/static/admin/Static/Images/delete.jpg" width="20"></a></span>' +
                '<input type="hidden" data-type="navigator_id" value="{{$navigator_id}}"/>' +
                '<li>名称：<input type="text" data-type="name" required value="{{$name}}"/></li>' +
                '<li>路由：<input type="text" selectapproute data-type="app_route" value="{{$app_route}}"/></li>' +
                '<li>预览：<img class="img_preview" src="{{$imageShow}}" width="100" height="100"/></li>' +
                '<li>图片：<input type="file" onchange="app.uploadImage(this)" data-type="path"/><input type="hidden" data-type="path" value="{{$path}}"/></li>' +
                '</ul>';
            o.emptyData = [{"navigator_id": 0, "name": '', "app_route": '', "path": ''}];
            o.nameJson = [];
            o.valueReplace = function (view, _this) {
                view = view.replace('{{$name}}', _this.name);
                view = view.replace('{{$app_route}}', _this.app_route);
                view = view.replace('{{$path}}', _this.path);
                view = view.replace('{{$imageShow}}', _this.path);
                view = view.replace('{{$navigator_id}}', _this.navigator_id);
                return view;
            };
            o.fields = [
                {field_name: 'navigator_id'},
                {field_name: 'name'},
                {field_name: 'app_route'},
                {field_name: 'path'}
            ];
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

        var controller = URR_CONTROLLER = 'NavigatorGroup' ? 'NavigatorGroup' : 'StaticApi';
        console.log(controller);
        $.ajaxFileUpload
        (
            {
                url: "/admin.php?c=" + controller + "&a=uploadImage",
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
        );
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