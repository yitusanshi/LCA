package io.renren.modules.cycle.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;

import java.util.List;
import java.util.Map;

/**
 * 使用量
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface UsageStatisticsService extends IService<UsageStatisticsEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<UsageStatisticsEntity> getMaterialByBatch(Map<String, Object> map);

    List<UsageStatisticsEntity> getUsage(UsageStatisticsEntity usageStatistics);


    void deleteMaterial(Map<String, Object> map);

    void updateMaterialById(Map<String, Object> map);
}

