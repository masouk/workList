var readWebData;
readWebData = (function(){
		 
	// 提示使用者這個模組跟jQuery有相依性
	if (!window.jQuery) { throw new Error("LikeButtonModule requires jQuery") }
	
	// 這行可以增進效能
	var $ = window.jQuery;
	var _list = function(){
		$.ajax({
			url:"data.json",
			dataType:"json",
			cache:true,
			timeout:1000*10,
			success:function(data){
			var dataCount = data.data.length;
			var allContent = "";
			$.map(data.data,function(val,key){
				var _c = _content;
				var regex;
				var outline;
				
				if(key%3 == 0){
					outline = '<div class="row">';
					_c = outline + _c;
				}
				
				regex=/\.*(\[@NAME@\])+\.*/gi;
				_c = _c.replace(regex,val.name);
				console.log(val.name);
				
				regex=/\.*(\[@URL@\])+\.*/gi;
				_c = _c.replace(regex,val.url);
				console.log(val.url);
				
				regex=/\.*(\[@IMAGE@\])+\.*/gi;
				_c = _c.replace(regex,val.image);
				console.log(val.image);
				
				
				$.map(val.type,function(val2,key2){
					regex='[@TYPE@]';
					var  _t;
					switch(val2){
						case "會員":
							_t = '<span class="label label-primary">會員</span>';
						break;
						case "商城":
							_t = '<span class="label label-success">商城</span>';
						break;
						case "金流":
							_t = '<span class="label label-warning">金流</span>';
						break;
						case "管理後台":
							_t = '<span class="label label-danger">管理後台</span>';
						break;
						case "形象網站":
							_t = '<span class="label label-default">形象網站</span>';
						break;
						case "系統":
							_t = '<span class="label label-info">系統</span>';
						break;
						case "活動網站":
							_t = '<span class="label label-fmactivity">活動網站</span>';
						break;
						case "系統":
							_t = '<span class="label label-info">系統</span>';
						break;
						case "手機":
							_t = '<span class="label label-fmmobile">手機</span>';
						break;
						case "連結已移除":
							_t = '<span class="glyphicon glyphicon glyphicon-link" aria-hidden="true" style="color:#f00">連結已移除</span>';
						break;
						default:
							_t = "標籤為定義";
						break
					}
					_c = _c.replace(regex,_t);
					console.log(val2);
				})
				
				regex=/\.*(\[@TYPE@\])+\.*/gi;
				_c = _c.replace(regex,"");
				
				if(key%3 == 2 || dataCount == key+1){
					outline = '</div>';
					_c = _c + outline;
				}
				allContent += _c;
			})
				$(".container .row:last").append(allContent);
			}
			
		})
	}// end _setupToLikeButton
	var _content = '<div class="col-md-4 portfolio-item">'+
				'<a href="[@URL@]" target="_blank">'+
					'<div class="img-overlay">'+
						'<img class="img-responsive lazy" data-original="[@IMAGE@]" src="[@IMAGE@]" alt="[@NAME@]">'+
					'</div>'+
				'</a>'+
				'<h3>'+
					'<a href="[@URL@]" target="_blank">[@NAME@]</a>'+
				'</h3>'+
				'<p>'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
					'[@TYPE@]&nbsp;'+
				'</p>'+
			'</div>';
	// the public API interface
	return {
		initialize: function(){
			// initialization
			_list();
		}
	};
	
}());

