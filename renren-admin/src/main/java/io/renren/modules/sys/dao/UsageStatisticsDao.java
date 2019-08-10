package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.UsageStatisticsEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 使用量
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface UsageStatisticsDao extends BaseMapper<UsageStatisticsEntity> {
	
}
