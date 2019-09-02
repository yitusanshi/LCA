package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.common.utils.Query;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.FactorTableEntity;
import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.FactorTableService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.FeatrueFactorEntity;
import io.renren.modules.sys.service.FeatrueFactorService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * 特征化因子
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@RestController
@RequestMapping("sys/featruefactor")
public class FeatrueFactorController extends AbstractController {
    @Autowired
    private FeatrueFactorService featrueFactorService;

    @Autowired
    private FactorTableService factorTableService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:featruefactor:list")

    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = featrueFactorService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:featruefactor:info")
    public R info(@PathVariable("id") Integer id) {
        FeatrueFactorEntity featrueFactor = featrueFactorService.getById(id);

        return R.ok().put("featrueFactor", featrueFactor);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:featruefactor:save")
    public R save(@RequestBody FeatrueFactorEntity featrueFactor) {
        featrueFactorService.save(featrueFactor);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:featruefactor:update")
    public R update(@RequestBody FeatrueFactorEntity featrueFactor) {
        ValidatorUtils.validateEntity(featrueFactor);
        featrueFactorService.updateById(featrueFactor);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:featruefactor:delete")
    public R delete(@RequestBody Integer[] ids) {
        featrueFactorService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

    @RequestMapping("/selectFeaBy")
    public R selectFeaBy(@RequestParam Map<String, Object> params) {
        String param = (String) params.get("parStr");
        Map<String, Object> map = new HashMap<>();
        map.put("selectParam", param);
        map.put("page", params.get("page"));
        IPage<FeatrueFactorEntity> page = new Query<FeatrueFactorEntity>().getPage(map);
        List<FeatrueFactorEntity> featrueFactor = featrueFactorService.getFeatrueFactorByStr(map);
        page.setRecords(featrueFactor);
        return R.ok().put("page", new PageUtils(page));
    }

    @RequestMapping("/selectFeatureDetails")
    public R selectFeatureDetails(@RequestParam Map<String, Object> param) {
        String featureId = (String) param.get("featureId");
        FeatrueFactorEntity featrueFactor = featrueFactorService.getById(featureId);
        Map<String, Object> map = new HashMap<>();
        map.put("featureId", featureId);
        List<FactorTableEntity> factorTable = factorTableService.getFactorTableById(map);
        JSONObject json = new JSONObject();
        json.put("factorTable", factorTable);
        json.put("featrueFactor", featrueFactor);
        return R.ok().put("factor", json);
    }
}
