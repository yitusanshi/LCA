package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.LifeCycleDao;
import io.renren.modules.sys.entity.LifeCycleEntity;
import io.renren.modules.sys.service.LifeCycleService;


@Service("lifeCycleService")
public class LifeCycleServiceImpl extends ServiceImpl<LifeCycleDao, LifeCycleEntity> implements LifeCycleService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<LifeCycleEntity> page = this.page(
                new Query<LifeCycleEntity>().getPage(params),
                new QueryWrapper<LifeCycleEntity>()
        );

        return new PageUtils(page);
    }

}
