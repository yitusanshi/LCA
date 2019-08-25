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

import io.renren.modules.sys.dao.CalculateFeatureDao;
import io.renren.modules.sys.entity.CalculateFeatureEntity;
import io.renren.modules.sys.service.CalculateFeatureService;

import javax.annotation.Resource;


@Service("calculateFeatureService")
public class CalculateFeatureServiceImpl extends ServiceImpl<CalculateFeatureDao, CalculateFeatureEntity> implements CalculateFeatureService {

    @Resource
    private CalculateFeatureDao calculateFeatureDao;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<CalculateFeatureEntity> page = this.page(
                new Query<CalculateFeatureEntity>().getPage(params),
                new QueryWrapper<CalculateFeatureEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<CalculateFeatureEntity> getById(int id) {
        return calculateFeatureDao.getById(id);
    }

}
