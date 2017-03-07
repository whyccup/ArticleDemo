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
	strHtml.push('<li class="userheaderimg"><img src="'+localStorage.background+'"></li>');
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
//省市接口
	province();
	$(".sheng").change(function(event) {
		var parent = $(".sheng").val();
		city(parent);
	});
	
//星座接口
	constellation()

//点击修改密码
	$(".pwd").find('button').click(function(event) {
		window.location.href="./option_getbackpwd.html"
	});


//点击保存
	$(".save").find('button').click(function(event) {
		var gender = '';
		$('input[name="sex"]').each(function(){
			gender = $('input:radio:checked').val();
		});
		profile(gender);
	});



});// ready在这停顿




//用户头像全局变量
var headimg = '';


// //选择了图片触发事件
// //为了预览
// $("#file").change(function(event) {});


//省接口
function province(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/query/city/province',
		type: 'get',
		dataType: 'json',
		date:{},
	})
	.done(function(data) {
		var provinces  = data.data.provinces
		$(".sheng").empty();
		$(".sheng").append('<option value="-1">请选择</option>');
		for (var i = 0; i < provinces.length; i++) {
			$(".sheng").append('<option value="'+provinces[i].ProID+'">'+provinces[i].name+'</option>');
		}
	});
}


//市接口
function city(parent){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/query/city',
		type: 'GET',
		dataType: 'json',
		data: {
			parent: parent
		},
	})
	.done(function(data) {
		var citys  = data.data.citys
		$(".shi").empty();
		$(".shi").append('<option value="-1">请选择</option>');
		for (var i = 0; i < citys.length; i++) {
			$(".shi").append('<option value="'+citys[i].CityID+'">'+citys[i].name+'</option>');
		}
	});	
}



//星座
function constellation(){
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/query/constellation',
		type: 'GET',
		dataType: 'json',
		data: {},
	})
	.done(function(data) {
		var constellations  = data.data.constellations
		$(".star").find('select').empty();
		$(".star").find('select').append('<option value="-1">请选择</option>');
		for (var i = 0; i < constellations.length; i++) {
			$(".star").find('select').append('<option value="'+constellations[i].id+'">'+constellations[i].val+'</option>');
		}
	});
}



//保存修改的信息
function profile(gender){
	var formData = new FormData();
	formData.append('token',localStorage.token);
	formData.append('avatar', $('#file')[0].files[0]);
	formData.append('name',$(".petname").find('input').val());
	formData.append('gender',gender);
	formData.append('city',$(".sheng option:selected").text()+' '+$(".shi option:selected").text());
	formData.append('constellation',$(".star").find('select option:selected').text());
	$.ajax({
		url: 'http://192.168.1.8:8700/rygmkKMb9x/v1/account/profile',
		type: 'post',
		dataType: 'json',
		data: formData,
		processData: false,
    	contentType: false
	})
	.done(function(data) {
		console.log(data);
		if (data.status == 40400) {
			alert(data.message);
			window.location.href="./login.html"
		}else {
			alert('恭喜你修改成功，请重新登录');
			window.location.href="./login.html"
		}
		
	});
}