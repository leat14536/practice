/**
 * Created by Administrator on 2017/4/5 0005.
 */
window.onload = function(){
    'use strict'
    //textarea添加行号
    var textarea = document.getElementById('ipt');
    var nArea = new area(textarea);

    //测试浏览器支持canvas
    var canBck = document.getElementById('canBck');
    if(canBck.getContext){
        var bckCtx = canBck.getContext('2d');
        var rectCtx = document.getElementById('canRect').getContext('2d');
        var nRect = new rect(rectCtx,bckCtx);// 方块画布 背景画布

        //提交事件
        document.getElementById('btn').onclick = function(){
            //清除错误提示
            nArea.clearErr();
            var ipt = document.getElementById('ipt');
            var value = ipt.value;

            //去掉空行
            var reg = /([^\n]*)+/g;
            value = value.match(reg);
            ipt.value = '';
            var aStr = [];
            value.forEach(function(str){
                if(str!=''){
                    ipt.value+=str+'\n';
                    aStr.push(str);
                }
            })

            //逐行提交
            var reg2 = /([^ ]+)+/g;
            aStr.forEach(function(str,i){
                aStr[i] = aStr[i].match(reg2);
                //console.log(aStr[i])
                var ret = nRect.command(aStr[i]);
                if(ret){
                    nArea.setErr(i);
                    ret = 0;
                }
            });
            //开始运动
            nRect.move();
        }

        //随机造墙
        document.getElementById('random').onclick = function(){
            if(this.value=='随机生成墙'){
                this.value='停止'
                nRect.randomBuild();
            }else{
                this.value='随机生成墙';
                nRect.stopBuild();
            }
        }
        //清除命令框
        document.getElementById('clearCommand').onclick = function(){
            textarea.value = '';
        }
        //重置背景画布
        document.getElementById('clearWall').onclick = function(){
            nRect.init();
        }
        document.getElementById('Explain').onclick = function(){
            var Explain = document.getElementById('Introductions');
            if( this.value == '说明' ){
                Explain.style.display = 'block';
                this.value = '关闭';
            }else{
                Explain.style.display = 'none';
                this.value = '说明';
            }


        }
    }else{
        alert('该浏览器不支持canvas 请更换浏览器尝试');
    }
}