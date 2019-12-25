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
                for (var i = 0; i < info.length; i++) {
                    var flag = info[i].flag;
                    if (flag == "0") {
                        $("#flagTbody0").html(getHtmlByFlag0(info[i].materialList)[0]);
                        $("#trantTbody00").html(getHtmlByFlag0(info[i].materialList)[1])
                        $("#trantTbody0").html(trTranHtml(info[i].transPortList, "-1"));
                    } else if (flag == "1") {
                        $("#flagTbody1").html(getHtmlByFlag1(info[i].materialList));
                    } else if (flag == "2") {
                        $("#trantTbody2").html(trTranHtml(info[i].transPortList, "-1"));
                    } else if (flag == "3") {
                        $("#flagTbody3").html(getHtmlByFlag1(info[i].materialList));
                    } else if (flag == "4") {
                        $("#flagTbody4").html(getHtmlByFlag4(info[i].materialList)[0]);
                        $("#trantTbody44").html(getHtmlByFlag4(info[i].materialList)[1])
                        $("#trantTbody4").html(trTranHtml(info[i].transPortList, "-1"));
                    }
                }
            } else {
                layer.alert(result.msg);
            }

        }
    });
}


/*
* 原料阶段
* */
function getHtmlByFlag0(materialList) {
    var tr = "";
    var transTr = "";
    for (var i = 0; i < materialList.length; i++) {
        tr += trHtml(materialList[i].materialName, materialList[i], "无");
        var prNameList = materialList[i].prNameList;
        for (var j = 0; j < prNameList.length; j++) {
            var formId = prNameList[j].formId;
            var infoList = prNameList[j].infoList;
            if (formId == "11") {
                for (var m = 0; m < infoList.length; m++) {
                    tr += trHtml(materialList[i].materialName, infoList[m], "原材料消耗");
                }
            } else if (formId == "12") {
                for (var m = 0; m < infoList.length; m++) {
                    tr += trHtml(materialList[i].materialName, infoList[m], "资源能源消耗");
                }
            } else if (formId == "13") {
                for (var m = 0; m < infoList.length; m++) {
                    tr += trHtml(materialList[i].materialName, infoList[m], "排放与废弃");
                }
            } else if (formId == "14") {
                transTr += trTranHtml(infoList, materialList[i].materialName);
            } else if (formId == "15") {
                for (var m = 0; m < infoList.length; m++) {
                    tr += trHtml(materialList[i].materialName, infoList[m], "包装过程");
                }
            }
        }
    }
    return [tr, transTr];
}

/*
* 生产阶段
*
* */

function getHtmlByFlag1(materialList) {
    var tr = "";
    for (var i = 0; i < materialList.length; i++) {
        var formId = materialList[i].formId;
        var infoList = materialList[i].infoList;
        if (formId == "12") {
            for (var m = 0; m < infoList.length; m++) {
                tr += trHtmlS("无", infoList[m], "资源能源消耗");
            }
        } else if (formId == "13") {
            for (var m = 0; m < infoList.length; m++) {
                tr += trHtmlS("无", infoList[m], "排放与废弃");
            }
        } else if (formId == "15") {
            for (var m = 0; m < infoList.length; m++) {
                tr += trHtmlS("无", infoList[m], "包装过程");
            }
        }
    }
    return tr;
}


/*
* 回收处理阶段
* */
function getHtmlByFlag4(materialList, materialName) {
    var tr = "";
    var transTr = "";
    for (var i = 0; i < materialList.length; i++) {
        tr += trHtml(materialList[i].materialName, materialList[i], "无");
        if (materialList[i].formId == "10") {
            var prNameList = materialList[i].prNameList;
            for (var j = 0; j < prNameList.length; j++) {
                var formId = prNameList[j].formId;
                var infoList = prNameList[j].infoList;
                if (formId == "11") {
                    for (var m = 0; m < infoList.length; m++) {
                        tr += trHtml(materialList[i].materialName, infoList[m], "原材料消耗");
                    }
                } else if (formId == "12") {
                    for (var m = 0; m < infoList.length; m++) {
                        tr += trHtml(materialList[i].materialName, infoList[m], "资源能源消耗");
                    }
                } else if (formId == "13") {
                    for (var m = 0; m < infoList.length; m++) {
                        tr += trHtml(materialList[i].materialName, infoList[m], "排放与废弃");
                    }
                } else if (formId == "14") {
                    transTr += trTranHtml(infoList, materialList[i].materialName);
                } else if (formId == "15") {
                    for (var m = 0; m < infoList.length; m++) {
                        tr += trHtml(materialList[i].materialName, infoList[m], "包装过程");
                    }
                }
            }
        }
    }
    return [tr, transTr];
}

function trTranHtml(objInfos, materialName) {
    var tr = "";
    for (var i = 0; i < objInfos.length; i++) {
        var objInfo = objInfos[i];
        tr += '<tr>';
        tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + objInfo.prName + '"></td>';
        if (materialName != "-1") {
            console.log("9999" + "===" + materialName);
            tr += '<td><input id="fmaterialName" class="noBorder" name="fmaterialName" style="width: 120px;" readonly="readonly" value="' + materialName + '"></td>';
        }
        ;
        tr += '<td><input id="materialName" class="noBorder" name="materialName" style="width: 120px;" readonly="readonly" value="' + objInfo.materialName + '"></td>';
        tr += '<td><input id="typeName" class="noBorder" name="typeName" style="width: 120px;" readonly="readonly" value="' + objInfo.typeName + '"></td>';
        tr += '<td><input id="distance" class="noBorder" type="text" name="distance" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + objInfo.distance + '"></td>';
        tr += '<td><input id="weight" class="noBorder" type="text" name="weight" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + objInfo.weight + '"></td>';
        tr += '<td><input id="source" class="noBorder" name="source" style="width: 120px;" readonly="readonly" value="' + objInfo.source + '"></td>';
        tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + objInfo.flag + '"></td>';
        tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + objInfo.userId + '"></td>';
        tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + objInfo.prId + '"></td>';
        tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + objInfo.parentId + '"></td>';
        tr += '<td style="display: none"><input id="type" class="noBorder" name="type" style="width: 120px;display: none" readonly="readonly" value="' + objInfo.type + '"></td>';
        tr += "</tr>";
    }
    console.log(tr);
    return tr;


}

/*生产阶段*/
function trHtmlS(stageName, objInfo, materialNames) {
    var tr = "";
    tr += "<tr>"
    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + objInfo.prName + '"></td>';
    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + objInfo.flag + '"></td>';
    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + objInfo.userId + '"></td>';
    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + objInfo.formId + '"></td>';
    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + objInfo.prId + '"></td>';
    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + objInfo.parentId + '"></td>';
    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 200px;" readonly="readonly" value="' + materialNames + '"></td>';
    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + objInfo.materialId + '"></td>';
    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 220px;" readonly="readonly" value="' + objInfo.materialName + '"></td>';
    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + objInfo.materialUsage + '"></td>';
    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + objInfo.unit + '"></td>';
    tr += '<td style="display: none"><input id="sourceFlag" class="noBorder" name="sourceFlag" style="display: none" value="' + objInfo.sourceFlag + '"></td>';

    tr += "</tr>"
    return tr;
}


function trHtml(stageName, objInfo, materialNames) {
    var tr = "";
    tr += "<tr>"
    tr += '<td><input id="prName" class="noBorder" name="prName" style="width: 120px;" readonly="readonly" value="' + objInfo.prName + '"></td>';
    tr += '<td><input type="text" class="noBorder"  value="' + stageName + '" style="width: 90px;" readonly="readonly"></td>';
    tr += '<td style="display: none"><input id="flag" class="noBorder" name="flag" style="display: none" value="' + objInfo.flag + '"></td>';
    tr += '<td style="display: none"><input id="userId" class="noBorder" name="userId" style="display: none" value="' + objInfo.userId + '"></td>';
    tr += '<td style="display: none"><input id="formId" class="noBorder" name="formId" style="display: none" value="' + objInfo.formId + '"></td>';
    tr += '<td style="display: none"><input id="prId" class="noBorder" name="prId" style="display: none" value="' + objInfo.prId + '"></td>';
    tr += '<td style="display: none"><input id="parentId" class="noBorder" name="parentId" style="display: none" value="' + objInfo.parentId + '"></td>';
    tr += '<td><input id="fmaterialName" class="noBorder" type="text" name="fmaterialName" style="width: 200px;" readonly="readonly" value="' + materialNames + '"></td>';
    tr += '<td style="display: none"><input id="materialId" class="noBorder" name="materialId" style="display: none" value="' + objInfo.materialId + '"></td>';
    tr += '<td><input id="materialName"  class="noBorder" name="materialName" style="width: 220px;" readonly="readonly" value="' + objInfo.materialName + '"></td>';
    tr += '<td><input id="materialUsage" class="noBorder" type="text" name="materialUsage" style="width: 120px;" onkeyup="value=value.replace(/[^\\d{1,}\\.\\d{1,}|\\d{1,}]/g,\'\')" value="' + objInfo.materialUsage + '"></td>';
    tr += '<td><input id="unit" type="text" class="noBorder" name="unit" style="width: 120px;" readonly="readonly" value="' + objInfo.unit + '"></td>';
    tr += '<td style="display: none"><input id="sourceFlag" class="noBorder" name="sourceFlag" style="display: none" value="' + objInfo.sourceFlag + '"></td>';

    tr += "</tr>"
    return tr;
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
    if (vm.prSelect == "-1") {
        alert("请选择产品进行保存！")
        return;
    }
    if (vm.bNo == "-1") {
        alert("请选择产品版本进行保存！")
        return;
    }


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
                "prId": vm.prSelect,
                /*
                * 原料阶段
                * */
                "flagForm0": JSON.stringify($('#flagForm0').serializeObject()),
                "trantForm0": JSON.stringify($('#trantForm0').serializeObject()),
                "trantForm00":JSON.stringify($('#trantForm00').serializeObject()),


                /*
                * 生产阶段
                * */
                "flagForm1": JSON.stringify($('#flagForm1').serializeObject()),

                /*
                * 销售阶段
                * */
                "trantForm2": JSON.stringify($('#trantForm2').serializeObject()),

                /*
                * 使用阶段
                * */
                "flagForm3": JSON.stringify($('#flagForm3').serializeObject()),

                /*
                * 回收阶段
                * */
                "flagForm4": JSON.stringify($('#flagForm4').serializeObject()),
                "trantForm44": JSON.stringify($('#trantForm44').serializeObject()),
                "trantForm4": JSON.stringify($('#trantForm4').serializeObject())
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
