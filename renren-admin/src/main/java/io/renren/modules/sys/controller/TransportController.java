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

import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/transport")
public class TransportController {
    @Autowired
    private TransportService transportService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:transport:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = transportService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:transport:info")
    public R info(@PathVariable("id") Integer id){
        TransportEntity transport = transportService.getById(id);

        return R.ok().put("transport", transport);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:transport:save")
    public R save(@RequestBody TransportEntity transport){
        transportService.save(transport);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:transport:update")
    public R update(@RequestBody TransportEntity transport){
        ValidatorUtils.validateEntity(transport);
        transportService.updateById(transport);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:transport:delete")
    public R delete(@RequestBody Integer[] ids){
        transportService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
