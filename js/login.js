$(document).ready(function() {
	localStorage.clear();
	$(".login").click(function(event) {
		login();
	});
});


function login(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/login',
		type: 'POST',
		dataType: 'json',
		data: {
			account: $(".login-name").val(),
			password: $('.login-pwd').val()
		},
	})
	.done(function(data) {
		if (data.status == 200) {
			if ('avatar' in data.data.user) {
				localStorage.background = 'http://192.168.1.8:8700/rygmkKMb9x/'+data.data.user.avatar;
			}else {
				localStorage.background = data.data.user.background;
			}
			localStorage.city = data.data.user.city;
			localStorage.constellation = data.data.user.constellation;
			localStorage.gender = data.data.user.gender;
			localStorage.name = data.data.user.name;
			localStorage.token = data.data.user.token; 			
			alert('登陆成功！');
			window.location.href="./article.html"
		}else {
			alert('你的账户或密码有误！');
		}
	});
	
}