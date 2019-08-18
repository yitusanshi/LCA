$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/lcadict/list',
        datatype: "json",
        colModel: [
            {label: '序号', name: 'secondId', index: 'second_id', width: 80},
            {label: '行业名称', name: 'secondName', index: 'second_name', width: 80},
            {label: '添加时间', name: 'createdTime', index: 'created_time', width: 80},
            {label: '备注', name: 'desc', index: 'desc', width: 80}
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        postData:{'typeid': '1'},
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

//选择一条记录
function getSelectedDictRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
        alert("请选择一条记录");
        return ;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
        alert("只能选择一条记录");
        return ;
    }
    console.log("data", selectedIDs[0]);
    console.log("data", grid.getCell(selectedIDs[0], "secondId"));
    var id = grid.getCell(selectedIDs[0], "secondId");
    return id;
}

//选择多条记录
function getSelectedDictRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
        alert("请选择一条记录");
        return ;
    }
    var selectedIDs = grid.getGridParam("selarrrow");
    var ids = new Array();
    for (var i = 0; i < selectedIDs.length; i++) {
        //选中行的时间
        var secondId = grid.getCell(selectedIDs[i], "secondId");
        ids[i] = secondId;
    }
    return ids;
}

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            name: null
        },
        showList: true,
        title: null,
        dict: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.dict = {
                typeId : 1
            };
        },
        update: function (event) {
            var id = getSelectedDictRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            console.log("vm", vm.dict);
            var url = vm.dict.typeId == null ? "sys/lcadict/save" : "sys/lcadict/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.dict),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedDictRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/lcadict/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "sys/lcadict/info/" + id, function (r) {
                vm.dict = r.dict;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'typeid': '1'},
                page: page
            }).trigger("reloadGrid");
        }
    }
});