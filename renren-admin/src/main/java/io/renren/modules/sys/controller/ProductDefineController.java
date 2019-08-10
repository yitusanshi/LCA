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

import io.renren.modules.sys.entity.ProductDefineEntity;
import io.renren.modules.sys.service.ProductDefineService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 目标产品定义表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/productdefine")
public class ProductDefineController {
    @Autowired
    private ProductDefineService productDefineService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:productdefine:list")
    public R list(@RequestParam Map<String, Object> params){
        System.out.println(111);
        PageUtils page = productDefineService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:productdefine:info")
    public R info(@PathVariable("id") Integer id){
        ProductDefineEntity productDefine = productDefineService.getById(id);

        return R.ok().put("productDefine", productDefine);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:productdefine:save")
    public R save(@RequestBody ProductDefineEntity productDefine){
        productDefineService.save(productDefine);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:productdefine:update")
    public R update(@RequestBody ProductDefineEntity productDefine){
        ValidatorUtils.validateEntity(productDefine);
        productDefineService.updateById(productDefine);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:productdefine:delete")
    public R delete(@RequestBody Integer[] ids){
        productDefineService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
