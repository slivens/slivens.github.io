/*
 * @Author: Administrator
 * @Date:   2017-10-15 01:42:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-16 20:59:04
 */

let flag = true;
let tbody;
$(function() {
    /**
     * [func description]  封装函数 添加图书信息
     * @return {[type]} [description]
     */
    function func() {

        let book = $('#book').val();
        flag = false;
        
        tbody = $('table tbody');
        if (book === "") {

            return;
        }
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback:'show',
            url: 'https://api.douban.com/v2/book/search',
            data: {

                "q": book,
                "start":0,
                "count": 10

            },
            success: function(data) {
                let reslut = data;
                let bookname = reslut.books;
                console.log(bookname);
                tbody.html("");
                for (let i = 0; i < 10; i++) {
                    let tr = $('<tr></tr>>');
                    tbody.append(tr);
                    let index = tr.index();
                    tr.html('<th>' + (index + 1) + '</th>' + '<td>' + bookname[i].title + '</td>' + '<td>' + bookname[i].author + '</td>' + '<td>' + bookname[i].pubdate + '</td>' + '<td>' + bookname[i].rating.average + '</td>' + '<td>' + bookname[i].price + '</td>');

                }

                console.log(tbody.html() === "");
            },

            error: function(data) {
                alert("您的错误代码是:" + data);


            }
        })
        // 
    

     
    } //func结束

    $('#find').on('click', func); //search点击
     /**
     * [description] 回车键事件
     * @param  {[type]} e){                     if(e.which [description]
     * @return {[type]}      [description]
     */
    $(document).on('keyup', function(e) { if (e.which ===13) { func(); } })


    // 分页操作点击
    
    let page = 10; //  初始化一页显示的条数
    let link=$('li a').length;
    console.log(link);
    for (let i =0; i < link; i++) {
       
     $('li a').eq(i).on('click', function() {
            let book = $('#book').val();
            flag = false;
            let pageindex = i; //把按钮参数传出
            console.log(pageindex);
            
            tbody = $('table tbody');
            if (book ==="") {

                return;
            }
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback:'myshow',
                url: 'https://api.douban.com/v2/book/search',
                data: {

                    "q": book,
                    "start":pageindex,
                    "count":10

                },
                beforeSend: function() {
                        $("i").animate({ opacity: "1" });
                    },
                success: function(data) {
                    let reslut = data;
                    let bookname = reslut.books;
                    console.log(bookname);
                    tbody.html("");
                    
                    for (let i = 0; i < 10; i++) {
                        let tr = $('<tr></tr>>');
                        tbody.append(tr);
                        let index = tr.index();
                        
                        tr.html('<th>' + (index + 1 + (pageindex * page))
                         + '</th>' + '<td>' + bookname[i].title + '</td>' +
                          '<td>' + bookname[i].author + '</td>' + '<td>' +
                           bookname[i].pubdate + '</td>'
                        + '<td>' + bookname[i].rating.average + '</td>' + '<td>' + bookname[i].price + '</td>');

                    }
                    $("i").animate({ opacity: "0" });

                    console.log(tbody.html() ==="");
                },

                error: function(data) {
                    alert("您的错误代码是:" + data);


                }
            })

        })
    }
})


                  // 原先写法
 //    $('li a').eq(i).on('click', function() {
        //     let book = $('#book').val();
        //     flag = false;
        //     let pageindex = i; //把按钮参数传出
        //     console.log(pageindex);
            
        //     tbody = $('table tbody');
        //     if (book ==="") {

        //         return;
        //     }
        //     $.ajax({
        //         type: 'GET',
        //         dataType: 'jsonp',
        //         jsonp: 'callback',
        //         jsonpCallback:'show2',
        //         url: 'https://api.douban.com/v2/book/search',
        //         data: {

        //             "q": book,
        //             "start":i,
        //             "count": 100

        //         },
        //         beforeSend: function() {
        //                 $("i").animate({ opacity: "1" });
        //             },
        //         success: function(data) {
        //             let reslut = data;
        //             let bookname = reslut.books;
        //             console.log(bookname);
        //             tbody.html("");
                    
        //             for (let i = pageindex * page - 10; i < pageindex * page; i++) {
        //                 let tr = $('<tr></tr>>');
        //                 tbody.append(tr);
        //                 let index = tr.index();
        //                 console.log(pageindex * page - 10);
        //                 tr.html('<th>' + (index + 1 + (pageindex * page - 10))
        //                  + '</th>' + '<td>' + bookname[i].title + '</td>' +
        //                   '<td>' + bookname[i].author + '</td>' + '<td>' +
        //                    bookname[i].pubdate + '</td>'
        //                 + '<td>' + bookname[i].rating.average + '</td>' + '<td>' + bookname[i].price + '</td>');

        //             }
        //             $("i").animate({ opacity: "0" });

        //             console.log(tbody.html() ==="");
        //         },

        //         error: function(data) {
        //             alert("您的错误代码是:" + data);


        //         }
        //     })

        // })