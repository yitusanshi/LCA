package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.cycle.dao.UsageStatisticsDao;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;


@Service("usageStatisticsService")
public class UsageStatisticsServiceImpl extends ServiceImpl<UsageStatisticsDao, UsageStatisticsEntity> implements UsageStatisticsService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<UsageStatisticsEntity> page = this.page(
                new Query<UsageStatisticsEntity>().getPage(params),
                new QueryWrapper<UsageStatisticsEntity>()
        );

        return new PageUtils(page);
    }

}
