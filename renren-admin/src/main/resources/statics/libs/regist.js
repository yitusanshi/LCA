function reset() {
    $("#userName").val("");
    $("#inputPassword1").val("");
    $("#inputPassword1").val("");
    $("#email").val("");
    $("#mobile").val("");
}

function submits() {
    console.log("已经可以提交了");
    var userName = $("#userName").val().trim();
    var inputPassword1 = $("#inputPassword1").val().trim();
    var inputPassword3 = $("#inputPassword3").val().trim();
    var email = $("#email").val().trim();
    var mobile = $("#mobile").val().trim();
    if (userName == "") {
        alert("用户名不能为空！")
        return;
    }
    if (inputPassword1 == "" || inputPassword3 == "") {
        alert("密码不能为空");
        return;
    }
    if (inputPassword1 != inputPassword3) {
        alert("两次密码输入不一致");
        return;
    }
    if (email == "") {
        alert("邮箱不能为空");
        return;
    }
    var emailReu = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailReu.test(email)) {
        alert("请输入正确的邮箱格式!");
        return;
    }
    var mobileReu = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if (!mobileReu.test(mobile)) {
        alert("手机号格式有误!");
        return;
    }
    console.log("开始请求");
    $.ajax({
        type: "POST",
        url: "sys/regist",
        async: false,
        data: {
            "userName": userName,
            "inputPassword1": inputPassword1,
            "inputPassword3": inputPassword3,
            "email": email,
            "mobile": mobile
        },
        dataType: "json",
        success: function (result) {
            console.log(result.code);
            if (result.code == "0") {
                alert("用户注册成功，联系管理员激活!\n联系人：张经理\n联系手机：13521606046\n联系电话：010-68588528-102\n联系邮箱：zhang.jichun@kejicc.com");
            } else {
                alert(result.msg);
            }
        }
    });

}