package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.TransportEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface TransportDao extends BaseMapper<TransportEntity> {

    List<TransportEntity> getMaterialByBatch(Map<String, Object> params);
}
