/**
 * Created by Administrator on 2017/6/1 0001.
 */
(function(window,factory){
    window.MyTemplate = factory;
})(window,function(options){
    var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$>/g,
        replaceReg = /\\|\n|\t|\r|'|\u2028|\u2029/g;
    var replace = {
        "\\":"\\",
        '\n':'n',
        '\r':'r',
        '\t':'t',
        "'":"'",
        '\u2028':'\u2028',
        '\u2029':'\u2029'
    }

    var el = document.querySelector(options.el),
        text = options.template,
        data = options.data;

    var template = function(text,data){
        var index = 0,
            fn_main = 'var temp =\'\';';
        fn_main += 'temp+=\'';
        //replace的第二个参数为函数时 函数的参数:
        //第一个为匹配到的字符串
        //最后一个为匹配到该字符串的位置
        //中间参数为捕获到的字符串
        text.replace(matcher,( match, interpolate, evaluate, offset)=>{
            //转义
            let str = text.slice(index,offset).replace(replaceReg,(match)=>{
                return '\\'+replace[match];
            });
            fn_main += str;

            //evaluate = (<% for( ... ){  %> => for(...){)
            if(evaluate){
                fn_main += '\';'+ evaluate+"temp += '";
            }

            //interpolate = (<%= item %> => item)
            if(interpolate){
                fn_main +="'+" +interpolate + "+\'";
            }

            index = offset+match.length;
            return match;
        })
        fn_main += '\';return temp;';

       var render = new Function('data',fn_main);
       return render(data);
    };

    el.innerHTML = ( template(text,data) );
})