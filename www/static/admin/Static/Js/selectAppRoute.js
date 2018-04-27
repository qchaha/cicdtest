(function ($) {
    //路由数据
    var appRouteData = [];
    var utmContent = null;
    //组件数据
    var componentData = [
        {
            "group": "常用",
            "items": [
                {
                    'enabled': true,
                    'name': '单图添加',
                    'route': '<img style=":width" class="pull-left" src=":image" />',
                    'params': {
                        'width': '宽',
                        'image': {
                            name: '领取前图片',
                            type: 'image'
                        },
                    }
                },
                {
                    'enabled': true,
                    'name': '领优惠券',
                    'route': '<img data-module="coupon-obtain" data-coupon-ids=":coupon_ids"  data-stats-category="点击领优惠券" data-stats-action="券:coupon_ids" data-obtained-src=":obtained_image" src=":image">',
                    'params': {
                        'coupon_ids': '优惠券id',
                        'image': {
                            name: '领取前图片',
                            type: 'image'
                        },
                        'obtained_image': {
                            name: '领取后图片',
                            type: 'image'
                        }
                    }
                },
                {
                    'enabled': true,
                    'name': '插入视频',
                    'route': '<div data-module="video" data-poster=":poster" data-src=":src"></div>',
                    'params': {
                        'poster': {
                            name: '封面链接',
                            type: 'image'
                        },
                        'src': '视频链接'
                    }
                },
                {
                    'enabled': true,
                    'name': '大转盘',
                    'route': '<div data-module="turntable" data-bg-image=":bg_image" data-pointer-image=":pointer_image"></div><p>剩余抽奖次数<span data-module="turntableTime"></span></p>',
                    'params': {
                        'bg_image': {
                            name: '转盘背景图',
                            type: 'image'
                        },
                        'pointer_image': {
                            name: '转盘指针图',
                            type: 'image'
                        }
                    }
                }
            ]
        }
    ];

    var CommonSelector = function (options) {
        var that = this;
        var businessStr = '', activityStr = '', tagStr = '';
        var utmContent = options.utmContent;
        console.log(utmContent, utmContent.business)
        utmContent.business.map(function (item) {
            businessStr += '<option value="' + item + '">' + item + '</option>';
        });
        utmContent.activities.map(function (item) {
            activityStr += '<option value="' + item + '">' + item + '</option>';
        });
        utmContent.tags.map(function (item) {
            tagStr += '<option value="' + item + '">' + item + '</option>';
        });
        var html = '<div id="select_approute" tabindex="-1" role="dialog" data-width="760" data-hasfoot="false" data-backdrop="static" class="sui-modal hide fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">×</button><div class="s_title"><p>选择组件</p></div><div class="s_route"><div class="s_route_list"><div class="group-wrap"><div class="group-title">常用:</div><ul><li class="route-item" route-id="0" route-group="0">领优惠券</li><li class="route-item s_select" route-id="1" route-group="0">插入视频</li></ul></div></div></div><div class="s_param"><ul><li><p data-name="poster">封面链接:</p><input type="text" value=""></li><li><p data-name="src">视频链接:</p><input type="text" value=""></li></ul></div><div class="s_button"><button class="s_submit sui-btn btn-xlarge btn-primary">确认</button><button class="s_close sui-btn btn-xlarge">取消</button></div></div></div></div></div>';
        var utmContent = '<div id="utm_content" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">×</button><h4 id="myModalLabel" class="modal-title">设置UTM追踪统计信息</h4></div><div class="modal-body">\
        <div style="margin: 10px 0">\
        <div style="display: inline-block;width: 70px;text-align: right">标题:</div><input type="text" style="width: 300px;height: 25px;" class="title">\
        </div>\
        <div style="margin: 10px 0">\
        <label for="id_label_single">\
        <div style="display: inline-block;width: 70px;text-align: right">业务方:</div>\
        <select class="js-example-basic-single js-states form-control business" id="id_label_single">'
            + businessStr + '\
            </select>\
            </label>\
            </div>\
            <div style="margin: 10px 0"><label for="id_label_multiple">\
            <div style="display: inline-block;width: 70px;text-align: right">系列活动名:</div>\
        <select class="js-example-basic-multiple js-states form-control activity" id="id_label_multiple" multiple="multiple">'
            + activityStr + '\
            </select>\
            </label></div>\
            <div style="margin: 10px 0"><label for="id_label_multiple">\
            <div style="display: inline-block;width: 70px;text-align: right">标签:</div>\
        <select class="js-example-basic-multiple js-states form-control tags" id="id_label_multiple" multiple="multiple">'
            + tagStr + '\
            </select>\
            </label></div>\
            </div><div class="modal-footer"><button type="button" data-ok="modal" class="sui-btn btn-primary btn-large utm-btn">提交</button></div></div></div></div>';

        this.selectorData = options.selectorData;

        this.selectorData = options.selectorData;
        if (options.selectorCommonParams) {
            that.selectorCommonParams = options.selectorCommonParams;
            that.commonParams = {};
            $.each(that.selectorCommonParams, function (first_level_index, first_level_value) {
                $.each(first_level_value, function (second_level_index, second_level_value) {
                    that.commonParams[second_level_index] = second_level_value;
                });
            });
        }

        this.settings = options;

        if ($('body #select_approute').length == 0) {
            $('body').append(html);
            $('body').append(utmContent);

            $('body').append('<style>.select2-container--default .select2-selection--single{width:300px}.select2-container--default .select2-selection--multiple{width:300px}</style>');
            // 添加事件

            var params = {};
            var paramsStr = this.settings.app_route ? this.settings.app_route.split('?')[1] : '';
            var paramsArray = paramsStr && paramsStr.split('&');
            if (paramsArray) {
                paramsArray.map(function (item) {
                    params[item.split('=')[0]] = item.split('=')[1];
                });
                $('.utm-title').val(decodeURIComponent(params.content_title));
                $('.business').val(decodeURIComponent(params.content_business));
                $('.activity').val(decodeURIComponent(params.content_act).split(','));
                $('.tags').val(decodeURIComponent(params.content_tags).split(','));
            }

            $('body').on("click", ".s_route_list li", function (event) {
                that.settings.app_route = '';
                that.binding_data($(this), false)
            })
        }

        var checkRoute = options.checkRoute || false;
        $('.s_submit').bind("click", _submit);
        $('body').on('click', ".s_close", function () {
            $('.s_submit').unbind("click", _submit);
            that.hide();
        });

        var html = '';
        for (var i = 0, len = this.selectorData.length; i < len; i++) {
            var groupHtml = '';
            for (var j in this.selectorData[i]['items']) {
                if (!!this.selectorData[i]['items'][j]) {
                    groupHtml += "<li class='route-item' route-id=" + j + " route-group=" + i + ">" + this.selectorData[i]['items'][j].name + "</li>";
                }
            }
            html += '<div class="group-wrap"><div class="group-title">' + this.selectorData[i]['group'] + ':</div><ul>' + groupHtml + '</ul></div>';
        }

        $(".s_route_list").html(html);

        this.binding_data = function (this_el, once) {

            $(".s_route_list li").removeClass("s_select");


            if (this.settings.app_route != '') {
                // var appRoute = this.settings.app_route.split('?');
                // if (appRoute.length > 2) {
                //     this.settings.app_route = appRoute[0] + '?' + appRoute[1] + '&' + appRoute[2];
                // }
                console.log(this.settings.app_route)
                this.settings.app_route = this.settings.app_route.replace(/(&|\?)content_title=(.*)&content_business=(.*)&content_act=(.*)&content_tags=(.*)/, '');
                var selected = null;
                for (var i = 0, len = this.selectorData.length; i < len; i++) {
                    for (var j in this.selectorData[i]['items']) {
                        if (this.is_match(this.selectorData[i]['items'][j], this.settings.app_route)) {
                            selected = $('[route-group=' + i + '][route-id=' + j + ']');

                            this.settings.params = this.match_app_route(this.selectorData[i]['items'][j], this.settings.app_route);
                            break;
                        }
                    }
                    if (selected) {
                        this_el = selected;
                        break;
                    }
                }
            }

            this_el.addClass("s_select");
            var route_id = this_el.attr("route-id");
            var route_group = this_el.attr("route-group");
            var _parms;
            if (route_id) {
                _parms = that.selectorData[route_group]['items'][route_id].params

                if (that.commonParams) {
                    _parms = _parms ? _parms : {};
                    if (!that.selectorData[route_group]['items'][route_id].params) {
                        that.selectorData[route_group]['items'][route_id].params = {};
                    }
                    $.extend(_parms, that.commonParams);
                    $.extend(that.selectorData[route_group]['items'][route_id].params, that.commonParams);
                    $.each(that.commonParams, function (common_param_key, common_param_value) {
                        var connectStr = that.selectorData[route_group]['items'][route_id].route.indexOf('?') == -1 ? '?' : '&';
                        if (that.selectorData[route_group]['items'][route_id].route.indexOf(common_param_key) == -1) {
                            that.selectorData[route_group]['items'][route_id].route
                                += connectStr + common_param_key + '=:' + common_param_key;
                        }
                    });
                }
            }

            var _li = '';
            if (_parms) {
                //罗列参数
                for (var i in _parms) {
                    if (typeof _parms[i] === 'object') {
                        var property = '';
                        switch (_parms[i]['type']) {
                            case 'image':
                                property = 'param-image-picker';
                                break;
                            case 'date':
                                property = 'param-date';
                                break;
                            case 'datetime':
                                property = 'param-datetime';
                                break;
                            case 'coupon':
                                property = 'param-coupon';
                                break;
                        }
                        console.log(_parms[i]);
                        _li += '<li><p data-name="' + i + '">' + _parms[i]['name'] + ':</p><input type="text" ' + property + ' value="" /></li>'
                    } else {
                        _li += '<li><p data-name="' + i + '">' + _parms[i] + ':</p><input type="text"  value="" /></li>'
                    }
                }
                $(".s_param ul").html(_li);


                $('.s_param ul [param-image-picker]').imagePicker({
                    el: 'self',
                    mode: 'replace',
                    format: 'shortTag',
                    objType: 'component',
                    objId: 0
                });
                $('.s_param ul [param-datetime]').datetimepicker();
            } else {
                $(".s_param ul").html('无参数~~')
            }

            if (this.settings.params && once) {
                for (var i in this.settings.params) {
                    $(".s_param ul>li p[data-name=" + i + "]").next().val(this.settings.params[i])
                }
            }

        };

        function _submit(event) {
            var $utm = $('#utm_content')
            $utm.modal('show');
            $(".js-example-basic-single").select2();
            $(".js-example-basic-multiple").select2();
            setTimeout(function () {
                $(document).off('focusin.modal');
            }, 500);
            $utm.find('.select2-search__field').width(300).on('click', function () {
                setTimeout(function () {
                    $('.select2-dropdown.select2-dropdown--below').width(300)
                }, 500)
            });

            $utm.find('.select2-selection').width(300).on('click', function () {
                setTimeout(function () {
                    $('.select2-dropdown.select2-dropdown--below').width(300)
                }, 500)
            });
            $('.utm-btn').on('click', function () {
                console.log('route', opts.route);
                var title = $('.title').val();
                var business = $('.business').val();
                var activity = $('.activity').val() && $('.activity').val().join(',');
                var tags = $('.tags').val() && $('.tags').val().join(',');
                var utmContent = 'content_title=' + encodeURIComponent(title) + '&' + 'content_business=' + encodeURIComponent(business) + '&' + 'content_act=' + encodeURIComponent(activity) + '&' + 'content_tags=' + encodeURIComponent(tags);

                if (opts.route.indexOf('?') > 0) {
                    opts.route += '&' + utmContent;
                } else {
                    opts.route += '?' + utmContent;
                }
                console.log(opts.route);

                if (that.settings.callback && typeof (that.settings.callback) == "function") {
                    that.settings.callback(opts)
                }
                console.log(utmContent);
                $('.utm-btn').off('click');
            });
            var opts = {
                route_id: $(".s_route_list .s_select").attr("route-id"),
                route_group: $(".s_route_list .s_select").attr("route-group"),
                name: $(".s_route_list .s_select").html(),
                route: "",
                params: {}
            };


            // if (checkRoute && !opts.route_id && opts.route_id !== '0') {
            //     alert("你还没选择路由~~")
            //     return false;
            // }
            var routeName = that.selectorData[opts.route_group]['items'][opts.route_id].name;

            for (var i = 0; i < $(".s_param ul > li").length; i++) {

                var input_val = encodeURIComponent($(".s_param ul > li").eq(i).find("input").val());

                if (routeName == '自定义') {
                    input_val = decodeURIComponent(input_val);
                }

                if (!input_val) {
                    alert("\"" + $(".s_param ul > li").eq(i).find("p").html() + "\">>参数不能为空<<")
                    return false;
                }

                opts.params[$(".s_param ul > li").eq(i).find("p").attr("data-name")] = input_val;

            }

            opts.route = that.selectorData[opts.route_group]['items'][opts.route_id].route;
            console.log('submit', opts);

            for (var i in opts.params) {
                var reg = new RegExp("(:" + i + ")", "g");

                opts.route = opts.route.replace(reg, (opts.params[i].trim()));


                //为空则删除公共参数
                if (that.commonParams && that.commonParams[i] && opts.params && !opts.params[i]) {
                    var reg = new RegExp("([&|?]" + i + "=)", "g");
                    opts.route = opts.route.replace(reg, '');

                    var reg = new RegExp("([&|?]" + i + "=:" + i + ")", "g");
                    that.selectorData[opts.route_group]['items'][opts.route_id].route =
                        that.selectorData[opts.route_group]['items'][opts.route_id].route.replace(reg, '');
                }

                if (checkRoute) {
                    opts.route = opts.route.replace(/([\+\，\！\？]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3])/g, function (a) {
                        return encodeURIComponent(a);
                    }).replace(/\s+/g, '');
                }
                //opts.route = opts.route.replace(reg, encodeURIComponent(opts.params[i]))
            }

            // if (routeName == '打开App内部网页' || routeName == '打开App外部网页') {
            //     let urlParams = opts.route.split('?')[1];
            //     console.log(urlParams, decodeURIComponent(urlParams).indexOf('?'));
            //     if (decodeURIComponent(urlParams).indexOf('?') > 0) {
            //         opts.route = opts.route.replace('&__source=', encodeURIComponent('&__source='));
            //     } else {
            //         // console.log(i);
            //         opts.route = opts.route.replace('&__source=', encodeURIComponent('?__source='));
            //         opts.route = opts.route + '&__source=' + opts.params['__source'];
            //     }
            //
            //     // opts.route = opts.route.replace('&__source=', encodeURIComponent('&__source='));
            //     console.log(opts.route);
            // }

            if (that.settings.callback && typeof (that.settings.callback) == "function") {
                that.settings.callback(opts)
            }

            setTimeout(function () {
                CommonSelector.prototype.hide();
            }, 0);

            $('.s_submit').unbind("click", _submit)
        }
    };

    CommonSelector.prototype = {

        constructor: CommonSelector,

        init: function (options) {

            var $this = $(this);
            // 数据初始化
            this.binding_data($('[route-id="' + this.settings.id + '"]'), true)

            // 界面显示
            this.show();

        },
        destroy: function () {
            $('.s_route_list li').unbind('click');
            $('.s_close').unbind('click');
            $('.s_submit').unbind('click');
        },
        show: function (event) {
            $('#select_approute').modal('show');
        },
        hide: function () {
            $(".s_route_list li").removeClass("s_select")
            $(".s_param ul").html('无参数~~')
            //CommonSelector.prototype.destroy();
            $('#select_approute').modal('hide');
        },

        /**
         * 判断路由是否匹配
         * @param  {[type]} appRouteObj [路由]
         * @return {[type]}           [description]
         */
        is_match: function (appRouteObj, route) {

            var routeTpl = appRouteObj.route.replace(/(\?|\/)/g, '\\$1');
            for (var p in appRouteObj.params) {
                routeTpl = routeTpl.replace(':' + p, '(.+)');
            }
            var pattern = new RegExp('^' + routeTpl + '$');
            return pattern.test(route);
        },
        /**
         * 匹配路由信息
         * @param  {[type]} appRouteObj [路由]
         * @return {[type]}           [description]
         */
        match_app_route: function (appRouteObj, route) {

            var route = decodeURI(route);
            var routeTpl = appRouteObj.route.replace(/(\?|\/)/g, '\\$1');//正则待完善
            for (var p in appRouteObj.params) {
                routeTpl = routeTpl.replace(':' + p, '(.+)');
            }
            var pattern = new RegExp(routeTpl);
            var info = route.match(pattern),
                params = {}
                , i = 1;

            for (var p in appRouteObj.params) {
                params[p] = info[i++];
            }
            return params;
        }


    };

    /**
     * 入口，添加点击事件
     */
    $("input[selectapproute]").attr("readonly", "readonly");

    //路由的公共的参数
    // var appRouteCommonParams = [
    //     {
    //         '__source': '来源'
    //     }
    // ];

    function initRoute($that, options) {
        var defaultOptions = {
            app_route: decodeURIComponent($that.val()),
            checkRoute: true,
            callback: function (opts) {
                console.log('callback', opts.route, $that);
                $that.val(opts.route);
            },
            selectorData: appRouteData,
            utmContent: utmContent
        };
        var setting = $.extend({}, defaultOptions, options);
        var selector = new CommonSelector(setting);
        selector.init();
    }

    $.fn.appRoutePicker = function (options) {
        $(this).each(function (i, el) {
            $(el).on("click", function () {
                var $that = $(this);

                if (appRouteData.length == 0) {
                    $.ajax({
                        url: '/boss/backend/admin/app-route/find-list',
                        success: function (response) {
                            console.log(response);
                            appRouteData = [];
                            response.data.config.map(function (item) {
                                appRouteData.push({
                                    group: item.title,
                                    items: item.routeList
                                })
                            });
                            utmContent = response.data.utm_content;
                            console.log(appRouteData);
                            initRoute($that, options)

                        }
                    });
                } else {
                    initRoute($that, options)
                }
                $('#select_approute .s_title p').html('选择APP路由');
                return false;

            })
        });

        return this;
    };

    $(function () {
        $('input[selectapproute]').appRoutePicker();//兼容旧的使用情况
    });

    $.fn.componentPicker = function (options) {
        $(this).on("click", function () {
            var defaultOptions = {
                selectorData: componentData,
                //默认回调，插入到目标textarea光标位置
                callback: function (opts) {
                    if (options.el != undefined) {
                        var el = options.el;
                        var pos = parseInt(el[0].selectionStart);
                        var val = el.val();

                        if (el.attr('length') != undefined) {
                            var maxLength = parseInt(el.attr('length'));
                            if (val.length + opts.route.length > maxLength)
                                return false;
                        }

                        var begin = val.substr(0, pos);
                        var end = val.substr(pos);
                        el.val(begin + opts.route + end);
                        el.attr({ "position": pos + opts.route.length });
                        $.Recount_Word(el.get(0));
                    }

                    if (typeof (options.callback) == 'function') {
                        options.callback({ 'html': opts.route });
                    }
                }
            };

            var selector = new CommonSelector(defaultOptions);

            selector.init();

            $('#select_approute .s_title p').html('选择组件');
        });

        return this;
    };

})(jQuery);

