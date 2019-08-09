package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.FactorTableEntity;
import io.renren.modules.sys.service.FactorTableService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 特征化指标详情
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/factortable")
public class FactorTableController {
    @Autowired
    private FactorTableService factorTableService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:factortable:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = factorTableService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:factortable:info")
    public R info(@PathVariable("id") Integer id){
        FactorTableEntity factorTable = factorTableService.getById(id);

        return R.ok().put("factorTable", factorTable);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:factortable:save")
    public R save(@RequestBody FactorTableEntity factorTable){
        factorTableService.save(factorTable);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:factortable:update")
    public R update(@RequestBody FactorTableEntity factorTable){
        ValidatorUtils.validateEntity(factorTable);
        factorTableService.updateById(factorTable);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:factortable:delete")
    public R delete(@RequestBody Integer[] ids){
        factorTableService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
