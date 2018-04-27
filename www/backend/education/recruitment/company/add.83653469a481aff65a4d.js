webpackJsonp([155],{"6OZp":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={create:{api:{path:"/boss/education/recruitment/company/create"}},update:{api:{path:"/boss/education/recruitment/company/update"}},remove:{api:{path:"/boss/education/recruitment/company/delete",params:{id:0}}},find:{api:{path:"/boss/education/recruitment/company/find",params:{fields:"{id,name,location{province_id,city_id,district_id,detail},tags{name},images{s(w:80,h:80){url,origin}},contact,wechat_number,benefits,location_type,style,opening_years,businesses,start_time_string,end_time_string,area,employee,is_chain,recommend_start_time,recommend_end_time,update_time,completion_percent,creator{uid,nickname}}",id:0}},responseHandle:function(e){return e.data.region=[e.data.location.province_id+"",e.data.location.city_id+"",e.data.location.district_id+""],e}},resource:{api:{path:"/boss/education/recruitment/company/add-page-info",params:{}},responseHandle:function(e){var t=[];for(var a in e.data.form.regions){var i=e.data.form.regions[a],n={value:i.area_code,label:i.name,children:[]};for(var r in i.cities){var o=i.cities[r],m={value:o.area_code,label:o.name,children:[]};for(var s in o.areas){var l=o.areas[s],c={value:l.area_code,label:l.name};m.children.push(c)}n.children.push(m)}t.push(n)}return e.regions=t,e.options=e.data.form.options,e}}};t.default={name:"MCompanyForm",props:{id:{type:String,name:""},usage:{type:String,name:"edit"}},data:function(){return{formItem:{id:0,tags:[],uid:0,recommend_time:[],recommend_start_time:0,recommend_end_time:0,creator:[],name:"",province_id:0,region:[],city_id:0,district_id:0,detail:"",images:[],defaultImages:[],contact:"",wechat_number:"",benefits:[""],location_type:"",style:"",opening_years:"",businesses:[],start_time_string:"",end_time_string:"",opening_time:[],area:"",employee:"",is_chain:!1},regions:[],tag:[],benefit:[],location_types:[],styles:[],open_year:[],areas:[],employees:[],business:[],limit:9,options:{disabledDate:function(e){return e&&e.valueOf()<Date.now()-864e5}}}},methods:{getImages:function(e){this.formItem.images=e},getRegion:function(e){this.formItem.province_id=e[0],this.formItem.city_id=e[1],this.formItem.district_id=e[2]},getRecommendTime:function(e){var t=new Date(e[0]),a=new Date(e[1]);this.formItem.recommend_start_time=t.getTime()/1e3-28800,this.formItem.recommend_end_time=a.getTime()/1e3-28800},getOpeningTime:function(e){this.formItem.start_time_string=e[0],this.formItem.end_time_string=e[1]},back:function(){location.hash="/education/recruitment/company/list/0"},remove:function(){if("edit"===this.usage){var e=this.id;if(!parseInt(e))return alert("店铺id格式有误"),!1;e=parseInt(e),this.formItem.id=e,i.remove.api.params.id=e,confirm("确认删除?")&&vm.$Util.api.delete(i.remove).then(this.back())}},submit:function(){if(this.validateFormData()){var e=this.getRequestParams();this.submitRequest(e)}},validateFormData:function(){return this.formItem.recommend_end_time>0&&this.formItem.recommend_start_time>=this.formItem.recommend_end_time?(this.$Notice.warning({title:"置顶开始时间必须小于结束时间",desc:""}),!1):0===this.formItem.uid&&"add"===this.usage?(this.$Message.warning("用户ID不能为空"),!1):0===this.formItem.name.length?(this.$Message.warning("店铺名称不能为空"),!1):0===this.formItem.region.length?(this.$Message.warning("所在地区不能为空"),!1):0===this.formItem.detail.length?(this.$Message.warning("店铺地址不能为空"),!1):0!==this.formItem.images.length||(this.$Message.warning("必须上传店铺图片"),!1)},getRequestParams:function(){var e={tags:0===this.formItem.tags.length?[]:this.formItem.tags,recommend_start_time:this.formItem.recommend_start_time,recommend_end_time:this.formItem.recommend_end_time,name:this.formItem.name,province_id:this.formItem.region[0],city_id:this.formItem.region[1],district_id:this.formItem.region[2],detail:this.formItem.detail,imagesData:0===this.formItem.images.length?[]:this.formItem.images,uid:this.formItem.uid,contact:this.formItem.contact,wechat_number:this.formItem.wechat_number,benefits:this.formItem.benefits,location_type:this.formItem.location_type,style:this.formItem.style,opening_years:this.formItem.opening_years,businesses:this.formItem.businesses,start_time_string:this.formItem.start_time_string,end_time_string:this.formItem.end_time_string,area:this.formItem.area,employee:this.formItem.employee,is_chain:!0===this.formItem.is_chain?1:0};return"edit"===this.usage&&(e.id=this.formItem.id,e.uid=this.formItem.uid),e},submitRequest:function(e){bus.$emit("on-loading");var t=this,a=i.create;"edit"===this.usage&&(a=i.update),this.$Util.api.post(a,e,t).then(function(){t.$Message.success("请求成功"),t.back()},function(e){bus.$emit("on-loading"),t.$Message.warning("请求失败")})},loadResource:function(){var e=this;bus.$emit("on-loading"),this.$Util.api.get(i.resource,e).then(function(t){bus.$emit("on-loading"),e.tag=t.options.tags,e.benefit=t.options.benefits,e.styles=t.options.style,e.open_year=t.options.opening_years,e.areas=t.options.area,e.employees=t.options.employee,e.business=t.options.businesses,e.location_types=t.options.location_type,e.regions=t.regions,"edit"===e.usage&&e.$nextTick(function(){e.loadCompany()}),e.submitEnable=!1},function(t){e.$Message.warning("加载资源失败")})},loadCompany:function(){var e=this;bus.$emit("on-loading"),this.$Util.api.get(i.find,e).then(function(t){bus.$emit("on-loading"),t.data.detail=t.data.location.detail;var a=[];t.data.tags.map(function(e){a.push(e.name)}),t.data.tags=a,t.data.creator||(t.data.creator=[],t.data.creator.uid=0,t.data.creator.nickname=""),t.data.defaultImages=[];var i=[];t.data.images.map(function(e){t.data.defaultImages.push({url:e.s.origin}),i.push({url:e.s.origin})}),t.data.images=i,t.data.opening_time=[t.data.start_time_string,t.data.end_time_string];var n=new Date;n=t.data.recommend_start_time?n.setTime(1e3*t.data.recommend_start_time):"";var r=new Date;r=t.data.recommend_end_time?r.setTime(1e3*t.data.recommend_end_time):"",t.data.recommend_time=[n,r],e.formItem=t.data,e.submitEnable=!1},function(t){bus.$emit("on-loading"),e.$Message.warning("加载店铺详情失败")})},initIds:function(){if("edit"===this.usage){var e=this.id;if(!parseInt(e))return alert("店铺id格式有误"),!1;e=parseInt(e),this.formItem.id=e,i.find.api.params.id=e}}},created:function(){this.initIds(),"edit"===this.usage&&(i.resource.api.path="/boss/education/recruitment/company/edit-page-info"),this.$nextTick(function(){this.loadResource()})}}},"JET/":function(e,t,a){var i=a("VU/8")(a("6OZp"),a("ojON"),null,null);e.exports=i.exports},e4hc:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page-add",[a("m-company-form",{attrs:{usage:"add"}})],1)},staticRenderFns:[]}},ohfL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("JET/"),n=a.n(i);t.default={name:"app",components:{MCompanyForm:n.a},data:function(){return{}}}},ojON:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"padding-top":"20px"}},[a("Form",{attrs:{model:e.formItem,"label-width":80}},[a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("运营区")]),e._v(" "),"edit"===e.usage?a("div",{staticStyle:{background:"#eee",width:"300px",padding:"10px"}},[a("ul",[a("li",[e._v("店铺ID："+e._s(e.formItem.id))]),e._v(" "),a("li",[e._v("用户id & 用户昵称："+e._s(e.formItem.creator.uid)+" & "+e._s(e.formItem.creator.nickname))]),e._v(" "),e.formItem.recommend_start_time<=(new Date).getTime()/1e3&&e.formItem.recommend_end_time>=(new Date).getTime()/1e3?a("li",[e._v("置顶中")]):e._e(),e._v(" "),a("li",[e._v("资料完成度："+e._s(e.formItem.completion_percent)+"%")])])]):e._e(),e._v(" "),a("Form-item",{attrs:{label:"系统标签"}},[a("Checkbox-group",{model:{value:e.formItem.tags,callback:function(t){e.$set(e.formItem,"tags",t)},expression:"formItem.tags"}},[e._l(e.tag,function(e){return a("Checkbox",{attrs:{label:e}})}),e._v(" "),a("Checkbox",{attrs:{label:"店务通",disabled:""}})],2)],1),e._v(" "),a("Form-item",{attrs:{label:"置顶时间"}},[a("Date-picker",{staticStyle:{width:"300px"},attrs:{type:"daterange",placeholder:"选择日期",options:e.options,value:e.formItem.recommend_time},on:{"on-change":e.getRecommendTime}})],1)],1),e._v(" "),a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("必填信息")]),e._v(" "),a("Form-item",{attrs:{label:"店铺名称"}},[a("Input",{staticStyle:{width:"300px"},attrs:{maxlength:30,placeholder:"店铺名称(30字以内)"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),a("Form-item",{attrs:{label:"所在地区"}},[a("Cascader",{staticStyle:{width:"300px"},attrs:{data:e.regions,trigger:"hover"},model:{value:e.formItem.region,callback:function(t){e.$set(e.formItem,"region",t)},expression:"formItem.region"}})],1),e._v(" "),a("Form-item",{attrs:{label:"店铺地址"}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入地址"},model:{value:e.formItem.detail,callback:function(t){e.$set(e.formItem,"detail",t)},expression:"formItem.detail"}})],1),e._v(" "),a("Form-item",{attrs:{label:"店铺环境"}},[a("m-upload-image",{attrs:{multiple:"","default-images":e.formItem.defaultImages},on:{"on-success":e.getImages}})],1),e._v(" "),"add"===e.usage?a("Form-item",{attrs:{label:"用户id"}},[a("Input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"用户ID"},model:{value:e.formItem.uid,callback:function(t){e.$set(e.formItem,"uid",t)},expression:"formItem.uid"}})],1):e._e()],1),e._v(" "),a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("其他信息")]),e._v(" "),a("Form-item",{attrs:{label:"电话"}},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"电话"},model:{value:e.formItem.contact,callback:function(t){e.$set(e.formItem,"contact",t)},expression:"formItem.contact"}})],1),e._v(" "),a("Form-item",{attrs:{label:"微信"}},[a("Input",{staticStyle:{width:"300px"},attrs:{maxlength:30,placeholder:"微信号"},model:{value:e.formItem.wechat_number,callback:function(t){e.$set(e.formItem,"wechat_number",t)},expression:"formItem.wechat_number"}})],1),e._v(" "),a("Form-item",{attrs:{label:"福利"}},[a("Checkbox-group",{model:{value:e.formItem.benefits,callback:function(t){e.$set(e.formItem,"benefits",t)},expression:"formItem.benefits"}},e._l(e.benefit,function(e){return a("Checkbox",{attrs:{label:e}})}))],1),e._v(" "),a("Form-item",{attrs:{label:"位置类型"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.location_type,callback:function(t){e.$set(e.formItem,"location_type",t)},expression:"formItem.location_type"}},e._l(e.location_types,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"店铺风格"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.style,callback:function(t){e.$set(e.formItem,"style",t)},expression:"formItem.style"}},e._l(e.styles,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"开业年限"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.opening_years,callback:function(t){e.$set(e.formItem,"opening_years",t)},expression:"formItem.opening_years"}},e._l(e.open_year,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"业务范围"}},[a("Checkbox-group",{model:{value:e.formItem.businesses,callback:function(t){e.$set(e.formItem,"businesses",t)},expression:"formItem.businesses"}},e._l(e.business,function(e){return a("Checkbox",{attrs:{label:e}})}))],1),e._v(" "),a("Form-item",{attrs:{label:"营业时间"}},[a("Time-picker",{staticStyle:{width:"300px"},attrs:{format:"HH:mm",type:"timerange",placement:"bottom-end",placeholder:"选择时间",value:e.formItem.opening_time},on:{"on-change":e.getOpeningTime}})],1),e._v(" "),a("Form-item",{attrs:{label:"店铺面积"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.area,callback:function(t){e.$set(e.formItem,"area",t)},expression:"formItem.area"}},e._l(e.areas,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"员工人数"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.employee,callback:function(t){e.$set(e.formItem,"employee",t)},expression:"formItem.employee"}},e._l(e.employees,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"连锁店"}},[a("i-switch",{model:{value:e.formItem.is_chain,callback:function(t){e.$set(e.formItem,"is_chain",t)},expression:"formItem.is_chain"}})],1)],1),e._v(" "),a("m-card",[a("Affix",{attrs:{"offset-bottom":0}},[a("Form-item",[a("i-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.submit(t)}}},[e._v("提交")]),e._v(" "),"edit"===e.usage?a("i-button",{attrs:{type:"ghost"},nativeOn:{click:function(t){return e.remove(t)}}},[e._v("删除")]):e._e()],1)],1)],1)],1)],1)},staticRenderFns:[]}},yF2E:function(e,t,a){var i=a("VU/8")(a("ohfL"),a("e4hc"),null,null);e.exports=i.exports}});