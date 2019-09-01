$(function () {
    //运输过程
    $("#transPortTable").jqGrid({
        url: baseURL + 'sys/transport/listTransport',
        datatype: "local",
        colModel: [
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
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
            'flag': 2,
            'materialId': 0,
            'typeId': 14
        },
        viewrecords: true,
        height: "25%",
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
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

//显示生产阶段的物质消耗情况
function reloadPro() {
    /*运输*/
    var transpage = $("#transPortTable").jqGrid('getGridParam', 'page');
    $("#transPortTable").jqGrid('setGridParam', {
        datatype: 'json',
        page: transpage,
        postData: {
            'batchNo': vm.batchSelect,
            'prId': vm.prSelect,
            'flag': 2,
            'materialId': 0
        }
    }).trigger("reloadGrid");
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
                    "flag": 2,
                    "batchNo": vm.batchSelect,
                    'prId': vm.prSelect,
                    "materialId": 0
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
