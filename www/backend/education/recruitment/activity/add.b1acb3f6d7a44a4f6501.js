webpackJsonp([67],{ADGw:function(t,e,i){var a=i("VU/8")(i("AMr/"),i("iPUL"),null,null);t.exports=a.exports},"AMr/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("a5Ip"),r=i.n(a);e.default={name:"app",components:{MActivityForm:r.a},data:function(){return{}}}},MDkI:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".ivu-card{margin:10px 0}.ivu-card:last-child{margin-top:40px}.ivu-card-shadow,.ivu-card.ivu-card-shadow:hover{box-shadow:none}",""])},a5Ip:function(t,e,i){i("dtjq");var a=i("VU/8")(i("cNTd"),i("fhqi"),null,null);t.exports=a.exports},cNTd:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Wsma"),r=i.n(a),o={create:{api:{path:"/boss/education/recruitment/activity/create"}},update:{api:{path:"/boss/education/recruitment/activity/update"}},remove:{api:{path:"/boss/education/recruitment/activity/delete",params:{id:0}}},find:{api:{path:"/boss/education/recruitment/activity/find",params:{fields:"{privilege_card_activity{cover{origin,height,width},id,code},display_bottom_button,id,title,background_color,need_filter,usage,default_city,default_district,default_job,filter_condition{id,title},head_ad_sense_group{adsenses{type,ratio,format,sort,items{title,subtitle,sort,cover(w:750){url,width,height,origin},app_route,mark_image}},id},foot_ad_sense_group{adsenses{type,ratio,format,sort,items{title,subtitle,sort,cover(w:750){url,width,height,origin},app_route,mark_image}},id}}",id:0}}},resource:{api:{path:"/boss/education/recruitment/activity/add-page-info",params:{fields:"{conditions{id,title,usage},categories{id,title,code}}"}},responseHandle:function(t){return t.categories=t.data.form.categories,t.conditions=t.data.form.conditions,t}}};e.default={components:{MAdSenseGroup:r.a},name:"MActivityForm",props:{id:{type:String,name:""},usage:{type:String,name:"edit"}},data:function(){return{formItem:{id:0,title:"",filter_condition_id:0,usage:"",background_color:"778899",need_filter:!0,default_city:"",default_district:"",default_job:"",head_ad_sense_group:[],foot_ad_sense_group:[],privilege_card_cover:[],privilege_card_activity_id:0,privilege_card_activity_code:"",need_bottom_button:!0,display_bottom_button:!0},conditions:[],categories:[],names:["店长","美甲师","美甲学徒","美睫师","纹绣师"]}},methods:{back:function(){location.hash="/education/recruitment/activity/list"},remove:function(){if("edit"===this.usage){var t=this.id;if(!parseInt(t))return alert("活动id格式有误"),!1;t=parseInt(t),this.formItem.id=t,o.remove.api.params.id=t,confirm("确认删除?")&&vm.$Util.api.delete(o.remove).then(this.back())}},getCover:function(t){this.formItem.privilege_card_cover=t},changeConditions:function(t){},submit:function(){if(this.validateFormData()){var t=this.getRequestParams();this.submitRequest(t)}},validateFormData:function(){if(0===this.formItem.title.length)return this.$Message.warning("页面标题不能为空"),!1;var t=0!==this.formItem.privilege_card_cover.length&&""!==this.formItem.privilege_card_cover[0].url,e=""!==this.formItem.privilege_card_activity_id&&this.formItem.privilege_card_activity_id>0;if(t&&!e||!t&&e)return this.$Message.warning("特权卡&特权卡背景图，要么两个都填要么两个都不填!"),!1;var i=0!==this.formItem.usage.length,a=this.formItem.filter_condition_id>0;if(i&&!a||!i&&a)return this.$Message.warning("数据类型&和数据源,必须为两个都填或者两个都不填"),!1;if(0!=this.formItem.privilege_card_activity_id){for(var r=0,o=this.categories.length;r<o;r++)this.formItem.privilege_card_activity_id==this.categories[r].id&&(this.formItem.privilege_card_activity_code=this.categories[r].code);if("job_refresh_update_time"!=this.formItem.privilege_card_activity_code&&"job_sticky"!=this.formItem.privilege_card_activity_code&&"job_assistant"!=this.formItem.privilege_card_activity_code&&"resume_sticky"!=this.formItem.privilege_card_activity_code&&"resume_assistant"!=this.formItem.privilege_card_activity_code)return this.$Message.warning("特权卡活动必须从招聘刷新卡，招聘置顶卡，招聘小秘书卡，求职置顶卡，求职推广小秘书卡中选择"),this.formItem.privilege_card_activity_id="",!1}if(this.formItem.head_ad_sense_group.length>0)for(var s in this.formItem.head_ad_sense_group){var n=this.formItem.head_ad_sense_group[s];if(!/^\d{1,2}(\.\d{1,4})?$/.test(n.ratio))return this.$Message.warning("头部广告组宽高比格式错误"),!1;var d=n.items;for(var c in d){var l=d[c];if(0===l.title.length)return this.$Message.warning("头部广告组名称不能为空"),!1;if(0===l.app_route.length||void 0===l.app_route||"undefined"===l.app_route)return this.$Message.warning("头部广告组路由不能为空"),!1;if(0===l.image.length)return this.$Message.warning("头部广告组图片不能为空"),!1}}if(this.formItem.foot_ad_sense_group.length>0)for(var _ in this.formItem.foot_ad_sense_group){var m=this.formItem.foot_ad_sense_group[_];if(!/^\d{1,2}(\.\d{1,4})?$/.test(m.ratio))return this.$Message.warning("尾部广告组宽高比格式错误"),!1;var u=m.items;for(var f in u){var p=u[f];if(0===p.title.length)return this.$Message.warning("尾部广告组名称不能为空"),!1;if(0===p.app_route.length||void 0===p.app_route||"undefined"===p.app_route)return this.$Message.warning("尾部广告组路由不能为空"),!1;if(0===p.image.length)return this.$Message.warning("尾部广告组图片不能为空"),!1}}return!0},getRequestAdSenseGroup:function(t){var e=[];t.map(function(t){var i={id:t.id,ratio:t.ratio,format:t.format,sort:t.sort,items:[]};t.items.map(function(t){var e={id:t.id,title:t.title,subTitle:t.subTitle,app_route:t.app_route,sort:t.sort,image_path:t.image[0].url};i.items.push(e)});var a=i.items.length;i.items.map(function(t){t.sort=a,a--}),e.push(i)});var i=e.length;return e.map(function(t){t.sort=i,i--}),e},getRequestParams:function(){var t={title:this.formItem.title,background_color:this.formItem.background_color,head_ad_sense_group:this.formItem.head_ad_sense_group.length>0?this.getRequestAdSenseGroup(this.formItem.head_ad_sense_group):[],default_city:this.formItem.default_city.length>0?this.formItem.default_city:"",default_district:this.formItem.default_district.length>0?this.formItem.default_district:"",default_job:this.formItem.default_job.length>0?this.formItem.default_job:"",usage:this.formItem.usage,filter_condition_id:this.formItem.filter_condition_id,need_filter:!0===this.formItem.need_filter?1:0,display_bottom_button:1==this.formItem.display_bottom_button?1:0,privilege_card_cover:this.formItem.privilege_card_cover,foot_ad_sense_group:this.formItem.foot_ad_sense_group.length>0?this.getRequestAdSenseGroup(this.formItem.foot_ad_sense_group):[],privilege_card_activity_id:this.formItem.privilege_card_activity_id,privilege_card_activity_code:this.formItem.privilege_card_activity_code};return"edit"===this.usage&&(t.id=this.formItem.id),t},submitRequest:function(t){bus.$emit("on-loading");var e=this,i=o.create;"edit"===this.usage&&(i=o.update),this.$Util.api.post(i,t,e).then(function(){e.$Message.success("请求成功"),e.back()},function(t){bus.$emit("on-loading"),e.$Message.warning("请求失败")})},loadResource:function(){var t=this;bus.$emit("on-loading"),this.$Util.api.get(o.resource,t).then(function(e){bus.$emit("on-loading"),t.categories=e.categories,t.conditions=e.conditions,"edit"===t.usage&&t.$nextTick(function(){t.loadFormData()}),t.submitEnable=!1},function(e){t.$Message.warning("加载资源失败")})},loadFormData:function(){var t=this;bus.$emit("on-loading"),this.$Util.api.get(o.find,t).then(function(e){if(bus.$emit("on-loading"),e.data.head_ad_sense_group){var i=[];i=this.constructAdSenseGroups(e.data.head_ad_sense_group.adsenses),e.data.head_ad_sense_group=i}else e.data.head_ad_sense_group=[];if(e.data.foot_ad_sense_group){var a=[];a=this.constructAdSenseGroups(e.data.foot_ad_sense_group.adsenses),e.data.foot_ad_sense_group=a}else e.data.foot_ad_sense_group=[];0!=e.data.privilege_card_activity.length?(e.data.privilege_card_activity_id=e.data.privilege_card_activity.id,e.data.privilege_card_activity_code=e.data.privilege_card_activity.code):e.data.privilege_card_activity_id=0,e.data.privilege_card_activity.cover?(e.data.defaultCover=[{url:e.data.privilege_card_activity.cover.origin}],e.data.privilege_card_cover=[{url:e.data.privilege_card_activity.cover.origin}]):e.data.privilege_card_cover=[],e.data.filter_condition?e.data.filter_condition_id=e.data.filter_condition.id:e.data.filter_condition_id=0,t.formItem=e.data,t.submitEnable=!1},function(e){bus.$emit("on-loading"),t.$Message.warning("加载活动详情失败")})},constructAdSenseGroups:function(t){var e=[];return t&&void 0!==t?(t.map(function(t){var i={id:t.id,ratio:t.ratio,format:t.format,items:[]};t.items.map(function(t){void 0!==t.app_route&&"undefined"!==t.app_route&&0!==t.app_route.length||(t.app_route="");var e={id:t.id,title:t.title,subTitle:t.subtitle,app_route:t.app_route,sort:t.sort,image:[{url:t.cover.origin}]};i.items.push(e)}),e.push(i)}),e):[]},initIds:function(){if("edit"===this.usage){var t=this.id;if(!parseInt(t))return alert("活动id格式有误"),!1;t=parseInt(t),this.formItem.id=t,o.find.api.params.id=t}}},created:function(){this.initIds(),"edit"===this.usage&&(o.resource.api.path="/boss/education/recruitment/activity/edit-page-info"),this.$nextTick(function(){this.loadResource()})}}},dtjq:function(t,e,i){var a=i("MDkI");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("dc684698",a,!0)},fhqi:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Form",{attrs:{model:t.formItem,"label-width":80}},[i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("基本信息")]),t._v(" "),i("Form-item",{attrs:{label:"页面标题"}},[i("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"10字内",maxlength:10},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1),t._v(" "),i("Form-item",{attrs:{label:"页面背景色"}},[i("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"颜色的16进制码",maxlength:6},model:{value:t.formItem.background_color,callback:function(e){t.$set(t.formItem,"background_color",e)},expression:"formItem.background_color"}},[i("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("#")])])],1)],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("头部广告组")]),t._v(" "),i("MAdSenseGroup",{model:{value:t.formItem.head_ad_sense_group,callback:function(e){t.$set(t.formItem,"head_ad_sense_group",e)},expression:"formItem.head_ad_sense_group"}})],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("添加特权卡（非必填项）")]),t._v(" "),i("Form-item",{attrs:{label:"特权卡活动"}},[i("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择分类"},model:{value:t.formItem.privilege_card_activity_id,callback:function(e){t.$set(t.formItem,"privilege_card_activity_id",e)},expression:"formItem.privilege_card_activity_id"}},t._l(t.categories,function(e){return i("Option",{attrs:{value:e.id}},[t._v(t._s(e.title))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"背景图"}},[i("m-upload-image",{attrs:{"default-images":t.formItem.defaultCover},on:{"on-success":t.getCover}})],1)],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("数据源设置（非必填项）")]),t._v(" "),i("Form-item",{attrs:{label:"数据类型",required:""}},[i("Radio-group",{on:{"on-change":t.changeConditions},model:{value:t.formItem.usage,callback:function(e){t.$set(t.formItem,"usage",e)},expression:"formItem.usage"}},[i("Radio",{attrs:{label:"resume"}},[i("span",[t._v("简历")])]),t._v(" "),i("Radio",{attrs:{label:"company"}},[i("span",[t._v("店铺")])])],1)],1),t._v(" "),i("Form-item",{attrs:{label:"数据条件"}},[i("Select",{staticStyle:{width:"200px"},attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.formItem.filter_condition_id,callback:function(e){t.$set(t.formItem,"filter_condition_id",e)},expression:"formItem.filter_condition_id"}},t._l(t.conditions,function(e){return i("Option",{attrs:{value:e.id}},[t._v(t._s(e.title))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"是否显示筛选条"}},[i("i-switch",{model:{value:t.formItem.need_filter,callback:function(e){t.$set(t.formItem,"need_filter",e)},expression:"formItem.need_filter"}})],1)],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("筛选条默认值（非必填）")]),t._v(" "),i("Form-item",{attrs:{label:"默认城市"}},[i("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"默认城市,15字内",maxlength:15},model:{value:t.formItem.default_city,callback:function(e){t.$set(t.formItem,"default_city",e)},expression:"formItem.default_city"}})],1),t._v(" "),i("Form-item",{attrs:{label:"默认地区"}},[i("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"默认地区,15字内",maxlength:15},model:{value:t.formItem.default_district,callback:function(e){t.$set(t.formItem,"default_district",e)},expression:"formItem.default_district"}})],1),t._v(" "),i("Form-item",{attrs:{label:"默认职位"}},[i("Select",{staticStyle:{width:"200px"},attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.formItem.default_job,callback:function(e){t.$set(t.formItem,"default_job",e)},expression:"formItem.default_job"}},t._l(t.names,function(e){return i("Option",{attrs:{value:e}},[t._v(t._s(e))])}))],1)],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("尾部广告组")]),t._v(" "),i("MAdSenseGroup",{model:{value:t.formItem.foot_ad_sense_group,callback:function(e){t.$set(t.formItem,"foot_ad_sense_group",e)},expression:"formItem.foot_ad_sense_group"}})],1),t._v(" "),i("Card",[i("h3",{staticStyle:{margin:"10px 0"}},[t._v("吸底悬浮按钮配置")]),t._v(" "),i("Form-item",{attrs:{label:"是否显示"}},[i("i-switch",{model:{value:t.formItem.display_bottom_button,callback:function(e){t.$set(t.formItem,"display_bottom_button",e)},expression:"formItem.display_bottom_button"}})],1)],1),t._v(" "),i("Card",{attrs:{id:"bottomSubmitCard"}},[i("Form-item",[i("i-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")]),t._v(" "),i("i-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:t.back}},[t._v("取消")]),t._v(" "),"edit"===t.usage?i("i-button",{attrs:{type:"ghost"},nativeOn:{click:function(e){return t.remove(e)}}},[t._v("删除")]):t._e()],1)],1)],1)],1)},staticRenderFns:[]}},iPUL:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page-add",[i("m-activity-form",{attrs:{usage:"add"}})],1)},staticRenderFns:[]}}});