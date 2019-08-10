package io.renren.modules.sys.controller;

import java.util.*;

import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.SysUserService;
import org.apache.shiro.SecurityUtils;
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
    @Autowired
    private SysUserService sysUserService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:productdefine:list")
    public R list(@RequestParam Map<String, Object> params){
        Set<Map.Entry<String, Object>> s=params.entrySet();
        Set<String> r=params.keySet();
        for(Map.Entry<String, Object> en:s){
            System.out.println(en.getKey()+","+en.getValue());
        }
        System.out.println(params.get("id"));
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
        //ProductDefineEntity productDefine = productDefineService.getById(id);
        List<String> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        System.out.println("---------------------------");
        return R.ok().put("options", list);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:productdefine:save")
    public R save(){
        //productDefineService.save(productDefine);
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        System.out.println("---------------------------");
        return R.ok().put("options", list);
        //return R.ok();
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
