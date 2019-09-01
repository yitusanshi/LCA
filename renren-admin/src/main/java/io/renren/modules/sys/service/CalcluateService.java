package io.renren.modules.sys.service;

import com.alibaba.fastjson.JSONObject;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.sys.entity.CalculateFeatureEntity;
import io.renren.modules.sys.entity.ResultEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Author:wanglei1
 * @Date: 2019/8/31 15:46
 */
@Service
public class CalcluateService<T> {

    @Resource
    private CalculateFeatureService calculateFeatureService;

    public <T> List<ResultEntity> calcuate(JSONObject jsonObject, List<ResultEntity> list){
        for (int i = 0; i < 5; i++) {
            JSONObject json = new JSONObject();
            List<UsageStatisticsEntity> usageStatisticsEntityList = (List<UsageStatisticsEntity>) jsonObject.get(i + "");
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

    public void assemble(int i, JSONObject jsonObject, List<ResultEntity> list){
        if (i==0){
            for (String key : jsonObject.keySet()){
                for (ResultEntity resultEntity : list){
                    if (resultEntity.getId().equals(key)){
                        resultEntity.setMaterialStage(null);
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
