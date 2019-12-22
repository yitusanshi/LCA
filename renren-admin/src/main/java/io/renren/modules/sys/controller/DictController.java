package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.impl.DictServiceImpl;
import org.apache.shiro.SecurityUtils;
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

import javax.annotation.Resource;


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
    @Resource
    private DictServiceImpl dictService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    //@RequiresPermissions("sys:lcadict:list")
    public R list(@RequestParam Map<String, Object> params) {
        System.out.println(111111);
        PageUtils page = dictService.queryPage(params);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{secondId}")
    @RequiresPermissions("sys:lcadict:info")
    public R info(@PathVariable("secondId") Integer secondId) {
        DictEntity dict = dictService.getByseconId(secondId);

        return R.ok().put("dict", dict);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lcadict:save")
    public R save(@RequestBody DictEntity dict) {
        System.out.println(JSON.toJSONString(dict));
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        int maxid = dictService.maxSecondId() + 1;
        dict.setSecondId(maxid);
        dict.setUserId(userid);
        dictService.saveDict(dict);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lcadict:update")
    public R update(@RequestBody DictEntity dict) {
        ValidatorUtils.validateEntity(dict);
        dictService.updateBysencondId(dict);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lcadict:delete")
    public R delete(@RequestBody Integer[] typeIds) {
        dictService.removeSecondIds(Arrays.asList(typeIds));

        return R.ok();
    }
    /*
    * 根据typeid查询
    * */
    @RequestMapping("/query/{typeId}")
    @RequiresPermissions("sys:lcadict:info")
    public R query(@PathVariable("typeId") Integer typeId) {
        System.out.println("-----"+ typeId);
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        List<DictEntity> list = dictService.quertByTypeId(typeId, userid);
        //保持和前端同步
        return R.ok().put("dictList", list);
    }

/*    *//*
     * 根据typeid查询
     * *//*
    @RequestMapping("/listDict")
    public R query(@RequestParam Map<String, Object> params) {

        //保持和前端同步
        return R.ok().put("dictList", "");
    }*/

}
