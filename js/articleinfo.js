$(document).ready(function() {
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
	}
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
//获取文章详情
	article();
//我要评价
	$(".push").click(function(event) {
		if (localStorage.length != 0) {
			addcomment();
		}else {
			alert('请先登录');
			window.location.href = "login.html"
		}
		
	});
//评论列表
	comment();


	
});// ready在这停顿


//文章详情
function article(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/query/article',
		type: 'GET',
		dataType: 'json',
		data: {
			user:getUrlParam("_id"),
			page:0,
			limit:1
		},
	})
	.done(function(data) {
		for (var i = 0; i < data.data.articles.length; i++) {
			$("#article-title").find('h3').text(data.data.articles[i].title);
			if (/http/.test(data.data.articles[i].user.avatar) == true) {
				$(".writer").find('img').attr('src', data.data.articles[i].user.avatar);
			}else {
				$(".writer").find('img').attr('src', 'http://192.168.1.8:8700/rygmkKMb9x/'+data.data.articles[i].user.avatar);
			}
			$(".writer-name").text(data.data.articles[i].user.name);
			$(".write-time").text(moment.unix(data.data.articles[i].create_time).format('hh:mm'));
			$(".like").find('span').text(data.data.articles[i].praise_sum);
			$(".watchnum").find('span').text(data.data.articles[i].preview_sum);
			if (/http/.test(data.data.articles[i].cover) == true) {
				$("#article-info").find('img').attr('src', data.data.articles[i].cover);
			}else {
				$("#article-info").find('img').attr('src', 'http://192.168.1.8:8700/rygmkKMb9x/'+data.data.articles[i].cover);
			}
			
			$(".atricle-crumbs").text(data.data.articles[i].content);
		}
		
	});
}

//我要评价
function addcomment(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/comment/add',
		type: 'post',
		dataType: 'json',
		data: {
			token:localStorage.token,
			article:getUrlParam("text_id"),
			content:$("#iwantsay").find('textarea').val()
		},
	})
	.done(function(data) {
		console.log(data);
		if (data.status == 200) {
			alert(data.message);
			window.location.reload();
		}else{
			alert('你可能评论了个假文章');
		}
	});
}


//评价列表
function comment(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/query/comment',
		type: 'GET',
		dataType: 'json',
		data: {
			article: getUrlParam("text_id"),
			page:0,
			limit:10
		},
	})
	.done(function(data) {
		var strHtml = [];
		var comments = data.data.comments;
		strHtml.push('<div class="comment-title">最近评论</div>');
		for (var i = comments.length - 1; i >= 0; i--) {
		strHtml.push('<div class="comment-content">');
		strHtml.push('<div class="content-crumbs">');
		strHtml.push('<div class="comment-writer">');
		if (/http/.test(comments[i].user.avatar) == true) {
			strHtml.push('<img alt="没" src="'+comments[i].user.avatar+'">');
		}else {
			strHtml.push('<img alt="没" src="http://192.168.1.8:8700/rygmkKMb9x/'+comments[i].user.avatar+'">');
		}
		
		strHtml.push('<span class="comment-writer-name">'+comments[i].user.name+'</span>');
		strHtml.push('<span class="comment-write-time">'+moment.unix(comments[i].create_time).format('hh:mm')+'</span>');
		strHtml.push('</div>');
		strHtml.push('<div class="comment-like">');
		strHtml.push('<img src="./png/like.png">');
		if (comments[i].praise_sum == undefined) {
			strHtml.push('<span>&nbsp;0</span>');
		}else{
			strHtml.push('<span>&nbsp;'+comments[i].praise_sum+'</span>');
		}
		strHtml.push('</div>');
		strHtml.push('</div>');
		strHtml.push('<div class="comment-text">'+comments[i].content+'</div>');
		strHtml.push('</div>');
		}
		$("#comment").append(strHtml.join(""));
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