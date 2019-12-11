$(function () {
    pageInit();
});

function pageInit() {
    $("#designTable").jqGrid({
        datatype: "json",
        url: baseURL + "compare/info",
        colModel: [
            {label: '阶段名称', name: 'flagName', index: 'flagName', width: '80px'},
            {label: '阶段标识', name: 'flag', index: 'flag', width: '80px', hidden: true},
            {label: '用户ID', name: 'userId', index: 'userId', width: '80px', hidden: true},
            {label: '来源ID', name: 'formId', index: 'formId', width: '80px', hidden: true},
            {label: '产品ID', name: 'prId', index: 'prId', width: '80px', hidden: true},
            {label: '父类ID', name: 'parentId', index: 'parentId', width: '80px', hidden: true},
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
            {label: '物质ID', name: 'materialId', index: 'materialId', width: '80px', hidden: true},
            {label: '物质名称', name: 'materialName', index: 'materialName', width: '80px'},
            {label: '父级物质名称', name: 'fmaterialName', index: 'fmaterialName', width: '80px'},
            {label: '使用量/消耗量/排放量', name: 'materialUsage', index: 'materialUsage', width: '80px'},
            {label: '单位', name: 'unit', index: 'unit', width: '80px'}
        ],
        postData: {
            'batchNo': "0",
            "prId": "0"
        },
        height: "25%",
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#designTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
}


function queryData() {
    $.ajax({
        type: "GET",
        url: baseURL + 'compare/info',
        data: {
            "batchNo": vm.batchSelect,
            'prId': vm.prSelect
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 0) {
                var info = result.info;
                var tr = '';
                for (var i = 0; i < info.length; i++) {
                    var flag = info[i].flag;
                    var materialList = info[i].materialList;
                    if (flag == "0") {
                        var materialList = info[i].materialList;
                        for (var j = 0; j < materialList.length; j++) {
                            tr += "<tr>"
                            tr += '<td><input type="text" class="noBorder"  value="原料阶段" style="width: 120px;" readonly="readonly"></td>';
                            tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + materialList[j].flag + '"></td>';
                            tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + materialList[j].userId + '"></td>';
                            tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + materialList[j].formId + '"></td>';
                            tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + materialList[j].prId + '"></td>';
                            tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + materialList[j].parentId + '"></td>';
                            tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + materialList[j].prName + '"></td>';
                            tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + materialList[j].materialId + '"></td>';
                            tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '"></td>';
                            tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="无"></td>';
                            tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + materialList[j].materialUsage + '"></td>';
                            tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + materialList[j].unit + '"></td>';
                            tr += "</tr>"
                            /*
                            * 开始各个物质层了
                            * */
                            var prNameList = materialList[j].prNameList;
                            for (var p = 0; p < prNameList.length; p++) {
                                var infoList = prNameList[p].infoList;
                                if (prNameList[p].formId == "11") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="原料阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|原材料消耗"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>"
                                    }
                                } else if (prNameList[p].formId == "12") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="原料阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|资源能源消耗"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else if (prNameList[p].formId == "13") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>";
                                        tr += '<td><input type="text" class="noBorder"  value="原料阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|排放与废气"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else if (prNameList[p].formId == "14") {

                                } else if (prNameList[p].formId == "15") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="原料阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|包装过程"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else {
                                    layer.alert("生命周期阶段数据分类有问题，请联系管理员");
                                }
                            }

                        }

                    } else if (flag == "1") {
                        var infoLists = info[i].infoList;
                        for (var k = 0; k < infoLists.length; k++) {
                            var formId = infoLists[k].formId;
                            var infoList = infoLists[k].infoList;
                            if (formId == "11") {
                                for (var j = 0; j < infoList.length; j++) {
                                    tr += "<tr>"
                                    tr += '<td><input type="text" class="noBorder"  value="生产阶段" style="width: 120px;" readonly="readonly"></td>';
                                    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[j].flag + '"></td>';
                                    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[j].userId + '"></td>';
                                    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[j].formId + '"></td>';
                                    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[j].prId + '"></td>';
                                    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[j].parentId + '"></td>';
                                    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[j].prName + '"></td>';
                                    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[j].materialId + '"></td>';
                                    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[j].materialName + '"></td>';
                                    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="原材料消耗"></td>';
                                    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[j].materialUsage + '"></td>';
                                    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[j].unit + '"></td>';
                                    tr += "</tr>";
                                }
                            } else if (formId == "12") {
                                for (var j = 0; j < infoList.length; j++) {
                                    tr += "<tr>"
                                    tr += '<td><input type="text" class="noBorder"  value="生产阶段" style="width: 120px;" readonly="readonly"></td>';
                                    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[j].flag + '"></td>';
                                    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[j].userId + '"></td>';
                                    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[j].formId + '"></td>';
                                    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[j].prId + '"></td>';
                                    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[j].parentId + '"></td>';
                                    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[j].prName + '"></td>';
                                    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[j].materialId + '"></td>';
                                    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[j].materialName + '"></td>';
                                    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="资源能源消耗"></td>';
                                    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[j].materialUsage + '"></td>';
                                    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[j].unit + '"></td>';
                                    tr += "</tr>";
                                }
                            } else if (formId == "13") {
                                for (var j = 0; j < infoList.length; j++) {
                                    tr += "<tr>"
                                    tr += '<td><input type="text" class="noBorder"  value="生产阶段" style="width: 120px;" readonly="readonly"></td>';
                                    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[j].flag + '"></td>';
                                    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[j].userId + '"></td>';
                                    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[j].formId + '"></td>';
                                    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[j].prId + '"></td>';
                                    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[j].parentId + '"></td>';
                                    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[j].prName + '"></td>';
                                    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[j].materialId + '"></td>';
                                    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[j].materialName + '"></td>';
                                    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="排放与废气"></td>';
                                    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[j].materialUsage + '"></td>';
                                    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[j].unit + '"></td>';
                                    tr += "</tr>";
                                }
                            } else if (formId == "14") {

                            } else if (formId == "15") {
                                for (var j = 0; j < infoList.length; j++) {
                                    tr += "<tr>"
                                    tr += '<td><input type="text" class="noBorder"  value="生产阶段" style="width: 120px;" readonly="readonly"></td>';
                                    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[j].flag + '"></td>';
                                    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[j].userId + '"></td>';
                                    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[j].formId + '"></td>';
                                    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[j].prId + '"></td>';
                                    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[j].parentId + '"></td>';
                                    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[j].prName + '"></td>';
                                    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[j].materialId + '"></td>';
                                    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[j].materialName + '"></td>';
                                    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="包装过程"></td>';
                                    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[j].materialUsage + '"></td>';
                                    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[j].unit + '"></td>';
                                    tr += "</tr>";
                                }
                            }

                        }
                    } else if (flag == "2") {

                    } else if (flag == "3") {

                    } else if (flag == "4") {
                        /*
                        * 回收处理阶段
                        * */
                        var materialList = info[i].materialList;
                        for (var j = 0; j < materialList.length; j++) {
                            tr += "<tr>"
                            tr += '<td><input type="text" class="noBorder"  value="回收处理阶段" style="width: 120px;" readonly="readonly"></td>';
                            tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + materialList[j].flag + '"></td>';
                            tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + materialList[j].userId + '"></td>';
                            tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + materialList[j].formId + '"></td>';
                            tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + materialList[j].prId + '"></td>';
                            tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + materialList[j].parentId + '"></td>';
                            tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + materialList[j].prName + '"></td>';
                            tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + materialList[j].materialId + '"></td>';
                            tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '"></td>';
                            tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="无"></td>';
                            tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + materialList[j].materialUsage + '"></td>';
                            tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + materialList[j].unit + '"></td>';
                            tr += "</tr>"
                            /*
                            * 开始各个物质层了
                            * */
                            var prNameList = materialList[j].prNameList;
                            for (var p = 0; p < prNameList.length; p++) {
                                var infoList = prNameList[p].infoList;
                                if (prNameList[p].formId == "11") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="回收处理阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|原材料消耗"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>"
                                    }
                                } else if (prNameList[p].formId == "12") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="回收处理阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|资源能源消耗"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else if (prNameList[p].formId == "13") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>";
                                        tr += '<td><input type="text" class="noBorder"  value="回收处理阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|排放与废气"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else if (prNameList[p].formId == "14") {

                                } else if (prNameList[p].formId == "15") {
                                    for (var m = 0; m < infoList.length; m++) {
                                        tr += "<tr>"
                                        tr += '<td><input type="text" class="noBorder"  value="回收处理阶段" style="width: 120px;" readonly="readonly"></td>';
                                        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + infoList[m].flag + '"></td>';
                                        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + infoList[m].userId + '"></td>';
                                        tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + infoList[m].formId + '"></td>';
                                        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + infoList[m].prId + '"></td>';
                                        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + infoList[m].parentId + '"></td>';
                                        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + infoList[m].prName + '"></td>';
                                        tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + infoList[m].materialId + '"></td>';
                                        tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + infoList[m].materialName + '"></td>';
                                        tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialList[j].materialName + '|包装过程"></td>';
                                        tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + infoList[m].materialUsage + '"></td>';
                                        tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + infoList[m].unit + '"></td>';
                                        tr += "</tr>";
                                    }
                                } else {
                                    layer.alert("生命周期阶段数据分类有问题，请联系管理员");
                                }
                            }
                        }
                    } else {
                        layer.alert("生命周期阶段数据有问题，请联系管理员");
                    }
                }
                $('#designTable').html(tr);
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
                }

                ,
            })
            ;

        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#designTable").jqGrid('getGridParam', 'page');
            $("#designTable").jqGrid('setGridParam', {
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
            /*if (value != undefined && value != null && value != '') {
                $(selectId).val(value);
            }*/
            formSelect.render();
        });

    })

};


/**
 * 自动将form表单封装成json对象序列化form表单
 */
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function saveData() {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "保存修改数据",
        area: ['550px', '400px'],
        shadeClose: false,
        content: jQuery("#batchNo"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            var data = {
                "batchNo": vm.bNo,
                "prUsage": vm.bUsage,
                "prUnit": vm.bUnit,
                "datas": JSON.stringify($('#designId').serializeObject())
            };
            $.ajax({
                type: "POST",
                url: baseURL + "sys/batch/saveData",
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

}
