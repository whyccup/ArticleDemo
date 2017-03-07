$(document).ready(function() {
	//获取短信验证码
	$(".getmessage").click(function(event) {
		sms();
	});
	//确认修改密码
	$(".changepwd").click(function(event) {
		password();
	});
});//
 

//获取短信验证码
function sms(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/captcha/sms',
		type: 'POST',
		dataType: 'json',
		data: {
			phone: getUrlParam("phone")
		},
	})
	.done(function(data) {
		console.log(data);
	});
	
}


//重设密码
//POST /v1/account/password
function password(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/password',
		type: 'POST',
		dataType: 'json',
		data: {
			captcha: $(".register-message").val(),
			phone: getUrlParam("phone"),
			password: $(".user-anewpwd").val()
		},
	})
	.done(function(data) {
		if (data.status == 200) {
			alert('恭喜你，修改成功，请重新登录');
			window.location.href="./login.html"
		}else {
			alert('大概是因为手机号不正确');
		}
	});
	
}














//切割页面URL
function getUrlParam(name){
  var results = new RegExp('[\\?&]'+name+'=([^&#]*)').exec(window.location.search);
  if (!results) {
    return 0;
  }
  return results[1] || 0;
}