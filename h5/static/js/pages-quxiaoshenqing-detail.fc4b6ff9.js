(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-quxiaoshenqing-detail"],{"0223":function(t,i,e){var r=e("24fb");i=r(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-40fe907e]{min-height:calc(100vh - 44px);box-sizing:border-box}.seat-list[data-v-40fe907e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;background:#fff;margin:%?20?%;border-radius:%?20?%;padding:%?20?%;font-size:%?30?%}.seat-list .seat-item[data-v-40fe907e]{width:33.33%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-bottom:%?20?%}.seat-list .seat-item .seat-icon[data-v-40fe907e]{width:%?50?%;height:%?50?%;margin-bottom:%?10?%}uni-audio[data-v-40fe907e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.audio[data-v-40fe907e] .uni-audio-default{width:inherit}',""]),t.exports=i},"59c5":function(t,i,e){"use strict";var r=e("79f0"),n=e.n(r);n.a},"79f0":function(t,i,e){var r=e("0223");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=e("4f06").default;n("4b4741be",r,!0,{sourceMap:!1,shadowMode:!1})},"9f763":function(t,i,e){"use strict";e.r(i);var r=e("c201"),n=e("f518");for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);e("59c5");var o,d=e("f0c5"),s=Object(d["a"])(n["default"],r["b"],r["c"],!1,null,"40fe907e",null,!1,r["a"],o);i["default"]=s.exports},a353:function(t,i,e){"use strict";var r=e("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("28a5"),e("f559"),e("55dd"),e("96cf");var n=r(e("3b8d")),a={data:function(){return{btnColor:["#409eff","#67c23a","#909399","#e6a23c","#f56c6c","#356c6c","#351c6c","#f093a9","#a7c23a","#104eff","#10441f","#a21233","#503319"],id:"",userid:"",detail:{},swiperList:[],commentList:[],mescroll:null,downOption:{auto:!1},upOption:{noMoreSize:3,textNoMore:"~ 没有更多了 ~"},hasNext:!0,user:{},sfshIndex:-1,sfshOptions:["通过","不通过","待审核"],count:0,timer:null}},computed:{baseUrl:function(){return this.$base.url}},onLoad:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.id=i.id,i.userid&&(this.userid=i.userid),this.init();case 3:case"end":return t.stop()}}),t,this)})));function i(i){return t.apply(this,arguments)}return i}(),onUnload:function(){this.timer&&clearInterval(this.timer)},onShow:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(i){var e,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=uni.getStorageSync("nowTable"),t.next=3,this.$api.session(e);case 3:if(r=t.sent,this.user=r.data,this.btnColor=this.btnColor.sort((function(){return.5-Math.random()})),n=uni.getStorageSync("crossCleanType"),!n){t.next=13;break}return uni.removeStorageSync("crossCleanType"),t.next=11,this.$api.info("quxiaoshenqing",this.id);case 11:r=t.sent,this.detail=r.data;case 13:case"end":return t.stop()}}),t,this)})));function i(i){return t.apply(this,arguments)}return i}(),destroyed:function(){},methods:{onPayTap:function(){uni.setStorageSync("paytable","quxiaoshenqing"),uni.setStorageSync("payObject",this.detail),this.$utils.jump("../pay-confirm/pay-confirm?type=1")},onDetailTap:function(t){uni.setStorageSync("useridTag",this.userid),this.$utils.jump("./detail?id=".concat(t.id,"&userid=")+this.userid)},onAcrossTap:function(t,i,e,r,n){if("是"!=i||"是"==this.detail.sfsh){if(uni.setStorageSync("crossTable","quxiaoshenqing"),uni.setStorageSync("crossObj",this.detail),uni.setStorageSync("statusColumnName",e),uni.setStorageSync("statusColumnValue",n),uni.setStorageSync("tips",r),""!=e&&!e.startsWith("[")){var a=uni.getStorageSync("crossObj");for(var o in a)if(o==e&&a[o]==n)return void this.$utils.msg(r)}this.$utils.jump("../".concat(t,"/add-or-update?cross=true"))}else this.$utils.msg("请审核通过后再操作")},init:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.timer&&clearInterval(this.timer),t.next=3,this.$api.info("quxiaoshenqing",this.id);case 3:i=t.sent,this.detail=i.data,this.swiperList=this.detail.huodongfengmian?this.detail.huodongfengmian.split(","):[];case 6:case"end":return t.stop()}}),t,this)})));function i(){return t.apply(this,arguments)}return i}(),mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.hasNext=!0,t.resetUpScroll()},upCallback:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i.endSuccess(i.size,this.hasNext);case 1:case"end":return t.stop()}}),t,this)})));function i(i){return t.apply(this,arguments)}return i}(),onChatTap:function(){this.$utils.jump("../chat/chat")},download:function(t){var i=this;t=i.$base.url+t,uni.downloadFile({url:t,success:function(e){200===e.statusCode&&(i.$utils.msg("下载成功"),window.open(t))}})},onCartTabTap:function(){this.$utils.tab("../shop-cart/shop-cart")},onCommentTap:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.$utils.jump("../discussquxiaoshenqing/add-or-update?refid=".concat(this.id));case 1:case"end":return t.stop()}}),t,this)})));function i(){return t.apply(this,arguments)}return i}(),onSHTap:function(){this.$refs.popup.open()},onFinishTap:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.detail.sfsh){t.next=3;break}return this.$utils.msg("请选择审核状态"),t.abrupt("return");case 3:if(this.detail.shhf){t.next=6;break}return this.$utils.msg("请填写审核回复"),t.abrupt("return");case 6:return"通过"==this.detail.sfsh&&(this.detail.sfsh="是"),"不通过"==this.detail.sfsh&&(this.detail.sfsh="否"),"待审核"==this.detail.sfsh&&(this.detail.sfsh="待审核"),t.next=11,this.$api.update("quxiaoshenqing",this.detail);case 11:this.$utils.msg("审核成功"),this.$refs.popup.close();case 13:case"end":return t.stop()}}),t,this)})));function i(){return t.apply(this,arguments)}return i}(),onCloseWinTap:function(){this.$refs.popup.close()},sfshChange:function(t){console.log(this.detail),this.sfshIndex=t.target.value,this.detail.sfsh=this.sfshOptions[this.sfshIndex]}}};i.default=a},c201:function(t,i,e){"use strict";var r={"mescroll-uni":e("f05e").default,"uni-popup":e("1c89").default},n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("mescroll-uni",{attrs:{up:t.upOption,down:t.downOption},on:{init:function(i){arguments[0]=i=t.$handleEvent(i),t.mescrollInit.apply(void 0,arguments)},down:function(i){arguments[0]=i=t.$handleEvent(i),t.downCallback.apply(void 0,arguments)},up:function(i){arguments[0]=i=t.$handleEvent(i),t.upCallback.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"container",style:{minHeight:"100vh",width:"100%",padding:"0px 0 132rpx",position:"relative",background:"url() fixed,#fff",height:"auto"}},[e("v-uni-swiper",{staticClass:"swiper",style:{border:"0px dotted #f7de91",boxShadow:"inset 0px 0px 0px 0px #f4ead8",padding:"0px 0 0px ",margin:"0 auto",borderColor:"#87acf1",borderRadius:"0",background:"rgba(255,255,255,1)",borderWidth:"0 12rpx 2rpx 12rpx",width:"calc(100% - 40rpx)",borderStyle:"solid",height:"396rpx"},attrs:{"indicator-dots":!1,autoplay:!0,circular:!1,"indicator-active-color":"#000000","indicator-color":"rgba(0, 0, 0, .3)",duration:500,interval:5e3,vertical:!1}},t._l(t.swiperList,(function(i,r){return e("v-uni-swiper-item",{key:r,style:{width:"100%",borderRadius:"0px 0px 10% 10%",background:"none",height:"360rpx"}},["http"==i.substring(0,4)?e("v-uni-image",{style:{width:"calc(100% - 40rpx)",margin:"16rpx auto",objectFit:"cover",borderRadius:"24rpx",display:"block",height:"360rpx"},attrs:{mode:"aspectFill",src:i}}):e("v-uni-image",{style:{width:"calc(100% - 40rpx)",margin:"16rpx auto",objectFit:"cover",borderRadius:"24rpx",display:"block",height:"360rpx"},attrs:{mode:"aspectFill",src:t.baseUrl+i}})],1)})),1),e("v-uni-view",{staticClass:"detail-content",style:{padding:"0px 24rpx 24rpx",flexWrap:"wrap",background:"none",display:"flex",width:"100%",justifyContent:"space-between",height:"auto"}},[e("v-uni-view",{staticClass:"detail-list-item title",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("活动名称：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.huodongmingcheng))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("活动编号：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.huodongbianhao))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("活动时间：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.huodongshijian))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("活动备注：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.huodongbeizhu))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("活动地点：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.huodongdidian))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("截止日期：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.jiezhiriqi))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("账号：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.zhanghao))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("姓名：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.xingming))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("联系方式：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.lianxifangshi))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("报名时间：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.baomingshijian))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("取消原因：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.quxiaoyuanyin))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("取消时间：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.quxiaoshijian))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("家长账号：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.jiazhangzhanghao))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("家长姓名：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.jiazhangxingming))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("学生姓名：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.xueshengxingming))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("学生性别：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.xueshengxingbie))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("年龄：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.nianling))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("年级：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.nianji))])],1),e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("手机：")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.shouji))])],1),t.userid?e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("审核状态：")]),"是"==t.detail.sfsh?e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v("通过")]):t._e(),"否"==t.detail.sfsh?e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v("不通过")]):t._e(),"待审核"==t.detail.sfsh?e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v("待审核")]):t._e()],1):t._e(),t.userid?e("v-uni-view",{staticClass:"detail-list-item",style:{boxShadow:"inset 0px 0px 0px 0px #f9edd9",padding:"0 0 8rpx",margin:"20rpx 0 20rpx 0",borderColor:"#e9be70",borderRadius:"0",borderWidth:"0px 0px 0px",background:"url(http://codegen.caihongy.cn/20221221/c8ff0c9649f9472e926677fcfdbbdd44.png) repeat-x left bottom,#d7eff8",display:"flex",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"lable",style:{padding:"0 20rpx 0 0",color:"#333",textAlign:"right",width:"auto",lineHeight:"80rpx",fontSize:"28rpx",minWidth:"188rpx"}},[t._v("审核回复")]),e("v-uni-view",{staticClass:"text",style:{padding:"0px 20rpx 20rpx 0",margin:"16rpx 0 0",lineHeight:"48rpx",fontSize:"28rpx",color:"rgb(0, 0, 0)"}},[t._v(t._s(t.detail.shhf))])],1):t._e(),e("v-uni-view",{staticClass:"bottom-content bg-white tabbar border shop",style:{width:"100%",padding:"20rpx 0px",flexWrap:"wrap",background:"none",display:"flex",height:"auto"}},[t.userid&&t.isAuth("quxiaoshenqing","审核")?e("v-uni-button",{style:{border:"0",padding:"0 20rpx",margin:"0",color:"rgb(255, 255, 255)",background:"rgb(255, 170, 51)",width:"auto",fontSize:"28rpx",height:"80rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSHTap.apply(void 0,arguments)}}},[t._v("审核")]):t._e(),!t.userid&&t.isAuthFront("quxiaoshenqing","审核")?e("v-uni-button",{style:{border:"0",padding:"0 20rpx",margin:"0",color:"rgb(255, 255, 255)",background:"rgb(255, 170, 51)",width:"auto",fontSize:"28rpx",height:"80rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSHTap.apply(void 0,arguments)}}},[t._v("审核")]):t._e()],1)],1),e("uni-popup",{ref:"popup",staticClass:"popup-content",attrs:{type:"center"}},[e("v-uni-form",{staticClass:"popup-form",staticStyle:{background:"#fff",width:"300px",display:"block","border-radius":"10px",padding:"20px","text-align":"center"}},[e("v-uni-view",{staticClass:" margin-top"},[e("v-uni-picker",{attrs:{value:t.sfshIndex,range:t.sfshOptions},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.sfshChange.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.detail.sfsh?t.detail.sfsh:"选择审核结果"))])],1)],1),e("v-uni-view",{},[e("v-uni-textarea",{staticStyle:{width:"200px"},attrs:{placeholder:"审核回复"},model:{value:t.detail.shhf,callback:function(i){t.$set(t.detail,"shhf",i)},expression:"detail.shhf"}})],1),e("v-uni-view",{staticClass:"btn-content"},[e("v-uni-button",{staticClass:"cu-btn bg-cyan",staticStyle:{margin:"0 10px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onCloseWinTap.apply(void 0,arguments)}}},[t._v("取消")]),e("v-uni-button",{staticClass:"cu-btn bg-red",staticStyle:{margin:"0 10px"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onFinishTap.apply(void 0,arguments)}}},[t._v("确认")])],1)],1)],1)],1)],1)],1)],1)},a=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return r}))},f518:function(t,i,e){"use strict";e.r(i);var r=e("a353"),n=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(i,t,(function(){return r[t]}))}(a);i["default"]=n.a}}]);