(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0d9b":function(e,t,n){"use strict";var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("ac4d"),n("8a81"),n("ac6a"),n("96cf");var r=i(n("3b8d")),a=i(n("2971"));n("651d");var o=i(n("b704")),c={components:{uniIcons:o.default},data:function(){return{options2:{effect:"flip",loop:!0},options3:{effect:"cube",loop:!0,cubeEffect:{shadow:!0,slideShadows:!0,shadowOffset:20,shadowScale:.94}},rows:2,column:4,iconArr:["cuIcon-same","cuIcon-deliver","cuIcon-evaluate","cuIcon-shop","cuIcon-ticket","cuIcon-cascades","cuIcon-discover","cuIcon-question","cuIcon-pic","cuIcon-filter","cuIcon-footprint","cuIcon-pulldown","cuIcon-pullup","cuIcon-moreandroid","cuIcon-refund","cuIcon-qrcode","cuIcon-remind","cuIcon-profile","cuIcon-home","cuIcon-message","cuIcon-link","cuIcon-lock","cuIcon-unlock","cuIcon-vip","cuIcon-weibo","cuIcon-activity","cuIcon-friendadd","cuIcon-friendfamous","cuIcon-friend","cuIcon-goods","cuIcon-selection"],role:"",menuList:[],swiperMenuList:[],user:{},tableName:"",swiperList:[],shujilist:[],news:[]}},computed:{baseUrl:function(){return this.$base.url}},onLoad:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(){var t,n,i,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.role=uni.getStorageSync("role"),t=uni.getStorageSync("nowTable"),e.next=4,this.$api.session(t);case 4:n=e.sent,this.user=n.data,this.tableName=t,i=a.default.list(),this.menuList=i,this.menuList.forEach((function(e,t){r.role==e.roleName&&e.frontMenu.forEach((function(e,t){e.child[0].buttons.indexOf("查看")>-1&&r.swiperMenuList.push(e)}))}));case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onShow:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(){var t,n,i,r,a,o,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=[],e.next=3,this.$api.page("config",{page:1,limit:5});case 3:for(t=e.sent,i=!0,r=!1,a=void 0,e.prev=7,o=t.data.list[Symbol.iterator]();!(i=(c=o.next()).done);i=!0)u=c.value,u.name.indexOf("picture")>=0&&u.value&&""!=u.value&&null!=u.value&&n.push({img:u.value,title:u.name});e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](7),r=!0,a=e.t0;case 15:e.prev=15,e.prev=16,i||null==o.return||o.return();case 18:if(e.prev=18,!r){e.next=21;break}throw a;case 21:return e.finish(18);case 22:return e.finish(15);case 23:if(n&&(this.swiperList=n),null===uni.getStorageSync("userid")){e.next=30;break}return e.next=27,this.$api.recommend2("shuji",{page:1,limit:4});case 27:t=e.sent,e.next=33;break;case 30:return e.next=32,this.$api.recommend("shuji",{page:1,limit:4});case 32:t=e.sent;case 33:this.shujilist=t.data.list;case 34:case"end":return e.stop()}}),e,this,[[7,11,15,23],[16,,18,22]])})));function t(){return e.apply(this,arguments)}return t}(),methods:{onSwiperTap:function(e){},onNewsDetailTap:function(e){this.$utils.jump("../news-detail/news-detail?id=".concat(e))},onDetailTap:function(e,t){this.$utils.jump("../".concat(e,"/detail?id=").concat(t))},onPageTap:function(e){uni.navigateTo({url:"../".concat(e,"/list"),fail:function(){uni.switchTab({url:"../".concat(e,"/list")})}})},onPageTap2:function(e){uni.setStorageSync("useridTag",0),uni.navigateTo({url:e,fail:function(){uni.switchTab({url:e})}})}}};t.default=c},"2ef2":function(e,t,n){var i=n("cee7");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var r=n("4f06").default;r("15b1ba62",i,!0,{sourceMap:!1,shadowMode:!1})},8069:function(e,t,n){"use strict";n.r(t);var i=n("0d9b"),r=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=r.a},cee7:function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-d43fa3b6]{min-height:calc(100vh - 44px);box-sizing:border-box}',""]),e.exports=t},dc94:function(e,t,n){"use strict";var i,r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{style:{width:"100%",padding:"0 0 0px",background:"url() fixed,#ffffff",height:"auto"}},[n("v-uni-swiper",{staticClass:"swiper",style:{padding:"0px 0 0px ",boxShadow:"inset 0px 0px 0px 0px #f4ead8",borderColor:"#87acf1",outline:"0px solid #bbb",margin:"0 auto 24rpx",borderRadius:"0",background:"rgba(255,255,255,1)",borderWidth:"0 12rpx 2rpx 12rpx",width:"calc(100% - 40rpx)",borderStyle:"solid",height:"396rpx"},attrs:{"indicator-dots":!1,autoplay:!0,circular:!1,"indicator-active-color":"#000000","indicator-color":"rgba(0, 0, 0, .3)",duration:500,interval:5e3,vertical:!1}},e._l(e.swiperList,(function(t,i){return n("v-uni-swiper-item",{key:i,style:{width:"calc(100% - 0px)",margin:"0 auto",position:"relative",borderRadius:"24rpx",background:"none",height:"360rpx"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.onSwiperTap(t)}}},[n("v-uni-image",{style:{width:"calc(100% - 40rpx)",margin:"16rpx auto",objectFit:"cover",borderRadius:"24rpx",display:"block",height:"360rpx"},attrs:{mode:"aspectFill",src:e.baseUrl+t.img}}),e._e()],1)})),1),n("v-uni-view",{staticClass:"menu",style:{padding:"20rpx 0 20rpx",boxShadow:"inset 0px 0px 112rpx 0px #87acf1",margin:"24rpx auto 60rpx",borderColor:"#87acf1",display:"flex",outline:"0px solid #ccc",borderRadius:"20%",flexWrap:"wrap",background:"rgba(255,255,255,1)",borderWidth:"2rpx 16rpx 2rpx 16rpx",width:"calc(100% - 40rpx)",borderStyle:"solid",height:"auto"}},[e._l(e.menuList,(function(t){return[e._l(t.frontMenu,(function(i,r){return e.role==t.roleName?[e._l(i.child,(function(t,i){return[e._l(t.buttons,(function(i,r){return["查看"==i&&"yifahuodingdan"!=t.tableName&&"yituikuandingdan"!=t.tableName&&"yiquxiaodingdan"!=t.tableName&&"weizhifudingdan"!=t.tableName&&"yizhifudingdan"!=t.tableName&&"yiwanchengdingdan"!=t.tableName?n("v-uni-view",{key:r+"_0",staticClass:"menu-list",style:{width:"25%",padding:"12rpx 0",margin:"10rpx 0",height:"auto"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.onPageTap2("../"+t.tableName+"/list")}}},[n("v-uni-view",{staticClass:"iconarr",class:t.appFrontIcon,style:{padding:"0",margin:"0px auto",color:"#333",borderRadius:"100%",background:"none",display:"block",width:"64rpx",lineHeight:"64rpx",fontSize:"64rpx",height:"64rpx"}}),n("v-uni-view",{style:{padding:"0",margin:"12rpx auto 0",color:"#333",textAlign:"center",width:"100%",lineHeight:"28rpx",fontSize:"28rpx"}},[e._v(e._s(t.menu.split("列表")[0]))])],1):e._e()]}))]}))]:e._e()}))]}))],2),n("v-uni-view",{staticClass:"listBox recommend"},[e._e(),n("v-uni-view",{staticClass:"title",style:{padding:"0px 0",boxShadow:"0px 0px 0px rgba(0,0,0,.1)",margin:"80rpx auto 40rpx",overflow:"hidden",borderRadius:"0",background:"#9cb7e9",width:"calc(100% - 40rpx)",lineHeight:"80rpx",height:"80rpx"}},[n("v-uni-view",{style:{padding:"0 48rpx",boxShadow:"0px 0px 0px rgba(0,0,0,.2)",margin:"0",color:"#fff",borderRadius:"0",background:"url(http://codegen.caihongy.cn/20221221/6e35fb6d0812410dbf9f5d813dcf1ce2.png) no-repeat right top / auto 100%,#5489ed",display:"inline-block",width:"auto",fontSize:"32rpx",lineHeight:"80rpx",minWidth:"240rpx",height:"80rpx"}},[e._v("书籍推荐")])],1),e._e(),n("v-uni-view",{staticClass:"list-box style5"},[n("v-uni-swiper",{staticClass:"swiper",style:{width:"calc(100% - 48rpx)",background:"none",height:"360rpx"},attrs:{"indicator-dots":!1,autoplay:!0,circular:!1,"indicator-active-color":"#000000","indicator-color":"rgba(0, 0, 0, .3)",duration:500,interval:5e3,vertical:!1}},e._l(e.shujilist,(function(t,i){return n("v-uni-swiper-item",{key:i,style:{width:"100%",borderRadius:"24rpx",background:"none",height:"360rpx"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.onDetailTap("shuji",t.id)}}},[e._e(),"http"==t.tupian.substring(0,4)?n("v-uni-image",{staticClass:"list-item-image",style:{width:"100%",objectFit:"cover",borderRadius:"24rpx",display:"block",height:"360rpx"},attrs:{mode:"aspectFill",src:t.tupian}}):n("v-uni-image",{staticClass:"list-item-image",style:{width:"100%",objectFit:"cover",borderRadius:"24rpx",display:"block",height:"360rpx"},attrs:{mode:"aspectFill",src:t.tupian?e.baseUrl+t.tupian.split(",")[0]:""}}),e._e(),e._e()],1)})),1)],1),e._e()],1)],1)],1)},a=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}))},e402:function(e,t,n){"use strict";var i=n("2ef2"),r=n.n(i);r.a},f75a:function(e,t,n){"use strict";n.r(t);var i=n("dc94"),r=n("8069");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("e402");var o,c=n("f0c5"),u=Object(c["a"])(r["default"],i["b"],i["c"],!1,null,"d43fa3b6",null,!1,i["a"],o);t["default"]=u.exports}}]);