package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qiniu.util.Json;
import io.renren.common.utils.Query;
import io.renren.common.utils.R;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.renren.modules.sys.shiro.ShiroUtils.getUserId;

/**
 * @Author:wanglei1
 * @Date: 2019/12/5 14:20
 */
@Controller
@RequestMapping(value = "/compare")
public class CompareController {
    @Autowired
    private UsageStatisticsService usageStatisticsService;

    @Resource
    private TransportService transportService;
    @RequestMapping(value = "/info11", method = RequestMethod.GET)
    public String find(){
        return "11111";
    }

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public R getInfo(@RequestParam("version")  String version, @RequestParam("prId") int prId){
        System.out.println(1111);
        JSONArray jsonArray = new JSONArray();
        //第一阶段数据
        if (0 == 0){
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
            for (UsageStatisticsEntity usage : usageStatisticsEntityList){
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15 ; j++) {
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
        if (1 == 1){
            JSONObject jsonObject = new JSONObject();
            JSONArray array = new JSONArray();
            for (int j = 11; j <= 14 ; j++) {
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
        if (2 == 2){
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
        if (3 == 3){
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
            for (UsageStatisticsEntity usage : usageStatisticsEntityList){
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15 ; j++) {
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
        if (4 == 4){
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
            for (UsageStatisticsEntity usage : usageStatisticsEntityList){
                JSONObject json = (JSONObject) JSONObject.toJSON(usage);
                JSONArray array1 = new JSONArray();
                for (int j = 11; j <= 15 ; j++) {
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

        return R.ok().put("info", jsonArray);
    }
}
