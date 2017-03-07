$(document).ready(function() {
//返回顶部
    $("#toTop").click(function(event) {
      $('body,html').animate({scrollTop:0},1000); 
      return false; 
    });
//个人中心hover改变图片
	$(".my_center").hover(function() {
		$(this).attr('src', './png/my_center_mark.png');
	}, function() {
		$(this).attr('src', './png/my_center.png');
	});

	$(".my_setting").hover(function() {
		$(this).attr('src', './png/my_setting_mark.png');
	}, function() {
		$(this).attr('src', './png/my_setting.png');
	});

	$(".my_out").hover(function() {
		$(this).attr('src', './png/my_out_mark.png');
	}, function() {
		$(this).attr('src', './png/my_out.png');
	});
//个人中心小箭头
	$(".pull_up").hover(function() {
		$(this).children().first().removeClass('hover-down').addClass('hover-up');
	}, function() {
		$(this).children().first().removeClass('hover-up').addClass('hover-down');
	});


//title变成用户
if (localStorage.length != 0) {
	var strHtml = [];
	strHtml.push('<li class="userheaderimg" style="margin-right:10px;"><img src="'+localStorage.background+'"></li>');
	strHtml.push('<li><span>'+localStorage.name+'</span></li>');
	strHtml.push('<li class="pull_up">');
	strHtml.push('<img src="./png/pull_down.png">');
	strHtml.push('<div class="user-option">');
	strHtml.push('<a href="./usercenter.html">');
	strHtml.push('<img src="./png/my_center.png" class="my_center">');
	strHtml.push('</a>');
	strHtml.push('<a href="./useroption.html">');
	strHtml.push('<img src="./png/my_setting.png" class="my_setting">');
	strHtml.push('</a>');
	strHtml.push('<a href="./login.html">');
	strHtml.push('<img src="./png/my_out.png" class="my_out">');
	strHtml.push('</a>');
	strHtml.push('</div>');
	strHtml.push('</a>');
	strHtml.push('<li><a href="./pusharticle.html"><img src="./png/write.png" class="write"></a></li>');
	$(".title-right").find("ul").html(strHtml.join(""));
}else {
	alert('请登录');
	window.location.href="./login.html";
}


//发表文章
$("#save").click(function(event) {
	addArticle();
});
	
});// ready在这停顿


//发表文章
function addArticle(){
	var formData = new FormData();
	formData.append('token',localStorage.token);
	formData.append('title',$(".push-title").val());
	formData.append('content',$(".push-content").val());
	formData.append('cover', $('#file')[0].files[0]);
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/article/add',
		type: 'POST',
		dataType: 'json',
		data: formData,
		processData: false,
    	contentType: false
	})
	.done(function(data) {
		if (data.status == 200) {
			alert(data.message);
			window.location.href="./usercenter.html";
		}else {
			alert(data.message);
		}
	});
	
}