package io.renren.modules.prManage.dao;

import io.renren.modules.prManage.entity.ProductDefineEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

/**
 * 目标产品定义表
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface ProductDefineDao extends BaseMapper<ProductDefineEntity> {
	List<ProductDefineEntity> getQueryList(HashMap<String, Object> map);
	void delById(List<Integer> list);

	List<ProductDefineEntity> getPrByUserId(Long userId);
	ProductDefineEntity getById(int id);
}
