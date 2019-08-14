$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/lcadict/list',
        datatype: "json",
        colModel: [
            {label: '备注', name: 'remark', index: 'remark', width: 80},
            {label: '字典值', name: 'value', index: 'value', width: 80},
            {label: '行业名称', name: 'name', index: 'name', width: 80},
            {label: '添加时间', name: 'type', index: 'type', width: 80},
            {label: '备注', name: 'code', index: 'code', width: 80}
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            name: null
        },
        showList: true,
        title: null,
        dict: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.dict = {};
        },
        update: function (event) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            var url = vm.dict.id == null ? "sys/lcadict/save" : "sys/lcadict/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.dict),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/lcadict/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "sys/lcadict/info/" + id, function (r) {
                vm.dict = r.dict;
            });
        },
        reload: function (event) {
            alert(11);
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                'typeid': 1
                },
                page: page
            }).trigger("reloadGrid");
        }

    }
});