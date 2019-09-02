$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/featruefactor/selectFeaBy',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', width: 50, key: true},
            {label: '中文名称', name: 'zhName', index: 'zh_name', width: 80},
            {label: '英文名称', name: 'enName', index: 'en_name', width: 80},
            {label: '编写', name: 'abb', index: 'abb', width: 80},
            {label: '单位', name: 'unit', index: 'unit', width: 80},
            {label: '来源', name: 'source', index: 'source', width: 80},
            {
                label: '操作', name: 'perate', index: 'perate', formatter: function (value, rows, index) {
                    return "<button class='btn btn-primary' onclick='showDetails(" + index.id + ");'><i class='fa fa-eye'></i>查看详情</button>&nbsp;&nbsp;";
                }
            }
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
        search: {
            caption: "Search...",
            Find: "Find",
            Reset: "Reset",
            matchText: " match"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});

function queryFeature() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        type: "POST",
        page: page,
        url: baseURL + "sys/featruefactor/selectFeaBy",
        postData: {"parStr": $("#queryFeas").val()}
    }).trigger("reloadGrid");
};

function showDetails(id) {
    $.ajax({
        type: "POST",
        url: baseURL + "sys/featruefactor/selectFeatureDetails",
        data: {
            "featureId": id
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 0) {
                var featrueFactor = result.factor.featrueFactor;
                var factorTable = result.factor.factorTable;
                $("#fe_znName").text(featrueFactor.zhName);
                $("#fe_enName").text(featrueFactor.enName);
                $("#fe_abb").text(featrueFactor.abb);
                $("#fe_unit").text(featrueFactor.unit);
                var factorTr = "";
                factorTr += "<thead><tr><th colspan=" + 3 + ">因子表</th></tr>";
                factorTr += "<tr><th>物质名称</th><th>物质单位</th><th>因子值</th></tr><thead><tbody>";
                for (var i = 0; i < factorTable.length; i++) {
                    factorTr += "<tr><th>" + factorTable[i].materialName + "</th>";
                    factorTr += "<th>" + factorTable[i].unit + "</th>";
                    factorTr += "<th>" + factorTable[i].factor1 + "</th></tr>";
                }
                factorTr + "</tbody>";
                $('#factor_id').html(factorTr);
            } else {
                layer.alert(result.msg);
            }
        }
    });
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "显示详情",
        area: ['700px', '370px'],
        shadeClose: false,
        scrollbar: false,
        content: jQuery("#detailsId")
    });
};

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        featrueFactor: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.featrueFactor = {};
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
            $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function () {
                var url = vm.featrueFactor.id == null ? "sys/featruefactor/save" : "sys/featruefactor/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.featrueFactor),
                    success: function (r) {
                        if (r.code === 0) {
                            layer.msg("操作成功", {icon: 1});
                            vm.reload();
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
            var ids = getSelectedRows();
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
                        url: baseURL + "sys/featruefactor/delete",
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
        getInfo: function (id) {
            $.get(baseURL + "sys/featruefactor/info/" + id, function (r) {
                vm.featrueFactor = r.featrueFactor;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        }
    }
});