package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.FeatrueFactorDao;
import io.renren.modules.sys.entity.FeatrueFactorEntity;
import io.renren.modules.sys.service.FeatrueFactorService;


@Service("featrueFactorService")
public class FeatrueFactorServiceImpl extends ServiceImpl<FeatrueFactorDao, FeatrueFactorEntity> implements FeatrueFactorService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<FeatrueFactorEntity> page = this.page(
                new Query<FeatrueFactorEntity>().getPage(params),
                new QueryWrapper<FeatrueFactorEntity>()
        );

        return new PageUtils(page);
    }

}
