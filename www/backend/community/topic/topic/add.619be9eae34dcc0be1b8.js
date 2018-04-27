webpackJsonp([41],{"50M6":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"padding-top":"20px"}},[i("div",{staticStyle:{"margin-bottom":"20px"}},[i("Button",{attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")])],1),t._v(" "),i("Form",{ref:"formItem",attrs:{"label-width":60,rules:t.ruleValidate}},[i("Form-item",{attrs:{label:"编辑器模式","label-width":80}},[i("i-switch",{model:{value:t.editModel,callback:function(e){t.editModel=e},expression:"editModel"}})],1),t._v(" "),"edit"===t.usage?i("Form-item",{attrs:{label:"帖子ID","label-width":80}},[i("span",[t._v(t._s(t.topic_id))])]):t._e(),t._v(" "),i("Form-item",{attrs:{label:"标题","label-width":80}},[i("i-input",{staticStyle:{width:"200px"},attrs:{placeholder:"填写帖子标题"},model:{value:t.submitData.title,callback:function(e){t.$set(t.submitData,"title",e)},expression:"submitData.title"}})],1),t._v(" "),i("Form-item",{attrs:{label:"发布者",prop:"from","label-width":80}},[i("i-select",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:"选择发表用户"},model:{value:t.submitData.uid,callback:function(e){t.$set(t.submitData,"uid",e)},expression:"submitData.uid"}},t._l(t.authors,function(e,a){return i("i-option",{key:a,attrs:{value:e.uid}},[t._v(t._s(e.user_name)+"["+t._s(e.uid)+"]")])})),t._v(" "),i("i-input",{staticStyle:{width:"200px"},attrs:{placeholder:"输入名称搜索用户"},on:{"on-change":t.findName},model:{value:t.searchName,callback:function(e){t.searchName=e},expression:"searchName"}})],1),t._v(" "),i("Form-item",{attrs:{label:"板块",prop:"push","label-width":80}},[i("i-select",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:"选择所属板块"},model:{value:t.submitData.group_id,callback:function(e){t.$set(t.submitData,"group_id",e)},expression:"submitData.group_id"}},t._l(t.cate_tree,function(e,a){return i("i-option",{key:a,attrs:{value:Number(e.group_id)}},[t._v(t._s(e.title_show))])})),t._v(" "),i("Checkbox",{model:{value:t.is_top,callback:function(e){t.is_top=e},expression:"is_top"}},[t._v("板块内置顶")])],1),t._v(" "),i("Form-item",{directives:[{name:"show",rawName:"v-show",value:t.editModel,expression:"editModel"}],attrs:{label:"内容",prop:"content","label-width":80}},[i("iframe",{attrs:{id:"singleEditor",src:"/backend/edit-index.html?id="+t.id,width:"1000",height:"600"}})]),t._v(" "),i("Form-item",{directives:[{name:"show",rawName:"v-show",value:!t.editModel,expression:"!editModel"}],attrs:{label:"内容",prop:"content","label-width":80}},[i("i-input",{staticStyle:{width:"420px"},attrs:{type:"textarea",rows:4,placeholder:"输入帖子内容"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),t.editModel?t._e():i("Form-item",{attrs:{label:"帖子图片","label-width":80}},[i("m-upload-image",{attrs:{"obj-type":t.image_types.image,"obj-id":this.$route.params.id,"default-images":t.submitData.images,multiple:!0,limit:9},on:{"on-success":t.createImageData}})],1),t._v(" "),i("Form-item",{attrs:{label:"封面图","label-width":80}},[i("m-upload-image",{attrs:{"obj-type":t.image_types.cover,"default-images":t.submitData.cover,multiple:!0,limit:9},on:{"on-success":t.createCoverData}})],1),t._v(" "),i("Form-item",{attrs:{label:"操作","label-width":80}},[i("div",[i("Checkbox",{model:{value:t.is_recommend,callback:function(e){t.is_recommend=e},expression:"is_recommend"}},[t._v("推荐")]),t._v(" "),t.show_recommend?i("DatePicker",{staticStyle:{display:"inline-block",width:"160px"},attrs:{options:t.options,type:"datetime",placeholder:"设置进入推荐区时间"},model:{value:t.recommend_time,callback:function(e){t.recommend_time=e},expression:"recommend_time"}}):t._e()],1),t._v(" "),i("div",[i("Checkbox",{model:{value:t.is_hide,callback:function(e){t.is_hide=e},expression:"is_hide"}},[t._v("隐藏")])],1),t._v(" "),i("div",[i("Checkbox",{model:{value:t.is_pgc,callback:function(e){t.is_pgc=e},expression:"is_pgc"}},[t._v("PGC")])],1)]),t._v(" "),i("Form-item",{attrs:{label:"发布来源",prop:"from","label-width":80}},[i("RadioGroup",{model:{value:t.sourceChoice,callback:function(e){t.sourceChoice=e},expression:"sourceChoice"}},t._l(t.source,function(e,a){return i("Radio",{key:a,staticClass:"edit-from-radio",attrs:{label:e.name},model:{value:e.choice,callback:function(i){t.$set(e,"choice",i)},expression:"item.choice"}})}))],1),t._v(" "),t.canEditTime?i("Form-item",{attrs:{label:"定时发布","label-width":80}},[i("div",[i("Checkbox",{model:{value:t.timing,callback:function(e){t.timing=e},expression:"timing"}},[t._v("定时")]),t._v(" "),i("DatePicker",{directives:[{name:"show",rawName:"v-show",value:t.timing,expression:"timing"}],staticStyle:{display:"inline-block",width:"160px"},attrs:{type:"datetime",placeholder:"设置进入推荐区时间"},model:{value:t.create_time,callback:function(e){t.create_time=e},expression:"create_time"}})],1)]):t._e(),t._v(" "),i("div",{staticStyle:{"margin-top":"30px"}},[i("i-button",{staticStyle:{width:"80px","margin-right":"20px"},attrs:{type:"primary"},on:{click:t.submit}},[t._v("\n                保存\n            ")]),t._v(" "),i("i-button",{staticStyle:{width:"80px"},on:{click:t.back}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}},BXN0:function(t,e,i){"use strict";i.d(e,"a",function(){return a});var a={title:[{required:!0,message:"请填写标题",trigger:"blur"}],from:[{required:!0,message:"请选择发布者",trigger:"blur"}],push:[{required:!0,message:"请选择所属板块",trigger:"blur"}],content:[{required:!0,message:"请填写内容",trigger:"blur"}]}},Gqvk:function(t,e,i){i("sBhM");var a=i("VU/8")(i("GxAh"),i("jQD6"),"data-v-e53f65bc",null);t.exports=a.exports},GxAh:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("ZTyd"),o=i.n(a);e.default={name:"add",components:{MTopicForm:o.a},data:function(){return{loadingState:!1}}}},SH8R:function(t,e,i){"use strict"},V0Vx:function(t,e,i){var a=i("sE0/");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("b865266c",a,!0)},Z5zJ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("tobl"),o={create:{api:{path:"/boss/community/topic/topic/topics"}},edit:function(t){return{api:{path:"/boss/community/topic/topic/topics/"+t,params:{base_fields:"topic_id,is_best,title,author.uid,author.user_name,edit_content,group_id,edit_covers[].s(180),is_hide,is_pgc,source,create_time,is_hot,is_recommend,recommend_time,is_top,edit_images[].s(180),edit_pattern"}}}},postEdit:function(t){return{api:{path:"/boss/community/topic/topic/topics/"+t}}},params:{api:{path:"/boss/community/topic/topic/form_params"}},postAdd:{api:{path:"/boss/community/topic/topic/topics"}}};e.default={name:"TopicForm",props:{id:{type:String,default:""},usage:{type:String,default:"edit"}},data:function(){return{image_types:{cover:"topic_cover",image:"topic"},isEdit:!1,editModel:!0,editFrom:"",canEditTime:!0,markImage:"",searchName:"",topic_id:"",is_recommend:!1,is_hide:!1,is_pgc:!1,is_top:!1,timing:!1,sourceChoice:"",recommend_time:"",show_recommend:!0,create_time:"",content:"",ruleValidate:a.a,authors:[],cate_tree:[],source:[],submitData:{title:"",uid:"",group_id:"",content:"",cover:[],is_recommend:!1,recommend_time:"",is_hide:!1,is_pgc:!1,source:"",create_time:"",edit_pattern:"",images:[]},options:{disabledDate:function(t){return t&&t.valueOf()<Date.now()-864e5}},editContent:""}},methods:{setAnthors:function(){var t=this;this.$Util.api.get(o.params,this).then(function(e){t.authors=e.data.authors,t.cate_tree=e.data.cate_tree,t.source=e.data.source,t.source.forEach(function(t){return t.choice=!1}),t.isEdit?t.getInfo():(document.getElementById("singleEditor").onload=function(){document.getElementById("singleEditor").contentWindow.editInit()},document.getElementById("singleEditor").onload()||document.getElementById("singleEditor").contentWindow.editInit())})},createImage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(t){var e=t.map(function(t){return t.s});return e.forEach(function(t){return t.url=t.url.replace(/http\:\/\/cdn3.meijiabang.cn\//g,"")}),e}},createSource:function(t){var e="";return this.source.forEach(function(i){i.choice=!1,Number(i.value)===t&&(i.choice=!0,e=i.name)}),e},getInfo:function(){var t=this;this.$Util.api.get(o.edit(this.$route.params.id),this).then(function(e){t.submitData=e.data,t.content=e.data.content,t.topic_id=e.data.topic_id,t.authors.find(function(t){return t.uid===Number(e.data.author.uid)})||t.authors.push({user_name:e.data.author.user_name,uid:Number(e.data.author.uid)}),t.submitData.uid=Number(e.data.author.uid);var i=e.data.edit_covers;t.submitData.cover=t.createImage(i||[]),t.submitData.images=t.createImage(e.data.edit_images?e.data.edit_images:[]),t.create_time=new Date(1e3*e.data.create_time),e.data.is_top?t.is_top=!0:t.is_top=!1,1===Number(e.data.is_hide)?t.is_hide=!0:t.is_hide=!1,1===Number(e.data.is_pgc)?t.is_pgc=!0:t.is_pgc=!1,t.sourceChoice=t.createSource(Number(e.data.source));var a=1e3*e.data.create_time;(new Date).getTime()<a?t.timing=!0:t.timing=!1,(new Date).getTime()<a?t.canEditTime=!0:t.canEditTime=!1,0!==e.data.recommend_time&&(t.is_recommend=!0,t.recommend_time=new Date(1e3*e.data.recommend_time),new Date(1e3*e.data.recommend_time)<(new Date).getTime()&&(t.show_recommend=!1)),e.data.content&&(t.editContent=e.data.content),1===Number(e.data.edit_pattern)||0===Number(e.data.edit_pattern)?(t.editModel=!0,document.getElementById("singleEditor").onload=function(){e.data.content&&(document.getElementById("singleEditor").contentWindow.document.getElementById("content").value=e.data.content),document.getElementById("singleEditor").contentWindow.editInit()},e.data.content&&(document.getElementById("singleEditor").contentWindow.document.getElementById("content").value=e.data.content),document.getElementById("singleEditor").contentWindow.editInit()):t.editModel=!1})},createImageData:function(t){this.submitData.images=t},createCoverData:function(t){this.submitData.cover=t},submit:function(){var t=this,e=this.source.findIndex(function(e){return e.name===t.sourceChoice});if(this.is_recommend?this.submitData.is_recommend=1:this.submitData.is_recommend=0,this.is_hide?this.submitData.is_hide=1:this.submitData.is_hide=0,this.is_pgc?this.submitData.is_pgc=1:this.submitData.is_pgc=0,this.is_top?this.submitData.is_top=1:this.submitData.is_top=0,this.editModel?this.submitData.edit_pattern=1:this.submitData.edit_pattern=2,-1===e)return void this.$Message.info("请选择发布来源");this.submitData.source=this.source[e].value,this.submitData.recommend_time=~~(new Date(this.recommend_time).getTime()/1e3),this.submitData.create_time=~~(new Date(this.create_time).getTime()/1e3),this.editModel?this.submitData.content=document.getElementById("singleEditor").contentWindow.document.getElementById("content").value:this.submitData.content=this.content;var i=this.isEdit?o.postEdit(this.$route.params.id):o.postAdd;this.$Util.api.post(i,this.submitData,this).then(function(e){0===e.error_code&&t.back()})},back:function(){var t=this.$route.query.ref;t?window.location.href=t:window.location.hash="/community/topic/topic/list"},findName:function(){var t=this,e=0;this.authors.forEach(function(i){-1!==i.user_name.indexOf(t.searchName)&&(e=i.uid)}),this.submitData.uid=e},initEdit:function(){var t=this;document.getElementById("singleEditor").onload=function(){t.editContent&&(document.getElementById("singleEditor").contentWindow.document.getElementById("content").value=t.editContent),document.getElementById("singleEditor").contentWindow.editInit()},this.editContent&&(document.getElementById("singleEditor").contentWindow.document.getElementById("content").value=this.editContent),document.getElementById("singleEditor").contentWindow.editInit()}},watch:{editModel:function(t,e){var i=this;!0===t&&!1===e&&this.$nextTick(function(){i.initEdit()})}},mounted:function(){var t=this;this.$nextTick(function(){"edit"==t.usage?t.isEdit=!0:t.isEdit=!1,t.setAnthors()})}}},ZTyd:function(t,e,i){i("V0Vx");var a=i("VU/8")(i("Z5zJ"),i("50M6"),"data-v-eb81f208",null);t.exports=a.exports},jQD6:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page-edit",{attrs:{"is-loading":t.loadingState}},[i("m-topic-form",{attrs:{usage:"add"}})],1)},staticRenderFns:[]}},nRxk:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,"",""])},sBhM:function(t,e,i){var a=i("nRxk");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("7b345ce0",a,!0)},"sE0/":function(t,e,i){e=t.exports=i(0)(),e.push([t.i,"iframe[data-v-eb81f208]{border:none}.edit-from-radio[data-v-eb81f208]{display:block}",""])},tobl:function(t,e,i){"use strict";var a=i("BXN0");i("SH8R");i.d(e,"a",function(){return a.a})}});