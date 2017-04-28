/**
 * Created by Administrator on 2017/4/28 0028.
 */
//图片预加载

(function($){
    function preload(imgs, options) {
        this.imgs = (typeof imgs==='string') ? [imgs]:imgs;
        this.opts = $.extend({},preload.DEFAULTS,options);

        this._unoredered();
    }

    preload.DEFAULTS = {
        each: null,             //每一张加载完后执行
        all: null               //所有图片加载完后执行
    }

    preload.prototype._unoredered = function(){
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

    $.extend({
        preload: function(imgs, opts){
            new preload(imgs, opts);
        }
    })
})(jQuery)
