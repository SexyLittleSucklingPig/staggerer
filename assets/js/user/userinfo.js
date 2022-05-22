$(function () {
    const form = layui.form;
    form.verify({
        nikname: (function (val) {
            if (val.length > 0) {
                return "昵称长度必须在 1 ~ 6 个字符之间！";
            }
        })
    });

    const initUserinfo = function () {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                layer.msg("获取用户信息成功！")
                form.val("formUserInfo", res.data);
            }, 
        });
    };
    initUserinfo();

    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserinfo()
    });
    $(".layui-form").on("submit",function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !==0)return layer.msg("获取信息失败！");
                layer.msg("获取信息成功！")
                window.parent.getUserInfo();

            }
        })
    })
})