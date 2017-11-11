		/**
		 * 变量定义
		 */
		let flag = 1;
		let bookName = null;
		let page = 0;
		let page_num = 0;
		/**
		 * 回到顶部按钮点击函数
		 * @param  
		 * @return  
		 */
		$('#top').click(function(){
			$("html,body").animate({"scrollTop": "0px"}, 2000);
		});
		/**
		 * 输入框焦点事件函数
		 * @param  
		 * @return 
		 */
		$('#input1').focus(function(){
			flag=0;
		});
		/**
		 * 搜索键点击功能函数
		 * bookName
		 * @param  	                             		             
		 * @return 
		 */
		$('#btn1').click(function(){
			bookName = $('#input1').val();
			page_num = 0;
			$('#right_span').html(`${page_num+2}&gt;`);
			$('#left_span').html(`&lt;${page_num+1}`);
			ajax(bookName);			  
		})

		/**
		 * 上一页按钮点击函数
		 * @param 
		 * @return
		 */
		$('#left').click(function(){
			page_num = parseInt($('#right_span').html())-2;
			console.log(page_num)
			if(page_num<1){
				page_num=0;
				$('#right_span').html(`${page_num+2}&gt;`);
				$('#left_span').html(`&lt;${page_num+1}`);
			}
			else{
				page_num--;
				ajax(bookName);
				$('#right_span').html(`${page_num+2}&gt;`);
				$('#left_span').html(`&lt;${page_num+1}`);
			}
		});
		/**
		 * 下一页按钮点击函数
		 * @param 
		 * @return
		 */
		$('#right').click(function(){
			page_num = parseInt($('#right_span').html())-1;
			console.log('1:'+page_num);
			
			if(page_num>page-1|| isNaN(page_num)){
				page_num=page-1;
				$('#right_span').html(`末页&gt;`);
				$('#left_span').html(`&lt;${page_num+1}`);
				return;
			}
			else if(page_num===page-1){
				page_num=page-1;
				ajax(bookName);
				$('#right_span').html(`末页&gt;`);
				$('#left_span').html(`&lt;${page_num+1}`);
			}
			else{
				ajax(bookName);
				page_num++;
				$('#right_span').html(`${page_num+1}&gt;`);
				$('#left_span').html(`&lt;${page_num}`);

			}
			console.log('2:'+page_num)

			
		});
		
		/**
		 * ajax请求数据函数
		 * @return {[type]} [description]
		 */
		function ajax(bookName){
			$.ajax({
			    type: 'get',
			    url: 'https://api.douban.com/v2/book/search',// 豆瓣图书api
			    dataType: 'jsonp',
			    data: {
			      'q': bookName,
			      'count':20,
			      'start':page_num
			    },
			    beforeSend:function(){
			    	$('#title').css({'display':'none'});
			        $('#result').css({'display':'none'});
			        $('#result_title').html('<img src="./img/loading7.gif" >');
			    },
			    success:function (data){
			      	let html = '',
			            books = data.books
			      		;
			        page = Math.ceil((data.total)/20);

			      	if(data.books.length===0){
			          	let html = '';
			          	html = '没有找到相关书籍!'
			          	$('#title').css({'display':'none'});
			          	$('#result').css({'display':'block'});
			    		$('#result').empty();
			            $('#result_title').html(html);
			            $('#result').css({height:'100vh'})
			      	}
			      	else{
			      	    books.forEach( function ( value, index ) {
			          	let image = value.image.replace('http://','');
			    		$('#result').empty();
			            html  += `<div>
			                   <h1><a href="${value.alt}">${value.title}</a></h1><br>
			                   <img src="${image}"></img>
			                   <div><span>作者:&nbsp;&nbsp;${value.author}</span><br>
			                   <span>出版日期:&nbsp;&nbsp;${value.pubdate}</span><br>
			                   <span>平均分:&nbsp;&nbsp;${value.rating.average}</span><br>
			                   <span>价格:&nbsp;&nbsp;<a>${value.price}</a></span><br></div>
			                   </div><br>`;  

			          	})
			            $('#title').css({'display':'none'});
			            $('#result').css({'display':'block'});
			            $("html,body").animate({"scrollTop": "100px"}, 1000);
			            $('#result_title').html(`为您搜索到${data.total}条内容`);
			            $('#result').html(html);
			            $('#total').html(`(共${page}页)`);
			            $('.page').css({'display':'block'});
			            $('#input1').val('');
			      	}
			    },
			    error:function(){
			    	$('#title').css({'display':'none'});
			        $('#result').css({'display':'block'});
			        $("html,body").animate({"scrollTop": "100px"}, 1000); 
			        $('#result_title').html('error');
			    }
			});
		}
		/**
		 * 键盘enter键功能函数
		 * @param
		 * @return 
		 */
		$(window).keydown(function(e){	//enter键功能
			if(!e){
		        e=window.event;
		    }
	        if((e.keyCode||e.which)===13 && flag==0){
				$('#btn1').click();
	    	}
		});

		/**
		 * 滚动监听事件函数
		 * 当滚动条向下滚动 回到顶部的按钮出现
		 * 当滚动条已经到达顶部 回到顶部的按钮消失                                  
		 */
		$(window).scroll(function(){
			if($("html,body").scrollTop()>0){
		        $('#top').css({'display':'block'})
		    }
		    else if($("html,body").scrollTop()<=1){
		        $('#top').css({'display':'none'})
		    }
		});