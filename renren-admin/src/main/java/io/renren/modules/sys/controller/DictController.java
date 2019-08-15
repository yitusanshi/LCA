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

import io.renren.modules.sys.entity.DictEntity;
import io.renren.modules.sys.service.DictService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 字段映射表  id和name的映射
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/lcadict")
public class DictController {
    @Autowired
    private DictService dictService;

    /**
     * 列表
     */
    @RequestMapping("/list")
   // @RequiresPermissions("sys:lcadict:list")
    public R list(@RequestParam Map<String, Object> params) {
        System.out.println(111111);
        PageUtils page = dictService.queryPage(params);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{typeId}")
    @RequiresPermissions("sys:lcadict:info")
    public R info(@PathVariable("typeId") Integer typeId) {
        DictEntity dict = dictService.getById(typeId);

        return R.ok().put("dict", dict);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lcadict:save")
    public R save(@RequestBody DictEntity dict) {
        dictService.save(dict);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lcadict:update")
    public R update(@RequestBody DictEntity dict) {
        ValidatorUtils.validateEntity(dict);
        dictService.updateById(dict);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lcadict:delete")
    public R delete(@RequestBody Integer[] typeIds) {
        dictService.removeByIds(Arrays.asList(typeIds));

        return R.ok();
    }

}
