img();


function img(argument) {
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/captcha/img',
		type: 'POST',
		dataType: 'html',
		data: {},
	})
	.done(function(data) {
		$(".img").append(data);
	});
}


$(".next").click(function(event) {
	var phone = $(".user-name").val();
	if (phone == '') {
		alert('请填写手机号和验证码')
	}else {
		window.location.href="./option_changepwd.html?phone="+phone+"";
	}
	
});