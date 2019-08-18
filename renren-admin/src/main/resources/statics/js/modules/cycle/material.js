$(function () {
    $("#menuMaterialTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "json",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '原材料名称', name: 'name', iddex: 'name', width: '80px'},
            {label: '使用量', name: 'usage', index: 'usage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],

        postData: {"batchNo": vm.batchSelect},
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
            $("#menuMaterialTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});
var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        bNo: "",
        bName: "",
        usageStatistics: {},
        batchNos: [],
        batchSelect: "-1"
    },
    mounted() {
        this.getBatchNo();
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.usageStatistics = {};
        },
        adds: function () {
            alert("出现的值是：");
        },
        addBatchNo: function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "新增批次号",
                area: ['550px', '270px'],
                shadeClose: false,
                content: jQuery("#batchNo"),
                btn: ['保存', '取消'],
                btn1: function (index) {
                    var data = "batchNo=" + vm.bNo + "&batchName=" + vm.bName;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/batch/save",
                        data: data,
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 0) {
                                layer.close(index);
                                layer.alert('保存成功', function (index) {
                                    location.reload();
                                });
                            } else {
                                layer.alert(result.msg);
                            }
                        }
                    });
                }
            });
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
        getBatchNo: function () {
            $.ajax({
                method: 'post',
                url: baseURL + "sys/batch/getBatch",
                contentType: "application/json",
                datatype: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.batchNos = r.batchNos;
                    } else {
                        alert(r.msg);
                    }
                },
            });
        },
        selectBatchAndUserId: function (e) {
            this.batchSelect = vm.batchSelect;
            vm.reload();
        },
        saveOrUpdate: function (event) {
            $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function () {
                var url = vm.usageStatistics.id == null ? "sys/usagestatistics/save" : "sys/usagestatistics/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.usageStatistics),
                    success: function (r) {
                        if (r.code === 0) {
                            layer.msg("操作成功", {icon: 1});
                            vm.reload();
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        } else {
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }
            var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                if (!lock) {
                    lock = true;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/usagestatistics/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code == 0) {
                                layer.msg("操作成功", {icon: 1});
                                $("#menuMaterialTable").trigger("reloadGrid");
                            } else {
                                layer.alert(r.msg);
                            }
                        }
                    });
                }
            }, function () {
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "sys/usagestatistics/info/" + id, function (r) {
                vm.usageStatistics = r.usageStatistics;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#menuMaterialTable").jqGrid('getGridParam', 'page');
            var postData = vm.batchSelect;
            $("#menuMaterialTable").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'batchNo': vm.batchSelect
                }
            }).trigger("reloadGrid");
        }
    }
});