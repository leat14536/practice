/**
 * Created by Administrator on 2017/4/28 0028.
 */
//图片预加载

(function($){
    function preload(imgs, options) {
        this.imgs = (typeof imgs==='string') ? [imgs]:imgs;
        this.opts = $.extend({},preload.DEFAULTS,options);

        if(this.opts.order === 'ordered') {
            this._oredered();
        }else{
            this._unoredered();
        }
    }

    preload.DEFAULTS = {
        order: 'unordered',
        each: null,             //每一张加载完后执行
        all: null               //所有图片加载完后执行
    }

    preload.prototype._unoredered = function(){ //无序加载
        let imgs = this.imgs;
        let opts = this.opts;
        let count = 0;
        let len = imgs.length;

        $.each( imgs, ( i, src )=>{
            if(typeof src != 'string' ) return;
            let imgObj = new Image();

            $(imgObj).on('load error',()=>{
                opts.each && opts.each(count);

                count++;
                if( count>=len-1 ){
                    opts.all && opts.all();
                }
            })

            imgObj.src = imgs[i];
        })
    }

    preload.prototype._oredered = function(){   //有序加载
        let imgs = this.imgs;
        let opts = this.opts;
        let count = 0;
        let len = imgs.length;

        load();
        //有序加载
        function load(){
            var imgObj = new Image();
            $(imgObj).on('load error', ()=>{
                opts.each && opts.each(count);
                if(count>=len){
                    //全部加载完成
                    opts.all && opts.all();
                }else{
                    load();
                }
                count++;
            })

            imgObj.src = imgs[count];
        }
    }

    $.extend({
        preload: function(imgs, opts){
            new preload(imgs, opts);
        }
    })
})(jQuery)
