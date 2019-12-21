$(function () {
    //资源与能源消耗
    $("#reseTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '资源能源名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '消耗量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: 'id', name: 'id', index: 'id', width: '80px', hidden: true},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 1,
            'materialId': 0,
            'typeId': 12
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [5, 10, 20],
        rownumbers: true,
        rownumWidth: 25,
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

    //排放与废弃
    $("#gasTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '排放名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '排放量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: 'id', name: 'id', index: 'id', width: '80px', hidden: true},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 1,
            'materialId': 0,
            'typeId': 13
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        // autowidth: true,
        // width: "100%",
        multiselect: true,
        pager: "#gasGridPager",
        caption: "排放与废弃",
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

    //包装过程
    $("#packTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '包装材料', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '消耗量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: 'id', name: 'id', index: 'id', width: '80px', hidden: true},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 1,
            'materialId': 0,
            'typeId': 15
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        multiselect: true,
        pager: "#packGridPager",
        caption: "包装过程",
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
            $("#packTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }

    });



});

//显示生产阶段的物质消耗情况
function reloadPro() {
    /*资源与能源*/
    var resepage = $("#reseTable").jqGrid('getGridParam', 'page');
    $("#reseTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: resepage,
        postData: {
            'batchNo': vm.batchSelect,
            'prId': vm.prSelect,
            'flag': 1,
            'materialId': 0
        }
    }).trigger("reloadGrid");

    /*排放气体*/
    var gaspage = $("#gasTable").jqGrid('getGridParam', 'page');
    $("#gasTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: gaspage,
        postData: {
            'batchNo': vm.batchSelect,
            'prId': vm.prSelect,
            'flag': 1,
            'materialId': 0
        }
    }).trigger("reloadGrid");

    /*包装材料*/
    var gaspage = $("#gasTable").jqGrid('getGridParam', 'page');
    $("#packTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: gaspage,
        postData: {
            'batchNo': vm.batchSelect,
            'prId': vm.prSelect,
            'flag': 1,
            'materialId': 0
        }
    }).trigger("reloadGrid");
};


//添加消耗信息
function addConsume(typeId) {
    if (vm.batchSelect == "-1") {
        alert("请选择合适的批次号");
        return;
    }
    var titles = "";
    if (typeId == '10') {
        titles = "添加原辅料消耗";
        vm.add_title_name = "原辅料名称";
        vm.useage_name = "消耗量";

    } else if (typeId == '12') {
        titles = '添加资源能源消耗';
        vm.add_title_name = "资源能源名称";
        vm.useage_name = "消耗量";

    } else if (typeId == '13') {
        titles = '添加排放信息';
        vm.add_title_name = "排放名称";
        vm.useage_name = "排放量";
    } else {
        titles = '添加包装信息';
        vm.add_title_name = "包装材料";
        vm.useage_name = "消耗量";

    }
    LayuiSelect("#consume_id", baseURL + "sys/lcadict/query/" + typeId, "#unit_id");
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: titles,
        area: ['600px', '370px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#consume"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            $.ajax({
                type: "POST",
                url: baseURL + "sys/usagestatistics/saveMaterial",
                data: {
                    "secondId": $("#consume_id").val().split("_")[0],
                    "secondName": $("#consume_id").val().split("_")[1],
                    "unit": $("#consume_id").val().split("_")[2],
                    "formId": typeId,
                    "flag": 1,
                    "batchNo": vm.batchSelect,
                    'prId': vm.prSelect,
                    "materialId": 0,
                    "usage": $("#usage_id").val()
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 0) {
                        layer.close(index);
                        layer.alert('保存成功', function (index) {
                            $("#usage_id").val("");
                            $("#unit_id").val("");
                            layer.close(index);
                            reloadPro();
                        });
                    } else {
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });
};

/*
* 删除资源消耗，运输。排放等
* */
function delConsume(typeId) {
    var tableId;
    var url = baseURL + "sys/usagestatistics/delete";
    if (typeId == "10") {
        tableId = "#rawMaterialTable";
    } else if (typeId == "12") {
        tableId = "#reseTable"
    } else if (typeId == "13") {
        tableId = "#gasTable";
    } else if (typeId == "15") {
        tableId = "#packTable";
    } else {
        tableId = "#transPortTable";
        url = baseURL + "sys/transport/delete";
    }
    var rowKey = $(tableId).getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }
    var ids = $(tableId).getGridParam("selarrrow");
    if (ids == null) {
        return;
    }
    confirm('确定要删除选中的记录？', function () {
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(ids),
            success: function (r) {
                if (r.code == 0) {
                    alert('操作成功', function (index) {
                        $(tableId).trigger("reloadGrid");
                    });
                } else {
                    alert(r.msg);
                }
            }
        });
    });
}

/*
* 修改资源能源排放
* */
function updateConsume(typeId) {
    var menId = "";
    var titles = "";
    if (typeId == '11') {
        menId = "rawMaterialTable";
        titles = "修改上游原料";
        vm.add_title_name = "上游原材料名称";
        vm.useage_name = "消耗量";
    } else if (typeId == '12') {
        menId = "reseTable";
        titles = '修改资源能源信息';
        vm.add_title_name = "资源能源名称";
        vm.useage_name = "消耗量";
    } else if (typeId == '13') {
        menId = "gasTable";
        titles = '修改排放信息';
        vm.add_title_name = "排放名称";
        vm.useage_name = "排放量";
    } else {
        menId = "packTable";
        titles = '修改包装信息';
        vm.add_title_name = "包装材料";
        vm.useage_name = "消耗量";
    }
    var rowKey = getSelectedRowNum(menId);
    $("#consume_unit_update").val(rowKey.unit);
    $("#consume_name_update").val(rowKey.materialName);
    $("#consume_usage_update").val(rowKey.materialUsage);
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: titles,
        area: ['600px', '370px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#consume_update"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            $.ajax({
                type: "POST",
                url: baseURL + "sys/usagestatistics/updateById",
                data: {
                    "id": rowKey.id,
                    "usage": $("#consume_usage_update").val()
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 0) {
                        layer.close(index);
                        layer.alert('保存成功', function (index) {
                            $("#consume_usage_update").val("");
                            $("#consume_name_update").val("");
                            $("#consume_unit_update").val("");
                            layer.close(index);
                            reloadPro();
                        });
                    } else {
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });

}



var vm = new Vue({
    el: '#rrapp',
    data: {
        showUsage: true,
        title: null,
        usage_title: null,
        batchNos: [],
        batchSelect: "-1",
        prList: [],
        prSelect: "-1",
        add_title_name: '',
        useage_name: '',
        materialId: '',
        material_name: ''
    },
    mounted() {
        this.getPr();
    },
    methods: {
        getPr: function () {
            $.ajax({
                method: 'post',
                url: baseURL + "sys/productdefine/getPrByUserId",
                contentType: "application/json",
                datatype: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.prList = r.prList;
                    } else {
                        alert(r.msg);
                    }
                },
            });
        },
        selectPrId: function (e) {
            vm.batchSelect = "-1";
            vm.batchNos = [];
            this.prSelect = vm.prSelect;
            $.ajax({
                method: 'post',
                url: baseURL + "sys/batch/getBatchByPrId",
                data: {"prId": vm.prSelect},
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
    }
});
/*
* 工具类
*
* */

//选择多条记录
function getSelectedRowNums(jqGridSelect) {
    if (jqGridSelect.indexOf('#') != 0) {
        jqGridSelect = "#" + jqGridSelect;
    }
    var grid = $(jqGridSelect);
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }
    /*var rowIds = grid.getDataIDs();*/
    var rowIds = grid.getGridParam("selarrrow");
    var arrayData = "";
    if (rowIds.length > 0) {
        for (var i = 0; i < rowIds.length; i++) {
            arrayData = arrayData + grid.getRowData(rowIds[i]).materialId + ";";
        }
    }
    return arrayData;
};

//选择一条记录
function getSelectedRowNum(jqGridSelect) {
    if (jqGridSelect.indexOf('#') != 0) {
        jqGridSelect = "#" + jqGridSelect;
    }
    var grid = $(jqGridSelect);
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if (selectedIDs.length > 1) {
        alert("只能选择一条记录");
        return;
    }
    var material = "";
    material = grid.getRowData(selectedIDs[0]);
    return material;
};

/*
*
* 下拉框时间绑定
* */
function LayuiSelect(selectId, url, unitId) {
    $.post(url, function (data) {
        var dictList = data.dictList;
        if (selectId.indexOf('#') != 0) {
            selectId = "#" + selectId;
        }
        if (unitId.indexOf('#') != 0) {
            unitId = "#" + unitId;
        }
        $(selectId).empty();//清空该元素
        $(selectId).append("<option value=''>请选择</option>");
        for (var k in dictList) {
            $(selectId).append("<option value='" + dictList[k].secondId + "_" + dictList[k].secondName + "_" + dictList[k].unit + "'>" + dictList[k].secondName + "</option>");
        }
        layui.use(['form'], function () {
            var formSelect = layui.form;
            /*
            联动引入
            * */
            formSelect.on('select(myselect)', function (data) {
                var unit = data.value.split("_")[2];
                $(unitId).val(unit);
            });
            formSelect.render();
        });

    })

};
