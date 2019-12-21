package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import io.renren.common.utils.R;
import io.renren.modules.batch.service.BatchService;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.modules.prManage.entity.ProductDefineEntity;
import io.renren.modules.prManage.service.ProductDefineService;
import io.renren.modules.sys.dao.FeatrueFactorDao;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.CalculateFeatureService;
import io.renren.modules.sys.service.DictService;
import io.renren.modules.sys.service.FeatrueFactorService;
import io.renren.modules.sys.service.TransportService;
import io.renren.modules.sys.service.impl.DictServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.renren.modules.sys.shiro.ShiroUtils.getUserId;
import static java.math.BigDecimal.ROUND_HALF_DOWN;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 16:00
 */
@RestController
@RequestMapping("/calculate")
public class CalculateController {
    @Resource
    private UsageStatisticsService usageStatisticsService;
    @Resource
    private CalculateFeatureService calculateFeatureService;
    @Resource
    private FeatrueFactorService featrueFactorService;
    @Resource
    private TransportService transportService;
    @Resource
    private ProductDefineService defineService;
    @Resource
    private DictServiceImpl dictService;
    @Resource
    private BatchService batchService;

    public static Map<String, String> map = new HashMap() {{
        put("1", "初级能源消耗(PED)");
        put("2", "非生物资源消耗(ADP elements)");
        put("3", "水资源消耗(WU)");
        put("4", "全球变暖(不含生物炭)(GWP)");
        put("5", "臭氧层消耗(ODP)");
        put("6", "酸化(AP)");
        put("7", "可吸入颗粒物");
        put("8", "光化学烟雾(POCP)");
        put("9", "光化学臭氧合成(POFP)");
        put("10", "富营养化(EP)");
        put("11", "生态毒性");
        put("12", "人体毒性(HTP)");
        put("13", "人体毒性-致癌");
        put("14", "人体毒性-非致癌");
    }};

    @RequestMapping("/info")
    public R calculate(@RequestParam("version") String version,
                       @RequestParam("prId") int prId) {

        HashMap<String, Object> map = new HashMap<>();
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        //系统边界
        int systemBoundry = dictService.querySystemBoundry(prId);
        int limit = 5;
        if (systemBoundry == 1){
            limit = 3;
        }else if (systemBoundry == 2){
            limit = 5;
        }
        JSONObject jsonObject = new JSONObject();
        //获取不同阶段的填写信息
        for (int i = 0; i < limit; i++) {
            map.put("userId", userid);
            map.put("version", version);
            map.put("flag", i);
            map.put("prId", prId);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            if (usageStatisticsEntityList != null || usageStatisticsEntityList.size() > 0){
                jsonObject.put(i + "", usageStatisticsEntityList);
            }

        }
        System.out.println(jsonObject.toJSONString());
        //初始化14个对象
        List<ResultEntity> list = initList(prId);
        //不同阶段进行计算
        for (int i = 0; i < limit; i++) {
            JSONObject json = new JSONObject();
            List<UsageStatisticsEntity> usageStatisticsEntityList = (List<UsageStatisticsEntity>) jsonObject.get(i + "");
            System.out.println("usageStatisticsEntityList size is " + usageStatisticsEntityList.size());
            if (usageStatisticsEntityList == null || usageStatisticsEntityList.size() ==0){
                continue;
            }
            //按照不同的对象id分别存入结果
            mulity(usageStatisticsEntityList, json);
            //分别从横向维度进行组装，分别组装十四个属性的原料阶段、生产阶段、销售阶段等等
            assemble(i, json, list);
            //需要计算不同的原料的子消耗，比如钢帘线、炭黑等
            if (i == 0  || i == 4) {
                calculateMaterial(i, list, usageStatisticsEntityList);
            }
        }
        //再分别每个阶段的运输（运输是单独一张表，单独计算）
        calculateTransport(list, version, prId, limit);
        double d = batchService.getusageByVersion(version, prId);
        BigDecimal bigDecimal = new BigDecimal(d);
        for (ResultEntity resultEntity : list){
            devide(resultEntity, bigDecimal);
        }
        return R.ok().put("resultCal", list);
    }
    public void devide(ResultEntity resultEntity, BigDecimal bigDecimal){
        if (Strings.isNotEmpty(resultEntity.getMaterialStage()))
        resultEntity.setMaterialStage(toEngineering(new BigDecimal(resultEntity.getMaterialStage()).divide(bigDecimal, ROUND_HALF_DOWN)));
        if (Strings.isNotEmpty(resultEntity.getProductStage()))
        resultEntity.setProductStage(toEngineering(new BigDecimal(resultEntity.getProductStage()).divide(bigDecimal, ROUND_HALF_DOWN)));
        if (Strings.isNotEmpty(resultEntity.getUseStage()))
        resultEntity.setUseStage(toEngineering(new BigDecimal(resultEntity.getUseStage()).divide(bigDecimal, ROUND_HALF_DOWN)));
        if (Strings.isNotEmpty(resultEntity.getSellStage()))
        resultEntity.setSellStage(toEngineering(new BigDecimal(resultEntity.getSellStage()).divide(bigDecimal, ROUND_HALF_DOWN)));
        if (Strings.isNotEmpty(resultEntity.getRecoveryStage()))
        resultEntity.setRecoveryStage(toEngineering(new BigDecimal(resultEntity.getRecoveryStage()).divide(bigDecimal, ROUND_HALF_DOWN)));
    }
    public void calculateMaterial(int i, List<ResultEntity> list, List<UsageStatisticsEntity> usageStatisticsEntityList) {
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        Map<String, List<UsageStatisticsEntity>> map = new HashMap<>();
        //根据不同的parentid进行归类
        for (UsageStatisticsEntity usage : usageStatisticsEntityList) {
            int parentId = usage.getParentId();
            int sourceFlag = 123;
            //无任何来源
            if (parentId == 0 && sourceFlag == 0) {
                continue;
            }
            //暂无来源
            if (sourceFlag == 3){
                continue;
            }
            //背景数据
            if (sourceFlag == 2){
                String key = usage.getMaterialId() + "";
                List<UsageStatisticsEntity> newlist = new ArrayList<>();
                newlist.add(usage);
                map.put(key, newlist);
                continue;
            }
            String key = parentId + "";
            if (map.containsKey(key)) {
                map.get(key).add(usage);
            } else {
                List<UsageStatisticsEntity> newlist = new ArrayList<>();
                newlist.add(usage);
                map.put(key, newlist);
            }
        }
        for (Map.Entry<String, List<UsageStatisticsEntity>> entry : map.entrySet()) {
            int id = Integer.valueOf(entry.getKey());
            DictEntity dict = dictService.getByseconId(id);
            JSONObject json = new JSONObject();
            mulity(entry.getValue(), json);

            //获取原料数据填写的量，比如钢帘线的量
            HashMap<String, Object> paraMap = new HashMap<>();
            paraMap.put("material_id", id);
            paraMap.put("version", entry.getValue().get(0).getVersion());
            paraMap.put("flag", i);
            paraMap.put("form_id", 10);
            paraMap.put("user_id", userid);
            UsageStatisticsEntity usageStatisticsEntity = usageStatisticsService.getUsageByParm(paraMap);
            divide(json, usageStatisticsEntity.getMaterialUsage());

            if (i == 3){
                //原料阶段
                assemblePropertyList(0, json, list, dict);
            }

            if (i == 4){
                //回收阶段
                assemblePropertyList(4, json, list, dict);
            }

        }
    }

    //计算运输
    public List<ResultEntity> calculateTransport(List<ResultEntity> list, String version, int prId, int limit) {
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        JSONObject jsonObject = new JSONObject();
        for (int i = 0; i < limit; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", userid);
            map.put("version", version);
            map.put("flag", i);
            map.put("prId", prId);
            List<TransportEntity> transportEntities = transportService.getMaterialByBatch(map);
            jsonObject.put(i + "", transportEntities);
        }
        for (int i = 0; i < limit; i++) {
            JSONObject json = new JSONObject();
            List<TransportEntity> transportEntities = (List<TransportEntity>) jsonObject.get(i + "");
            for (TransportEntity transportEntity : transportEntities) {
                BigDecimal distance = new BigDecimal(transportEntity.getDistance() + "");
                BigDecimal weight = new BigDecimal(transportEntity.getWeight() + "");
                BigDecimal dw = distance.multiply(weight);
                //运输的type对应usage_statistics表的materialid
                int type = transportEntity.getType();
                List<CalculateFeatureEntity> factors = calculateFeatureService.getById(type);
                for (CalculateFeatureEntity calculateFeatureEntity : factors) {
                    BigDecimal factor = calculateFeatureEntity.getFactor();
                    int order = calculateFeatureEntity.getExcelOrder();
                    BigDecimal decimal = dw.multiply(factor);
                    //有则累加，没有新增
                    sum(json, order, decimal);
                }
            }
            assemble(i, json, list);
        }
        return list;
    }

    public void sum(JSONObject json, int order, BigDecimal decimal) {
        String key = order + "";
        if (json.containsKey(key)) {
            BigDecimal value = (BigDecimal) json.get(key);
            BigDecimal result = value.add(decimal);
            System.out.println("value ====== :" + result.toString());
            json.put(key, result);
        } else {
            json.put(key, decimal);
        }
    }

    /**
     * 计算消耗结果，并按order为key存入json
     */
    public void mulity(List<UsageStatisticsEntity> usageStatisticsEntityList, JSONObject json) {
        for (UsageStatisticsEntity usageStatistics : usageStatisticsEntityList) {
            BigDecimal usage = new BigDecimal(usageStatistics.getMaterialUsage() + "");
            int materialId = usageStatistics.getMaterialId();
            List<CalculateFeatureEntity> factors = calculateFeatureService.getById(materialId);
            for (CalculateFeatureEntity calculateFeatureEntity : factors) {
                BigDecimal factor = calculateFeatureEntity.getFactor();
                int order = calculateFeatureEntity.getExcelOrder();
                BigDecimal decimal = usage.multiply(factor);
                System.out.println("usage is " + usage + " , decimal is " + decimal.toString());
                //有则累加，没有新增
                sum(json, order, decimal);
            }
        }
    }

    //初始化十四个对象，分别对应map中的14个
    public List<ResultEntity> initList(int prid) {
        ProductDefineEntity defineEntity = defineService.getById(prid);
        String name = defineEntity.getPrName();
        List<ResultEntity> list = new ArrayList<>();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            ResultEntity resultEntity = new ResultEntity();
            resultEntity.setId(entry.getKey());
            resultEntity.setTypeName(entry.getValue());
            String unit = featrueFactorService.getUnitById(Integer.valueOf(entry.getKey()));
            resultEntity.setUnit(unit);
            resultEntity.setProductName(name);
            list.add(resultEntity);
        }
        return list;
    }

    public void assemblePropertyList(int i, JSONObject json, List<ResultEntity> list, DictEntity dictEntity) {
        if (i == 0) {
            for (String key : json.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        JSONObject jsonObject = resultEntity.getMaterialPropertyStage();
                        if (jsonObject == null) {
                            jsonObject = new JSONObject();
                            resultEntity.setMaterialPropertyStage(jsonObject);
                        }
                        jsonObject.put(dictEntity.getSecondName(), toEngineering((BigDecimal)(json.get(key))));
                    }
                }
            }
        }
        if (i == 4) {
            for (String key : json.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        JSONObject jsonObject = resultEntity.getRecoveryPropertyStage();
                        if (jsonObject == null) {
                            jsonObject = new JSONObject();
                            resultEntity.setRecoveryPropertyStage(jsonObject);
                        }
                        jsonObject.put(dictEntity.getSecondName(), toEngineering((BigDecimal)(json.get(key))));
                    }
                }
            }
        }
    }

    //把计算的结果分别赋值给14个属性
    public void assemble(int i, JSONObject jsonObject, List<ResultEntity> list) {
        if (i == 0) {
            for (String key : jsonObject.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        BigDecimal decimal = (BigDecimal)jsonObject.get(key);
                        if (StringUtils.isNotEmpty(resultEntity.getMaterialStage())){
                            BigDecimal bigDecimal = new BigDecimal(resultEntity.getMaterialStage());
                            decimal =decimal.add(bigDecimal);
                        }
                        resultEntity.setMaterialStage(toEngineering((BigDecimal) (decimal)));
                    }
                }
            }
        }
        if (i == 1) {
            for (String key : jsonObject.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        BigDecimal decimal = (BigDecimal)jsonObject.get(key);
                        if (StringUtils.isNotEmpty(resultEntity.getProductStage())){
                            BigDecimal bigDecimal = new BigDecimal(resultEntity.getProductStage());
                            System.out.println("decimal : " +decimal.toString() + "bigdecimal : "+ bigDecimal.toString());
                            decimal =decimal.add(bigDecimal);
                        }
                        resultEntity.setProductStage(toEngineering((BigDecimal) (decimal)));
                    }
                }
            }
        }
        if (i == 2) {
            for (String key : jsonObject.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        BigDecimal decimal = (BigDecimal)jsonObject.get(key);
                        if (StringUtils.isNotEmpty(resultEntity.getSellStage())){
                            BigDecimal bigDecimal = new BigDecimal(resultEntity.getSellStage());
                            decimal =decimal.add(bigDecimal);
                        }
                        resultEntity.setSellStage(toEngineering((BigDecimal) (decimal)));
                    }
                }
            }
        }
        if (i == 3) {
            for (String key : jsonObject.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        BigDecimal decimal = (BigDecimal)jsonObject.get(key);
                        if (StringUtils.isNotEmpty(resultEntity.getUseStage())){
                            BigDecimal bigDecimal = new BigDecimal(resultEntity.getUseStage());
                            decimal =decimal.add(bigDecimal);
                        }
                        resultEntity.setUseStage(toEngineering((BigDecimal) (decimal)));
                    }
                }
            }
        }
        if (i == 4) {
            for (String key : jsonObject.keySet()) {
                for (ResultEntity resultEntity : list) {
                    if (resultEntity.getId().equals(key)) {
                        BigDecimal decimal = (BigDecimal)jsonObject.get(key);
                        if (StringUtils.isNotEmpty(resultEntity.getRecoveryStage())){
                            BigDecimal bigDecimal = new BigDecimal(resultEntity.getRecoveryStage());
                            decimal =decimal.add(bigDecimal);
                        }
                        resultEntity.setRecoveryStage(toEngineering((BigDecimal) (decimal)));
                    }
                }
            }
        }
    }

    public static String toEngineering(BigDecimal bigDecimal) {
        if (bigDecimal == null) {
            return null;
        }
        BigDecimal flag = new BigDecimal("0.00001");
        if (bigDecimal.compareTo(flag) >= 0) {
            return bigDecimal.setScale(4, ROUND_HALF_DOWN).toString();
        } else {
            return new DecimalFormat("#.#####E0").format(bigDecimal);
            //bigDecimal.stripTrailingZeros().toString();
        }
    }

    public void divide(JSONObject json, double usage){
        BigDecimal bigDecimal = new BigDecimal(usage);
        for (String key : json.keySet()){
            BigDecimal value = (BigDecimal) json.get(key);
            BigDecimal newValue = value.divide(bigDecimal);
            json.put(key, newValue);
        }
    }


}
