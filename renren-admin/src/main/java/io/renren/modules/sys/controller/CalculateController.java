package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSONObject;
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
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 16:00
 */
@RestController
@RequestMapping("/calculate")
public class CalculateController   {
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
    public static Map<String, String>  map = new HashMap(){{
        put("1", "初级能源消耗(PED)");
        put("2","非生物资源消耗(ADP elements)");
        put("3","水资源消耗(WU)");
        put("4","全球变暖(不含生物炭)(GWP)");
        put("5","臭氧层消耗(ODP)");
        put("6","酸化(AP)");
        put("7","可吸入颗粒物");
        put("8","光化学烟雾(POCP)");
        put("9","光化学臭氧合成(POFP)");
        put("10","富营养化(EP)");
        put("11","生态毒性");
        put("12","人体毒性(HTP)");
        put("13","人体毒性-致癌");
        put("14","人体毒性-非致癌");
    }};
    @RequestMapping("/info/{version}")
    public List<ResultEntity> calculate(@PathVariable("version") String version,
                                        @RequestParam("prId") int prId) {
        HashMap<String, Object> map = new HashMap<>();
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        JSONObject jsonObject = new JSONObject();
        //获取不同阶段的填写信息
        for (int i = 0; i < 5; i++) {
            map.put("userId", userid);
            map.put("version", version);
            map.put("flag", i);
            map.put("prId", prId);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            jsonObject.put(i + "", usageStatisticsEntityList);
        }
        System.out.println(jsonObject.toJSONString());
        //初始化14个对象
        List<ResultEntity> list = initList(prId);
        //不同阶段进行计算
        for (int i = 0; i < 5; i++) {
            JSONObject json = new JSONObject();
            List<UsageStatisticsEntity> usageStatisticsEntityList = (List<UsageStatisticsEntity>) jsonObject.get(i + "");
            //按照不同的对象id分别存入结果
            mulity(usageStatisticsEntityList, json);
            //分别从横向维度进行组装，分别组装十四个对象的原料阶段、生产阶段、销售阶段等等
            assemble(i, json, list);
            //需要计算不同的原料的子消耗，比如钢帘线、炭黑等
            if (i == 0 || i == 3 || i ==4){
                calculateMaterial(i, list, usageStatisticsEntityList);
            }
        }
        //计算运输（运输是单独一张表，单独计算）
        calculateTransport(list, version);

        return list;
    }

    public void calculateMaterial(int i, List<ResultEntity> list, List<UsageStatisticsEntity> usageStatisticsEntityList){
        Map<String, List<UsageStatisticsEntity>> map = new HashMap<>();
        //根据不同的parentid进行归类
        for (UsageStatisticsEntity usage : usageStatisticsEntityList){
           int id =  usage.getParentId();
           if (id == 0){
               continue;
           }
           String key = id + "";
           if (map.containsKey(key)){
               map.get(key).add(usage);
           }else {
               List<UsageStatisticsEntity> newlist = new ArrayList<>();
               newlist.add(usage);
               map.put(key, newlist);
           }
        }
        for (Map.Entry<String, List<UsageStatisticsEntity>> entry : map.entrySet()){
            int id = Integer.valueOf(entry.getKey());
            DictEntity dict = dictService.getByseconId(id);
            JSONObject json = new JSONObject();
            mulity(entry.getValue(), json);
            //原料阶段
            assemblePropertyList(0, json, list, dict);
            //使用阶段
           // assemblePropertyList(3, json, list);
            //回收阶段
           // assemblePropertyList(4, json, list);
        }
    }
    //计算运输
    public List<ResultEntity> calculateTransport(List<ResultEntity> list, String version) {
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        JSONObject jsonObject = new JSONObject();
        for (int i = 0; i < 5; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", userid);
            map.put("version", version);
            map.put("flag", i);
            List<TransportEntity> transportEntities = transportService.getMaterialByBatch(map);
            jsonObject.put(i + "", transportEntities);
        }
        for (int i = 0; i < 5; i++) {
            JSONObject json = new JSONObject();
            List<TransportEntity> transportEntities = (List<TransportEntity>) jsonObject.get(i + "");
            for (TransportEntity transportEntity : transportEntities) {
                BigDecimal distance = new BigDecimal(transportEntity.getDistance() + "");
                BigDecimal weight = new BigDecimal(transportEntity.getWeight() / 1000 + "");
                BigDecimal dw = distance.multiply(weight);
                int materialId = transportEntity.getMaterialId();
                List<CalculateFeatureEntity> factors = calculateFeatureService.getById(materialId);
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
            value.add(decimal);
            json.put(key, value);
        } else {
            json.put(key, decimal);
        }
    }
    /**
     * 计算消耗结果，并按order为key存入json
     */
    public void mulity(List<UsageStatisticsEntity> usageStatisticsEntityList, JSONObject json){
        for (UsageStatisticsEntity usageStatistics : usageStatisticsEntityList) {
            BigDecimal usage = new BigDecimal(usageStatistics.getMaterialUsage() + "");
            int materialId = usageStatistics.getMaterialId();
            List<CalculateFeatureEntity> factors = calculateFeatureService.getById(materialId);
            for (CalculateFeatureEntity calculateFeatureEntity : factors) {
                BigDecimal factor = calculateFeatureEntity.getFactor();
                int order = calculateFeatureEntity.getExcelOrder();
                BigDecimal decimal = usage.multiply(factor);
                //有则累加，没有新增
                sum(json, order, decimal);
            }
        }
    }
    //初始化十四个对象，分别对应map中的14个
    public List<ResultEntity> initList(int prid){
        ProductDefineEntity defineEntity = defineService.getById(prid);
        String name = defineEntity.getPrName();
        List<ResultEntity> list = new ArrayList<>();
        for (Map.Entry<String, String> entry : map.entrySet()){
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

    public void assemblePropertyList(int i, JSONObject json, List<ResultEntity> list, DictEntity dictEntity){
        if (i == 0){
            for (String key : json.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        List<Map<String, String>> list1 = resultEntity.getMaterialPropertyStage();
                        Map<String, String> map = new HashMap<>();
                        map.put(dictEntity.getSecondName(), json.getString(key));
                        list1.add(map);
                    }
                }
            }
        }
    }
    //把计算的结果分别赋值给14个类
    public void assemble(int i, JSONObject jsonObject, List<ResultEntity> list){
        if (i==0){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setMaterialStage(((BigDecimal)(jsonObject.get(key))).stripTrailingZeros().toString());
                    }
                }
            }
        }
        if (i==1){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setProductStage(jsonObject.getString(key));
                    }
                }
            }
        }
        if (i==2){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setSellStage(jsonObject.getString(key));
                    }
                }
            }
        }
        if (i==3){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setUseStage(jsonObject.getString(key));
                    }
                }
            }
        }
        if (i==4){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setRecoveryStage(jsonObject.getString(key));
                    }
                }
            }
        }
    }

}
