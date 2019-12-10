$(function () {
    pageInit();
});

function pageInit() {
    $("#menuMaterialTable").jqGrid({
        datatype: "json",
        url: baseURL + "calculate/info",
        colModel: [
            {label: '影响类型', name: 'typeName', index: 'typeName', width: '120px'},
            {label: '单位', name: 'unit', index: 'unit', width: '120px'},
            {label: '产品名称', name: 'productName', index: 'productName', width: '80px'},
            {label: '原料阶段', name: 'materialStage', index: 'materialStage', width: '80px'},
            {label: '生产阶段', name: 'productStage', index: 'productStage', width: '80px'},
            {label: '销售阶段', name: 'sellStage', index: 'sellStage', width: '80px'},
            {label: '使用阶段', name: 'useStage', index: 'useStage', width: '80px'},
            {label: '回收处理阶段', name: 'recoveryStage', index: 'recoveryStage', width: '80px'}
        ],
        postData: {
            'batchNo': "",
            "prId": ""
        },
        height: "25%",
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#menuMaterialTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
}

function queryResylt() {
    $.ajax({
        type: "POST",
        url: baseURL + "calculate/info",
        data: {
            "version": vm.batchSelect,
            "prId": vm.prSelect
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 0) {
                var resultCal = result.resultCal;
                resultCal.sort(function (a, b) {
                    return a.id - b.id;
                })
                var tr = "";
                for (var i = 0; i < resultCal.length; i++) {
                    tr += "<tr>"
                    tr += "<td style='width: 120px;'>" + resultCal[i].typeName + "</td>";
                    tr += "<td style='width: 120px;'>" + resultCal[i].unit + "</td>";
                    tr += "<td style='width: 80px;'>" + resultCal[i].productName + "</td>";
                    if (resultCal[i].materialStage == "" || resultCal[i].materialStage == null) {
                        tr += "<td style='width: 80px;'>0</td>";
                    } else {
                        tr += "<td style='width: 80px;'>" + resultCal[i].materialStage + "</td>";
                    }
                    if (resultCal[i].productStage == "" || resultCal[i].productStage == null) {
                        tr += "<td style='width: 80px;'>0</td>";
                    } else {
                        tr += "<td style='width: 80px;'>" + resultCal[i].productStage + "</td>";
                    }

                    if (resultCal[i].sellStage == "" || resultCal[i].sellStage == null) {
                        tr += "<td style='width: 80px;'>0</td>";
                    } else {
                        tr += "<td style='width: 80px;'>" + resultCal[i].sellStage + "</td>";
                    }
                    if (resultCal[i].useStage == "" || resultCal[i].useStage == null) {
                        tr += "<td style='width: 80px;'>0</td>";
                    } else {
                        tr += "<td style='width: 80px;'>" + resultCal[i].useStage + "</td>";
                    }
                    if (resultCal[i].recoveryStage == "" || resultCal[i].recoveryStage == null) {
                        tr += "<td style='width: 80px;'>0</td>";
                    } else {
                        tr += "<td style='width: 80px;'>" + resultCal[i].recoveryStage + "</td>";
                    }
                }
                tr += "</tr>";
                $('#menuMaterialTable').html(tr);
            } else {
                layer.alert(result.msg);
            }
        }
    });
}

var vm = new Vue({
    el: '#rrapp',
    data: {
        mainList: true,
        title: null,
        usage_title: null,
        usageStatistics: {},
        batchNos: [],
        prList: [],
        batchSelect: "-1",
        prSelect: "-1",
        materialId: '',
        material_name: ''
    },
    mounted() {
        this.getPr();
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
                }

                ,
            })
            ;

        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#menuMaterialTable").jqGrid('getGridParam', 'page');
            $("#menuMaterialTable").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'batchNo': vm.batchSelect,
                    'prId': vm.prSelect,
                    'flag': 0,
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
