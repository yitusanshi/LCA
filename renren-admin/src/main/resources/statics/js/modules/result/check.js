function resultShowTitle(materNames) {
    var tr = '';
    tr += ' <thead>';
    tr += '<tr>';
    tr += '<th rowspan="1" style="width: 150px;text-align: center;">影响类型</th>';
    tr += '<th rowspan="1" style="width: 150px;text-align: center;">单位</th>';
    for (var i = 0; i < materNames.length; i++) {
        tr += '<th colspan="1" style="width: 150px;text-align: center;">' + materNames[i] + '</th>';
    }
    tr += '</tr></thead><tbody>';
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

function outData() {
    if (vm.prSelect == "-1") {
        alert("请选择产品");
        return;
    }
    if (vm.batchSelect == "-1") {
        alert("请选择批次号");
        return;
    }

    $("#menuMaterialTable").table2excel({            //exceltable为存放数据的table
        // 不被导出的表格行的CSS class类
        exclude: ".noExl",
        // 导出的Excel文档的名称
        name: "结果-" + new Date().getTime(),
        // Excel文件的名称
        filename: "LCA评价结果-" + new Date().getTime() + ".xls"
    });
}


function queryResylt() {
    if (vm.prSelect == "-1") {
        alert("请选择产品");
        return;
    }
    if (vm.batchSelect == "-1") {
        alert("请选择批次号");
        return;
    }
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
                if (resultCal.length < 0) {
                    return;

                }
                resultCal.sort(function (a, b) {
                    return a.id - b.id;
                })
                var tr = "";
                /*
               * 原料阶段物质名称
               *
               * */
                var materNames = [];
                var materialNameList = resultCal[0].materialPropertyStage;
                var i = 0;
                for (var m in materialNameList) {
                    materNames[i] = m;
                    i++;
                }
                var showTable = '';
                if (materNames.length > 0) {
                    showTable += resultShowTitle(materNames);
                }
                tr += ' <thead>';
                tr += '<tr>';
                tr += '<th rowspan="1" style="width: 150px;text-align: center;vertical-align: middle!important;">产品名称</th>';
                tr += '<th rowspan="1" style="width: 150px;text-align: center;vertical-align: middle!important;">影响类型</th>';
                tr += '<th rowspan="1" style="width: 150px;text-align: center;vertical-align: middle!important;">单位</th>';
                tr += '<th rowspan="1" style="width: 150px;text-align: center;vertical-align: middle!important;">产品LCA评价结果</th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;"><button class="btn btn-primary btn-xs"  data-toggle="modal" data-target="#myModal">原料阶段</button></th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;">生产阶段</th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;">销售阶段</th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;">使用阶段</th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;">回收处理阶段</th>';
                tr += '<th colspan="1" style="width: 150px;text-align: center;">图表展示</th>';
                tr += '</tr></thead><tbody>';
                for (var i = 0; i < resultCal.length; i++) {
                    tr += "<tr>";
                    tr += '<td style="width: 150px;text-align: center;">' + resultCal[i].productName + '</td>';
                    tr += "<td style='width: 150px;'>" + resultCal[i].typeName + "</td>"
                    tr += "<td style='width: 150px;'>" + resultCal[i].unit + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].total) + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].materialStage) + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].productStage) + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].sellStage) + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].useStage) + "</td>";
                    tr += "<td style='width: 150px;'>" + converDate(resultCal[i].recoveryStage) + "</td>";
                    /*
                    tr += '<th colspan="1" style="width: 150px;text-align: center;"><button class="btn btn-primary btn-xs"  data-toggle="modal" data-target="#showDetail">详情</button></th>';
                    */
                    /*var param = */
                    tr += "<th colspan='1' style='width: 150px;text-align: center;'><button class='btn btn-primary btn-xs' onclick='showTableData1(\"" + resultCal[i].productName + "\",\"" + resultCal[i].typeName + "\",\"" + converDate(resultCal[i].materialStage) + "\",\"" + converDate(resultCal[i].productStage) + "\",\"" + converDate(resultCal[i].sellStage) + "\",\"" + converDate(resultCal[i].useStage) + "\",\"" + converDate(resultCal[i].recoveryStage) + "\")'>详情</button></th>";
                    if (materNames.length > 0) {
                        showTable += '<tr>';
                        showTable += '<td style="width: 150px;">' + resultCal[i].typeName + '</td>';
                        showTable += '<td style="width: 150px;">' + resultCal[i].unit + '</td>';
                        for (var m = 0; m < materNames.length; m++) {
                            showTable += '<td style="width: 150px;">' + converDate(resultCal[i].materialPropertyStage[materNames[m]]) + '</td>';
                        }
                        showTable += '</tr>';
                    }
                }
                tr += "</tr></tbody>";
                if (materNames.length > 0) {
                    showTable += "</tbody>";
                }
                $('#menuMaterialTable').html(tr);
                $('#showTable').html(showTable);

            } else {
                layer.alert(result.msg);
            }
        }
    });
}

function showTableData1(productName, typeName, materialStage, productStage, sellStage, useStage, recoveryStage) {
    /*
        alert(productName + "==" + typeName + materialStage + "==" + productStage + "==" + sellStage + "==" + useStage + "==" + recoveryStage);
    */
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showDetailId'));
    console.log(myChart);
    var option = {
        title: {
            text: productName + "图表展示",
            subtext: "影响类型：" + typeName,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['原料阶段', '生产阶段', '销售阶段', '使用阶段', '回收处理阶段']
        },
        series: [
            {
                name: typeName,
                type: 'pie',
                radius: '45%',
                center: ['45%', '50%'],
                data: [
                    {value: materialStage, name: '原料阶段'},
                    {value: productStage, name: '生产阶段'},
                    {value: sellStage, name: '销售阶段'},
                    {value: useStage, name: '使用阶段'},
                    {value: recoveryStage, name: '回收处理阶段'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "LCA生命周期阶段占比图表显示",
        area: ['550px', '450px'],
        shadeClose: false,
        content: jQuery("#showEchart")
    })
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
            formSelect.render();
        });

    })

};
