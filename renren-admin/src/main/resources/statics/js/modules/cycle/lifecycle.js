$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/lifecycle/list',
        datatype: "json",
        colModel: [
            {label: '产品名称', name: 'prName', index: 'prName', width: '80px'},
			{ label: '原材料名名称', name: 'materialId', index: 'material_id', width: 50, key: true },
			{ label: '上游原材料名称', name: 'parentId', index: 'parent_id', width: 80 },
			{ label: '消耗量', name: 'name', index: 'name', width: 80 },
			{ label: '单位', name: 'unit', index: 'unit', width: 80 },
			{ label: '备注', name: 'desc', index: 'desc', width: 80 },
			{ label: '操作', name: 'createdTime', index: 'created_time', width: 80 },
			{ label: '', name: 'userId', index: 'user_id', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		lifeCycle: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.lifeCycle = {};
		},
		update: function (event) {
			var materialId = getSelectedRow();
			if(materialId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(materialId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lifeCycle.materialId == null ? "sys/lifecycle/save" : "sys/lifecycle/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lifeCycle),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                             $('#btnSaveOrUpdate').button('reset');
                             $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
			});
		},
		del: function (event) {
			var materialIds = getSelectedRows();
			if(materialIds == null){
				return ;
			}
			var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "sys/lifecycle/delete",
                        contentType: "application/json",
                        data: JSON.stringify(materialIds),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
				    });
			    }
             }, function(){
             });
		},
		getInfo: function(materialId){
			$.get(baseURL + "sys/lifecycle/info/"+materialId, function(r){
                vm.lifeCycle = r.lifeCycle;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});