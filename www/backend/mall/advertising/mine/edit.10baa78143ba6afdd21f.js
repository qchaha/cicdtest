webpackJsonp([13],{"+q0M":function(t,e,i){var s=i("C/Rj");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("4d5fa0e4",s,!0)},"1/na":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Row",[i("Col",{attrs:{span:"8"}},[i("m-goods-settings",{attrs:{group:t.group,item:t.group.items[0]},on:{"update:group":function(e){t.group=e},"update:item":function(e){t.$set(t.group.items,0,e)}}})],1)],1)],1)},staticRenderFns:[]}},"4UH2":function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".ivu-row[data-v-628a8c03]:not(:last-child){margin-bottom:20px}",""])},"4w1l":function(t,e,i){i("uObW");var s=i("VU/8")(i("Xc2r"),i("OYO+"),"data-v-2c181044",null);t.exports=s.exports},"5Aah":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("4w1l"),a=i.n(s);e.default={name:"MA1Settings",components:{MGoodsSettings:a.a},props:{group:{type:Object,default:function(){return{type:"A1",ratio:null,items:[{name:null,route:null,ratio:null,image:null}]}}}},data:function(){return{}},created:function(){var t=this;this.$nextTick(function(){t.adjustItems()})},watch:{group:function(){this.adjustItems()}},methods:{adjustItems:function(){!this.group.items instanceof Array?this.group.items=[{image:null}]:this.group.items.length>1&&this.group.items.splice(1,this.group.items.length-1)}}}},"8Bwl":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("s7Rv"),a=i.n(s),r=i("OsQJ"),n=i.n(r);e.default={name:"app",components:{MBaseSettings:a.a,MGoodsGroupSettings:n.a},data:function(){return{advertising:{},targetOptions:[],groups:[],advertisingDetailApi:{api:{path:"/boss/mall/advertising/home/"+this.$route.params.id,params:{fields:"{id,module,page,position,name,start_time,end_time,state,audience,groups{id,type,ratio,route,items{id,name,route,image{origin},ratio}}}"}}},loadTotal:2,loadedNum:0,submitApi:{api:{path:"/boss/mall/advertising/mine/update"}},canSubmit:!0}},created:function(){var t=this;this.$nextTick(function(){bus.$emit("on-loading"),t.loadData(),t.loadTargetOptions(),bus.$on("alert-error-tips",function(e,i){return t.alertErrorTips(e,i)}),bus.$on("prevent-submit",function(){t.canSubmit=!1}),bus.$on("reset-submit",function(){t.canSubmit=!0}),bus.$on("do-submit",function(){t.canSubmit&&t.doSubmit()})})},watch:{loadedNum:function(){this.loadedNum>=this.loadTotal&&(bus.$emit("on-loading"),this.loadedNum=0)}},methods:{loadData:function(){var t=this;this.$Util.api.get(this.advertisingDetailApi,this).then(function(e){if(t.loadedNum+=1,"user"===e.data.page&&"index"===e.data.position&&"middle"===e.data.position){t.advertising=e.data;var i=JSON.parse(JSON.stringify(t.advertising.groups));delete t.advertising.groups;for(var s=0;s<i.length;s++)for(var a=0;a<i[s].items.length;a++)i[s].items[a].image&&i[s].items[a].image.origin&&(i[s].items[a].image=i[s].items[a].image.origin);t.groups=i}else t.alertErrorTips("非法数据")},function(e){t.loadedNum+=1,t.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},loadTargetOptions:function(){var t=this;this.$Util.api.get({api:{path:"/boss/mall/advertising/home/tag-group-info",params:{fields:"{audience,title}"}}},this).then(function(e){t.loadedNum+=1,e.data.unshift({audience:"no_tag",title:"不限"}),t.targetOptions=e.data},function(e){t.loadedNum+=1,t.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},alertErrorTips:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;this.$Modal.error({width:e,content:t})},doSubmit:function(){var t={};t.id=this.advertising.id,t.module=this.advertising.module,t.page=this.advertising.page,t.position=this.advertising.position,t.name=this.advertising.name,t.audience="no_tag"===this.advertising.audience?"":this.advertising.audience,t.start_time=Math.round(this.advertising.start_time.getTime()/1e3),t.end_time=Math.round(this.advertising.end_time.getTime()/1e3),t.groups=[];for(var e=0;e<this.groups.length;e++){t.groups.splice(e,1,{type:this.groups[e].type,ratio:this.groups[e].ratio}),t.groups[e].items=[];for(var i=0;i<this.groups[e].items.length;i++)t.groups[e].items.splice(i,1,{name:this.groups[e].items[i].name,route:this.groups[e].items[i].route,ratio:this.groups[e].items[i].ratio,image:this.groups[e].items[i].image})}bus.$emit("on-loading");var s=this;this.$Util.api.post(this.submitApi,t,s).then(function(t){bus.$emit("on-loading"),0===t.error_code?s.$Modal.success({width:250,content:"提交成功"}):s.alertErrorTips(t.error_description?t.error_description:"提交失败",300)},function(t){bus.$emit("on-loading"),s.alertErrorTips(t.message?t.message:"提交失败",300)})}}}},"8H4i":function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".ivu-form-item[data-v-61bd5685]{width:380px}.ivu-form-item-required[data-v-61bd5685]:not(:last-child){margin-bottom:24px}",""])},AV0e:function(t,e,i){var s=i("UcaU");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("d5df7688",s,!0)},"C/Rj":function(t,e,i){e=t.exports=i(0)(),e.push([t.i,"",""])},CqLn:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("lbGG"),a=i.n(s),r=i("QG3B"),n=i.n(r);e.default={name:"MGoodsGroupSettings",components:{MA1Settings:a.a,MA4Settings:n.a},props:{group:{type:Object,default:function(){return{type:"A1",ratio:null,items:[{name:null,route:null,ratio:null,image:null}]}}},index:{type:Number,default:0}},data:function(){return{goodsGroupOptions:[{label:"A1广告组",value:"A1"},{label:"A4广告组",value:"A4"}]}}}},JbIj:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card",{attrs:{bordered:!1}},[i("section",[i("div",{staticClass:"goods-group-type-select"},[i("Select",{staticClass:"fixed-width-select",attrs:{filterable:""},model:{value:t.group.type,callback:function(e){t.$set(t.group,"type",e)},expression:"group.type"}},t._l(t.goodsGroupOptions,function(e){return i("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),t._v(" "),t.group.ratio&&"C2"!==t.group.type?i("span",{staticClass:"input-tips"},[t._v("长宽比"+t._s(t.group.ratio))]):t._e()],1),t._v(" "),"A1"===t.group.type?i("m-A1-settings",{attrs:{group:t.group},on:{"update:group":function(e){t.group=e}}}):t._e(),t._v(" "),"A4"===t.group.type?i("m-A4-settings",{attrs:{group:t.group},on:{"update:group":function(e){t.group=e}}}):t._e()],1)])},staticRenderFns:[]}},KwVn:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".img-ratio-tips[data-v-2c181044],.input-tips[data-v-2c181044]{font-size:12px;color:#9ea7b4}.goods-settings-card[data-v-2c181044]{background-color:#f2f2f2}.ivu-form-item[data-v-2c181044]:not(:first-child):not(:last-child){margin-bottom:24px}.fixed-width-input[data-v-2c181044]{display:inline-block;width:200px}.input-tips[data-v-2c181044]{margin-left:10px}",""])},MxrE:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card",{attrs:{bordered:!1}},[i("p",{attrs:{slot:"title"},slot:"title"},[t._v("基本信息")]),t._v(" "),i("Button",{attrs:{slot:"extra",type:"primary"},on:{click:t.submit},slot:"extra"},[t._v("提交")]),t._v(" "),i("section",[i("Form",{ref:t.formRef,attrs:{model:t.advertising,rules:t.validateRules,"label-width":80}},[i("Form-item",{attrs:{label:"广告ID"}},[i("span",[t._v(t._s(t.advertising.id))])]),t._v(" "),i("Form-item",{attrs:{label:"广告标题",prop:"name"}},[i("Input",{attrs:{placeholder:"请输入页面标题"},model:{value:t.advertising.name,callback:function(e){t.$set(t.advertising,"name",e)},expression:"advertising.name"}})],1),t._v(" "),i("Form-item",{attrs:{label:"展示人群",prop:"audience"}},[i("Select",{attrs:{filterable:"",placeholder:"请选择展示人群"},model:{value:t.advertising.audience,callback:function(e){t.$set(t.advertising,"audience",e)},expression:"advertising.audience"}},t._l(t.targetOptions,function(e){return i("Option",{key:e.audience,attrs:{value:e.audience}},[t._v(t._s(e.title))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"开始时间",prop:"start_time"}},[i("Date-picker",{attrs:{type:"datetime",placeholder:"选择开始时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:t.advertising.start_time,callback:function(e){t.$set(t.advertising,"start_time",e)},expression:"advertising.start_time"}})],1),t._v(" "),i("Form-item",{attrs:{label:"结束时间",prop:"end_time"}},[i("Date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:t.advertising.end_time,callback:function(e){t.$set(t.advertising,"end_time",e)},expression:"advertising.end_time"}})],1)],1)],1)],1)},staticRenderFns:[]}},"OYO+":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card",{staticClass:"goods-settings-card"},[i("p",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.position+1))]),t._v(" "),i("Form",{ref:t.formRef,attrs:{model:t.item,rules:t.validateRules,"label-width":50}},[i("Form-item",{attrs:{label:"ID"}},[i("span",[t._v(t._s(t.item.id))])]),t._v(" "),i("Form-item",{attrs:{label:"标题",prop:"name"}},[i("Input",{staticClass:"fixed-width-input",attrs:{placeholder:"请输入标题"},model:{value:t.item.name,callback:function(e){t.$set(t.item,"name",e)},expression:"item.name"}}),t._v(" "),i("span",{staticClass:"input-tips"},[t._v("弱网环境下展示")])],1),t._v(" "),i("Form-item",{attrs:{label:"路由",prop:"route"}},[i("m-app-route",{attrs:{placeholder:"输入路由","default-route":t.item.route},on:{"on-ok":t.handleSelectRoute}})],1),t._v(" "),i("Form-item",{attrs:{label:"图片",prop:"image"}},[i("m-upload-image",{attrs:{"default-images":[{url:t.item.image}]},on:{"on-success":t.handleUploadSuccess}}),t._v(" "),t.item.ratio?i("span",{staticClass:"img-ratio-tips"},[t._v("长宽比"+t._s(t.item.ratio))]):t._e()],1)],1)],1)},staticRenderFns:[]}},OsQJ:function(t,e,i){i("qjhX");var s=i("VU/8")(i("CqLn"),i("JbIj"),"data-v-2ba1da12",null);t.exports=s.exports},QG3B:function(t,e,i){i("itC4");var s=i("VU/8")(i("yPMq"),i("rf10"),"data-v-628a8c03",null);t.exports=s.exports},UcaU:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".content-wrapper[data-v-511b2489]{min-width:1190px;max-width:1220px}.ivu-card[data-v-511b2489]{margin-bottom:15px}",""])},Xc2r:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MGoodsSettings",props:{position:{type:Number,default:0},group:{type:Object},item:{type:Object,default:function(){return{name:null,route:null,ratio:null,image:null}}}},data:function(){return{formRef:"goodsForm",validateRules:{name:[{required:!0,message:"标题不能为空",trigger:"blur"},{type:"string",max:50,message:"标题不能多于50个字符",trigger:"blur"}],route:[{type:"string",max:1e3,message:"路由不能多于1000个字符",trigger:"change"}],image:[{required:!0,message:"图片不能为空",trigger:"change"},{type:"string",max:100,message:"图片路径不能多于100个字符",trigger:"change"}],goods_id:[{type:"number",required:!0,message:"Goods_ID不能为空",trigger:"blur"}]}}},created:function(){var t=this;this.$nextTick(function(){bus.$on("on-submit",function(){t.$refs[t.formRef]&&t.$refs[t.formRef].validate(function(t){t||(bus.$emit("prevent-submit"),bus.$emit("alert-error-tips","有必填项尚未填写，请完善"))})})})},methods:{handleSelectRoute:function(t){this.item.route=t},handleUploadSuccess:function(t){this.item.ratio=(t[0].width/t[0].height).toFixed(4),this.item.image=t[0].url,0===this.position&&(this.group.ratio=(750/t[0].height).toFixed(4))}}}},cqwu:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".goods-group-type-select[data-v-2ba1da12]{margin-bottom:24px}.fixed-width-select[data-v-2ba1da12]{max-width:150px}.input-tips[data-v-2ba1da12]{margin-left:10px;font-size:12px;color:#9ea7b4}",""])},fk2f:function(t,e,i){var s=i("8H4i");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("061c629d",s,!0)},itC4:function(t,e,i){var s=i("4UH2");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("0fe83e27",s,!0)},lbGG:function(t,e,i){i("+q0M");var s=i("VU/8")(i("5Aah"),i("1/na"),"data-v-861da1b4",null);t.exports=s.exports},oFeO:function(t,e,i){i("AV0e");var s=i("VU/8")(i("8Bwl"),i("vKdU"),"data-v-511b2489",null);t.exports=s.exports},q3z2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MBaseSettings",props:{advertising:{type:Object,default:{name:null,audience:"TAG|UNION|paul_test",start_time:null,end_time:null}},targetOptions:{type:Array,default:[]}},data:function(){var t=this;return{formRef:"baseForm",validateRules:{name:[{required:!0,message:"页面标题不能为空",trigger:"blur"},{type:"string",max:50,message:"页面标题不能多于50个字符",trigger:"blur"}],audience:[{required:!0,message:"展示人群不能为空",trigger:"change"}],start_time:[{type:"date",required:!0,message:"开始时间不能为空",trigger:"change"}],end_time:[{type:"date",required:!0,message:"结束时间不能为空",trigger:"change"},{validator:function(e,i,s){i?t.advertising.end_time<=t.advertising.start_time?s(new Error("结束时间不能小于开始时间")):s():s(new Error("结束时间不能为空"))},trigger:"change"}]}}},created:function(){var t=this;this.$nextTick(function(){bus.$on("on-submit",function(){t.$refs[t.formRef]&&t.$refs[t.formRef].validate(function(t){t||(bus.$emit("prevent-submit"),bus.$emit("alert-error-tips","有必填项尚未填写，请完善"))})})})},watch:{advertising:function(){this.advertising.start_time instanceof Date||(this.advertising.start_time=new Date(1e3*this.advertising.start_time)),this.advertising.end_time instanceof Date||(this.advertising.end_time=new Date(1e3*this.advertising.end_time)),""===this.advertising.audience&&(this.advertising.audience="no_tag")}},methods:{submit:function(){bus.$emit("reset-submit"),bus.$emit("on-submit"),setTimeout(function(){bus.$emit("do-submit")},300)}}}},qjhX:function(t,e,i){var s=i("cqwu");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("36d29193",s,!0)},rf10:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.itemChunks,function(e,s){return i("Row",t._l(e,function(e,a){return i("Col",{attrs:{span:"8",offset:a?2:0}},[i("m-goods-settings",{attrs:{position:2*s+a,group:t.group,item:t.group.items[2*s+a]},on:{"update:group":function(e){t.group=e},"update:item":function(e){t.$set(t.group.items,2*s+a,e)}}})],1)}))}))},staticRenderFns:[]}},s7Rv:function(t,e,i){i("fk2f");var s=i("VU/8")(i("q3z2"),i("MxrE"),"data-v-61bd5685",null);t.exports=s.exports},uObW:function(t,e,i){var s=i("KwVn");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("7a3319cc",s,!0)},vKdU:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page",{staticClass:"content-wrapper"},[i("m-base-settings",{attrs:{advertising:t.advertising,targetOptions:t.targetOptions},on:{"update:advertising":function(e){t.advertising=e}}}),t._v(" "),i("m-goods-group-settings",{attrs:{group:t.groups[t.index]},on:{"update:group":function(e){t.$set(t.groups,t.index,e)}}})],1)},staticRenderFns:[]}},yPMq:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("4w1l"),a=i.n(s);e.default={name:"MA4Settings",components:{MGoodsSettings:a.a},props:{group:{type:Object,default:function(){return{type:"A4",ratio:null,items:[{name:null,route:null,ratio:null,image:null}]}}}},watch:{group:function(){this.adjustItems()}},created:function(){var t=this;this.$nextTick(function(){t.adjustItems()})},data:function(){return{}},computed:{itemChunks:function(){var t=[];return this.group.items.forEach(function(e,i){i%2==0&&t.push([]),t[t.length-1].push(e)}),t}},methods:{adjustItems:function(){this.group.items instanceof Array?this.group.items.length<4&&this.fillItems(4-this.group.items.length):(this.group.items=[],this.fillItems(4))},fillItems:function(t){for(var e=0;e<t;e++)this.group.items.push({name:null,route:null,ratio:null,image:null})}}}}});