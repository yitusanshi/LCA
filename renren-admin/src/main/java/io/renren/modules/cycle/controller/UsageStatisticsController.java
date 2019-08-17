package io.renren.modules.cycle.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.common.utils.Query;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.controller.AbstractController;
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
        System.out.println("已经进来了。。。。。。。。。。。。。。。。。。");
        String batchNo = (String) params.get("batchNo");
        System.out.println(batchNo + "=====-=============" + getUserId());
        if (batchNo == "-1" || "-1".equals(batchNo)) {
            return R.ok();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("version", batchNo);
        map.put("user_id", getUserId());
        map.put("flag", 1);
        IPage<UsageStatisticsEntity> page = new Query<UsageStatisticsEntity>().getPage(params);
        List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
        page.setRecords(usageStatisticsEntityList);
        return R.ok().put("page", new PageUtils(page));
    }

    /**
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
    @RequiresPermissions("sys:usagestatistics:delete")
    public R delete(@RequestBody Integer[] ids) {
        usageStatisticsService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

}
