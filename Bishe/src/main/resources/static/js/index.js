let LoggedId  = -999
let loggedUsername = ""
//设置顶部导航栏不遮挡内容
var onResize = function () {
    $("body").css("padding-top", $(".navbar").height());
};



$(window).resize(onResize);
$(function () {
    onResize();
});

<!--    登录功能-->
$(document).on("click", "#btn_login",function () {
    const username = $("#username_input").val()
    const password = $("#password_input").val()
    // console.log(username)
    // console.log(password)
    const orign_data = {"username": username, "password": password}
    console.log("用户登陆时的用户信息",JSON.stringify(orign_data))
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/user/login',
        // 转化为字符串写入http包中
        data: JSON.stringify(orign_data),
        contentType: 'application/json',
        success: function (message) {
            if (message.code === 200) {
                // localStorage.setItem("user", message.data);
                // 跳转
                // location.href="http://localhost:8080/test.html";
                $("#btn_close_login").trigger('click');
                $("#nav_btn_login").hide()
                $("#nav_btn_signup").hide()
                $("#welcomeP").html("<img src=\"./icons/welcome.png\" alt=\"Login Icon\" width=\"40\" height=\"40\">&nbsp;&nbsp;&nbsp;&nbsp;")
                $("#welcomeP").after("<i class=\"far fa-user\" id=\"icon_user\"></i>")
                $("#myHomePage").text(username)
                $("#quit").html("<img src=\"./icons/logout.png\" alt=\"Login Icon\" width=\"25\" height=\"25\">退出")
                // $("#quit").text("退出")
                $("#quit").attr("class","btn btn-outline-secondary me-5")
                // console.log(message.data)
                LoggedId = message.data
                loggedUsername = username
                console.log(message.data)
                showMain()
                showAlert("登录成功！")
            }
            if (message.code === 500) {
                // 跳转
                alert("密码或者用户名错误请重试")
                $("#username_input").val("")
                $("#password_input").val("")
            }
        }
    })
})

//退出登录
$(document).on("click","#quit",function (){
    LoggedId = -999
    loggedUsername = ""
    $("#nav_btn_login").show()
    $("#nav_btn_signup").show()
    $("#welcomeP").text("")
    $("#icon_user").remove()
    $("#myHomePage").text("")
    $("#quit").text("")
    $("#quit").removeClass("btn btn-outline-secondary me-5")
    showMain()
    showAlert("退出成功！")

})

//选项卡响应
$(document).on("click",".dropdown-item", function () {//绑定事件后面的函数必须是function，function里面再引用需要调用的函数
    console.log("选项卡响应")
    const category = $(this).text()
    const bigstage = $(this).parent().prev().text()
    // console.log(category)
    // console.log(bigstage)
    console.log("选项卡响应"+bigstage)
    optReact(bigstage, category)
})

//点击首页选项回到首页
$(document).on("click", "#opt_ind",function () {//绑定事件后面的函数必须是function，function里面再引用需要调用的函数
    showMain()
})

$(document).on("click", "#opt_Test",function () {
    // console.log("进入我的主页")
    hideAll();
    $.ajax({
        url: 'homePage.txt',
        success: function (data) {
            // console.log(data)
            $("#home").html(data)
            if ($('#home').is(':hidden')) {
                $('#home').show()
            }
            // loadCourses(bigstage, category);
        }
    })
})

//点击进入我的主页
$(document).on("click","#myHomePage", function () {
    // console.log("进入我的主页")
    hideAll()
    // console.log(username)
    $.ajax({
        url: 'homePage.txt',
        success: function (data) {
            // console.log(data)
            console.log("主页数据")
            $("#home").html(data)
            if ($('#home').is(':hidden')) {
                $('#home').show()
            }
            getMyInfo(LoggedId);
        }
    })
})
// document.querySelectorAll(".addInfo")

//点击课程卡片进行视频播放
$(document).on('click', '.courseLink', function() {
    hideAll()
    const this_link = $(this)
    $.ajax({
        url: 'courseVideo.txt',
        success: function (data) {
            // console.log(data)
            $("#videoDiv").html(data)
            if ($('#videoDiv').is(':hidden')) {
                $('#videoDiv').show()
            }
            //获取课程id
            const cid = this_link.attr("cid")
            $("#videoDiv").attr("thisCourseId",cid)
            // loadCourses(bigstage, category);
            const course = CourseVideoByid(cid)
            // console.log(course)

        }
    })
});

//点赞和收藏按钮
$(document).on("click",".like",function (){
    // console.log(LoggedId)
    const thisCourseId=$("#videoDiv").attr("thisCourseId")
    if(LoggedId>-999){
        //没点赞时，点击点赞
        if (!$(this).hasClass('active')) {
            //点赞该课程，将收藏图标变色
            $(this).addClass('active')
            //获取当前视频的课程id
            $.ajax({//更新点赞数据库
                url: "http://localhost:8080/user/addLike",
                method: "POST",
                data: {
                    uid: LoggedId,
                    cid: thisCourseId
                },
                success: function(message) {
                    if (message.code===200){
                        $.ajax({//更新课程数据中的该课程的点赞数
                            url : "http://localhost:8080/course/updateAddLikeNum",
                            method:"POST",
                            data:{
                                cid : thisCourseId
                            },
                            success:function (message1){
                                if(message1.code===200){
                                    // console.log("点赞成功，后端数据库更新完成")
                                    console.log($(".likeNum").text())
                                    $(".likeNum").text(Number($(".likeNum").text())+1)
                                }
                            }
                        })
                        console.log("点赞成功"+message)
                    }
                    if(message.code===500){
                        console.log(message)
                    }
                }
            })
        }else{//已经收藏时，点击取消收藏
            $(this).removeClass('active')
            //获取当前视频的课程id
            $.ajax({//更新点赞数据库
                url: "http://localhost:8080/user/minLike",
                method: "POST",
                data: {
                    uid: LoggedId,
                    cid: thisCourseId
                },
                success: function(message2) {//取消点赞成功
                    if (message2.code===200){
                        $.ajax({//更新课程数据中的该课程的收藏数
                            url : "http://localhost:8080/course/updateMinLikeNum",
                            method:"POST",
                            data:{
                                cid : thisCourseId
                            },
                            success:function (message1){
                                if(message1.code===200){
                                    // console.log("取消点赞成功，后端数据库更新完成")
                                    console.log($(".likeNum").text())
                                    $(".likeNum").text(Number($(".likeNum").text())-1)
                                }
                            }
                        })
                        console.log("取消点赞成功"+message2)
                    }
                    if(message2.code===500){
                        console.log(message2)
                    }
                }
            })
        }
    }else{
        showAlert("请先登录")
    }
})
$(document).on("click",".favorite",function (){
    // console.log(LoggedId)
    const thisCourseId=$("#videoDiv").attr("thisCourseId")
    if(LoggedId>-999){
        //没收藏时，点击收藏
        if (!$(this).hasClass('active')) {
            //收藏该课程，将收藏图标变色
            $(this).addClass('active')
            //获取当前视频的课程id
            $.ajax({//更新收藏夹数据库
                url: "http://localhost:8080/user/colFavorites",
                method: "POST",
                data: {
                    uid: LoggedId,
                    cid: thisCourseId
                },
                success: function(message) {
                    if (message.code===200){
                        $.ajax({//更新课程数据中的该课程的收藏数
                            url : "http://localhost:8080/course/updateAddColNum",
                            method:"POST",
                            data:{
                                cid : thisCourseId
                            },
                            success:function (message1){
                                if(message1.code===200){
                                    console.log("收藏成功，后端数据库更新完成")
                                    console.log($(".colNum").text())
                                    $(".colNum").text(Number($(".colNum").text())+1)
                                }
                            }
                        })
                        console.log("收藏成功"+message)
                    }
                    if(message.code===500){
                        console.log(message)
                    }
                }
            })
        }else{//已经收藏时，点击取消收藏
            $(this).removeClass('active')
            //获取当前视频的课程id
            $.ajax({//更新收藏夹数据库
                url: "http://localhost:8080/user/cancelFavorites",
                method: "POST",
                data: {
                    uid: LoggedId,
                    cid: thisCourseId
                },
                success: function(message2) {//取消收藏成功
                    if (message2.code===200){
                        $.ajax({//更新课程数据中的该课程的收藏数
                            url : "http://localhost:8080/course/updateMinColNum",
                            method:"POST",
                            data:{
                                cid : thisCourseId
                            },
                            success:function (message1){
                                if(message1.code===200){
                                    console.log("取消收藏成功，后端数据库更新完成")
                                    console.log($(".colNum").text())
                                    $(".colNum").text(Number($(".colNum").text())-1)
                                }
                            }
                        })
                        console.log("取消收藏成功"+message2)
                    }
                    if(message2.code===500){
                        console.log(message2)
                    }
                }
            })
        }
    }else{
        showAlert("请先登录")
    }
})

//更改个人信息
$(document).on("click","#editor_btn",function (){
    const ageSelect = document.getElementById("editor_age");
    ////将1-100年龄渲染在下拉列表中
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        ageSelect.appendChild(option);
    }
    $("#submit_new").on("click",function (){
        let flag1 = 1//表示输入的数据是否合法，1表示合法，0表示不合法，默认为合法
        let flag2 = 0 //表示信息有无更新，0表示无更新，1表示有更新
        let flag3 = 0 //表示名字是否修改
        //获取各个表单的值
        const editor_username = $("#editor_username").val()
        const editor_age = $("#editor_age option:selected").val()
        const editor_education = $("#editor_education option:selected").val()
        const editor_phone = $("#editor_phone").val()
        const editor_sex = $("#editor_sex option:selected").val()
        const editor_school = $("#editor_school").val()
        //获取旧信息
        const oldInfos = $(".addInfo")
        let olds = []
        oldInfos.each(function() {
            var text = $(this).text()
            // console.log(text)
            olds.push(text)
        })
        let data = {}
        if(editor_username==''){
            data["username"] = olds[0]
        }else{
            //'输入不合法,请输入6~10位'
            if(!verifyName(editor_username)){
                alert('用户名输入不合法,请输入6~10位字符')
                flag1=0
            }else{//判断用户名是否存在
                if(userIsExist(editor_username)){//用户已经存在
                    flag1 = 0
                    alert("该用户已经存在，请更换用户名")
                }else{
                    data["username"] = editor_username
                    flag2 = 1
                    flag3 = 1
                }
            }
        }
        if(editor_age=="请选择年龄"){
            data["age"] = Number(olds[1])
        }else{
            data["age"] = Number(editor_age)
            flag2=1
        }
        if(editor_phone==''){
            data["phone"] = olds[3]
        }else{
            console.log(editor_phone)
            if(!verifyPhone(editor_phone)){
                alert('输入不合法,请输入正确的11位手机号码')
                flag1 = 0
            }else{
                data["phone"] = editor_phone
                flag2=1
            }
        }
        if (editor_sex=="请选择性别"){
            data["gender"] = olds[2]
        }else{
            console.log(editor_sex)
            data["gender"] = editor_sex
            flag2=1
        }
        if(editor_school==''){
            data["schoolname"] = olds[5]
        }else{
            console.log(editor_school)
            data["schoolname"] = editor_school
            flag2=1
        }
        if(editor_education=="请选择学习阶段"){
            data["stage"] = olds[4]
        }else{
            console.log(editor_education)
            data["stage"] = editor_education
            flag2=1
        }
        console.log(flag2)
        if(flag1!=0&&flag2==0){//数据没有不合法，但是没有更新数据
            alert("未更新任何信息")
        }else {

            if (flag2 == 1 && flag1 == 1) {//数据有新的输入并且合法
                data["id"] = LoggedId
                // const dataJson = JSON.stringify(data)
                console.log("需要更换的信息格式正确")
                $("#close_modal_update").trigger('click')
                // console.log("更新完后端数据返回的信息",updateUserInfo(data))
                if(updateUserInfo(data)===true){
                    showAlert("用户信息更新完成")
                    $("#myHomePage").trigger("click")
                    if(flag3==1){//用户名修改了
                        console.log("修改后的用户名",data["username"])
                        $("#myHomePage").text(data["username"])
                    }

                }
            } else {
                console.log("需要更换的信息格式有误")
            }
        }
    })
})

//发表评论
$(document).on("click","#submit_comment",function (){
    if(LoggedId==-999){//未登录
        showAlert("请登录后发表评论")
    }else{
        console.log("评论区内容：",$("#comment_text").val())
        if($("#comment_text").val()==""){
            showAlert("请输入您的评论")
        }else{
            const comment = {}
            console.log("课程的id",$("#videoDiv").attr("thiscourseid"))
            console.log("当前时间",getNowTime())
            comment["courseid"] = Number($("#videoDiv").attr("thiscourseid"))
            comment["content"] = $("#comment_text").val()
            comment["time"] = getNowTime()
            comment["username"] = loggedUsername
            console.log("这是传入后台的数据",comment)
            $.ajax({
                method: "POST",
                url: 'http://localhost:8080/comment/addComment',
                // 转化为字符串写入http包中
                data: JSON.stringify(comment),
                contentType: 'application/json',
                success:function (message){
                    if(message.code===200){
                        RenderingComments(Number($("#videoDiv").attr("thiscourseid")))
                        showAlert("评论成功")
                        $("#comment_text").val("")
                        //后台更新用户评论数据
                        addOneComment()
                    }else{
                        showAlert("评论失败")
                    }
                }
            })
        }

    }
})

//课程视频选集
$(document).on("click",".serial",function (){
    const serialA = $(this).children("a")
    console.log("选集选项下的a标签",serialA)
    const src = serialA.attr("src")
    console.log("a标签里的src", src)
    $("#courseVideo").attr("src",src)
})

//提示框弹出
function showAlert(text) {
    const alertBox = $("#alertBox");
    const boxP = $("#alertBox p");
    boxP.text(text);
    alertBox.css("display", "block");
    setTimeout(function() {
        alertBox.css("top", "-100px");
    }, 3000);
    setTimeout(function() {
        alertBox.css("display", "none");
    }, 3500);
    setTimeout(function() {
        alertBox.css("top", "50px");
    }, 0);
}

//渲染课程模块与后端的连接
function optReact(bigstage, category) {
    console.log("渲染课程模块与后端的连接"+bigstage)
    hideAll()
    // console.log(opt.text())//val提取表单元素内容，text提取非表单元素内容
    $.ajax({
        url: 'priSch.txt',
        success: function (data) {
            // console.log(data)
            $("#school").html(data)
            if ($('#school').is(':hidden')) {
                $('#school').show()
            }
            loadCourses(bigstage, category);
        }
    })
}

//显示主页面
function showMain() {
    hideAll()
    $("#index_html").show()
    $("#recommend_index").show()
}

//处理顶部导航栏和底部全都隐藏
function hideAll() {
    $("#videoDiv").hide().trigger('hide')
    $("main").children().hide()
    $("#school").empty()
    $("#home").empty()
    $("#courseContainer").empty()
    $("#videoDiv").empty()
    $("main").children("#header").show()
    $("body").children("footer").show()
}

//渲染课程板块
function loadCourses(bigstage, category) {

    console.log("渲染课程模块与后端的连接"+bigstage)
    orign_data = {"bigstage": bigstage, "category": category}
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/course/load',
        // 转化为字符串写入http包中
        data: JSON.stringify(orign_data),
        contentType: 'application/json',
        success: function (message) {
            if (message.code === 200) {
                $("#opt_recommend p").html("<img src=\"./icons/course.png\" alt=\"Login Icon\" width=\"25\" height=\"25\">&nbsp;&nbsp;&nbsp;"+bigstage + category + "课程")
                RenderingPriCoursediv(message.data)

            }
            if (message.code === 500) {
                showAlert("加载失败")
            }
        }
    })
}

//根据后端的data数据以渲染一个课程板块
function RenderingPriCoursediv(data) {
    const info = "测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。测试语句，，没有意义，仅用于填充内容。"
    let str = ""
    const str1 = "<div class=\"col card_div\"><a class=\"courseLink\" cid=\""
    const str2 = "\"><div class=\"card h-100\"> <img src=\"./"
    const str3 =  "\" class=\"card-img-top\" alt=\"...\"><div class=\"card-body\"><h5 class=\"card-title\">"
    const str4 = "</h5> <p class=\"card-text overflow-hidden\" title=\"" + info
    const str5 = "\">" + info + "</p></div></div></a></div>"
    for (let i = 0; i < data.length; i++) {
        str += str1+data[i].id+str2+ data[i].coverimgurl+str3+ data[i].cname+str4 +str5
    }
    $(".recommend_inner_div").html(str)
}

//从后端获取个人信息，并渲染至前端
function getMyInfo(id){
    const orign_data = {"id": id}
    console.log("打印个人信息",JSON.stringify(orign_data))
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/user/getById',
        // 转化为字符串写入http包中
        data: JSON.stringify(orign_data),
        contentType: 'application/json',
        success: function (message) {
            if (message.code === 200) {
                const datas = new Array()
                let i=0
                //将json格式数据写入数组
                for(let key in message.data){
                    datas[i]=message.data[key]
                    i++
                }
                console.log("个人主页展示个人信息",datas)
                //将个人信息渲染在个人信息板块
                const infos = document.querySelectorAll(".addInfo")
                infos.forEach(info => {
                    if (info.parentElement.textContent.includes("用户名")) {
                        info.textContent = datas[1];
                    } else if (info.parentElement.textContent.includes("年龄")) {
                        info.textContent = datas[4];
                    } else if (info.parentElement.textContent.includes("性别")) {
                        info.textContent = datas[7];
                    } else if (info.parentElement.textContent.includes("手机号")) {
                        info.textContent = datas[6];
                    } else if (info.parentElement.textContent.includes("教育阶段")) {
                        info.textContent = datas[5];
                    } else if (info.parentElement.textContent.includes("学校")) {
                        info.textContent = datas[8];
                    }
                });
                // console.log($("#studyTime"))
                // console.log( $("#commentNum"))
                $("#commentNum").text(datas[10])
                //从后台获取收藏夹
                $.ajax({
                    method: "POST",
                    url: 'http://localhost:8080/user/getFavorites',
                    data:JSON.stringify({"id": datas[0]}),
                    contentType: 'application/json',
                    // 转化为字符串写入http包中
                    success: function (message1){
                        if(message1.code===200){
                            // console.log("请求成功！")
                            console.log(message1.data)
                            getCourseByids(message1.data)
                        }
                        if (message1.code===500){
                            console.log("请求失败")
                        }
                    }
                })
            }
            if (message.code === 500) {
                showAlert("获取失败")
            }
        }
    })
}

//通过id获取数据库中课程数据并渲染给前端
function getCourseByids(ids){
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/course/getCourseByids',
        // 转化为字符串写入http包中
        data: JSON.stringify(ids),
        contentType: 'application/json',
        success:function (message){
            // console.log(message.code)
            // console.log(message.data)
            RenderingPriCoursediv(message.data);
        }
    })
}

//通过id获取数据库中课程数据并在播放视频页面更新数据
function CourseVideoByid(id) {
    const ids = [id]
    // console.log("通过id获取数据库中课程数据",JSON.stringify(ids))
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/course/getCourseByids',
        // 转化为字符串写入http包中
        data: JSON.stringify(ids),
        contentType: 'application/json',
        success:function (message){
            //渲染选集板块
            console.log("渲染选集板块")
            RenderingRangeVideo(id)
            console.log("显示课程信息",message.data)
            $(".brief_intro h2").html("<img src=\"./icons/open-book.png\" alt=\"Login Icon\" width=\"35\" height=\"35\">&nbsp&nbsp"+message.data[0].cname)
            console.log(message.data[0].intro)
            $("#courseIntro").text(message.data[0].intro)
            $(".brief_intro .publishDate").text(message.data[0].publishdate)
            $(".likeNum").text(message.data[0].likenum)
            $(".colNum").text(message.data[0].colnum)
            //渲染评论区
            RenderingComments(id)
            // console.log(LoggedId)
            if(LoggedId>-999){//已经登录的用户，检查是否收藏此视频
                $.ajax({
                    url: "http://localhost:8080/user/isFavorites",
                    method: "POST",
                    data: {
                        uid: LoggedId,
                        cid: id
                    },
                    success: function(message) {
                        if (message.code===200){
                            //该用户已经收藏该课程，将收藏图标变色
                            console.log("收藏夹查询成功"+message)
                            if (!$('.favorite').hasClass('active')) {
                                $('.favorite').addClass('active');
                            }
                        }
                        if(message.code===500){
                            console.log(message)
                        }

                    }
                });
                $.ajax({//已经登录的用户，检查是否点赞此视频
                    url: "http://localhost:8080/user/isLikes",
                    method: "POST",
                    data: {
                        uid: LoggedId,
                        cid: id
                    },
                    success: function(message) {
                        if (message.code===200){
                            //该用户已经收藏该课程，将收藏图标变色
                            console.log("收藏夹查询成功"+message)
                            if (!$('.like').hasClass('active')) {
                                $('.like').addClass('active');
                            }
                        }
                        if(message.code===500){
                            console.log(message)
                        }
                    }
                });
            }
        }
    })
}

//渲染课程视频选集模块
function RenderingRangeVideo(cid){
    const data = GetVideosByCid(cid)
    let str = ""
    $("#courseVideo").attr("src",data[0].videourl)
    for (let i = 0; i < data.length; i++) {
        console.log("循环渲染集数数据",data[i].videoName)
        str = "<li class=\"serial\" style=\"font-size: 17px\"><a src=\""+data[i].videourl+"\"></a>P"+data[i].serialNumber+"&nbsp;&nbsp;&nbsp;"+data[i].videoName+"</li>"
        $("#serialUl").append(str)
    }
}

function GetVideosByCid(cid){
    let data = []
    $.ajax({
        url: "http://localhost:8080/video/getVideosByCid",
        method: "POST",
        data: {
            cid: cid
        },
        async:false,
        success:function (message){
            console.log("获取到的视频选集，",message.data);
            data = message.data
            console.log("data获取到的视频选集，",data);
        }
    })
    return data
}

//渲染评论区的函数
function RenderingComments(cid){
    //获取评论区内容
    const comments = getComments(cid)
    console.log("回传到渲染函数里的数据",comments)
    //将评论区内容显示在前端
    const ul = $(".list-group-comments")
    ul.empty()
    let li = ""
    for (let i = 0; i < comments.length; i++) {
        li = " <li class=\"list-group-item mt-2\">\n" +
            "                    <div class=\"d-flex justify-content-between align-items-center\">\n" +
            "                        <h6 class=\"mb-1\">用户：<span  class=\"comment_username\">"+(comments[i])["username"]+"</sapn></h6>\n" +
            "                        <small class=\"text-muted comment_time\">"+(comments[i])["time"]+"</small>\n" +
            "                    </div>\n" +
            "                    <p class=\"mb-1 comment_comment\">"+(comments[i])["content"]+"</p>\n" +
            "                </li>"
        ul.append(li)
    }
}

//验证手机号是否符合规范
function verifyPhone(phone) {
    // console.log(11)
    // 2.4 定规则  用户名
    const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if (!reg.test(phone)) {
        // console.log(11)
        return false
    }
    // 2.5 合法的 就清空span
    return true
}

//验证用户名是否合法
function verifyName(username) {
    // 定规则  用户名
    const reg = /^[a-zA-Z0-9-_]{6,10}$/
    if (!reg.test(username)) {
        return false
    }
    // 合法的 就清空span
    return true
}

//根据用户名查询用户是否存在
function userIsExist(username){
    $.ajax({
        url: 'http://localhost:8080/user/isExist',
        data:{
            username:username
        },
        method:'POST',
        success:function (message){
            if(message.code===200){
                return true
            }else{
                return false
            }
        }
    })
}

//后端数据库更新个人信息
function updateUserInfo(info){
    console.log("打印信息",info)
    let mes = false
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/user/updateUserInfo',
        // 转化为字符串写入http包中
        data: JSON.stringify(info),
        async: false, //设置为同步请求
        contentType: 'application/json',
        success:function (message){
            if(message.code===200){
                console.log("后端已经更新完成")
                mes = true
            }else{
                console.log("后端更新失败")
                mes = false
            }
        }
    })
    return mes
}

//获取当前时间
function getNowTime() {
    const date = new Date();
    //年 getFullYear()：四位数字返回年份
    const year = date.getFullYear();  //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    const month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    const day = date.getDate();
    //时 getHours()：(0 ~ 23)
    const hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    const minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    const second = date.getSeconds();

    const time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}

//小于10的拼接上0字符串
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}

//获取课程的评论
function getComments(cid){
    const data = []
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/comment/getComments',
        // 转化为字符串写入http包中
        data: {cid:cid},
        async:false,
        success: function (message) {
            if (message.code === 200) {
                console.log("获取到课程的评论如下：",message.data[0])
                for (let i =0;i<message.data.length;i++) {
                    data.push(message.data[i])
                }
            }
            if (message.code === 500) {
                showAlert("获取课程"+cid+"的评论失败")
            }
        }
    })
    return data
}

//评论数加1
function addOneComment(){
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/user/addOneComment',
        // 转化为字符串写入http包中
        data: {uid:LoggedId},
        success: function (message) {
            if (message.code===200){
                console.log("后台id为"+LoggedId+"的用户评论数已经加1")
            }else{
                console.log("后台id为"+LoggedId+"的用户评论数加1失败")
            }
        }
    })
}

