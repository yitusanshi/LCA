$(function () {
    $("#menuMaterialTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "json",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '原材料名称', name: 'name', index: 'name', width: '80px'},
            {label: '使用量', name: 'usage', index: 'usage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', hidden: true},
            {label: '原料id', name: 'materialId', index: 'materialId', hidden: true},
            {
                label: '操作', name: 'perate', index: 'perate', formatter: function (value, rows, index) {
                    return "<button class='btn btn-primary' onclick='showMaterial(" + index.userId + ",\"" + index.materialId + "\",\"" + index.name + "\");'><i class='fa fa-plus'></i>添加上游原料</button>&nbsp;&nbsp;";
                }
            }
        ],
        postData: {
            'batchNo': vm.batchSelect,
            'flag': 0,
            'materialId': 0,
            'typeId': 10
        },
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

    //上游原材料表
    $("#rawMaterialTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '上游原料名称', name: 'name', index: 'name', width: '120px'},
            {label: '消耗量', name: 'usage', index: 'usage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 0,
            'materialId': 0,
            'typeId': 11
        },
        viewrecords: true,
        height: 100,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#rawGridPager",
        caption: "上游原材料消耗",
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
            $("#rawMaterialTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }

    });

    //资源与能源消耗
    $("#reseTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '资源能源名称', name: 'name', index: 'name', width: '120px'},
            {label: '消耗量', name: 'usage', index: 'usage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 0,
            'materialId': 0,
            'typeId': 12
        },
        viewrecords: true,
        height: 100,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#reseGridPager",
        caption: "资源与能源消耗",
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
            $("#reseTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }

    });

    //排放与废气
    $("#gasTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '排放名称', name: 'name', index: 'name', width: '120px'},
            {label: '排放量', name: 'usage', index: 'usage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 0,
            'materialId': 0,
            'typeId': 13
        },
        viewrecords: true,
        height: 100,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#gasGridPager",
        caption: "排放与废气",
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
            $("#gasTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }

    });

    //运输过程
    $("#transPortTable").jqGrid({
        url: baseURL + 'sys/transport/listTransport',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '运输物质名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '运输方式', name: 'type', index: 'type', width: '80px'},
            {label: '运输重量（单位:t）', name: 'weight', index: 'weight', width: '80px'},
            {label: '运输距离（单位:km）', name: 'distance', index: 'distance', width: '80px'},
            {label: '产地', name: 'source', index: 'source', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true},
            {label: '标识', name: 'flag', index: 'flag', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 0,
            'materialId': 0,
            'typeId': 14
        },
        viewrecords: true,
        height: 100,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#transPortGridPager",
        caption: "运输过程",
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
            $("#transPortTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });


});

//显示原料的基础数据 上游原料消耗/资源能源消耗/排放与废气/运输过程userId, materialId, name
function showMaterial(userId, materialId, name) {
    //obj带的是参数rows.id
    vm.mainList = false;
    vm.showUsage = true;
    vm.usage_title = "原材料为：【" + name + "】,批次号为【" + vm.batchSelect + "】的录入数据！";
    var page = $("#rawMaterialTable").jqGrid('getGridParam', 'page');
    $("#rawMaterialTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: page,
        postData: {
            'batchNo': vm.batchSelect,
            'userId': userId,
            'flag': 0,
            'materialId': materialId
        }
    }).trigger("reloadGrid");

    /*资源与能源*/
    var resepage = $("#reseTable").jqGrid('getGridParam', 'page');
    $("#reseTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: resepage,
        postData: {
            'batchNo': vm.batchSelect,
            'userId': userId,
            'flag': 0,
            'materialId': materialId
        }
    }).trigger("reloadGrid");

    /*排放气体*/
    var gaspage = $("#gasTable").jqGrid('getGridParam', 'page');
    $("#gasTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: gaspage,
        postData: {
            'batchNo': vm.batchSelect,
            'userId': userId,
            'flag': 0,
            'materialId': materialId
        }
    }).trigger("reloadGrid");

    /*运输*/
    var transpage = $("#transPortTable").jqGrid('getGridParam', 'page');
    $("#transPortTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: transpage,
        postData: {
            'batchNo': vm.batchSelect,
            'userId': userId,
            'flag': 0,
            'materialId': materialId
        }
    }).trigger("reloadGrid");
};


//添加消耗信息
function addConsume(typeId) {
    var titles = "";
    if (typeId == '11') {
        titles = "添加上游原料";
        vm.add_title_name = "上游原材料名称";
        vm.useage_name = "消耗量";

    } else if (typeId == '12') {
        titles = '添加资源能源信息';
        vm.add_title_name = "资源能源名称";
        vm.useage_name = "消耗量";

    } else {
        titles = '添加排放信息';
        vm.add_title_name = "排放名称";
        vm.useage_name = "排放量";

    }
    ;
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: titles,
        area: ['550px', '270px'],
        shadeClose: false,
        content: jQuery("#consume"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            /*         var data = "batchNo=" + vm.bNo + "&batchName=" + vm.bName;
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
                     });*/
        }
    });
    /*    $.ajax({
            type: "POST",
            url: baseURL + "sys/lcadict/query/" + str,
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {
                    vm.consumes = result.dictList;
                } else {
                    layer.alert(result.msg);
                }
            }
        });*/

};

var vm = new Vue({
    el: '#rrapp',
    data: {
        mainList: true,
        newAdd: false,
        showUsage: false,
        title: null,
        usage_title: null,
        bNo: "",
        bName: "",
        usageStatistics: {},
        batchNos: [],
        batchSelect: "-1",
        consumes: [],
        add_title_name: '',
        useage_name: ''
    },
    mounted() {
        this.getBatchNo();
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.newAdd = true;
            vm.mainList = false;
            vm.showUsage = false;
            vm.title = "新增";
            vm.usageStatistics = {};
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
            console.log(page + "======");
            $("#menuMaterialTable").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'batchNo': vm.batchSelect,
                    'flag': 0,
                    'materialId': 0
                }
            }).trigger("reloadGrid");
        }
    }
});