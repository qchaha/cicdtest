webpackJsonp([153],{"5kKv":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page-add",[a("m-job-form",{attrs:{usage:"add"}})],1)},staticRenderFns:[]}},"7RDP":function(e,t,a){var i=a("VU/8")(a("PyTy"),a("vkcY"),null,null);e.exports=i.exports},"8xhI":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("7RDP"),r=a.n(i);t.default={name:"app",components:{MJobForm:r.a},data:function(){return{}}}},PyTy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={create:{api:{path:"/boss/education/recruitment/job/create"}},update:{api:{path:"/boss/education/recruitment/job/update"}},remove:{api:{path:"/boss/education/recruitment/job/delete",params:{id:0}}},find:{api:{path:"/boss/education/recruitment/job/find",params:{fields:"{id,name,experience,property,salary_range{min,max},property,skills,desc,poster{uid,nickname},company{company_id,name}}",id:0}}},resource:{api:{path:"/boss/education/recruitment/job/add-page-info",params:{}},responseHandle:function(e){return e.options=e.data.form.options,e}}};t.default={name:"MJobForm",props:{id:{type:String,name:""},usage:{type:String,name:"edit"}},data:function(){return{formItem:{id:0,uid:0,company_id:0,company:[],poster:[],name:"",experience:"",property:0,salary_range:"",salary_min:0,salary_max:0,skills:[],desc:""},names:[],experiences:[],properties:[],skill:[]}},methods:{back:function(){location.hash="/education/recruitment/job/list/0"},remove:function(){if("edit"===this.usage){var e=this.id;if(!parseInt(e))return alert("职位id格式有误"),!1;e=parseInt(e),this.formItem.id=e,i.remove.api.params.id=e,confirm("确认删除?")&&vm.$Util.api.delete(i.remove).then(this.back())}},submit:function(){if(this.validateFormData()){var e=this.getRequestParams();this.submitRequest(e)}},validateFormData:function(){return 0===this.formItem.company_id&&"add"===this.usage?(this.$Message.warning("店铺ID不能为空"),!1):0===this.formItem.name.length?(this.$Message.warning("职位类型不能为空"),!1):0===this.formItem.experience.length?(this.$Message.warning("工作经验不能为空"),!1):this.formItem.salary_min>=this.formItem.salary_max?(this.$Message.warning("最高薪资必须比最低薪酬大"),!1):0===this.formItem.salary_min.length&&0===this.formItem.salary_max.length?(this.$Message.warning("薪资范围不能为空"),!1):0!==this.formItem.property.length||(this.$Message.warning("全职/兼职不能为空"),!1)},getRequestParams:function(){var e={uid:this.formItem.uid,company_id:this.formItem.company_id,name:this.formItem.name,experience:this.formItem.experience,salary_range:this.formItem.salary_min+"-"+this.formItem.salary_max,property:this.formItem.property,skills:this.formItem.skills,desc:this.formItem.desc};return"edit"===this.usage&&(e.id=this.formItem.id,e.uid=this.formItem.uid,e.company_id=this.formItem.company_id),e},submitRequest:function(e){bus.$emit("on-loading");var t=this,a=i.create;"edit"===this.usage&&(a=i.update),this.$Util.api.post(a,e,t).then(function(){t.$Message.success("请求成功"),t.back()},function(e){bus.$emit("on-loading"),t.$Message.warning("请求失败")})},loadResource:function(){var e=this;bus.$emit("on-loading"),this.$Util.api.get(i.resource,e).then(function(t){bus.$emit("on-loading"),e.names=t.options.names,e.experiences=t.options.experiences,e.properties=t.options.properties,e.skill=t.options.skill,"edit"===e.usage&&e.$nextTick(function(){e.loadJob()}),e.submitEnable=!1},function(t){e.$Message.warning("加载资源失败")})},loadJob:function(){var e=this;bus.$emit("on-loading"),this.$Util.api.get(i.find,e).then(function(t){bus.$emit("on-loading"),t.data.poster||(t.data.poster=[],t.data.poster.uid=0,t.data.poster.nickname=""),t.data.company_id=t.data.company.company_id,t.data.salary_min=t.data.salary_range.min,t.data.salary_max=t.data.salary_range.max,e.formItem=t.data,e.submitEnable=!1},function(t){bus.$emit("on-loading"),e.$Message.warning("加载职位详情失败")})},initIds:function(){if("edit"===this.usage){var e=this.id;if(!parseInt(e))return alert("职位id格式有误"),!1;e=parseInt(e),this.formItem.id=e,i.find.api.params.id=e}}},created:function(){this.initIds(),"edit"===this.usage&&(i.resource.api.path="/boss/education/recruitment/job/edit-page-info"),this.$nextTick(function(){this.loadResource()})}}},QEHR:function(e,t,a){var i=a("VU/8")(a("8xhI"),a("5kKv"),null,null);e.exports=i.exports},vkcY:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"padding-top":"20px"}},[a("Form",{attrs:{model:e.formItem,"label-width":80}},["edit"===e.usage?a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("运营区")]),e._v(" "),a("div",{staticStyle:{background:"#eee",width:"500px",padding:"10px"}},[a("ul",[a("li",[e._v("职位ID："+e._s(e.formItem.id))]),e._v(" "),a("li",[e._v("店铺ID & 店铺名称："+e._s(e.formItem.company.company_id)+" & "+e._s(e.formItem.company.name))]),e._v(" "),a("li",[e._v("用户id & 用户昵称："+e._s(e.formItem.poster.uid)+" & "+e._s(e.formItem.poster.nickname))])])])]):e._e(),e._v(" "),a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("必填信息")]),e._v(" "),a("Form-item",{attrs:{label:"职位类型"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}},e._l(e.names,function(t){return a("Option",{attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"工作经验"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.experience,callback:function(t){e.$set(e.formItem,"experience",t)},expression:"formItem.experience"}},e._l(e.experiences,function(t){return a("Option",{attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"薪酬范围"}},[a("Input-number",{staticStyle:{width:"100px"},attrs:{max:99999,min:1,placeholder:"最低"},model:{value:e.formItem.salary_min,callback:function(t){e.$set(e.formItem,"salary_min",t)},expression:"formItem.salary_min"}}),e._v("\n                ~\n                "),a("Input-number",{staticStyle:{width:"100px"},attrs:{max:99999,min:1,placeholder:"最高"},model:{value:e.formItem.salary_max,callback:function(t){e.$set(e.formItem,"salary_max",t)},expression:"formItem.salary_max"}})],1),e._v(" "),a("Form-item",{attrs:{label:"全职/兼职"}},[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:"",filterable:"",placeholder:"请选择"},model:{value:e.formItem.property,callback:function(t){e.$set(e.formItem,"property",t)},expression:"formItem.property"}},e._l(e.properties,function(t){return a("Option",{attrs:{value:t}},[e._v(e._s(t))])}))],1),e._v(" "),"add"===e.usage?a("Form-item",{attrs:{label:"店铺id"}},[a("Input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"店铺ID"},model:{value:e.formItem.company_id,callback:function(t){e.$set(e.formItem,"company_id",t)},expression:"formItem.company_id"}})],1):e._e()],1),e._v(" "),a("m-card",[a("h3",{staticStyle:{"margin-bottom":"10px"}},[e._v("其他信息")]),e._v(" "),a("Form-item",{attrs:{label:"技能要求"}},[a("Checkbox-group",{model:{value:e.formItem.skills,callback:function(t){e.$set(e.formItem,"skills",t)},expression:"formItem.skills"}},e._l(e.skill,function(e){return a("Checkbox",{attrs:{label:e}})}))],1),e._v(" "),a("Form-item",{attrs:{label:"特殊说明"}},[a("Input",{staticStyle:{width:"300px"},attrs:{maxlength:50,placeholder:"特殊说明",type:"textarea",autosize:{minRows:2,maxRows:5}},model:{value:e.formItem.desc,callback:function(t){e.$set(e.formItem,"desc",t)},expression:"formItem.desc"}})],1)],1),e._v(" "),a("m-card",[a("Affix",{attrs:{"offset-bottom":0}},[a("Form-item",[a("i-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.submit(t)}}},[e._v("提交")]),e._v(" "),"edit"===e.usage?a("i-button",{attrs:{type:"ghost"},nativeOn:{click:function(t){return e.remove(t)}}},[e._v("删除")]):e._e()],1)],1)],1)],1)],1)},staticRenderFns:[]}}});