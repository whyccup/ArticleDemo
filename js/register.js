

	
$(document).ready(function() {

	//手机验证码改60S定时器
    $(".getmessage").click(function(event) {

        var time = 60
        $('.getmessage').html(time+"S");
        $(".getmessage").attr('disabled', 'disabled');//让btn不能点击
        
        var tel = $(".register-name").val();
        if (tel == ''|| tel == undefined || tel == null) {
        	alert('没有手机号你怎么得到验证码呢？')
        }else {
        	//调用获取验证码的接口
        	sms(tel);
        }
        
        //每一秒
        var interval = setInterval(function(){
            time -= 1;
            if (time >= 0 ) {
                $('.getmessage').html(time+"S");
            }else {
                clearInterval(interval);
                $('.getmessage').html('获取验证码');
                $(".getmessage").removeAttr('disabled');//让btn能点击
            }
        },1000);
    });

	// 注册跳转
	// 在此判断
	$(".register").click(function(event) {
		register();
		
	});

});//ready在这停顿

//取得短信验证码
function sms(tel){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/captcha/sms',
		type: 'POST',
		dataType: 'json',
		data: {
			phone: tel
		},
	})
	.done(function(data) {
		console.log(data);
	});
}




//注册接口
function register(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/register',
		type: 'POST',
		dataType: 'json',
		data: {
			phone: $(".register-name").val(),
			password: $('.register-apwd').val(),
			captcha:$('.register-message').val()
		},
	})
	.done(function(data) {
		console.log(data);
		if (data.status == 200) {
			alert(data.message);
			window.location.href="./login.html"
		}else {
			alert(data.message);
		}
	});
	
}