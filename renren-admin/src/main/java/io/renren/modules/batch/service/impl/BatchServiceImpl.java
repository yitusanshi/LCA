package io.renren.modules.batch.service.impl;

import io.renren.modules.batch.dao.BatchDao;
import io.renren.modules.batch.entity.BatchEntity;
import io.renren.modules.batch.service.BatchService;
import org.springframework.stereotype.Service;
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

}
