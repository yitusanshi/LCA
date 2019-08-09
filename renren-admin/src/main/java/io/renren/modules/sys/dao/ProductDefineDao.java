package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.ProductDefineEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 目标产品定义表
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface ProductDefineDao extends BaseMapper<ProductDefineEntity> {
	
}
