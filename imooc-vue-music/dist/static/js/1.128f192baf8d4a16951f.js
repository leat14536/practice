webpackJsonp([1],{547:function(t,i,e){function n(t){e(581)}var s=e(8)(e(565),e(593),n,"data-v-17b80ae4",null);t.exports=s.exports},557:function(t,i,e){"use strict";function n(){var t=r()({},l.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,g_tk:1241082224,hostUin:0,platform:"yqq",needNewCode:0});return e.i(o.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,l.c)}function s(t){var i=r()({},l.b,{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:100,songstatus:1,g_tk:1241082224,singermid:t});return e.i(o.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?",i,l.c)}i.b=n,i.a=s;var a=e(82),r=e.n(a),o=e(185),l=e(62)},558:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(63),s=e.n(n),a=e(186),r=e.n(a),o=e(122);i.default={name:"listview",props:{data:{type:Array,default:[]}},computed:{shortcutList:function(){return this.data.map(function(t){return t.title.substr(0,1)})},fixedTitle:function(){return this.scrollY>0?"":this.data[this.currentIndex]?this.data[this.currentIndex].title:""}},data:function(){return{currentIndex:0,scrollY:-1,diff:-1}},created:function(){this.touch={},this.listenScroll=!0,this.listHeight=[],this.probeType=3},methods:{refresh:function(){this.$refs.listview.refresh()},onShortcutTouchStart:function(t){var i=e.i(o.b)(t.target,"index"),n=t.touches[0];this.touch.y1=n.pageY,this.touch.anchorIndex=i,this._scrollTo(i)},onShortcutTouchMove:function(t){var i=t.touches[0];this.touch.y2=i.pageY;var e=(this.touch.y2-this.touch.y1)/18|0,n=parseInt(this.touch.anchorIndex)+e;this._scrollTo(n)},scroll:function(t){this.scrollY=t.y},selectItem:function(t){this.$emit("selectItem",t)},_scrollTo:function(t){t<0?t=0:t>this.listHeight-2&&(t=this.listHeight-2),this.currentIndex=t,this.$refs.listview.scrollToElement(this.$refs.listgroup[t],0)},_calculateHeight:function(){this.listHeight=[];var t=this.$refs.listgroup,i=0;this.listHeight.push(i);for(var e=0;e<t.length;e++){i+=t[e].clientHeight,this.listHeight.push(i)}}},watch:{data:function(){var t=this;setTimeout(function(){t._calculateHeight()},20)},scrollY:function(t){var i=this.listHeight;if(t>0)return void(this.currentIndex=0);for(var e=0;e<i.length-1;e++){var n=i[e],s=i[e+1];if(-t>=n&&-t<s)return this.currentIndex=e,void(this.diff=s+t)}this.currentIndex=i.length-2},diff:function(t){var i=t>0&&t<30?t-30:0;this.fixedTop!==i&&(this.fixedTop=i,this.$refs.fixed.style.transform="translate3d(0,"+i+"px,0)")}},components:{Scroll:s.a,Loading:r.a}}},565:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(54),s=e.n(n),a=e(557),r=e(62),o=e(45),l=e(81),A=e(190),c=e(588),u=e.n(c);i.default={name:"singer",mixins:[l.c],data:function(){return{singers:[]}},created:function(){this._getSingerList()},methods:s()({handlePlaylist:function(t){var i=t.length>0?"60px":"";this.$refs.singer.style.bottom=i,this.$refs.list.refresh()},selectSinger:function(t){this.$router.push({path:"/singer/"+t.id}),this.setSinger(t)},_getSingerList:function(){var t=this;e.i(a.b)().then(function(i){i.code===r.a&&(t.singers=t._normalizeSinger(i.data.list))})},_normalizeSinger:function(t){var i={hot:{title:"热门",items:[]}};t.forEach(function(t,e){e<10&&i.hot.items.push(new A.a({id:t.Fsinger_mid,name:t.Fsinger_name}));var n=t.Findex;i[n]||(i[n]={title:n,items:[]}),i[n].items.push(new A.a({id:t.Fsinger_mid,name:t.Fsinger_name}))});var e=[],n=[];for(var s in i){var a=i[s];a.title.match(/[a-zA-Z]/)?n.push(a):"热门"===a.title&&e.push(a)}return n.sort(function(t,i){return t.title.charCodeAt(0)-i.title.charCodeAt(0)}),e.concat(n)}},e.i(o.b)({setSinger:"SET_SINGER"})),components:{Listview:u.a}}},571:function(t,i,e){i=t.exports=e(540)(!0),i.push([t.i,".singer[data-v-17b80ae4]{position:fixed;top:88px;bottom:0;width:100%}","",{version:3,sources:["C:/Users/Administrator/Desktop/en/work/practice/imooc-vue-music/src/components/singer/singer.vue"],names:[],mappings:"AACA,yBACE,eAAgB,AAChB,SAAU,AACV,SAAU,AACV,UAAY,CACb",file:"singer.vue",sourcesContent:["\n.singer[data-v-17b80ae4] {\n  position: fixed;\n  top: 88px;\n  bottom: 0;\n  width: 100%;\n}\n"],sourceRoot:""}])},574:function(t,i,e){i=t.exports=e(540)(!0),i.push([t.i,".listview[data-v-67f313a9]{position:relative;width:100%;height:100%;overflow:hidden;background-color:#222}.listview .list-group[data-v-67f313a9]{padding-bottom:30px}.listview .list-group .list-group-title[data-v-67f313a9]{height:30px;line-height:30px;padding-left:20px;font-size:12px;color:hsla(0,0%,100%,.5);background-color:#333}.listview .list-group .list-group-item[data-v-67f313a9]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:20px 0 0 30px}.listview .list-group .list-group-item .avatar[data-v-67f313a9]{width:50px;height:50px;border-radius:50%}.listview .list-group .list-group-item .name[data-v-67f313a9]{margin-left:20px;color:hsla(0,0%,100%,.5);font-size:14px}.listview .list-shortcut[data-v-67f313a9]{position:absolute;z-index:30;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:20px;padding:20px 0;border-radius:10px;text-align:center;background-color:rgba(0,0,0,.3);font-family:Helvetica}.listview .list-shortcut .item[data-v-67f313a9]{padding:3px;line-height:1;color:hsla(0,0%,100%,.5);font-size:12px}.listview .list-shortcut .item.current[data-v-67f313a9]{color:#ffcd32}.listview .list-fixed[data-v-67f313a9]{position:absolute;top:0;left:0;width:100%}.listview .list-fixed .fixed-title[data-v-67f313a9]{height:30px;line-height:30px;padding-left:20px;font-size:12px;color:hsla(0,0%,100%,.5);background-color:#333}.listview .loading-container[data-v-67f313a9]{position:absolute;width:100%;top:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}","",{version:3,sources:["C:/Users/Administrator/Desktop/en/work/practice/imooc-vue-music/src/base/listview/listview.vue"],names:[],mappings:"AACA,2BACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,qBAAuB,CACxB,AACD,uCACI,mBAAqB,CACxB,AACD,yDACM,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,yBAAgC,AAChC,qBAAuB,CAC5B,AACD,wDACM,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,qBAAuB,CAC5B,AACD,gEACQ,WAAY,AACZ,YAAa,AACb,iBAAmB,CAC1B,AACD,8DACQ,iBAAkB,AAClB,yBAAgC,AAChC,cAAgB,CACvB,AACD,0CACI,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,QAAS,AACT,mCAAoC,AAC5B,2BAA4B,AACpC,WAAY,AACZ,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,gCAAqC,AACrC,qBAAuB,CAC1B,AACD,gDACM,YAAa,AACb,cAAe,AACf,yBAAgC,AAChC,cAAgB,CACrB,AACD,wDACQ,aAAe,CACtB,AACD,uCACI,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,UAAY,CACf,AACD,oDACM,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,yBAAgC,AAChC,qBAAuB,CAC5B,AACD,8CACI,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,kCAAmC,AAC3B,yBAA2B,CACtC",file:"listview.vue",sourcesContent:["\n.listview[data-v-67f313a9] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background-color: #222;\n}\n.listview .list-group[data-v-67f313a9] {\n    padding-bottom: 30px;\n}\n.listview .list-group .list-group-title[data-v-67f313a9] {\n      height: 30px;\n      line-height: 30px;\n      padding-left: 20px;\n      font-size: 12px;\n      color: rgba(255, 255, 255, 0.5);\n      background-color: #333;\n}\n.listview .list-group .list-group-item[data-v-67f313a9] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      padding: 20px 0 0 30px;\n}\n.listview .list-group .list-group-item .avatar[data-v-67f313a9] {\n        width: 50px;\n        height: 50px;\n        border-radius: 50%;\n}\n.listview .list-group .list-group-item .name[data-v-67f313a9] {\n        margin-left: 20px;\n        color: rgba(255, 255, 255, 0.5);\n        font-size: 14px;\n}\n.listview .list-shortcut[data-v-67f313a9] {\n    position: absolute;\n    z-index: 30;\n    right: 0;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    width: 20px;\n    padding: 20px 0;\n    border-radius: 10px;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.3);\n    font-family: Helvetica;\n}\n.listview .list-shortcut .item[data-v-67f313a9] {\n      padding: 3px;\n      line-height: 1;\n      color: rgba(255, 255, 255, 0.5);\n      font-size: 12px;\n}\n.listview .list-shortcut .item.current[data-v-67f313a9] {\n        color: #ffcd32;\n}\n.listview .list-fixed[data-v-67f313a9] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n.listview .list-fixed .fixed-title[data-v-67f313a9] {\n      height: 30px;\n      line-height: 30px;\n      padding-left: 20px;\n      font-size: 12px;\n      color: rgba(255, 255, 255, 0.5);\n      background-color: #333;\n}\n.listview .loading-container[data-v-67f313a9] {\n    position: absolute;\n    width: 100%;\n    top: 50%;\n    -webkit-transform: translateY(50%);\n            transform: translateY(50%);\n}\n"],sourceRoot:""}])},581:function(t,i,e){var n=e(571);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(541)("69fb3021",n,!0)},584:function(t,i,e){var n=e(574);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(541)("4e6028ee",n,!0)},588:function(t,i,e){function n(t){e(584)}var s=e(8)(e(558),e(596),n,"data-v-67f313a9",null);t.exports=s.exports},593:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"singer",staticClass:"singer"},[e("listview",{ref:"list",attrs:{data:t.singers},on:{selectItem:t.selectSinger}}),t._v(" "),e("router-view")],1)},staticRenderFns:[]}},596:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("scroll",{ref:"listview",staticClass:"listview",attrs:{data:t.data,probeType:t.probeType,listenScroll:t.listenScroll},on:{scroll:t.scroll}},[e("ul",t._l(t.data,function(i){return e("li",{ref:"listgroup",refInFor:!0,staticClass:"list-group"},[e("h2",{staticClass:"list-group-title"},[t._v(t._s(i.title))]),t._v(" "),e("ul",t._l(i.items,function(i){return e("li",{staticClass:"list-group-item",on:{click:function(e){t.selectItem(i)}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.avatar,expression:"item.avatar"}],staticClass:"avatar"}),t._v(" "),e("span",{staticClass:"name"},[t._v(t._s(i.name))])])}))])})),t._v(" "),e("div",{staticClass:"list-shortcut"},[e("ul",t._l(t.shortcutList,function(i,n){return e("li",{staticClass:"item",class:{current:t.currentIndex==n},attrs:{"data-index":n},on:{touchmove:function(i){i.stopPropagation(),i.preventDefault(),t.onShortcutTouchMove(i)},touchstart:function(i){t.onShortcutTouchStart(i)}}},[t._v("\n        "+t._s(i)+"\n      ")])}))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.fixedTitle,expression:"fixedTitle"}],ref:"fixed",staticClass:"list-fixed"},[e("div",{staticClass:"fixed-title"},[t._v(t._s(t.fixedTitle))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.data.length,expression:"!data.length"}],staticClass:"loading-container"},[e("loading")],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=1.128f192baf8d4a16951f.js.map