webpackJsonp([3],{544:function(e,t,n){function i(e){n(582)}var o=n(8)(n(562),n(594),i,"data-v-3dfc9a08",null);e.exports=o.exports},556:function(e,t,n){"use strict";function i(){var e=A()({},l.b,{platform:"h5",uin:0,needNewCode:1});return n.i(c.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",e,l.c)}function o(){var e=A()({},l.b,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return f.a.get("/api/getDistList",{params:e}).then(function(e){return d.a.resolve(e.data)})}function s(e){var t=A()({},l.b,{disstid:e,type:1,json:1,utf8:1,onlysong:0,hostUin:0,playform:"yqq",needNewCode:0,g_tk:67232076});return n.i(c.a)("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",t,l.c)}t.b=i,t.c=o,t.a=s;var r=n(83),d=n.n(r),a=n(82),A=n.n(a),c=n(185),l=n(62),m=n(188),f=n.n(m)},559:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(191),o=n.n(i),s=n(122);t.default={name:"slider",props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3}},data:function(){return{dots:[],currentPageIndex:0}},mounted:function(){var e=this;setTimeout(function(){e._setSlideWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play(),window.addEventListener("resize",function(){e.slider&&(e._setSlideWidth(!0),e.slider.refresh())})},20)},methods:{_setSlideWidth:function(e){this.children=this.$refs.slideGroup.children;for(var t=0,i=this.$el.clientWidth,o=0;o<this.children.length;o++){var r=this.children[o];n.i(s.c)(r,"slider-item"),r.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.slideGroup.style.width=t+"px"},_initSlider:function(){var e=this;this.slider=new o.a(this.$el,{scrollX:!0,scrollY:!1,momentum:!1,snap:!0,snapLoop:this.loop,snapThreshold:.3,snapSpeed:400,click:!0}),this.slider.on("scrollEnd",function(){var t=e.slider.getCurrentPage().pageX;e.loop&&(t-=1),e.currentPageIndex=t,e.autoPlay&&(clearTimeout(e.timer),e._play())})},_initDots:function(){this.dots=new Array(this.children.length)},_play:function(){var e=this,t=this.currentPageIndex+1;this.loop&&(t+=1),this.timer=setTimeout(function(){e.slider.goToPage(t,0,400)},this.interval)}},destroyed:function(){clearTimeout(this.timer)}}},562:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(54),o=n.n(i),s=n(556),r=n(62),d=n(81),a=n(589),A=n.n(a),c=n(63),l=n.n(c),m=n(186),f=n.n(m),p=n(45);t.default={name:"recommend",mixins:[d.c],created:function(){this._getCommend(),this._getDistList()},data:function(){return{recommends:[],discList:[]}},methods:o()({handlePlaylist:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()},_getCommend:function(){var e=this;n.i(s.b)().then(function(t){t.code===r.a&&(e.recommends=t.data.slider)})},_getDistList:function(){var e=this;n.i(s.c)().then(function(t){t.code===r.a&&(e.discList=t.data.list)})},loadImg:function(){this.checkLoaded||(this.$refs.scroll.refresh(),this.checkLoaded=!0)},selectItem:function(e){this.$router.push({path:"/recommend/"+e.dissid}),this.setDisc(e)}},n.i(p.b)({setDisc:"SET_DISC"})),components:{Slider:A.a,Scroll:l.a,Loading:f.a}}},572:function(e,t,n){t=e.exports=n(540)(!0),t.push([e.i,".recommend[data-v-3dfc9a08]{position:fixed;width:100%;top:88px;bottom:0}.recommend .recommend-content[data-v-3dfc9a08]{height:100%;overflow:hidden}.recommend .recommend-content .slider-wrapper[data-v-3dfc9a08]{position:relative;width:100%;overflow:hidden}.recommend .recommend-list .list-title[data-v-3dfc9a08]{height:65px;line-height:65px;text-align:center;font-size:14px;color:#ffcd32}.recommend .recommend-list .item[data-v-3dfc9a08]{display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 20px 20px}.recommend .recommend-list .item .icon[data-v-3dfc9a08]{-webkit-box-flex:0;-ms-flex:0 0 60px;flex:0 0 60px;width:60px;padding-right:20px}.recommend .recommend-list .item .text[data-v-3dfc9a08]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:20px;overflow:hidden;font-size:14px}.recommend .recommend-list .item .text .name[data-v-3dfc9a08]{margin-bottom:10px;color:#fff}.recommend .recommend-list .item .text .desc[data-v-3dfc9a08]{color:hsla(0,0%,100%,.3)}.recommend .loading-container[data-v-3dfc9a08]{position:absolute;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["C:/Users/Administrator/Desktop/en/work/practice/imooc-vue-music/src/components/recommend/recommend.vue"],names:[],mappings:"AACA,4BACE,eAAgB,AAChB,WAAY,AACZ,SAAU,AACV,QAAU,CACX,AACD,+CACI,YAAa,AACb,eAAiB,CACpB,AACD,+DACM,kBAAmB,AACnB,WAAY,AACZ,eAAiB,CACtB,AACD,wDACI,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CAClB,AACD,kDACI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACvB,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,mBAA0B,CAC7B,AACD,wDACM,mBAAoB,AAChB,kBAAmB,AACf,cAAe,AACvB,WAAY,AACZ,kBAAoB,CACzB,AACD,wDACM,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,iBAAkB,AAClB,gBAAiB,AACjB,cAAgB,CACrB,AACD,8DACQ,mBAAoB,AACpB,UAAY,CACnB,AACD,8DACQ,wBAAgC,CACvC,AACD,+CACI,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACvC",file:"recommend.vue",sourcesContent:["\n.recommend[data-v-3dfc9a08] {\n  position: fixed;\n  width: 100%;\n  top: 88px;\n  bottom: 0;\n}\n.recommend .recommend-content[data-v-3dfc9a08] {\n    height: 100%;\n    overflow: hidden;\n}\n.recommend .recommend-content .slider-wrapper[data-v-3dfc9a08] {\n      position: relative;\n      width: 100%;\n      overflow: hidden;\n}\n.recommend .recommend-list .list-title[data-v-3dfc9a08] {\n    height: 65px;\n    line-height: 65px;\n    text-align: center;\n    font-size: 14px;\n    color: #ffcd32;\n}\n.recommend .recommend-list .item[data-v-3dfc9a08] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    box-sizing: border-box;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 0 20px 20px 20px;\n}\n.recommend .recommend-list .item .icon[data-v-3dfc9a08] {\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 60px;\n              flex: 0 0 60px;\n      width: 60px;\n      padding-right: 20px;\n}\n.recommend .recommend-list .item .text[data-v-3dfc9a08] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      line-height: 20px;\n      overflow: hidden;\n      font-size: 14px;\n}\n.recommend .recommend-list .item .text .name[data-v-3dfc9a08] {\n        margin-bottom: 10px;\n        color: #fff;\n}\n.recommend .recommend-list .item .text .desc[data-v-3dfc9a08] {\n        color: rgba(255, 255, 255, 0.3);\n}\n.recommend .loading-container[data-v-3dfc9a08] {\n    position: absolute;\n    width: 100%;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n"],sourceRoot:""}])},575:function(e,t,n){t=e.exports=n(540)(!0),t.push([e.i,".slider[data-v-819ecc2e]{min-height:1px}.slider .slider-group[data-v-819ecc2e]{position:relative;overflow:hidden;white-space:nowrap}.slider .slider-group .slider-item[data-v-819ecc2e]{float:left;box-sizing:border-box;overflow:hidden;text-align:center}.slider .slider-group .slider-item a[data-v-819ecc2e]{display:block;width:100%;overflow:hidden;text-decoration:none}.slider .slider-group .slider-item img[data-v-819ecc2e]{display:block;width:100%}.slider .dots[data-v-819ecc2e]{position:absolute;right:0;left:0;bottom:12px;text-align:center;font-size:0}.slider .dots .dot[data-v-819ecc2e]{display:inline-block;margin:0 4px;width:8px;height:8px;border-radius:50%;background:hsla(0,0%,100%,.5)}.slider .dots .dot.active[data-v-819ecc2e]{width:20px;border-radius:5px;background:hsla(0,0%,100%,.8)}","",{version:3,sources:["C:/Users/Administrator/Desktop/en/work/practice/imooc-vue-music/src/base/slider/slider.vue"],names:[],mappings:"AACA,yBACE,cAAgB,CACjB,AACD,uCACI,kBAAmB,AACnB,gBAAiB,AACjB,kBAAoB,CACvB,AACD,oDACM,WAAY,AACZ,sBAAuB,AACvB,gBAAiB,AACjB,iBAAmB,CACxB,AACD,sDACQ,cAAe,AACf,WAAY,AACZ,gBAAiB,AACjB,oBAAsB,CAC7B,AACD,wDACQ,cAAe,AACf,UAAY,CACnB,AACD,+BACI,kBAAmB,AACnB,QAAS,AACT,OAAQ,AACR,YAAa,AACb,kBAAmB,AACnB,WAAa,CAChB,AACD,oCACM,qBAAsB,AACtB,aAAc,AACd,UAAW,AACX,WAAY,AACZ,kBAAmB,AACnB,6BAAqC,CAC1C,AACD,2CACQ,WAAY,AACZ,kBAAmB,AACnB,6BAAqC,CAC5C",file:"slider.vue",sourcesContent:["\n.slider[data-v-819ecc2e] {\n  min-height: 1px;\n}\n.slider .slider-group[data-v-819ecc2e] {\n    position: relative;\n    overflow: hidden;\n    white-space: nowrap;\n}\n.slider .slider-group .slider-item[data-v-819ecc2e] {\n      float: left;\n      box-sizing: border-box;\n      overflow: hidden;\n      text-align: center;\n}\n.slider .slider-group .slider-item a[data-v-819ecc2e] {\n        display: block;\n        width: 100%;\n        overflow: hidden;\n        text-decoration: none;\n}\n.slider .slider-group .slider-item img[data-v-819ecc2e] {\n        display: block;\n        width: 100%;\n}\n.slider .dots[data-v-819ecc2e] {\n    position: absolute;\n    right: 0;\n    left: 0;\n    bottom: 12px;\n    text-align: center;\n    font-size: 0;\n}\n.slider .dots .dot[data-v-819ecc2e] {\n      display: inline-block;\n      margin: 0 4px;\n      width: 8px;\n      height: 8px;\n      border-radius: 50%;\n      background: rgba(255, 255, 255, 0.5);\n}\n.slider .dots .dot.active[data-v-819ecc2e] {\n        width: 20px;\n        border-radius: 5px;\n        background: rgba(255, 255, 255, 0.8);\n}\n"],sourceRoot:""}])},582:function(e,t,n){var i=n(572);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(541)("2203ab1d",i,!0)},585:function(e,t,n){var i=n(575);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(541)("f20dbfc0",i,!0)},589:function(e,t,n){function i(e){n(585)}var o=n(8)(n(559),n(597),i,"data-v-819ecc2e",null);e.exports=o.exports},594:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"recommend",staticClass:"recommend"},[n("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[n("div",[n("div",{staticClass:"slider-wrapper"},[e.recommends.length?n("slider",e._l(e.recommends,function(t){return n("div",[n("a",{attrs:{href:t.linkUrl}},[n("img",{attrs:{src:t.picUrl},on:{load:e.loadImg}})])])})):e._e()],1),e._v(" "),n("div",{staticClass:"recommend-list"},[n("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),e._v(" "),n("ul",e._l(e.discList,function(t){return n("li",{staticClass:"item",on:{click:function(n){e.selectItem(t)}}},[n("div",{staticClass:"icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{width:"60",height:"60"}})]),e._v(" "),n("div",{staticClass:"text"},[n("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.creator.name)}}),e._v(" "),n("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.dissname)}})])])}))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[n("loading")],1)]),e._v(" "),n("router-view")],1)},staticRenderFns:[]}},597:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"slider"},[n("div",{ref:"slideGroup",staticClass:"slider-group"},[e._t("default")],2),e._v(" "),n("div",{staticClass:"dots"},e._l(e.dots,function(t,i){return n("span",{staticClass:"dot",class:{active:e.currentPageIndex===i}})}))])},staticRenderFns:[]}}});
//# sourceMappingURL=3.311b890323ea9703a74f.js.map