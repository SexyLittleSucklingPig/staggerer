$(function () {
    const layer = layui.layer;
    const form=layui.form;
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取文章内容失败");
                layer.msg("获取文章内容成功");
                const htmlstr = template("tpl-table", res);
                $("tbody").empty().html(htmlstr);

            }
        })
    }
    initArtCateList();
    let indexAdd = null;
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $("#dialog-add").html(),
        });
    });

    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg("新增失败");
                layer.msg("新增成功");
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    });

    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });

        var id=$(this).attr("data-id");
        $.ajax({
            type: "GET",
            url:"/my/article/cates/" + id,
            success: function (res){
              form.val("form-edit",res.data);
            }
        })
    });
    $("body").on("submit", "#form-edit",function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !==0)return layer.msg("更新分类数据失败！");
                layer.msg("更新分类数据成功！");
                //关闭提示窗口
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    });

    //删除事件
    $("tbody").on("click","#btn-delete",function() {
        var id=$(this).attr("data-id");
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                method: "GET",
                url:"/my/article/deletecate/" + id,
                success: function (res) {
                    if(res.status !==0)return layer.msg("删除失败");
                    layer.msg("删除成功");
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
        
    })
})