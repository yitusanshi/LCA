$(function () {
    $("#naturalTable").jqGrid({
        datatype: "json",
        url: baseURL + "calculateFeature/queryByParam",
        colModel: [
            {label: 'ID', name: 'id', index: 'id', width: '80px', hidden: true},
            {label: '物质名称', name: 'secondName', index: 'secondName', width: '150px'},
            {label: '物质ID', name: 'feature11SecondId', index: 'feature11SecondId', width: '80px', hidden: true},
            {label: '影响因素名称', name: 'name', index: 'name', width: '150px'},
            {label: '特征化值', name: 'factor', index: 'factor', width: '180px'},
            {label: '单位', name: 'unit', index: 'unit', width: '120px'},
            {label: '序号', name: 'excelOrder', index: 'excelOrder', width: '80px', hidden: true},
            {
                label: '操作', name: 'operId', index: 'operId', width: '80px', formatter: function (value, rows, index) {
                    return "<button class='btn btn-primary' onclick='updateBgFactorById(" + index.id + ",\"" + index.secondName + "\",\"" + index.name + "\",\"" + index.factor + "\",\"" + index.unit + "\");'><i class='fa fa-edit'></i>修改</button>&nbsp;&nbsp;";
                }
            }
        ],
        postData: {
            'typeId': vm.selectNatural,
            'materialName': null,
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
            $("#naturalTable").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});


function updateBgFactorById(id, secondName, name, factor, unit) {

    $("#bgSecondName").val(secondName);
    $("#bgName").val(name);
    $("#bgFactor").val(factor);
    $("#bgUnit").val(unit);
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "修改原材料/背景物质因子",
        area: ['600px', '350px'],
        shadeClose: false,
        content: jQuery("#bgFactorUpdateById"),
        btn: ['保存', '取消'],
        btn1: function (index) {
            var data = {
                "id": id,
                "factor": $("#bgFactor").val()
            };
            $.ajax({
                type: "POST",
                url: baseURL + "calculateFeature/update",
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


function queryNaturalData() {
    vm.reload();
}

var vm = new Vue({
    el: '#rrapp',
    data: {
        mainList: true,
        bgMainList: false,
        selectNatural: "-1",
        bgName: ""
    },
    methods: {
        addBgFactor: function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "新增原材料/背景物质因子",
                area: ['800px', '450px'],
                shadeClose: false,
                content: jQuery("#bgFactorId"),
                btn: ['保存', '取消'],
                btn1: function (index) {
                    var data = {
                        "typeId": $("#selectBgId").val(),
                        "secondName": $("#secondName").val(),
                        "unit": $("#secondUnit").val(),
                        "1": $("#bg1").val(),
                        "2": $("#bg2").val(),
                        "3": $("#bg3").val(),
                        "4": $("#bg4").val(),
                        "5": $("#bg5").val(),
                        "6": $("#bg6").val(),
                        "7": $("#bg7").val(),
                        "8": $("#bg8").val(),
                        "9": $("#bg9").val(),
                        "10": $("#bg10").val(),
                        "11": $("#bg11").val(),
                        "12": $("#bg12").val(),
                        "13": $("#bg13").val(),
                        "14": $("#bg14").val()
                    };
                    $.ajax({
                        type: "POST",
                        url: baseURL + "calculateFeature/add",
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
        updateBgFactorById: function () {

        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#naturalTable").jqGrid('getGridParam', 'page');
            $("#naturalTable").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'typeId': vm.selectNatural,
                    'materialName': vm.bgName,
                }
            }).trigger("reloadGrid");
        }
    }
});


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

/*function mergeCells(data, fieldName, colspan, target) {
    //声明一个map计算相同属性值在data对象出现的次数和
    var sortMap = {};
    for (var i = 0; i < data.length; i++) {
        for (var prop in data[i]) {
            if (prop == fieldName) {
                var key = data[i][prop]
                if (sortMap.hasOwnProperty(key)) {
                    sortMap[key] = sortMap[key] * 1 + 1;
                } else {
                    sortMap[key] = 1;
                }
                break;
            }
        }
    }
    for (var prop in sortMap) {
        console.log(prop, sortMap[prop])
    }
    var index = 0;
    for (var prop in sortMap) {
        var count = sortMap[prop] * 1;
        $(target).bootstrapTable('mergeCells', {index: index, field: fieldName, colspan: colspan, rowspan: count});
        index += count;
    }
}*/
