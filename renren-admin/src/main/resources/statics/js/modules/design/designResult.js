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
                if (info.length <= 0) {
                    return;
                }
                info.sort(function (a, b) {
                    return a.id - b.id;
                })

                /*
                * 原料阶段物质名称
                *
                * */
                var materNames = [];
                var materialNameList = info[0].materialPropertyStage;
                var materLen = materialNameList.length;
                for (var i = 0; i < materialNameList.length; i++) {
                    for (var m in materialNameList[i]) {
                        if (m.split("_")[1] == "old" || m.split("_")[1] == "new" || m.split("_")[1] == "diff") {
                            materNames[i] = m.split("_")[0];
                            break;
                        }
                    }
                }
                var versionOld = result.versionOld;
                var versionNew = result.versionNew;
                var tr = '';


                var showTable = '';
                showTable += resultShowTitle(versionOld, versionNew, materNames, materLen);

                tr += ' <thead>';
                tr += '<tr>';
                tr += '<th rowspan="2" style="width: 120px;text-align: center;vertical-align: middle!important;">影响类型</th>';
                tr += '<th rowspan="2" style="width: 100px;text-align: center;vertical-align: middle!important;">单位</th>';
                tr += '<th colspan="3" style="width: 360px;text-align: center;"><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">原料阶段</button></th>';
                tr += '<th colspan="3" style="width: 360px;text-align: center;">生产阶段</th>';
                tr += '<th colspan="3" style="width: 360px;text-align: center;">销售阶段</th>';
                tr += '<th colspan="3" style="width: 360px;text-align: center;">使用阶段</th>';
                tr += '<th colspan="3" style="width: 360px;text-align: center;">回收处理阶段</th>';
                tr += '</tr>';

                tr += '<tr>';
                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                tr += '<td style="width: 120px;">对比结果</td>';
                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                tr += '<td style="width: 120px;">对比结果</td>';
                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                tr += '<td style="width: 120px;">对比结果</td>';
                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                tr += '<td style="width: 120px;">对比结果</td>';
                tr += '<td style="width: 120px;">' + versionOld + '</td>';
                tr += '<td style="width: 120px;">' + versionNew + '</td>';
                tr += '<td style="width: 120px;">对比结果</td>';
                tr += '</tr></thead><tbody>';
                for (var i = 0; i < info.length; i++) {
                    var listInfo = info[i];
                    tr += "<tr>";
                    tr += '<td style="width: 120px;">' + listInfo.typeName + '</td>';
                    tr += '<td style="width: 120px;">' + listInfo.unit + '</td>';
                    /*
                    * 原料阶段
                    * */
                    tr += '<td style="width: 120px;">' + converDate(listInfo.materialStage_old) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.materialStage_new) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.materialStage_diff) + '</td>';

                    if (materLen > 0) {
                        showTable += resultBody(listInfo.typeName, listInfo.unit, materNames, materLen, listInfo.materialPropertyStage);
                    }

                    /*
                    * 生产阶段
                    * */
                    tr += '<td style="width: 120px;">' + converDate(listInfo.productStage_old) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.productStage_new) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.productStage_diff) + '</td>';

                    /*
                    * 销售阶段
                    * */
                    tr += '<td style="width: 120px;">' + converDate(listInfo.sellStage_old) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.sellStage_new) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.sellStage_diff) + '</td>';

                    /*
                    * 使用阶段
                    * */
                    tr += '<td style="width: 120px;">' + converDate(listInfo.useStage_old) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.useStage_new) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.useStage_diff) + '</td>';

                    /*
                    * 回收处理阶段
                    * */

                    tr += '<td  style="width: 120px;">' + converDate(listInfo.recoveryStage_old) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.recoveryStage_new) + '</td>';
                    tr += '<td style="width: 120px;">' + converDate(listInfo.recoveryStage_diff) + '</td>';
                    tr += "</tr></tbody>";

                }
                if (materLen > 0) {
                    showTable += '</tbody>';
                }
                $('#resultTable').html(tr);
                $('#showTable').html(showTable);
            } else {
                layer.alert(result.msg);
            }
        }
    });
}

function resultShowTitle(versionOld, versionNew, materNames, materLen) {
    var tr = '';
    tr += ' <thead>';
    tr += '<tr>';
    tr += '<th rowspan="2" style="width: 120px;text-align: center;vertical-align: middle!important;">影响类型</th>';
    tr += '<th rowspan="2" style="width: 100px;text-align: center;vertical-align: middle!important;">单位</th>';
    for (var i = 0; i < materLen; i++) {
        tr += '<th colspan="3" style="width: 360px;text-align: center;">' + materNames[i] + '</th>';
    }
    tr += '</tr>';
    tr += '<tr>';
    for (var i = 0; i < materLen; i++) {
        tr += '<td style="width: 120px;">' + versionOld + '</td>';
        tr += '<td style="width: 120px;">' + versionNew + '</td>';
        tr += '<td style="width: 120px;">对比结果</td>';
    }
    tr += '</tr></thead>';
    console.log("显示标题：" + versionNew + "===" + versionOld + "===" + materLen + "===" + materNames + "===" + tr);
    return tr;
}

function resultBody(typeName, unit, materNames, materLen, mater) {
    var tr = '';
    tr += '<tr>';
    tr += '<td style="width: 120px;">' + typeName + '</td>';
    tr += '<td style="width: 120px;">' + unit + '</td>';
    for (var i = 0; i < materLen; i++) {
        tr += getDiff(materNames[i], materLen, mater[i]);
    }
    tr += '</tr>';
    return tr;

}

function getDiff(materNames, materLen, materStage) {
    var tr = '';
    for (var i = 0; i < materLen; i++) {
        for (var m in materStage) {
            if (m.split("_")[0] == materNames) {
                tr += '<td style="width: 120px;">' + converDate(materStage[materNames + "_old"]) + '</td>';
                tr += '<td style="width: 120px;">' + converDate(materStage[materNames + "_new"]) + '</td>';
                tr += '<td style="width: 120px;">' + converDate(materStage[materNames + "_diff"]) + '</td>';
                break;
            }
        }
        break;
    }
    return tr;
}

function converDate(data) {
    var dataToStr = 0;
    if (data == null || data == "" || data == "0E0" || data == "0.0000") {
        dataToStr = 0;
    } else {
        dataToStr = data;
    }
    return dataToStr;

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