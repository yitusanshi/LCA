package io.renren.modules.prManage.controller;

import java.util.*;

import com.alibaba.fastjson.JSON;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.controller.AbstractController;
import io.renren.modules.sys.entity.DictEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.SysUserService;
import io.renren.modules.sys.service.impl.DictServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.prManage.entity.ProductDefineEntity;
import io.renren.modules.prManage.service.ProductDefineService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;

import javax.annotation.Resource;


/**
 * 目标产品定义表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/productdefine")
public class ProductDefineController extends AbstractController {
    @Resource
    private ProductDefineService productDefineService;
    @Resource
    private SysUserService sysUserService;
    @Resource
    private DictServiceImpl dictService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:productdefine:list")
    public R list(@RequestParam Map<String, Object> params) {
        Set<Map.Entry<String, Object>> s = params.entrySet();
        Set<String> r = params.keySet();
        for (Map.Entry<String, Object> en : s) {
            System.out.println(en.getKey() + "," + en.getValue());
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
    public R info(@PathVariable("id") Integer id) {
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
   /* @RequestMapping("/save")
    @RequiresPermissions("sys:productdefine:save")
    public R save(){
        //productDefineService.save(productDefine);
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        System.out.println("---------------------------");
        return R.ok().put("options", list);
        //return R.ok();
    }*/
    @RequestMapping("/save")
    @RequiresPermissions("sys:productdefine:save")
    public R save(@RequestBody ProductDefineEntity productDefine) {
        System.out.println(JSON.toJSON(productDefine).toString());
       /* DictEntity dictEntity = new DictEntity();
        dictEntity.setTypeId(2);
        dictEntity.setSecondName(productDefine.getCompanyName());
        int id = dictService.saveDict(dictEntity);
        productDefine.setIndustryId(id);*/
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        productDefine.setUserId(userid);
        productDefineService.save(productDefine);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:productdefine:update")
    public R update(@RequestBody ProductDefineEntity productDefine) {
        ValidatorUtils.validateEntity(productDefine);
        productDefineService.updateById(productDefine);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:productdefine:delete")
    public R delete(@RequestBody Integer[] ids) {
        System.out.println(ids[0]);
        productDefineService.delById(Arrays.asList(ids));

        return R.ok();
    }


    /*
    *
    * 获取用户下的产品
    * */
    @RequestMapping("/getPrByUserId")
    public R getPrByUserId() {
        List<ProductDefineEntity> prList = productDefineService.getPrByUserId(getUserId());
        return R.ok().put("prList", prList);
    }

}
