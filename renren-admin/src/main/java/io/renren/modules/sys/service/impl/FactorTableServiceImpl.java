package io.renren.modules.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.FactorTableDao;
import io.renren.modules.sys.entity.FactorTableEntity;
import io.renren.modules.sys.service.FactorTableService;


@Service("factorTableService")
public class FactorTableServiceImpl extends ServiceImpl<FactorTableDao, FactorTableEntity> implements FactorTableService {

    @Autowired
    FactorTableDao factorTableDao;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<FactorTableEntity> page = this.page(
                new Query<FactorTableEntity>().getPage(params),
                new QueryWrapper<FactorTableEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<FactorTableEntity> getFactorTableById(Map<String, Object> params) {
        return factorTableDao.getFactorTableById(params);
    }
}
