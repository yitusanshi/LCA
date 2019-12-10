package io.renren.modules.batch.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.batch.entity.BatchEntity;
import io.renren.modules.batch.service.BatchService;
import io.renren.modules.batch.vo.BatchVo;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.modules.sys.controller.AbstractController;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.apache.logging.log4j.message.ReusableMessage;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
@RestController
@RequestMapping("sys/batch")
public class BatchController extends AbstractController {
    @Autowired
    private BatchService batchService;

    @Autowired
    private UsageStatisticsService usageStatisticsService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:batch:list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = batchService.queryPage(params);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{userId}")
    @RequiresPermissions("sys:batch:info")
    public R info(@PathVariable("userId") Long userId) {
        BatchEntity batch = batchService.getById(userId);

        return R.ok().put("batch", batch);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:batch:save")
    public R save(@RequestParam Map<String, Object> params) {
        String batchNo = (String) params.get("batchNo");
        String batchName = (String) params.get("batchName");
        String prId = (String) params.get("prId");
        String prUsage = (String) params.get("prUsage");
        String prUnit = (String) params.get("prUnit");

        System.out.println(batchNo + "===" + batchName + prId);
        if (!StringUtils.isNotBlank(batchNo) || batchNo == null) {
            return R.error("批次号为空！");
        }
        if (StringUtils.isBlank(prId) || prId == null) {
            return R.error("请选择产品,产品不能为空!");
        }
        if (StringUtils.isBlank(prUsage) || prUsage == null || "".equals(prUsage)) {
            return R.error("产品使用量不能为空!");
        }
        if (Double.valueOf(prUsage) <= 0) {
            return R.error("产品使用量不能为0!");
        }
        BatchVo batchVo = new BatchVo();
        batchVo.setPrId(Integer.valueOf(prId));
        batchVo.setBatchNo(batchNo);
        batchVo.setUserId(getUserId());
        List<BatchEntity> list = batchService.getBatchByBatchVo(batchVo);
        if (list.size() > 0) {
            return R.error("该用户的该产品已经存在此批次号：" + batchNo);
        }
        BatchEntity batch = new BatchEntity();
        batch.setBatchName(batchName);
        batch.setBatchNo(batchNo);
        batch.setUserId(getUserId());
        batch.setPrId(Integer.valueOf(prId));
        batch.setPrUsage(Double.valueOf(prUsage));
        batch.setPrUnit(prUnit);
        batchService.save(batch);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:batch:update")
    public R update(@RequestBody BatchEntity batch) {
        ValidatorUtils.validateEntity(batch);
        batchService.updateById(batch);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:batch:delete")
    public R delete(@RequestBody Long[] userIds) {
        batchService.removeByIds(Arrays.asList(userIds));
        return R.ok();
    }

    @RequestMapping("/getBatch")
    public R getBatch() {
        List<BatchEntity> listBatch = batchService.getBatchByUserId(getUserId());
        return R.ok().put("batchNos", listBatch);
    }

    @RequestMapping("/getBatchByPrId")
    public R getBatchByPrId(@Param("prId") String prId) {

        int prIds = Integer.valueOf(prId);
        List<BatchEntity> listBatch = batchService.getBatchByPrId(getUserId(), prIds);
        return R.ok().put("batchNos", listBatch);
    }

    @RequestMapping("/saveData")
    public R saveDateUsage(@RequestParam Map<String, Object> params) {
        String batchNo = (String) params.get("batchNo");
        System.out.println("获取的结果值："+params);
        String datas = params.get("datas").toString();
        String prUsage = (String) params.get("prUsage");
        String prUnit = (String) params.get("prUnit");
        if (!StringUtils.isNotBlank(batchNo) || batchNo == null) {
            return R.error("批次号为空！");
        }
        if (StringUtils.isBlank(prUsage) || prUsage == null || "".equals(prUsage)) {
            return R.error("产品使用量不能为空!");
        }
        if (Double.valueOf(prUsage) <= 0) {
            return R.error("产品使用量不能为0!");
        }
        System.out.println(datas);
        if (datas == null || "".equals(datas) || "{}".equals(datas)) {
            return R.error("没有需要保存的数据");
        }
        JSONObject myJson = JSONObject.fromObject(datas);

        List flag = (List) myJson.get("flag");
        List userId = (List) myJson.get("userId");
        List formId = (List) myJson.get("formId");
        List prId = (List) myJson.get("prId");
        List parentId = (List) myJson.get("parentId");
        List prName = (List) myJson.get("prName");
        List materialId = (List) myJson.get("materialId");
        List materialName = (List) myJson.get("materialName");
        List materialUsage = (List) myJson.get("materialUsage");
        List unit = (List) myJson.get("unit");

        BatchVo batchVo = new BatchVo();
        batchVo.setPrId(Integer.valueOf(prId.get(0).toString()));
        batchVo.setBatchNo(batchNo);
        batchVo.setUserId(getUserId());
        List<BatchEntity> list = batchService.getBatchByBatchVo(batchVo);
        if (list.size() > 0) {
            return R.error("该用户的该产品已经存在此批次号：" + batchNo);
        }
        BatchEntity batch = new BatchEntity();
        batch.setBatchNo(batchNo);
        batch.setUserId(getUserId());
        batch.setPrId(Integer.valueOf(prId.get(0).toString()));
        batch.setPrUsage(Double.valueOf(prUsage));
        batch.setPrUnit(prUnit);
        boolean flags = batchService.save(batch);
        if (!flags) {
            return R.error("保存批次号出现问题，请联系管理员");
        }
        List<UsageStatisticsEntity> listusageStatistics = new ArrayList<>();
        for (int i = 0; i < flag.size(); i++) {
            UsageStatisticsEntity usageStatistics = new UsageStatisticsEntity();
            usageStatistics.setFlag(Integer.valueOf(flag.get(i).toString()));
            usageStatistics.setPrId(Integer.valueOf(prId.get(i).toString()));
            usageStatistics.setPrName((String) prName.get(i));
            usageStatistics.setMaterialUsage(Double.valueOf(materialUsage.get(i).toString()));
            usageStatistics.setMaterialName((String) materialName.get(i));
            usageStatistics.setUnit((String) unit.get(i));
            usageStatistics.setParentId(Integer.valueOf(parentId.get(i).toString()));
            usageStatistics.setVersion(batchNo);
            usageStatistics.setUserId(Long.valueOf(userId.get(i).toString()));
            usageStatistics.setFormId((String) formId.get(i));
            usageStatistics.setMaterialId(Integer.valueOf(materialId.get(i).toString()));
            listusageStatistics.add(usageStatistics);
        }
        usageStatisticsService.saveBatch(listusageStatistics);
        return R.ok();
    }


}
