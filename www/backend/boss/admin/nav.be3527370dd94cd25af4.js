webpackJsonp([185],{"6ztx":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=document.body.clientWidth,a=document.body.clientHeight;e.default={name:"nav",data:function(){return{src:"",iframeStyle:{width:"",height:""},leftStyle:{width:"",height:""},navigation:[],sideBar:[],adminName:"个人中心",allSideBar:{},openNames:[],menuActive:0,sideActive:"0-0"}},methods:{loadFrame:function(t){new RegExp("^.*boss/admin/login.*$").test(t.main.location.href)&&(this.$Notice.info({title:"登陆已过期",desc:"即将跳转登录...."}),window.location.hash="/boss/admin/login")},clickMenu:function(t){var e=this.allSideBar;for(var i in e)if(t===i){this.sideBar=this.allSideBar[i].children;break}var n=this.sideBar[0].children[0].route;this.toRoute(n),this.setOpenNames(),this.sideActive="0-1",this.$nextTick(function(){this.$refs.sideMenu.updateOpened(),this.$refs.sideMenu.updateActiveName()})},toRoute:function(t,e,i){i&&(i.metaKey||i.ctrlKey||i.shiftKey)&&window.open("//"+document.domain+t),this.sideActive=e||"0-1",(document.main||window.frames[0]).document.location.reload(),document.querySelector("iframe").contentWindow.location.href=t,/firefox/gi.test(navigator.userAgent)},changePassword:function(){this.toRoute("/admin.php?m=Admin&c=Index&a=password")},loginOut:function(){window.location.href="//"+document.domain+"/boss/backend/admin/logout"},setOpenNames:function(){for(var t=0,e=this.sideBar.length;t<e;t++)this.openNames.push(t)},setIframeAndSideStyle:function(t,e){this.iframeStyle={width:t-200+"px",height:e-50+"px"},this.leftStyle={width:"200px",height:e-50+"px"}}},created:function(){var t=this;this.setIframeAndSideStyle(n,a),this.$Util.api.get({api:{path:"/boss/backend/admin/sidebar/info"},exceptionHandle:function(t){20001==t&&(location.hash="/boss/admin/login")}},this).then(function(t){this.adminName=t.data.user,this.navigation=t.data.navigation,this.allSideBar=t.data.sidebar,this.sideBar=this.allSideBar.share.children,this.menuActive=1,this.sideActive="0-1",this.setOpenNames(),this.$nextTick(function(){this.$refs.sideMenu.updateOpened(),this.$refs.sideMenu.updateActiveName(),this.$refs.navMenu.updateActiveName()});var e=this.sideBar[0].children[0].route;this.toRoute(e)}),this.$nextTick(function(){window.onresize=function(){clearTimeout(window.timer),window.timer=setTimeout(function(){t.setIframeAndSideStyle(document.body.clientWidth,document.body.clientHeight)},200)}})}}},"8sah":function(t,e,i){i("z4d3");var n=i("VU/8")(i("6ztx"),i("yuMl"),null,null);t.exports=n.exports},e3Ld:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".layout-content:after,.layout-nav:after{content:'';display:block;clear:both}body{padding:0!important}.layout{background:#f5f7f9}.layout-logo{width:185px;height:30px;float:left;position:relative;top:-5px;left:20px;color:#666;font-size:20px}.layout-nav{margin-left:200px}.layout-user{position:absolute;right:20px;top:0}.layout-content{overflow:hidden;background:#fff;position:relative}.left{float:left;left:0;overflow-y:auto;background-color:#464c5b}.right{float:left;height:100%}.layout-content-main{height:100%;width:100%;position:absolute}.layout-copy{text-align:center;padding:10px 0 20px;color:#9ea7b4}.ivu-col{margin-left:0}.ivu-menu-horizontal{height:auto;min-height:50px}.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,.ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu{height:50px;line-height:50px}.ivu-menu-vertical .ivu-menu-item,.ivu-menu-vertical .ivu-menu-submenu-title{padding:8px 20px}.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{padding-left:30px}",""])},yuMl:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page",[i("div",{staticClass:"layout"},[i("Menu",{ref:"navMenu",attrs:{mode:"horizontal",theme:"light","active-name":t.menuActive}},[i("div",{staticClass:"layout-logo"},[t._v("\n                牧云BOSS系统\n\n\n            ")]),t._v(" "),i("div",{staticClass:"layout-nav"},t._l(t.navigation,function(e,n){return i("Menu-item",{attrs:{name:n+1},nativeOn:{click:function(i){t.clickMenu(e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n\n\n                ")])})),t._v(" "),i("div",{staticClass:"layout-user"},[i("MSubmenu",{attrs:{name:"15"}},[i("template",{slot:"title"},[i("Icon",{attrs:{type:"person"}}),t._v("\n                        "+t._s(t.adminName)+"\n\n                    ")],1),t._v(" "),i("Menu-item",{attrs:{name:"15-1"},nativeOn:{click:function(e){return t.changePassword(e)}}},[t._v("修改密码")]),t._v(" "),i("Menu-item",{attrs:{name:"15-2"},nativeOn:{click:function(e){return t.loginOut(e)}}},[t._v("退出")])],2)],1)]),t._v(" "),i("div",{staticClass:"layout-content"},[i("div",{staticClass:"left",style:t.leftStyle},[i("Menu",{ref:"sideMenu",attrs:{"active-name":t.sideActive,width:"auto","open-names":t.openNames,theme:"dark"}},t._l(t.sideBar,function(e,n){return i("Submenu",{attrs:{name:n}},[i("template",{slot:"title"},[t._v("\n                            "+t._s(e.name)+"\n\n\n                        ")]),t._v(" "),t._l(e.children,function(e,a){return i("Menu-item",{attrs:{name:n+"-"+(a+1)},nativeOn:{click:function(i){t.toRoute(e.route,n+"-"+(a+1),i)}}},[i("div",[t._v(t._s(e.name))])])})],2)}))],1),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"layout-content-main"},[i("iframe",{style:t.iframeStyle,attrs:{src:t.src,frameborder:"0",name:"main"},on:{load:function(e){t.loadFrame(this)}}})])])])],1)])},staticRenderFns:[]}},z4d3:function(t,e,i){var n=i("e3Ld");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("d130aa66",n,!0)}});