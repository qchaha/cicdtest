webpackJsonp([126],{"7yfA":function(t,e,i){var a=i("VU/8")(i("bnxZ"),i("xgPA"),null,null);t.exports=a.exports},Grsf:function(t,e,i){var a=i("VU/8")(i("eCEt"),i("qtua"),null,null);t.exports=a.exports},bnxZ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Grsf"),r=i.n(a);e.default={name:"app",components:{MCategoryInformationLevel3Form:r.a},data:function(){return{id:this.$route.params.advertising_id,parent_id:this.$route.params.parent_id}}}},eCEt:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={create:{api:{path:"/boss/mall/advertising/category-information/3/create"}},update:{api:{path:"/boss/mall/advertising/category-information/3/update"}},find:{api:{path:"/boss/mall/advertising/category-list/find",params:{id:0,fields:"{id,name,audience_name,start_time,end_time}"}},responseHandle:function(t,e){return""===t.data.audience_name&&(t.data.audience_name="不限"),t.data.start_time=e.$Util.dateFormat(t.data.start_time,"yyyy-MM-dd hh:mm:ss"),t.data.end_time=e.$Util.dateFormat(t.data.end_time,"yyyy-MM-dd hh:mm:ss"),t}},findInformation:{api:{path:"/boss/mall/advertising/category-information/find",params:{id:0,advertising_id:0,parent_id:0,level:3,fields:"{id,name,parent_id,ordering}"}},responseHandle:function(t,e){return""===t.data.audience_name&&(t.data.audience_name="不限"),t.data.start_time=e.$Util.dateFormat(t.data.start_time,"yyyy-MM-dd hh:mm:ss"),t.data.end_time=e.$Util.dateFormat(t.data.end_time,"yyyy-MM-dd hh:mm:ss"),t}},findBrandsApi:{api:{path:"/boss/mall/catalog/basic-brand/list",params:{offset:0,limit:1e3,status:1,fields:"{id,name,image{origin,url}}"}}},findCategoriesApi:{api:{path:"/boss/mall/catalog/basic-category/list",params:{offset:0,limit:1e3,status:[1],level:3,fields:"{id,name,image{origin,url}}"}}}};e.default={name:"MCategoryInformationLevel1Form",props:{id:{type:String,default:""},parent_id:{type:String,default:""},usage:{type:String,default:"edit"}},data:function(){return{searchTypeSource:{},searchModal:!1,searchModalIndex:0,keywordType:0,kw:"",keywordOptions:[],loading:!1,listItem:{name:"",audience_name:"",start_time:"",end_time:""},formItem:{categories:[{id:"",name:"",image:"",route:"",sort:"",ordering:"",parent_id:parseInt(this.parent_id)}]},removeId:[],informationItem:{id:"",name:"",ordering:"",parent_name:"",parent_ordering:""},categoriesOfLevel2:[{id:"",name:"",sort:""}],basicBrands:[{id:"",name:"",image:""}],basicCategories:[{id:"",name:"",image:""}],searchKeywords:[{id:"",name:"",image:""}]}},methods:{back:function(){location.hash="/mall/advertising/category-list/category-information/list/"+this.id},selectKeyword:function(){var t=this.searchModalIndex;if(1==this.keywordType)for(var e=0;e<this.basicBrands.length;e++)this.basicBrands[e].id==this.kw&&(this.formItem.categories[t].name=this.basicBrands[e].name,this.formItem.categories[t].image=this.basicBrands[e].image.origin,this.formItem.categories[t].route=encodeURI("meijiabang://goods_list?attrs.brand_id="+this.basicBrands[e].id+"&title="+this.basicBrands[e].name));else if(2==this.keywordType)for(var e=0;e<this.basicCategories.length;e++)this.basicCategories[e].id==this.kw&&(this.formItem.categories[t].name=this.basicCategories[e].name,this.formItem.categories[t].image=this.basicCategories[e].image.origin,this.formItem.categories[t].route=encodeURI("meijiabang://goods_list?attrs.category_id="+this.basicCategories[e].id+"&title="+this.basicCategories[e].name))},changeKeywords:function(){1==this.keywordType?(this.searchKeywords=this.basicBrands,this.kw=""):2==this.keywordType?(this.searchKeywords=this.basicCategories,this.kw=""):this.searchKeywords=[{}]},remoteMethod:function(t){var e=this;""!==t?(this.loading=!0,setTimeout(function(){e.loading=!1;var i=e.searchKeywords.map(function(t){return{value:t.id,label:t.name}});e.keywordOptions=i.filter(function(e){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1})},200)):this.keywordOptions=[]},syncImage:function(t,e){this.formItem.categories[e].image=t[0].url},handleSelectRoute:function(t,e){this.formItem.categories[e].route=t},showModal:function(t){this.searchModal=!0,this.searchModalIndex=t},submit:function(){if(this.validateFormData()){var t=this.getRequestParams(),e=a.create;"edit"===this.usage&&(e=a.update),this.submitRequest(t,e)}},validateFormData:function(){for(var t=0,e=0;e<this.formItem.categories.length;e++){if(t=e+1,""===this.formItem.categories[e].name)return this.$Message.error("第"+t+"个分类名称不能为空!"),!1;if(""===this.formItem.categories[e].sort)return this.$Message.error("第"+t+"个排序不能为空或者重复!"),!1;if(""===this.formItem.categories[e].image)return this.$Message.error("第"+t+"个图片不能为空!"),!1;if(""===this.formItem.categories[e].route)return this.$Message.error("第"+t+"个路由不能为空!"),!1;if(this.formItem.categories[e].parent_id<=0)return this.$Message.error("第"+t+"个父级分类不能为空!"),!1;if(this.formItem.categories[e].name.replace(/[\u0391-\uFFE5]/g,"aa").length>10)return this.$Message.error("第"+t+"个分类名称不能长于10个字符!"),!1}return!0},getRequestParams:function(){var t={};return t.id=this.id,t.parent_id=0,t.categories=this.formItem.categories,t.remove_ids=this.removeId,t},submitRequest:function(t,e,i){bus.$emit("on-loading");var a=this;this.$Util.api.post(e,t,a).then(function(t){0===t.error_code?(a.$Notice.success({title:"请求成功",desc:""}),location.hash="/mall/advertising/category-list/category-information/list/"+this.id):(bus.$emit("on-loading"),a.alertErrorTips(t.message?t.message:"提交失败",300))},function(t){bus.$emit("on-loading"),a.$Notice.warning({title:"请求失败",desc:""})})},addCategory:function(){var t={id:"",name:"",image:"",route:"",sort:"",parent_id:parseInt(this.parent_id)};this.formItem.categories.push(t)},removeCategory:function(t){this.formItem.categories.length>1&&(""!==this.formItem.categories[t].id&&this.removeId.push(this.formItem.categories[t].id),this.formItem.categories.splice(t,1))},checkName:function(t){for(var e=0;e<this.formItem.categories.length;e++)if(t!==e&&this.formItem.categories[e].name==this.formItem.categories[t].name&&this.formItem.categories[e].parent_id==this.formItem.categories[t].parent_id)return this.$Message.error("名称不能重复!"),this.formItem.categories[t].name="",!1},checkSort:function(t,e){if(!/^\d+$/.test(this.formItem.categories[t].sort)&&""!==this.formItem.categories[t].sort)return this.$Message.error("排序需要为正整数!"),this.formItem.categories[t].sort="",this.formItem.categories[t].ordering="",!1;if(this.formItem.categories[t].sort<=0)return this.$Message.error("排序需要为正整数!"),this.formItem.categories[t].sort="",this.formItem.categories[t].ordering="",!1;for(var i=0;i<this.formItem.categories.length;i++)t!==i&&this.formItem.categories[i].sort==this.formItem.categories[t].sort&&this.formItem.categories[i].parent_id==this.formItem.categories[t].parent_id&&(""==this.formItem.categories[t].ordering?this.resetSort(this.formItem.categories[t].sort,0,t,this.formItem.categories[t].parent_id):this.resetSort(this.formItem.categories[t].sort,this.formItem.categories[t].ordering,t,this.formItem.categories[t].parent_id),this.formItem.categories[t].ordering=this.formItem.categories[t].sort)},resetSort:function(t,e,i,a){var r={};if(0===e)for(var s=0;s<this.formItem.categories.length;s++)i!==s&&this.formItem.categories[s].sort>=t&&this.formItem.categories[s].parent_id==a&&(r=this.formItem.categories[s],r.sort=parseInt(this.formItem.categories[s].sort)+1,r.ordering=parseInt(this.formItem.categories[s].ordering)+1,this.formItem.categories.splice(s,1,r));else if(t>e)for(var s=0;s<this.formItem.categories.length;s++)i!==s&&e<this.formItem.categories[s].sort&&this.formItem.categories[s].sort<=t&&this.formItem.categories[s].parent_id==a&&(r=this.formItem.categories[s],r.sort=parseInt(this.formItem.categories[s].sort)-1,r.ordering=parseInt(this.formItem.categories[s].sort)-1,this.formItem.categories.splice(s,1,r));else for(var s=0;s<this.formItem.categories.length;s++)i!==s&&t<=this.formItem.categories[s].sort&&this.formItem.categories[s].sort<e&&this.formItem.categories[s].parent_id==a&&(r=this.formItem.categories[s],r.sort=parseInt(this.formItem.categories[s].sort)+1,r.ordering=parseInt(this.formItem.categories[s].ordering)+1,this.formItem.categories.splice(s,1,r))},resetCategories:function(){this.formItem.categories.sort(function(t,e){return t.parent_id>e.parent_id?1:t.parent_id<e.parent_id?-1:""==t.sort&&""!=e.sort?1:""!=t.sort&&""==e.sort?-1:""==t.sort&&""==e.sort?0:parseInt(t.sort)-parseInt(e.sort)})},loadResource:function(){a.find.api.params.id=this.id;var t=this;this.$Util.api.get(a.find,this).then(function(e){if(!e.data)return t.$Message.warning("数据不存在"),!1;t.listItem=e.data},function(t){})},loadEditFormData:function(){a.findInformation.api.params.id="",a.findInformation.api.params.advertising_id=this.id,a.findInformation.api.params.parent_id=this.parent_id,a.findInformation.api.params.level=3,a.findInformation.api.params.fields="{id,name,parent_id,ordering,image{origin,url},route}";var t=this;bus.$emit("on-loading"),this.$Util.api.get(a.findInformation,this).then(function(e){if(bus.$emit("on-loading"),!e.data)return t.$Message.warning("数据不存在"),!1;if(0===e.error_code){t.formItem.categories=e.data;for(var i=0;i<t.formItem.categories.length;i++)t.formItem.categories[i].sort=t.formItem.categories[i].ordering,t.formItem.categories[i].parent_id=parseInt(t.formItem.categories[i].parent_id),t.formItem.categories[i].image=t.formItem.categories[i].image.origin;setTimeout(function(){t.resetCategories()},1500)}},function(t){})},loadInformation:function(){a.findInformation.api.params.id=this.parent_id,a.findInformation.api.params.advertising_id="",a.findInformation.api.params.parent_id="",a.findInformation.api.params.level=2,a.findInformation.api.params.fields="{id,name,parent_id,ordering,parent_name,parent_ordering}";var t=this;this.$Util.api.get(a.findInformation,this).then(function(e){if(!e.data)return t.$Message.warning("数据不存在"),!1;t.informationItem=e.data[0]},function(t){})},loadCategoriesOfLevel2:function(){a.findInformation.api.params.advertising_id=this.id,a.findInformation.api.params.parent_id="",a.findInformation.api.params.id="",a.findInformation.api.params.level=2,a.findInformation.api.params.fields="{id,name,parent_id,ordering,parent_name}";var t=this;this.$Util.api.get(a.findInformation,this).then(function(e){if(!e.data)return t.$Message.warning("数据不存在"),!1;t.categoriesOfLevel2=e.data;for(var i=0;i<t.categoriesOfLevel2.length;i++)t.categoriesOfLevel2[i].id=parseInt(t.categoriesOfLevel2[i].id),t.categoriesOfLevel2[i].name=t.categoriesOfLevel2[i].parent_name+"-"+t.categoriesOfLevel2[i].name;t.categoriesOfLevel2.push({id:0,name:"请选择"})},function(t){})},loadBrands:function(){this.$Util.api.get(a.findBrandsApi,this).then(function(t){if(!t.data)return this.$Message.warning("数据不存在"),!1;this.basicBrands=t.data},function(t){})},loadCategories:function(){this.$Util.api.get(a.findCategoriesApi,this).then(function(t){if(!t.data)return this.$Message.warning("数据不存在"),!1;this.basicCategories=t.data},function(t){})}},created:function(){this.$nextTick(function(){this.loadResource(),this.loadCategoriesOfLevel2(),0!=this.parent_id&&this.loadInformation(),this.loadBrands(),this.loadCategories(),"edit"===this.usage&&this.loadEditFormData()})}}},qtua:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page",[i("Form",{ref:"myForm",attrs:{model:t.formItem,"label-width":120}},[i("Card",[i("div",[i("span",{staticStyle:{"margin-right":"20px"}},[t._v("\n                    页面名称："+t._s(t.listItem.name)+"\n                ")]),t._v(" "),i("span",{staticStyle:{"margin-right":"20px"}},[t._v("\n                    展示对象："+t._s(t.listItem.audience_name)+"\n                ")]),t._v(" "),i("span",[t._v("\n                    展示时段："+t._s(t.listItem.start_time)+" ~ "+t._s(t.listItem.end_time)+"\n                ")])]),t._v(" "),i("div",[i("span",[t._v("\n                    一级分类："+t._s(t.informationItem.parent_name)+"\n                ")]),t._v(" "),i("span",[t._v("\n                    一级分类排序："+t._s(t.informationItem.parent_ordering)+"\n                ")]),t._v(" "),i("span",[t._v("\n                    二级分类："+t._s(t.informationItem.name)+"\n                ")]),t._v(" "),i("span",[t._v("\n                    二级分类排序："+t._s(t.informationItem.ordering)+"\n                ")])])]),t._v(" "),i("Card",[i("table",{staticClass:"ivu-table",staticStyle:{width:"1200px","margin-left":"50px"},attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[i("tr",[i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("三级分类名称")])]),t._v(" "),i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("三级分类排序")])]),t._v(" "),i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("三级分类图片")])]),t._v(" "),i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("三级分类路由")])]),t._v(" "),i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("所属一级-二级分类")])]),t._v(" "),i("th",[i("div",{staticClass:"ivu-table-cell"},[t._v("操作")])])]),t._v(" "),t._l(t.formItem.categories,function(e,a){return i("tr",[i("td",[i("div",{staticClass:"ivu-table-cell"},[i("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"最多5个中文（10字符)"},on:{"on-blur":function(e){t.checkName(a)}},model:{value:e.name,callback:function(i){t.$set(e,"name",i)},expression:"categoryItem.name"}}),t._v(" "),i("Button",{attrs:{type:"text"},on:{click:function(e){t.showModal(a)}}},[t._v("搜索")])],1)]),t._v(" "),i("td",[i("div",{staticClass:"ivu-table-cell"},[i("Input",{staticStyle:{width:"100px"},attrs:{placeholder:"",disabled:0==e.parent_id},on:{"on-blur":function(e){t.checkSort(a,!0)}},model:{value:e.sort,callback:function(i){t.$set(e,"sort",i)},expression:"categoryItem.sort"}}),t._v(" "),0==e.parent_id?i("div",[t._v("请先选择分组")]):t._e()],1)]),t._v(" "),i("td",[i("div",{staticClass:"ivu-table-cell"},[i("m-upload-image",{attrs:{"default-images":[{url:e.image}]},on:{"on-success":function(e){t.syncImage(e,a)}}})],1)]),t._v(" "),i("td",[i("div",{staticClass:"ivu-table-cell"},[i("m-app-route",{attrs:{placeholder:"输入路由","default-route":e.route},on:{"on-ok":function(e){t.handleSelectRoute(e,a)}}})],1)]),t._v(" "),i("td",[i("div",{staticClass:"ivu-table-cell"},[i("i-select",{staticStyle:{width:"260px"},attrs:{filterable:"",disabled:0!=t.parent_id},on:{"on-change":function(e){t.checkSort(a,!0)}},model:{value:e.parent_id,callback:function(i){t.$set(e,"parent_id",i)},expression:"categoryItem.parent_id"}},t._l(t.categoriesOfLevel2,function(e){return i("i-option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name)+"\n                                ")])}))],1)]),t._v(" "),i("td",[i("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){t.removeCategory(a)}}},[t._v("删除")])],1)])})],2),t._v(" "),i("div",{staticStyle:{margin:"10px auto 10px 50px"}},[i("Button",{attrs:{type:"primary",icon:"ios-plus",size:"small"},on:{click:function(e){t.addCategory()}}},[t._v("添加分类\n                ")])],1)]),t._v(" "),i("Form-item",[i("i-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")]),t._v(" "),i("i-button",{attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")])],1)],1),t._v(" "),i("Modal",{attrs:{title:"搜索词"},on:{"on-ok":t.selectKeyword},model:{value:t.searchModal,callback:function(e){t.searchModal=e},expression:"searchModal"}},[i("div",[t._v("\n            类型：\n            "),i("Select",{staticStyle:{width:"150px"},on:{"on-change":t.changeKeywords},model:{value:t.keywordType,callback:function(e){t.keywordType=e},expression:"keywordType"}},[i("Option",{attrs:{value:"1"}},[t._v("品牌")]),t._v(" "),i("Option",{attrs:{value:"2"}},[t._v("品类")])],1)],1),t._v(" "),i("div",[t._v("\n            搜索词：\n            "),i("Select",{staticStyle:{width:"200px"},attrs:{filterable:"",remote:"","remote-method":t.remoteMethod,loading:t.loading},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}},t._l(t.keywordOptions,function(e,a){return i("Option",{key:e.value,attrs:{value:e.value}},[t._v("\n                "+t._s(e.label)+"\n            ")])}))],1)])],1)},staticRenderFns:[]}},xgPA:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page-edit",[i("m-category-information-level3-form",{attrs:{usage:"add",id:t.id,parent_id:t.parent_id}})],1)},staticRenderFns:[]}}});