package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.LifeCycleEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 可参考sys_menu
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface LifeCycleDao extends BaseMapper<LifeCycleEntity> {
	
}
