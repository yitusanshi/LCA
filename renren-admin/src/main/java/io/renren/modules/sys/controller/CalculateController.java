package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSONObject;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.modules.sys.entity.CalculateFeatureEntity;
import io.renren.modules.sys.service.CalculateFeatureService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 16:00
 */
@RequestMapping("/calculate")
public class CalculateController extends AbstractController{
    @Resource
    private UsageStatisticsService usageStatisticsService;
    @Resource
    private CalculateFeatureService calculateFeatureService;
    @RequestMapping("/info/{version}")
    public Map<String,Double> calculate(@PathVariable("version") String version){
        HashMap<String, Object> map = new HashMap<>();
        JSONObject jsonObject = new JSONObject();
        for (int i = 0; i < 5; i++){
            map.put("user_id", getUserId());
            map.put("version", version);
            map.put("flag", i);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            jsonObject.put(i+"", usageStatisticsEntityList);
        }

        JSONObject json = new JSONObject();
        for (int i = 1; i < 5; i++){
            List<UsageStatisticsEntity> usageStatisticsEntityList = (List<UsageStatisticsEntity>)jsonObject.get(i+"");
            for (UsageStatisticsEntity usageStatistics : usageStatisticsEntityList){

                BigDecimal usage = new BigDecimal(usageStatistics.getUsage()+"");
                int materialId = usageStatistics.getMaterialId();
                List<CalculateFeatureEntity> list = calculateFeatureService.getById(materialId);
                for (CalculateFeatureEntity calculateFeatureEntity : list){
                    BigDecimal factor = calculateFeatureEntity.getFactor();
                    int order = calculateFeatureEntity.getExcelOrder();
                    BigDecimal decimal = usage.multiply(factor);
                    //有则累加，没有新增
                    sum(json, order, decimal);
                }
            }
        }
        return null;
    }

    public void sum(JSONObject json, int order, BigDecimal decimal){
        String key = order + "";
        if (json.containsKey(key)){
            BigDecimal value = (BigDecimal) json.get(key);
            value.add(decimal);
            json.put(key, value);
        }else {
            json.put(key, decimal);
        }
    }
}
