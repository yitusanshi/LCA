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

import io.renren.modules.sys.entity.UsageStatisticsEntity;
import io.renren.modules.sys.service.UsageStatisticsService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 使用量
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/usagestatistics")
public class UsageStatisticsController {
    @Autowired
    private UsageStatisticsService usageStatisticsService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:usagestatistics:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = usageStatisticsService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:usagestatistics:info")
    public R info(@PathVariable("id") Integer id){
        UsageStatisticsEntity usageStatistics = usageStatisticsService.getById(id);

        return R.ok().put("usageStatistics", usageStatistics);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:usagestatistics:save")
    public R save(@RequestBody UsageStatisticsEntity usageStatistics){
        usageStatisticsService.save(usageStatistics);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:usagestatistics:update")
    public R update(@RequestBody UsageStatisticsEntity usageStatistics){
        ValidatorUtils.validateEntity(usageStatistics);
        usageStatisticsService.updateById(usageStatistics);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:usagestatistics:delete")
    public R delete(@RequestBody Integer[] ids){
        usageStatisticsService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
