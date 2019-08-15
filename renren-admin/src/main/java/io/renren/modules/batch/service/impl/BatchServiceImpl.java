package io.renren.modules.batch.service.impl;

import io.renren.modules.batch.dao.BatchDao;
import io.renren.modules.batch.entity.BatchEntity;
import io.renren.modules.batch.service.BatchService;
import io.renren.modules.batch.vo.BatchVo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;


@Service("batchService")
public class BatchServiceImpl extends ServiceImpl<BatchDao, BatchEntity> implements BatchService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<BatchEntity> page = this.page(
                new Query<BatchEntity>().getPage(params),
                new QueryWrapper<BatchEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<BatchEntity> getBatchByUserId(long userId) {
        return baseMapper.getBatchByUserId(userId);
    }

    @Override
    public List<BatchEntity> getBatchByBatchVo(BatchVo batchVo) {
        return baseMapper.getBatchByBatchVo(batchVo);
    }


}
