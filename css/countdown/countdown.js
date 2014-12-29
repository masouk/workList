var countDownHandle;
		
	countDownHandle = (function(){
	// 提示使用者這個模組跟jQuery有相依性
	if (!window.jQuery) { throw new Error("LikeButtonModule requires jQuery") }
	
	// 這行可以增進效能
	var $ = window.jQuery;
	
	var _countDown = function(num){
		var compose = [];
		switch(num){
			case 0:
				compose = [0,1,2,4,5,6];
			break;
			case 1:
				compose = [2,5];
			break;
			case 2:
				compose = [0,2,3,4,6];
			break;
			case 3:
				compose = [0,2,3,5,6];
			break;
			case 4:
				compose = [1,2,3,5];
			break;
			case 5:
				compose = [0,1,3,5,6];
			break;
			case 6:
				compose = [0,1,3,4,5,6];
			break;
			case 7:
				compose = [0,2,5];
			break;
			case 8:
				compose = [0,1,2,3,4,5,6];
			break;
			case 9:
				compose = [0,1,2,3,5,6];
			break;
			default:
				compose = [0,1,2,4,5,6];
			break;
		}
		return compose;
	}
	var _dayDom = function(day){
		var newDay = "";
		if(day > 99){
				newDay = day;
		}else if(day <= 99 && day > 9){
				newDay = "0"+day;
		}else{
			if(day < 9){
				newDay = "00"+day;
			}else{
				newDay = 999;
			}
		}
		var dayArr = (day.toString(10)).split("");
		
							for(i=0;i<3;i++){
								var numArr = _countDown(parseInt(dayArr[i]));
								var dom_name = "day0"+(i+1);
								var dom = $("."+dom_name);
								_doDom(dom,numArr);
							}
							
	}
					var _timeDom = function(timeArr){
						var newTimeArr = [];
						for(i=0;i<3;i++){
							if(timeArr[i] <= 9){
								newTimeArr[i] = "0"+timeArr[i];
							}else if(timeArr[i] <= 99 && timeArr[i] > 9){
								newTimeArr[i] = timeArr[i];
							}else{
								newTimeArr[i] = "99";
							}
						}
					  
						for(i=0;i<3;i++){
							var drawArr = ((newTimeArr[i]).toString(10)).split("");
							var dom_name;
							var dom;
							switch(i){
								case 0:
									dom_name = "hours0";
									break;
								case 1:
									dom_name = "minute0";
									break;
								case 2:
									dom_name = "second0";
									break;
							}
							
							for(j=0;j<2;j++){
								dom = $("."+dom_name+(j+1));
								var numArr = _countDown(parseInt(drawArr[j]));
								_doDom(dom,numArr);
							}
						}
						
						
					}
					var _doDom = function(dom,numArr){
						
						dom.find("span[class^=s]").removeClass("active");

						dom.find("span[class^=s]").each(function(key,val){
							if($.inArray(key,numArr) != -1){
								$(this).addClass("active");
							}	
						})
						
					}
					var _dateDiff = function(date1,date2){
						console.log(date1,date2);
						var type1 = typeof date1, type2 = typeof date2; 
						if(type1 == 'string') 
						date1 = _stringToTime(date1); 
						else if(date1.getTime) 
						date1date1 = date1.getTime(); 
						if(type2 == 'string') 
						date2 = _stringToTime(date2); 
						else if(date2.getTime) 
						date2date2 = date2.getTime(); 
						return (date1 - date2) / 1000;//结果是秒 
					}
					var _stringToTime = function(string){
						var f = string.split(' ', 2); 
						var d = (f[0] ? f[0] : '').split('-', 3); 
						var t = (f[1] ? f[1] : '').split(':', 3); 
						return (new Date( 
						parseInt(d[0], 10) || null, 
						(parseInt(d[1], 10) || 1)-1, 
						parseInt(d[2], 10) || null, 
						parseInt(t[0], 10) || null, 
						parseInt(t[1], 10) || null, 
						parseInt(t[2], 10) || null 
						)).getTime(); 
					}
					var _refreshTime = function(){
						var Today=new Date();
						var nowTime = Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate()+" "+Today.getHours()+":"+Today.getMinutes()+":"+Today.getSeconds();
						var dif = _dateDiff("2015-04-01 16:00:00",nowTime) 
						var day = Math.floor(dif/(24*60*60));
						var hour = Math.floor((dif%(24*60*60))/(60*60));
						var min = Math.floor(((dif%(24*60*60))%(60*60))/60);
						var sec = ((dif%(24*60*60))%(60*60))%60;

						_dayDom(day);
						var timeArr = [hour,min,sec];
						_timeDom(timeArr);
									
					}
	return {
		initialize: function(){
			// initialization
									setInterval(_refreshTime, 1000);
		}
	};
	
}())