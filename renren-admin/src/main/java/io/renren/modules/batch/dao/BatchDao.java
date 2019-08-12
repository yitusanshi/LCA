package io.renren.modules.batch.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.modules.batch.entity.BatchEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
@Mapper
public interface BatchDao extends BaseMapper<BatchEntity> {
	
}
