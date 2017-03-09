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
	strHtml.push('<li class="userheaderimg" style="margin-right:10px;"><div style="background:url('+localStorage.background+');background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;"></div></li>');	strHtml.push('<li><span>'+localStorage.name+'</span></li>');
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





//填充个人中心页面
$(".userimg").css({
		"background":"url("+localStorage.background+")",
		"background-repeat": "no-repeat",
		"background-size": "cover",
		"background-position": "50% 50%"
		});
$(".username").text(localStorage.name);
$(".userctiy").text(localStorage.city);
$(".userstar").text(localStorage.constellation);
if (localStorage.gender == 'woman') {
	$(".usersex").attr('src', './png/girl.png');
}else {
	$(".usersex").attr('src', './png/boy.png');
}

//我的文章接口
myarticle();


});// ready在这停顿


//背景图片静默加载后替换
$('#loadimg').attr('src', localStorage.center).on('load', function(event) {

	$("#user-title").css({
	"background":"url("+localStorage.center+")",
	"background-repeat": "no-repeat",
	"background-size": "cover",
	"background-position": "50% 50%"
	});
});




//我的文章
//GET /v1/account/article/query
function myarticle(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/article/query',
		type: 'GET',
		dataType: 'json',
		data: {
			token: localStorage.token,
			page: 0,
			limit: 0
		},
	})
	.done(function(data) {
		var strHtml = [];
		var articles = data.data.articles;
		strHtml.push('<div class="user-wenzhang">文章(<span>'+articles.length+'</span>)</div>');
		for (var i = 0; i < articles.length; i++) {
			strHtml.push('<div class="article-content">');
			strHtml.push('<a href="./articleinfo.html?_id='+articles[i].user._id+'&text_id='+articles[i]._id+'">');
			strHtml.push('<img class="imgcontent" src="http://192.168.1.8:8700/rygmkKMb9x/'+articles[i].cover+'">');
			strHtml.push('</a>');
			strHtml.push('<div class="article-info">');
			strHtml.push('<a href="./articleinfo.html?_id='+articles[i].user._id+'&text_id='+articles[i]._id+'">');
			strHtml.push('<h4>'+articles[i].title+'</h4>');
			strHtml.push('<p>'+articles[i].content+'</p>');
			strHtml.push('</a>');
			strHtml.push('<div class="writer">');
			strHtml.push('<a href="./article.html?user_id='+articles[i].user._id+'&text_id='+articles[i]._id+'">');
			strHtml.push('<div class="img" style="background:url(http://192.168.1.8:8700/rygmkKMb9x/'+articles[i].user.avatar+');background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;"></div>');
			strHtml.push('<span class="writer-name">'+articles[i].user.name+'</span>');
			strHtml.push('</a>');
			strHtml.push('<span class="write-time">'+moment.unix(articles[i].create_time).format('hh:mm')+'</span>');
			strHtml.push('</div>');
			strHtml.push('<div class="watcher">');
			strHtml.push('<div class="like">');
			strHtml.push('<img src="./png/like.png">');
			if (articles[i].praise_sum == undefined) {
				strHtml.push('<span>0</span>');
			}else {
				strHtml.push('<span>'+articles[i].praise_sum+'</span>');
			}
			strHtml.push('</div>');
			strHtml.push('<div class="watchnum">');
			strHtml.push('<img src="./png/saw.png">');
			if (articles[i].preview_sum == undefined) {
				strHtml.push('<span>0</span>');
			}else {
				strHtml.push('<span>'+articles[i].preview_sum+'</span>');
			}
			strHtml.push('</div>');
			strHtml.push('</div>');
			strHtml.push('</div>');
			strHtml.push('</div>');
		}
		$("#content").append(strHtml.join(""));
	});
	
}
