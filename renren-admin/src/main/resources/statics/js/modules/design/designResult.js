$(function () {
    pageInit();
});

function pageInit() {
    $("#resultTable").jqGrid({
        datatype: "json",
        url: baseURL + "compare/result",
        colModel: [
            {label: '影响类型', name: 'typeName', index: 'typeName', width: '120px'},
            {label: '单位', name: 'unit', index: 'unit', width: '120px'},
            {label: '物质名称', name: 'productName', index: 'productName', width: '120px'},
            {label: '方案名称', nanme: 'versionName', index: 'versionName', width: '120px'},
            {label: '上游物质', name: 'diffName', index: 'diffName', width: '120px'},
            {label: '原料阶段', name: 'materialStage', index: 'materialStage', width: '120px'},
            {label: '生产阶段', name: 'productStage', index: 'productStage', width: '120px'},
            {label: '销售阶段', name: 'sellStage', index: 'sellStage', width: '120px'},
            {label: '使用阶段', name: 'useStage', index: 'useStage', width: '120px'},
            {label: '回收处理阶段', name: 'recoveryStage', index: 'recoveryStage', width: '120px'}
        ],
        postData: {
            'version1': "0",
            'version2': "0",
            "prId": "0"
        },
        height: "25%",
        /* gridComplete: function () {
             //隐藏grid底部滚动条
             $("#resultTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
         }*/
    });
}


function queryResult() {
    $.ajax({
        type: "GET",
        url: baseURL + 'compare/result',
        data: {
            "version1": vm.batchSelect,
            "version2": vm.batchSelect1,
            'prId': vm.prSelect
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 0) {
                var info = result.info;
                var versionOld = result.versionOld;
                var versionNew = result.versionNew;
                var tr = '';
                for (var i = 0; i < info.length; i++) {
                    var listInfo = info[i];
                    /*
                    * 老版本
                    * */
                    tr += '<table id="dresult"><tr>';
                    tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productName + '</td>';
                    tr += '<td style="width: 120px;">' + versionOld + '</td>';
                    tr += '<td style="width: 120px;">/</td>';
                    tr += '<td style="width: 120px;">' + listInfo.materialStage_old + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productStage_old + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.sellStage_old + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.useStage_old + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.recoveryStage_old + '</td>';
                    tr += "</tr>";
                    /*
                    * 新版本
                    * */
                    tr += "<tr>";
                    tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productName + '</td>';
                    tr += '<td style="width: 120px;">' + versionNew + '</td>';
                    tr += '<td style="width: 120px;">/</td>';
                    tr += '<td style="width: 120px;">' + listInfo.materialStage_new + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productStage_new + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.sellStage_new + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.useStage_new + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.recoveryStage_new + '</td>';
                    tr += "</tr>";

                    /*
                   * 差异值
                   * */
                    tr += "<tr>";
                    tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productName + '</td>';
                    tr += '<td style="width: 120px;">对比结果</td>';
                    tr += '<td style="width: 120px;">/</td>';
                    tr += '<td style="width: 120px;">' + listInfo.materialStage_diff + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.productStage_diff + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.sellStage_diff + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.useStage_diff + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.recoveryStage_diff + '</td>';
                    tr += "</tr>";
                    var materialPropertyStage = listInfo.materialPropertyStage;
                    for (var j = 0; j < materialPropertyStage.length; j++) {
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "old") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">原料阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                                tr += '<td style="width: 120px;">' + materialPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "new") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">原料阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                                tr += '<td style="width: 120px;">' + materialPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "diff") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">原料阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">对比结果</td>';
                                tr += '<td style="width: 120px;">' + materialPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                    }
                    var recoveryPropertyStage = listInfo.recoveryPropertyStage;
                    for (var j = 0; j < recoveryPropertyStage.length; j++) {
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "old") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">回收阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                                tr += '<td style="width: 120px;">' + recoveryPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "new") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">回收阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                                tr += '<td style="width: 120px;">' + recoveryPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                        for (var m in materialPropertyStage[j]) {
                            if (m.split("_")[1] == "diff") {
                                tr += "<tr>"
                                tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                                tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                                tr += '<td style="width: 120px;">回收阶段|' + m.split("_")[0] + '</td>';
                                tr += '<td style="width: 120px;">对比结果</td>';
                                tr += '<td style="width: 120px;">' + recoveryPropertyStage[j][m] + '</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += '<td style="width: 120px;">/</td>';
                                tr += "</tr>";
                                break;
                            }
                        }
                    }
                }
                tr += "</table>";
                $('#resultTable').html(tr);
                $('#dresult').mergeCell({
                    cols: [0,1,2]
                });
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
        batchSelect1: "-1",
        prSelect: "-1",
        materialId: '',
        material_name: '',
        bNo: "",
        bName: "",
        bPr: "",
        bUnit: "kg",
        bUsage: ""
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
                },
            });

        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#resultTable").jqGrid('getGridParam', 'page');
            $("#resultTable").jqGrid('setGridParam', {
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

}