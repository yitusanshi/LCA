package io.renren.modules.sys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.common.utils.R;
import io.renren.modules.sys.entity.CalculateFeatureEntity;
import io.renren.modules.sys.entity.DictEntity;
import io.renren.modules.sys.service.DictService;
import io.renren.modules.sys.service.impl.CalculateFeatureServiceImpl;
import io.renren.modules.sys.service.impl.DictServiceImpl;
import org.apache.commons.lang.StringUtils;
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
 * @Date: 2019/12/21 14:09
 */
@RestController
@RequestMapping("/calculateFeature")
public class CalculateFeatureController extends AbstractController{
    @Resource
    private DictServiceImpl dictService;
    @Resource
    private CalculateFeatureServiceImpl calculateFeatureService;

    @RequestMapping("/queryByParam")
    public R queryByTypeId(@RequestParam Map<String, Object> params) {
        String typeId = (String) params.get("typeId");
        String materialName = (String) params.get("materialName");
        Map<String, Object> map = new HashMap<>();
        map.put("typeId", Integer.valueOf(typeId));

        map.put("materialName", materialName);
        map.put("page", params.get("page"));


        List<DictEntity> list = dictService.query(map);
        System.out.println("list大小" + list.size());

        Map<Integer, String> nameMap = new HashMap<>();
        for (DictEntity dictEntity : list) {
            nameMap.put(dictEntity.getSecondId(), dictEntity.getSecondName());
        }


        Map<String, Object> newMap = new HashMap<>();
        //newMap.put("page", params.get("page"));

        newMap.put("secondIdList", new ArrayList<>(nameMap.keySet()));

        IPage<CalculateFeatureEntity> page = new Query<CalculateFeatureEntity>().getPage(map);
        System.out.println("==4444444888888444444===");
        List<CalculateFeatureEntity> list1 = calculateFeatureService.queryPage(newMap);
        System.out.println("==4444444899999444444===");

        for (CalculateFeatureEntity calculateFeatureEntity : list1) {
            if (nameMap.containsKey(calculateFeatureEntity.getFeature11SecondId())) {
                calculateFeatureEntity.setSecondName(nameMap.get(calculateFeatureEntity.getFeature11SecondId()));
            }
        }
        System.out.println("==444444444444444===");
        page.setRecords(list1);
        System.out.println("==44444455555555554444444===");
        return R.ok().put("page", new PageUtils(page));
    }

    @RequestMapping("/update")
    public R update(@RequestParam int id, @RequestParam String factor) {
        calculateFeatureService.update(id, Double.valueOf(factor));
        return R.ok();
    }

    @RequestMapping("/add")
    public R add(@RequestParam Map<String, Object> params) {
        String type = (String) params.get("typeId");
        Integer typeid = Integer.valueOf(type);
        String secondName = (String) params.get("secondName");
        String unit = (String) params.get("unit");
        if (StringUtils.isBlank(secondName) || StringUtils.isBlank(unit)) {
            return R.error("物质名称或者单位不能为空");
        }
        int maxid = dictService.maxSecondId() + 1;
        DictEntity dictEntity = new DictEntity();
        dictEntity.setTypeId(typeid);
        dictEntity.setSecondName(secondName);
        dictEntity.setUnit(unit);
        dictEntity.setSecondId(maxid);

        List<CalculateFeatureEntity> list = new ArrayList<>();
        for (int i = 1; i <= 14; i++) {
            CalculateFeatureEntity calculateFeatureEntity = new CalculateFeatureEntity();
            calculateFeatureEntity.setName(CalculateController.map.get(i + ""));
            calculateFeatureEntity.setFeature11SecondId(maxid);
            if (StringUtils.isBlank((String) params.get(i + ""))) {
                calculateFeatureEntity.setFactor(new BigDecimal(0));
            } else {
                calculateFeatureEntity.setFactor(new BigDecimal((String) params.get(i + "")));
            }
            calculateFeatureEntity.setUnit(CalculateController.unitMap.get(i + ""));
            calculateFeatureEntity.setExcelOrder(i);
            list.add(calculateFeatureEntity);
        }
        calculateFeatureService.saveList(list);
        //最后存入dict表
        if (typeid == 12) {
            dictEntity.setTypeId(11);
            dictService.save(dictEntity);
            dictEntity.setTypeId(12);
            dictService.save(dictEntity);
        } else {
            dictService.save(dictEntity);
        }

        return R.ok();
    }
}
