var readWebData;
readWebData = (function(){
		 
	// 提示使用者這個模組跟jQuery有相依性
	if (!window.jQuery) { throw new Error("LikeButtonModule requires jQuery") }
	
	// 這行可以增進效能
	var $ = window.jQuery;
	var _list = function(condition){
		$.ajax({
			url:"data2.json",
			dataType:"json",
			cache:true,
			timeout:1000*10,
			success:function(data){
			var dataCount = 0;
			var allContent = "";
			var temp = [];
			var hasAD = [];
			
			//過濾有標籤之資料
			$.each(condition,function(key,val){
				$.map(data.data,function(val2,key2){
					if($.inArray(val,val2.type) != -1){
						hasAD.push(key2);
					}
				})
			})
			
			var clearRepeat = _uniqueAndSort(hasAD);
			
			$.map(clearRepeat,function(val,key){
				temp.push(data.data[val]);
			})
			
			
			dataCount = temp.length;
			
			$.map(temp,function(val,key){
				var _c = _content;
				var regex;
				var outline;
	
					if(key%3 == 0){
						outline = '<div class="row">';
						_c = outline + _c;
					}
					
					regex=/\.*(\[@NAME_TW@\])+\.*/gi;
					_c = _c.replace(regex,val.name_tw);
					//console.log(val.name_tw);
					
					regex=/\.*(\[@NAME_EN@\])+\.*/gi;
					_c = _c.replace(regex,val.name_en);
					//console.log(val.name_en);
					
					regex=/\.*(\[@URL@\])+\.*/gi;
					_c = _c.replace(regex,val.url);
					//console.log(val.url);
					
					regex=/\.*(\[@IMAGE@\])+\.*/gi;
					_c = _c.replace(regex,val.image);
					//console.log(val.image);
					
					
					$.map(val.type,function(val2,key2){
						regex='[@TYPE@]';
						var  _t;
						switch(val2){
							case "會員":
								_t = '<span class="label label-primary"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> 會員</span>';
							break;
							case "商城":
								_t = '<span class="label label-success"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 商城</span>';
							break;
							case "金流":
								_t = '<span class="label label-warning"><span class="glyphicon glyphicon-usd" aria-hidden="true"></span> 金流</span>';
							break;
							case "管理後台":
								_t = '<span class="label label-danger"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 管理後台</span>';
							break;
							case "形象網站":
								_t = '<span class="label label-default"><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> 形象網站</span>';
							break;
							case "系統":
								_t = '<span class="label label-info"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span> 系統</span>';
							break;
							case "活動網站":
								_t = '<span class="label label-fmactivity"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> 活動網站</span>';
							break;
							case "手機":
								_t = '<span class="label label-fmmobile"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> 手機</span>';
							break;
							case "連結已移除":
								_t = '<span class="glyphicon glyphicon glyphicon-link" aria-hidden="true" style="color:#f00">連結已移除</span>';
							break;
							default:
								_t = "標籤為定義";
							break
						}
						_c = _c.replace(regex,_t);
						//console.log(val2);
					})
					
					regex=/\.*(\[@TYPE@\])+\.*/gi;
					_c = _c.replace(regex,"");
					
			
				
				if(key%3 == 2 || dataCount == key+1){
					outline = '</div>';
					_c = _c + outline;
				}
				allContent += _c;

			})
				$(".container > .row:last").append(allContent);
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
					'<a href="[@URL@]" target="_blank" class="name_tw">[@NAME_TW@]</a>'+
					'<a href="[@URL@]" target="_blank" class="name_en">[@NAME_EN@]</a>'+
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
	var _uniqueAndSort = function(data){
		    var unique = []
		    var data_count = []
		    var inverse = []
		   
		    $.each(data,function(k,v){
		        var pos = $.inArray(v,unique)
		        if( pos == -1){
		            unique.push(v);
		            data_count.push(1);
		        }else{
		            data_count[pos]+=1;
		        }
		    })

		    $.each(unique,function(k,v){
		        inverse[v] = data_count[k];
		    })
		   
		    unique.sort(
		        function(a,b){
		            return inverse[b]-inverse[a]
		        }
		    )
		    return unique;
	}
	return {
		initialize: function(condition){
			// initialization
			console.log(condition);
			_list(condition);
		}
	};
	
}());

