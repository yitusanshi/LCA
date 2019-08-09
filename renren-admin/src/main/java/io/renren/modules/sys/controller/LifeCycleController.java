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

import io.renren.modules.sys.entity.LifeCycleEntity;
import io.renren.modules.sys.service.LifeCycleService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 可参考sys_menu
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/lifecycle")
public class LifeCycleController {
    @Autowired
    private LifeCycleService lifeCycleService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lifecycle:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lifeCycleService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{materialId}")
    @RequiresPermissions("sys:lifecycle:info")
    public R info(@PathVariable("materialId") Integer materialId){
        LifeCycleEntity lifeCycle = lifeCycleService.getById(materialId);

        return R.ok().put("lifeCycle", lifeCycle);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lifecycle:save")
    public R save(@RequestBody LifeCycleEntity lifeCycle){
        lifeCycleService.save(lifeCycle);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lifecycle:update")
    public R update(@RequestBody LifeCycleEntity lifeCycle){
        ValidatorUtils.validateEntity(lifeCycle);
        lifeCycleService.updateById(lifeCycle);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lifecycle:delete")
    public R delete(@RequestBody Integer[] materialIds){
        lifeCycleService.removeByIds(Arrays.asList(materialIds));

        return R.ok();
    }

}
