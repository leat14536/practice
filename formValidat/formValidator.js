/**
 * Created by Administrator on 2017/5/17 0017.
 */
/*
*   表单验证插件
*   使用方法 let fv = new FormValidator({
        form:formList,          (必填)) 需要验证的ipt[type='text]/ipt[type='password']的集合 类型是数组
        method : str,           'change'/'keyup'/'blur',默认'change'
        validat:{}            添加扩展方法 由首字母大写的函数组成的对象
     })
*   在需要验证的表单上添加data-fv-xxx=str 和data-fv-xxx-message = str
*   xxx的默认方法有
*   maxlength=num (字符串长度小于等于num),
*   minlength=num (字符串长度大于等于num),
*   require(不为空且由数字字母下划线组成),
*   tel (手机号),
*   mail(邮箱),
*   match(比较)
*
*   扩展方法
*   例:
*   <input type='text' data-fv-myvalidate data-fv-myvalidate-message='oh' id='ipt'>
*   let fv = new FormValidator({
*        form:[document.querySelector('#ipt')],
*        method: 'change',
*        validat: {
*           Myvalidate(value,data){         //data的值是input data-fv-myvalidate的值
*               return false;               //true代表验证成功,false失败
*           }
*        }
*   });
* */
(function(window){
    let __option__ = {
            formList:[],
            method:'change'
        },
        __validator__ = {
            Maxlength(value,max){
                return max>=value.length;
            },
            Minlength(value,min){
                return min<=value.length;
            },
            Require(value){
                return /^[\w_]+$/.test(value);
            },
            Tel(value){
                return /^1[3|5|7|8|]\d{9}$/.test(value);
            },
            Mail(value){
                return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
            },
            Match(value,select){
                return document.querySelector(select).value===value;
            }
        },
        __message__ = document.createElement('div');



    class FormValidator{
        constructor(option){
            this.init(option);
            this.validat();
        }

        init(option){
            option = Object.assign(__option__,option)
            this.formList = option.form;
            this.method = option.method;
            __validator__ = Object.assign( __validator__, option.validat);
        }

        validat(){
            this.formList.forEach((ipt)=>{
                ipt.addEventListener(this.method,(e)=>{
                    let target = e.target;
                    this._validat(target)
                })
            })
        }

        reset(){                                //重置
            this.formList.forEach((target)=>{
                if(target.className.indexOf('form-fv-suc') !== -1){
                    target.className = target.className.replace('form-fv-suc','').trim();
                }
                if(target.className.indexOf('form-fv-err') !== -1){
                    target.className = target.className.replace('form-fv-err','').trim();
                }
            })
            let parent = this.formList[0].parentNode;
            let messageNodes = parent.querySelectorAll('.form-fv-message')
            messageNodes.forEach((messageNode)=>{
                parent.removeChild(messageNode);
            })
        }

        submit(fn){                             //验证 全部成功时调用回调
            let flag = true;
            this.formList.forEach((ipt)=>{
                if(!this._validat(ipt)){
                    flag = false;
                }
            })
            if( flag && fn ) fn();
        }

        _validat(target){                       //验证
            let flag = false;
            if(target.nextElementSibling.className.indexOf('form-fv-message')!== -1 ){
                target.parentNode.removeChild(target.nextElementSibling);
            }
            for(let validat in __validator__ ){
                if( typeof target.dataset['fv'+validat] !== 'undefined' ){
                    flag = __validator__[validat](target.value,target.dataset['fv'+validat]);
                    if(!flag){
                        let message = __message__.cloneNode();
                        message.innerHTML = target.dataset['fv'+validat+'Message']
                        message.className = 'form-fv-message form-fv-err'
                        target.parentNode.insertBefore(message,target.nextElementSibling);
                        if(target.className.indexOf('form-fv-err') === -1){
                            target.className = target.className+' form-fv-err'
                        }
                        if(target.className.indexOf('form-fv-suc') !== -1){
                            target.className = target.className.replace('form-fv-suc','').trim();
                        }
                        break;
                    }
                }
            }
            if(flag){
                if(target.className.indexOf('form-fv-err') !== -1){
                    target.className = target.className.replace('form-fv-err','').trim();
                }
                if(target.className.indexOf('form-fv-suc') === -1){
                    target.className = target.className+' form-fv-suc';
                }
            }
            return flag;
        }
    }
    window.FormValidator = FormValidator;
})(window)