package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.qiniu.util.StringUtils;
import io.renren.common.utils.R;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.modules.sys.entity.ResultEntity;
import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.renren.modules.sys.shiro.ShiroUtils.getUserId;

/**
 * @Author:wanglei1
 * @Date: 2019/12/5 14:20
 */
@RestController
@RequestMapping(value = "/compare")
public class CompareController {
    @Autowired
    private UsageStatisticsService usageStatisticsService;
    @Autowired
    private CalculateController calculateController;

    @Resource
    private TransportService transportService;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public R getInfo(@RequestParam("batchNo") String batchNo, @RequestParam("prId") int prId) {
        String version = batchNo;
        System.out.println(1111);
        JSONArray jsonArray = new JSONArray();
        //第一阶段数据
        if (0 == 0) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("flag", 0);
            Map<String, Object> map = new HashMap<>();
            map.put("version", version);
            map.put("userId", getUserId());
            map.put("flag", 0);
            map.put("parentId", 0);//代表原材料
            map.put("formId", 10);
            map.put("prId", prId);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            System.out.println("=====" + usageStatisticsEntityList.size());
            JSONArray array = new JSONArray();
            for (UsageStatisticsEntity usage : usageStatisticsEntityList) {
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15; j++) {
                    Map<String, Object> map1 = new HashMap<>();
                    map1.put("version", version);
                    map1.put("userId", getUserId());
                    map1.put("flag", 0);
                    map1.put("parentId", usage.getMaterialId());//查询原材料下的子材料
                    map1.put("formId", j);
                    map1.put("prId", prId);
                    List<UsageStatisticsEntity> entityList = usageStatisticsService.getMaterialByBatch(map1);
                    System.out.println(entityList.size() + "=========");
                    JSONObject json1 = new JSONObject();
                    json1.put("formId", j);
                    json1.put("infoList", entityList);
                    array1.add(json1);
                }
                json.put("prNameList", array1);
                array.add(json);
            }
            jsonObject.put("materialList", array);
            jsonArray.add(jsonObject);
        }

        //第二阶段
        if (1 == 1) {
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            for (int j = 11; j <= 14; j++) {
                Map<String, Object> map1 = new HashMap<>();
                map1.put("version", version);
                map1.put("userId", getUserId());
                map1.put("flag", 1);
                map1.put("parentId", 0);
                map1.put("formId", j);
                map1.put("prId", prId);
                List<UsageStatisticsEntity> entityList = usageStatisticsService.getMaterialByBatch(map1);
                System.out.println(entityList.size() + "=========");
                JSONObject json1 = new JSONObject();
                json1.put("formId", j);
                json1.put("infoList", entityList);
                array.add(json1);
            }
            jsonObject.put("infoList", array);
            jsonObject.put("flag", 1);
            jsonArray.add(jsonObject);
        }
        if (2 == 2) {
            JSONObject jsonObject = new JSONObject();
            Map<String, Object> map1 = new HashMap<>();
            map1.put("version", version);
            map1.put("userId", getUserId());
            map1.put("flag", 2);
            map1.put("parentId", 0);
            map1.put("formId", 14);//运输
            map1.put("prId", prId);
            List<TransportEntity> usageStatisticsEntityList = transportService.getMaterialByBatch(map1);
            jsonObject.put("infoList", usageStatisticsEntityList);
            jsonObject.put("flag", 2);
            jsonArray.add(jsonObject);
        }
        if (3 == 3) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("flag", 3);
            Map<String, Object> map = new HashMap<>();
            map.put("version", version);
            map.put("userId", getUserId());
            map.put("flag", 3);
            map.put("parentId", 0);//代表原材料
            map.put("formId", 10);
            map.put("prId", prId);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            System.out.println("=====" + usageStatisticsEntityList.size());
            JSONArray array = new JSONArray();
            for (UsageStatisticsEntity usage : usageStatisticsEntityList) {
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15; j++) {
                    Map<String, Object> map1 = new HashMap<>();
                    map1.put("version", version);
                    map1.put("userId", getUserId());
                    map1.put("flag", 3);
                    map1.put("parentId", usage.getMaterialId());//查询原材料下的子材料
                    map1.put("formId", j);
                    map1.put("prId", prId);
                    List<UsageStatisticsEntity> entityList = usageStatisticsService.getMaterialByBatch(map1);
                    System.out.println(entityList.size() + "=========");
                    JSONObject json1 = new JSONObject();
                    json1.put("formId", j);
                    json1.put("infoList", entityList);
                    array1.add(json1);
                }
                json.put("prNameList", array1);
                array.add(json);
            }
            jsonObject.put("materialList", array);
            jsonArray.add(jsonObject);
        }
        if (4 == 4) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("flag", 4);
            Map<String, Object> map = new HashMap<>();
            map.put("version", version);
            map.put("userId", getUserId());
            map.put("flag", 4);
            map.put("parentId", 0);//代表原材料
            map.put("formId", 10);
            map.put("prId", prId);
            List<UsageStatisticsEntity> usageStatisticsEntityList = usageStatisticsService.getMaterialByBatch(map);
            System.out.println("=====" + usageStatisticsEntityList.size());
            JSONArray array = new JSONArray();
            for (UsageStatisticsEntity usage : usageStatisticsEntityList) {
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15; j++) {
                    Map<String, Object> map1 = new HashMap<>();
                    map1.put("version", version);
                    map1.put("userId", getUserId());
                    map1.put("flag", 4);
                    map1.put("parentId", usage.getMaterialId());//查询原材料下的子材料
                    map1.put("formId", j);
                    map1.put("prId", prId);
                    List<UsageStatisticsEntity> entityList = usageStatisticsService.getMaterialByBatch(map1);
                    System.out.println(entityList.size() + "=========");
                    JSONObject json1 = new JSONObject();
                    json1.put("formId", j);
                    json1.put("infoList", entityList);
                    array1.add(json1);
                }
                json.put("prNameList", array1);
                array.add(json);
            }
            jsonObject.put("materialList", array);
            jsonArray.add(jsonObject);
        }
        System.out.println(JSON.toJSONString(jsonArray));
        return R.ok().put("info", jsonArray);
    }

    @RequestMapping(value = "/result", method = RequestMethod.GET)
    public R result(@RequestParam("version1") String version1, @RequestParam("version2") String version2, @RequestParam("prId") int prId) {
        if (StringUtils.isNullOrEmpty(version1) || StringUtils.isNullOrEmpty(version2)) {
            return R.error("请选择版本");
        }
        R r1 = calculateController.calculate(version1, prId);
        R r2 = calculateController.calculate(version2, prId);
        List<ResultEntity> list1 = (List<ResultEntity>) r1.get("resultCal");
        List<ResultEntity> list2 = (List<ResultEntity>) r2.get("resultCal");
        JSONArray array1 = JSONArray.parseArray(JSON.toJSONString(list1));
        JSONArray array2 = JSONArray.parseArray(JSON.toJSONString(list2));
        System.out.println(JSON.toJSONString(array1));
        System.out.println(JSON.toJSONString(array2));
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < array1.size(); i++) {
            JSONObject jsonOld = array1.getJSONObject(i);
            String idOld = jsonOld.getString("id");
            for (int j = 0; j < array2.size(); j++) {
                JSONObject jsonNew = array2.getJSONObject(j);
                String idNew = jsonNew.getString("id");
                if (idOld.equals(idNew)) {
                    JSONObject json = addProperty(array1.getJSONObject(i), array2.getJSONObject(j));
                    jsonArray.add(json);
                }
            }
        }
        System.out.println("=====" + JSON.toJSONString(jsonArray));
        return R.ok().put("info", jsonArray).put("versionOld", version1).put("versionNew", version2);
    }

    public JSONObject addProperty(JSONObject jsonOld, JSONObject jsonNew) {
        JSONObject json = new JSONObject();
        json.put("id", jsonOld.getString("id"));
        json.put("typeName", jsonOld.getString("typeName"));
        json.put("unit", jsonOld.getString("unit"));
        json.put("productName", jsonOld.getString("productName"));
        String s = "materialStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "materialStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "productStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "sellStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "useStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "recoveryStage";
        reduce(json, s, jsonOld.getString(s), jsonNew.getString(s));

        s = "materialPropertyStage";
        reducePropetyStage(json, s, jsonOld.getString(s), jsonNew.getString(s));
        s = "recoveryPropertyStage";
        reducePropetyStage(json, s, jsonOld.getString(s), jsonNew.getString(s));
        return json;
    }

    public void reduce(JSONObject jsonObject, String name, String d1, String d2) {
        jsonObject.put(name + "_old", d1);
        jsonObject.put(name + "_new", d2);
        if (d1 == null) {
            d1 = "0";
        }
        if (d2 == null) {
            d2 = "0";
        }
        BigDecimal decimal1 = new BigDecimal(d1);
        BigDecimal decimal2 = new BigDecimal(d2);
        BigDecimal result = decimal1.subtract(decimal2);
        jsonObject.put(name + "_diff", CalculateController.toEngineering(result));
    }

    public void reducePropetyStage(JSONObject jsonObject, String name, String str1, String str2) {
        JSONObject json1 = new JSONObject();
        JSONObject json2 = new JSONObject();
        if (!StringUtils.isNullOrEmpty(str1)) {
            json1 = JSONObject.parseObject(str1);
        }
        if (!StringUtils.isNullOrEmpty(str2)) {
            json2 = JSONObject.parseObject(str2);
        }
        JSONArray jsonArray = new JSONArray();
        for (String key1 : json1.keySet()) {
            for (String key2 : json2.keySet()) {
                if (key1.equals(key2)) {
                    JSONObject json = new JSONObject();
                    reduce(json, key1, json1.getString(key1), json2.getString(key2));
                    jsonArray.add(json);
                }
            }
        }
        //如果旧版本存在，新版本不存在
        for (String key1 : json1.keySet()) {
            if (!json2.containsKey(key1)) {
                JSONObject json = new JSONObject();
                reduce(json, key1, json1.getString(key1), null);
                jsonArray.add(json);
            }
        }

        for (String key2 : json2.keySet()) {
            if (!json1.containsKey(key2)) {
                JSONObject json = new JSONObject();
                reduce(json, key2, null, json2.getString(key2));
                jsonArray.add(json);
            }
        }
        jsonObject.put(name, jsonArray);
    }

}
