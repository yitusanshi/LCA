package io.renren.modules.cycle.dao;

import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 使用量
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface UsageStatisticsDao extends BaseMapper<UsageStatisticsEntity> {

    List<UsageStatisticsEntity> getMaterialByBatch(Map<String, Object> map);

    List<UsageStatisticsEntity> getUage(UsageStatisticsEntity usageStatistics);

    void deleteMaterial(Map<String, Object> map);

    void updateMaterialById(Map<String, Object> map);
}
