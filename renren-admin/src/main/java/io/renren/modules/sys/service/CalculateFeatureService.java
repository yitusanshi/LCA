package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CalculateFeatureEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 *
 * @author ä¹ä¹
 * @email 875253371@qq.com
 * @date 2019-08-23 15:49:14
 */
public interface CalculateFeatureService extends IService<CalculateFeatureEntity> {

    List<CalculateFeatureEntity> queryPage(Map<String, Object> params);

    List<CalculateFeatureEntity> getById(int id);

    void update(int id, double factor);

    void saveList(List<CalculateFeatureEntity> list);
}

