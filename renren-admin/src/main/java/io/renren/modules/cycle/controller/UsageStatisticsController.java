package io.renren.modules.cycle.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.common.utils.Query;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.prManage.entity.ProductDefineEntity;
import io.renren.modules.prManage.service.ProductDefineService;
import io.renren.modules.prManage.service.impl.ProductDefineServiceImpl;
import io.renren.modules.sys.controller.AbstractController;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;

import javax.annotation.Resource;


/**
 * 使用量
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:02:30
 */
@RestController
@RequestMapping("sys/usagestatistics")
public class UsageStatisticsController extends AbstractController {
    @Autowired
    private UsageStatisticsService usageStatisticsService;

    @Resource
    private ProductDefineServiceImpl defineService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:usagestatistics:list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = usageStatisticsService.queryPage(params);
        return R.ok().put("page", page);
    }

    //通过用户的的version和用户ID查询用户的信息
    @RequestMapping("/listMaterial")
    public R listMaterial(@RequestParam Map<String, Object> params) {
        String batchNo = (String) params.get("batchNo");
        String parentId = (String) params.get("materialId");
        String flag = (String) params.get("flag");
        String typeId = (String) params.get("typeId");
        if (batchNo == "-1" || "-1".equals(batchNo)) {
            return R.ok();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("version", batchNo);
        map.put("userId", getUserId());
        map.put("flag", flag);
        map.put("parentId", parentId);
        map.put("formId", typeId);
        map.put("limit", params.get("limit"));
        map.put("page", params.get("page"));
        IPage<UsageStatisticsEntity> page = new Query<UsageStatisticsEntity>().getPage(map);
        List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
        page.setRecords(usageStatisticsEntityList);
        return R.ok().put("page", new PageUtils(page));
    }

    /**
     * -
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:usagestatistics:info")
    public R info(@PathVariable("id") Integer id) {
        UsageStatisticsEntity usageStatistics = usageStatisticsService.getById(id);

        return R.ok().put("usageStatistics", usageStatistics);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:usagestatistics:save")
    public R save(@RequestBody UsageStatisticsEntity usageStatistics) {
        usageStatisticsService.save(usageStatistics);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:usagestatistics:update")
    public R update(@RequestBody UsageStatisticsEntity usageStatistics) {
        ValidatorUtils.validateEntity(usageStatistics);
        usageStatisticsService.updateById(usageStatistics);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] ids) {
        usageStatisticsService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

    @RequestMapping("/deleteMaterial")
    public R deleteMaterial(@RequestParam Map<String, Object> params) {
        String version = (String) params.get("batchNo");
        String flag = (String) params.get("flag");
        String materialIds = (String) params.get("materialIds");
        Map<String, Object> map = new HashMap<>();
        map.put("version", version);
        map.put("flag", Integer.valueOf(flag));
        map.put("userId", getUserId());
        map.put("materialIds", Arrays.asList(materialIds.split(";")));
        usageStatisticsService.deleteMaterial(map);
        return R.ok();
    }


    @RequestMapping("/updateMaterialById")
    public R updateMaterialById(@RequestParam Map<String, Object> params) {
        String id = (String) params.get("id");
        String materialUsage = (String) params.get("usage");
        if (StringUtils.isBlank(materialUsage)) {
            return R.error("消耗量不能为空！");
        }
        Map<String, Object> map = new HashMap<>();
        map.put("id", Integer.valueOf(id));
        map.put("materialUsage", Double.valueOf(materialUsage));
        usageStatisticsService.updateMaterialById(map);
        return R.ok();
    }


    @RequestMapping("/saveMaterial")
    public R save(@RequestParam Map<String, Object> params) {
        String secondId = (String) params.get("secondId");
        if (!StringUtils.isNotBlank(secondId) || secondId == null) {
            return R.error("请选择物质名称");
        }
        String version = (String) params.get("batchNo");
        int parentId = (Integer) params.get("materialId");
        String flag = (String) params.get("flag");
        String formId = (String) params.get("formId");
        String name = (String) params.get("secondName");
        String unit = (String) params.get("unit");
        String usage = (String) params.get("usage");
        int prId = (Integer) params.get("prId");


        UsageStatisticsEntity usageStatistics = new UsageStatisticsEntity();
        usageStatistics.setUserId(getUserId());
        usageStatistics.setFlag(Integer.valueOf(flag));
        usageStatistics.setFormId(formId);
        usageStatistics.setMaterialId(Integer.valueOf(secondId));
        usageStatistics.setMaterialName(name);
        usageStatistics.setVersion(version);
        usageStatistics.setParentId(parentId);
        usageStatistics.setUnit(unit);
        usageStatistics.setMaterialUsage(Double.valueOf(usage));
        List<UsageStatisticsEntity> usageList = usageStatisticsService.getUsage(usageStatistics);
        if (usageList.size() > 0) {
            return R.error("已经录入录入了【" + name + "】,不能重复录入！");
        }
        usageStatisticsService.save(usageStatistics);
        return R.ok();
    }

}
