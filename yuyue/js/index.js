/**
 * Created by tianchao on 2016/10/18.
 */
$(document).ready(function(){
    $('#time').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $("#sub").click(function(){
        if($("#user").val() == ''){
            alert('请输入您的姓名');
            $("#user").focus();
            return false;
        }
        if($("#mobile").val() == ''){
            alert('请输入您的手机号');
            $("#mobile").focus();
            return false;
        }else{
            var mobile = $("#mobile").val();
            if(!/^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/i.test(mobile))
            {
                alert('请输入正确的手机号码');
                return false;
            }
        }
        if($("#time").val() == "")
        {
            alert("请填写预约的时间！");
            $("#time").focus();
            return false;
        }else{
            var nowGetTime = $("#time").val();
            var getTime = ($("#time").val()).slice(0,10);//获取的时间
            var week = ("星期"+"天一二三四五六".charAt(new Date(getTime).getDay())); //判断是周几?
            var timer = ($("#time").val()).slice(11,16); //判断选择的时间
            var nowTime = getNowFormatDate();


            //计算当前时间和预约的时间
            var OneMonth = nowTime.substring(5,nowTime.lastIndexOf ('-'));
            var OneDay = nowTime.substring(nowTime.length,nowTime.lastIndexOf ('-')+1);
            var OneYear = nowTime.substring(0,nowTime.indexOf ('-'));

            var TwoMonth = getTime.substring(5,getTime.lastIndexOf ('-'));
            var TwoDay = getTime.substring(getTime.length,getTime.lastIndexOf ('-')+1);
            var TwoYear = getTime.substring(0,getTime.indexOf ('-'));

            var oneDate = Date.parse(OneMonth+'-'+OneDay+'-'+OneYear);

            var twoDate = Date.parse(TwoMonth+'-'+TwoDay+'-'+TwoYear);

            var cha=((twoDate - oneDate )/86400000);

            if(cha > 21){
                alert('预约的时间不能超过三周');
                return false;
            }

            //预约的时间不可为已过去的时间
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;

            var stringTime = nowGetTime;
            var timestamp2 = Date.parse(new Date(stringTime));
            timestamp2 = timestamp2 / 1000;

            if(timestamp2 - timestamp < 0){
                alert('您不能预约过去的时间');
                return false;
            }


            //计算预约的时间是否为周末，以及相应的预约时间段
            if(week == '星期六' || week == '星期天'){
                if(timer < '10:00' || timer > '17:00'){
                    alert('周末预约的时间为上午10点到下午5点之间');
                    return false;
                }
            }else{
                if(timer < '09:00' || timer > '21:00'){
                    alert('工作日预约的时间为上午9点到晚上9点之间');
                    return false;
                }
            }
        }
        $("#form").submit();
    });
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }


    //离婚流程TAB切换
   $('.xy').click(function() {
       $(this).addClass('on');
       $('.ss').removeClass('on');
       $('.xyc').css('display','block');
       $('.ssc').css('display','none');
       return false;
   });
    $('.ss').click(function() {
        $(this).addClass('on');
        $('.xy').removeClass('on');
        $('.ssc').css('display','block');
        $('.xyc').css('display','none');
        return false;
    });


});
