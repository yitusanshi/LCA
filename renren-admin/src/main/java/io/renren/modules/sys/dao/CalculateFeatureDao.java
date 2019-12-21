package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.CalculateFeatureEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 
 * 
 * @author ä¹ä¹
 * @email 875253371@qq.com
 * @date 2019-08-23 15:49:14
 */
@Mapper
public interface CalculateFeatureDao extends BaseMapper<CalculateFeatureEntity> {
    List<CalculateFeatureEntity> getById(int id);
    List<CalculateFeatureEntity> queryByIds(List<Integer> ids);
    void update(@Param("id") int id, @Param("factor") double factor);
}
