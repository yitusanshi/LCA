$(function () {
    $("#menuMaterialTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "json",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '原辅料名称', name: 'materialName', index: 'materialName', width: '80px'},
            {label: '使用量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', hidden: true},
            {label: '原料id', name: 'materialId', index: 'materialId', hidden: true},
            {label: 'id', name: 'id', index: 'id', hidden: true},
            {
                label: '操作', name: 'perate', index: 'perate', formatter: function (value, rows, index) {
                    return "<button class='btn btn-primary' onclick='showMaterial(" + index.userId + ",\"" + index.materialId + "\",\"" + index.materialName + "\");'><i class='fa fa-plus'></i>添加上游原料</button>&nbsp;&nbsp;";
                }
            }
        ],
        postData: {
            'batchNo': vm.batchSelect,
            'flag': 4,
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

    //上游原辅料消耗
    $("#rawMaterialTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '上游原辅料名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '消耗量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 4,
            'typeId': 11
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [5, 10, 20],
        rownumbers: true,
        rownumWidth: 25,
        // autowidth: true,
        multiselect: true,
        pager: "#rawGridPager",
        caption: "上游原辅料消耗",
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
            {label: '资源能源名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '消耗量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 4,
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

    //排放与废气
    $("#gasTable").jqGrid({
        url: baseURL + 'sys/usagestatistics/listMaterial',
        datatype: "local",
        colModel: [
            {label: '批次号', name: 'version', index: 'version', width: '80px'},
            {label: '排放名称', name: 'materialName', index: 'materialName', width: '120px'},
            {label: '排放量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'},
            {label: '备注', name: 'desc', index: 'desc', width: '80px'},
            {label: '用户id', name: 'userId', index: 'userId', width: '80px', hidden: true}
        ],
        postData: {
            'batchNo': "",
            'flag': 4,
            'typeId': 13
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        // autowidth: true,
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
            'flag': 4,
            'typeId': 14
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        // autowidth: true,
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
    vm.materialId = materialId;
    vm.material_name = name;
    vm.usage_title = "原辅料为：【" + name + "】,批次号为【" + vm.batchSelect + "】的录入数据！";
    var page = $("#rawMaterialTable").jqGrid('getGridParam', 'page');
    $("#rawMaterialTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: page,
        postData: {
            'batchNo': vm.batchSelect,
            'userId': userId,
            'flag': 4,
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
            'flag': 4,
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
            'flag': 4,
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
            'flag': 4,
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
                    "flag": 4,
                    "batchNo": vm.batchSelect,
                    "materialId": vm.materialId,
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
                            showMaterial("", vm.materialId, vm.material_name);
                        });
                    } else {
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });
};

//添加运输过程
function addTransPort(typeId) {
    if (vm.batchSelect == "-1") {
        alert("请选择合适的批次号");
        return;
    }
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "添加运输数据",
        area: ['600px', '470px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#trans_port_id"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            $.ajax({
                type: "POST",
                url: baseURL + "sys/transport/saveTransport",
                data: {
                    "trans_port_name": $("#trans_port_name").val(),
                    "trans_port_source": $("#trans_port_source").val(),
                    "trans_port_type": $("#trans_port_type").val(),
                    "trans_port_distance": $("#trans_port_distance").val(),
                    "trans_port_weight": $("#trans_port_weight").val(),
                    "flag": 4,
                    "batchNo": vm.batchSelect,
                    "materialId": vm.materialId
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 0) {
                        layer.close(index);
                        layer.alert('保存成功', function (index) {
                            $("#trans_port_name").val("");
                            $("#trans_port_source").val("");
                            $("#trans_port_distance").val("");
                            $("#trans_port_weight").val("");
                            layer.close(index);
                            showMaterial("", vm.materialId, vm.material_name);
                        });
                    } else {
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });


}


//添加原材料消耗量
function addMaterial() {
    if (vm.batchSelect == "-1") {
        alert("请选择合适的批次号");
        return;
    }
    LayuiSelect("#raw_material_name", baseURL + "sys/lcadict/query/10", "#raw_material_unit");
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "新增原材料数据",
        area: ['600px', '370px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#raw_material_id"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            $.ajax({
                type: "POST",
                url: baseURL + "sys/usagestatistics/saveMaterial",
                data: {
                    "secondId": $("#raw_material_name").val().split("_")[0],
                    "secondName": $("#raw_material_name").val().split("_")[1],
                    "unit": $("#raw_material_name").val().split("_")[2],
                    "formId": "10",
                    "flag": 4,
                    "batchNo": vm.batchSelect,
                    "materialId": "0",
                    "usage": $("#raw_material_usage").val()
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 0) {
                        layer.close(index);
                        layer.alert('保存成功', function (index) {
                            $("#raw_material_usage").val("");
                            $("#raw_material_unit").val("");
                            layer.close(index);
                            vm.reload();
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
* 删除原材料。默认是多选
* */
function delMaterial(jqId) {
    var materialIds = getSelectedRowNums(jqId);
    if (isBlank(materialIds)) {
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
                url: baseURL + "sys/usagestatistics/deleteMaterial",
                /* contentType: "application/json",*/
                data: {
                    "materialIds": materialIds,
                    "batchNo": vm.batchSelect,
                    "flag": 4
                },
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
    });
}


/*
* 删除资源消耗，运输。排放等
* */
function delConsume(typeId) {
    var tableId;
    var url = baseURL + "sys/usagestatistics/delete";
    if (typeId == "11") {
        tableId = "#rawMaterialTable";
    } else if (typeId == "12") {
        tableId = "#reseTable"
    } else if (typeId == "13") {
        tableId = "#gasTable";
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
* 修改原材料消耗量
* updateMaterial
* */

function updateMaterial(jqId) {
    var material = getSelectedRowNum(jqId);
    if (isBlank(material)) {
        return;
    }
    $("#raw_material_unit_update").val(material.unit);
    $("#raw_material_name_update").val(material.materialName);
    $("#raw_material_usage_update").val(material.materialUsage);
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "修改原材料数据",
        area: ['600px', '370px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#raw_material_id_update"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            $.ajax({
                type: "POST",
                url: baseURL + "sys/usagestatistics/updateMaterialById",
                data: {
                    "id": material.id,
                    "usage": $("#raw_material_usage_update").val()
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 0) {
                        layer.close(index);
                        layer.alert('保存成功', function (index) {
                            layer.close(index);
                            vm.reload();
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
        useage_name: '',
        materialId: '',
        material_name: ''
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
        reloads: function () {
            location.reload();
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
        reload: function (event) {
            vm.showList = true;
            var page = $("#menuMaterialTable").jqGrid('getGridParam', 'page');
            $("#menuMaterialTable").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'batchNo': vm.batchSelect,
                    'flag': 4,
                    'materialId': 0
                }
            }).trigger("reloadGrid");
        }
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
            /*if (value != undefined && value != null && value != '') {
                $(selectId).val(value);
            }*/
            formSelect.render();
        });

    })

};
