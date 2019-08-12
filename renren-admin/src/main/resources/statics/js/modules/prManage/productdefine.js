$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/productdefine/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'id', index: 'id', width: 50, key: true },
			{ label: '产品名称', name: 'prName', index: 'pr_name', width: 80 }, 			
			{ label: '公司名称', name: 'companyName', index: 'company_name', width: 80 },
            { label: '所属行业', name: 'industryName', index: 'second_name', width: 80 },
            { label: '系统边界', name: 'systemBoundary', index: 'system_boundary', width: 80 },
			/*{ label: '规则型号', name: 'modelType', index: 'model_type', width: 80 }, */
			/*{ label: '产品类别', name: 'productType', index: 'product_type', width: 80 },
			{ label: '形状与形态', name: 'shape', index: 'shape', width: 80 }, 	*/
			{ label: '功能单位', name: 'functionUnit', index: 'function_unit', width: 80 }, 			
			{ label: '评价数量', name: 'evalNum', index: 'eval_num', width: 80 }, 			

			{ label: '创建时间', name: 'insertTime', index: 'insert_time', width: 80 },

			{ label: '创建人', name: 'userName', index: 'username', width: 80 },
			{ label: '创建时间', name: 'insertTime', index: 'insert_time', width: 80 }
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
        q:{
            prName: null
        },
		showList: true,
		title: null,
		productDefine: {},
        options:[]
	},
    mounted(){
	/*    alert("a")*/
	    this.send();
    },
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.productDefine = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.productDefine.id == null ? "sys/productdefine/save" : "sys/productdefine/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.productDefine),
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
			var ids = getSelectedRows();
			if(ids == null){
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
                        url: baseURL + "sys/productdefine/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
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
        send() {
		    alert("b")
            $.ajax({
                method:'post',
                url: baseURL + "sys/productdefine/save"
            }).then(resp => {
                alert("c");
                this.options = resp.options;
            }).catch(resp => {
                console.log('请求失败：'+resp.status+','+resp.statusText);
            });
        },

		getInfo: function(id){
			$.get(baseURL + "sys/productdefine/info/"+id, function(r){
                vm.productDefine = r.productDefine;
            });
		},
		reload: function (event) {
			vm.showList = true;
            alert("11");
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page,
                postData:{'roleName': vm.q.prName,
                'id': vm.q.id}
            }).trigger("reloadGrid");
		}
	}
});