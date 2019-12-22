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
import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;
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

    @Autowired
    private TransportService transportService;

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
        System.out.println("获取的结果值：" + params);

        String prUsage = (String) params.get("prUsage");
        String prUnit = (String) params.get("prUnit");
        String prId = (String) params.get("prId");
        if (StringUtils.isBlank(prId) || "-1".equals(prId)) {
            return R.error("请选择需要修改的产品批次号为空！");
        }
        if (StringUtils.isBlank(batchNo) || batchNo == null) {
            return R.error("批次号为空！");
        }
        if (StringUtils.isBlank(prUsage) || prUsage == null || "".equals(prUsage)) {
            return R.error("产品使用量不能为空!");
        }
        if (Double.valueOf(prUsage) <= 0) {
            return R.error("产品使用量不能为0!");
        }
        String flagForm0 = params.get("flagForm0").toString();
        String flagForm1 = params.get("flagForm1").toString();
        String trantForm2 = params.get("trantForm2").toString();
        String flagForm3 = params.get("flagForm3").toString();
        String flagForm4 = params.get("flagForm4").toString();
        String trantForm0 = params.get("trantForm0").toString();
        String trantForm4 = params.get("trantForm4").toString();
        System.out.println(flagForm0);
        BatchVo batchVo = new BatchVo();
        batchVo.setPrId(Integer.valueOf(prId));
        batchVo.setBatchNo(batchNo);
        batchVo.setUserId(getUserId());
        List<BatchEntity> list = batchService.getBatchByBatchVo(batchVo);
        if (list.size() > 0) {
            return R.error("该用户的该产品已经存在此批次号：" + batchNo);
        }
        BatchEntity batch = new BatchEntity();
        batch.setBatchNo(batchNo);
        batch.setUserId(getUserId());
        batch.setPrId(Integer.valueOf(prId));
        batch.setPrUsage(Double.valueOf(prUsage));
        batch.setPrUnit(prUnit);
        boolean flags = batchService.save(batch);
        if (!flags) {
            return R.error("保存批次号出现问题，请联系管理员");
        }
        List<UsageStatisticsEntity> listusageStatistics = new ArrayList<>();

        if (flagForm0.indexOf("flag") != -1) {
            listusageStatistics.addAll(getUsageStatisticsBy(flagForm0, batchNo));
        }
        if (flagForm1.indexOf("flag") != -1) {
            listusageStatistics.addAll(getUsageStatisticsBy(flagForm1, batchNo));
        }
        if (flagForm3.indexOf("flag") != -1) {
            listusageStatistics.addAll(getUsageStatisticsBy(flagForm3, batchNo));
        }
        if (flagForm4.indexOf("flag") != -1) {
            listusageStatistics.addAll(getUsageStatisticsBy(flagForm4, batchNo));
        }
        if (listusageStatistics.size() > 0) {
            usageStatisticsService.saveBatch(listusageStatistics);
        }

        List<TransportEntity> transportEntities = new ArrayList<>();
        if (trantForm2.indexOf("flag") != -1) {
            transportEntities.addAll(getTransportEntityBy(trantForm2, batchNo));
        }
        if (trantForm0.indexOf("flag") != -1) {
            transportEntities.addAll(getTransportEntityBy(trantForm0, batchNo));
        }
        if (trantForm4.indexOf("flag") != -1) {
            transportEntities.addAll(getTransportEntityBy(trantForm4, batchNo));
        }
        if (transportEntities.size() > 0) {
            transportService.saveBatch(transportEntities);
        }
        return R.ok();
    }


    public List<UsageStatisticsEntity> getUsageStatisticsBy(String flagForm, String batchNo) {
        List<UsageStatisticsEntity> listusageStatistics = new ArrayList<>();
        JSONObject myJson = JSONObject.fromObject(flagForm);

        if (flagForm.indexOf("[") != -1) {
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
            List sourceFlag = (List) myJson.get("sourceFlag");
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
                usageStatistics.setSourceFlag(Integer.valueOf(sourceFlag.get(i).toString()));
                listusageStatistics.add(usageStatistics);
            }
        } else {
            UsageStatisticsEntity usageStatistics = new UsageStatisticsEntity();
            usageStatistics.setFlag(Integer.valueOf(myJson.get("flag").toString()));
            usageStatistics.setPrId(Integer.valueOf(myJson.get("prId").toString()));
            usageStatistics.setPrName(myJson.get("prName").toString());
            usageStatistics.setMaterialUsage(Double.valueOf(myJson.get("materialUsage").toString()));
            usageStatistics.setMaterialName((myJson.get("materialName").toString()));
            usageStatistics.setUnit(myJson.get("unit").toString());
            usageStatistics.setParentId(Integer.valueOf(myJson.get("parentId").toString()));
            usageStatistics.setVersion(batchNo);
            usageStatistics.setUserId(Long.valueOf(myJson.get("userId").toString()));
            usageStatistics.setFormId(myJson.get("formId").toString());
            usageStatistics.setMaterialId(Integer.valueOf(myJson.get("materialId").toString()));
            usageStatistics.setSourceFlag(Integer.valueOf(myJson.get("sourceFlag").toString()));
            listusageStatistics.add(usageStatistics);
        }
        return listusageStatistics;
    }

    public List<TransportEntity> getTransportEntityBy(String trantForm, String batchNo) {
        List<TransportEntity> transportEntities = new ArrayList<>();
        JSONObject myJson = JSONObject.fromObject(trantForm);
        if (trantForm.indexOf("[") != -1) {
            List prName = (List) myJson.get("prName");
            List materialName = (List) myJson.get("materialName");
            List type = (List) myJson.get("type");
            List distance = (List) myJson.get("distance");
            List weight = (List) myJson.get("weight");
            List source = (List) myJson.get("source");
            List flag = (List) myJson.get("flag");
            List userId = (List) myJson.get("userId");
            List prId = (List) myJson.get("prId");
            List parentId = (List) myJson.get("parentId");
            for (int i = 0; i < flag.size(); i++) {
                TransportEntity transportEntity = new TransportEntity();
                transportEntity.setPrName((String) prName.get(i));
                transportEntity.setPrId(Integer.valueOf(prId.get(i).toString()));
                transportEntity.setUserId(Long.valueOf(userId.get(i).toString()));
                transportEntity.setWeight(Double.valueOf(weight.get(i).toString()));
                transportEntity.setDistance(Double.valueOf(distance.get(i).toString()));
                transportEntity.setType(Integer.valueOf(type.get(i).toString()));
                transportEntity.setMaterialName(materialName.get(i).toString());
                transportEntity.setSource(source.get(i).toString());
                transportEntity.setParentId(Integer.valueOf(parentId.get(i).toString()));
                transportEntity.setVersion(batchNo);
                transportEntities.add(transportEntity);
            }
        } else {
            TransportEntity transportEntity = new TransportEntity();
            transportEntity.setPrName((String) myJson.get("prName"));
            transportEntity.setPrId(Integer.valueOf(myJson.get("prId").toString()));
            transportEntity.setUserId(Long.valueOf(myJson.get("userId").toString()));
            transportEntity.setWeight(Double.valueOf(myJson.get("weight").toString()));
            transportEntity.setDistance(Double.valueOf(myJson.get("distance").toString()));
            transportEntity.setType(Integer.valueOf(myJson.get("type").toString()));
            transportEntity.setMaterialName(myJson.get("materialName").toString());
            transportEntity.setSource(myJson.get("source").toString());
            transportEntity.setParentId(Integer.valueOf(myJson.get("parentId").toString()));
            transportEntity.setVersion(batchNo);
            transportEntities.add(transportEntity);
        }


        return transportEntities;

    }

}
