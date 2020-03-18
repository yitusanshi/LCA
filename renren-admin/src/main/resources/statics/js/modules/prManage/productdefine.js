$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/productdefine/list',
        datatype: "json",
        colModel: [
            {label: '序号', name: 'id', index: 'id', width: 50, key: true, hidden: true},
            {label: '产品名称', name: 'prName', index: 'pr_name', width: 80},
            {label: '公司名称', name: 'companyName', index: 'company_name', width: 80},
            {label: '所属行业', name: 'industryName', index: 'second_name', width: 80},
            {label: '系统边界', name: 'systemBoundaryName', index: 'system_boundary', width: 80},
            {label: '功能单位', name: 'functionUnit', index: 'function_unit', width: 40},
            {label: '评价数量', name: 'evalNum', index: 'eval_num', width: 50},
            {label: '评价年份', name: 'year', index: 'year', width: 50},
            {label: '创建时间', name: 'insertTime', index: 'insert_time', width: 100}
        ],
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

});

function getSelectedProductRow() {
    var grid = $("#jqGrid");
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
    console.log("data", selectedIDs[0]);
    console.log("data", grid.getCell(selectedIDs[0], "id"));
    var id = grid.getCell(selectedIDs[0], "id");
    return id;
}

//选择多条记录
function getSelectedProductRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }
    var selectedIDs = grid.getGridParam("selarrrow");
    var ids = new Array();
    for (var i = 0; i < selectedIDs.length; i++) {
        //选中行的时间
        var secondId = grid.getCell(selectedIDs[i], "id");
        ids[i] = secondId;
    }
    return ids;
}


var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            prName: null,
            id: -1
        },
        showList: true,
        title: null,
        productDefine: {},
        options: [],
        shapeOptions: [],
        systemOptions: []
    },
    mounted() {
        /*    alert("a")*/
        //行业管理
        this.send(1);
        //形状与形态
        this.send(3);
        //系统边界
        this.send(4);
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.productDefine = {};
        },
        update: function (event) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            console.log("123");
            $('#btnSaveOrUpdate').button('loading').delay(100).queue(function () {
                var url = vm.productDefine.id == null ? "sys/productdefine/save" : "sys/productdefine/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.productDefine),
                    success: function (r) {
                        if (r.code === 0) {
                            layer.msg("操作成功", {icon: 1});
                            /*vm.reload();*/
                            vm.productDefine = {};
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        } else {
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
            });
        },
        del: function (event) {
            var ids = getSelectedProductRows();
            if (ids == null) {
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
                        url: baseURL + "sys/productdefine/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code == 0) {
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            } else {
                                layer.alert(r.msg);
                            }
                        }
                    });
                }
            }, function () {
            });
        },
        send: function (i) {
            $.ajax({
                method: 'post',
                url: baseURL + "sys/lcadict/query/" + i,
                contentType: "application/json",
                datatype: "json",
                success: function (r) {
                    console.log(r.msg);
                    console.log(r.dictList);
                    if (r.code == 0) {
                        if (i == 1) {
                            vm.options = r.dictList;
                            console.log("11" + vm.options + "===" + r.dictList[0].secondName);
                        }
                        if (i == 3) {
                            vm.shapeOptions = r.dictList;
                        }
                        if (i == 4) {
                            vm.systemOptions = r.dictList;
                        }
                    } else {
                        alert(r.msg);
                    }
                },
            });
        },

        /*send(i) {
		    alert("b")
            $.ajax({
                method:'post',
                url: baseURL + "sys/lcadict/query/" + i,
            }).then(resp => {
                alert("c");
                /!*if (i == 1){*!/
                    this.options = resp.options;
                    console.log("11", this.options);
                /!*}*!/
                /!*if (i == 3){
                    this.shapeOptions = resp.options;
                }
                if (i == 4){
                    this.systemOptions = resp.options;
                }*!/
            }).catch(resp => {
                console.log('请求失败：'+resp.status+','+resp.statusText);
            });
        },*/

        getInfo: function (id) {
            $.get(baseURL + "sys/productdefine/info/" + id, function (r) {
                vm.productDefine = r.productDefine;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page,
                postData: {
                    'roleName': vm.q.prName,
                    'id': vm.q.id
                }
            }).trigger("reloadGrid");
        }
    }
});