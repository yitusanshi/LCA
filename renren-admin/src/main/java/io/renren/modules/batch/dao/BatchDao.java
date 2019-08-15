package io.renren.modules.batch.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.modules.batch.entity.BatchEntity;
import io.renren.modules.batch.vo.BatchVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
@Mapper
public interface BatchDao extends BaseMapper<BatchEntity> {
    //通过用户ID获取用户的批次号
    List<BatchEntity> getBatchByUserId(long userId);

    List<BatchEntity> getBatchByBatchVo(BatchVo batchVo);

}
