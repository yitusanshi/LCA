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

import io.renren.modules.cycle.dao.UsageStatisticsDao;
import io.renren.modules.cycle.entity.UsageStatisticsEntity;
import io.renren.modules.cycle.service.UsageStatisticsService;


@Service("usageStatisticsService")
public class UsageStatisticsServiceImpl extends ServiceImpl<UsageStatisticsDao, UsageStatisticsEntity> implements UsageStatisticsService {

    @Autowired
    UsageStatisticsDao usageStatisticsDao;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<UsageStatisticsEntity> page = this.page(
                new Query<UsageStatisticsEntity>().getPage(params),
                new QueryWrapper<UsageStatisticsEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<UsageStatisticsEntity> getMaterialByBatch(Map<String, Object> map) {

        return usageStatisticsDao.getMaterialByBatch(map);
    }

    @Override
    public List<UsageStatisticsEntity> getUsage(UsageStatisticsEntity usageStatistics) {
        return usageStatisticsDao.getUage(usageStatistics);
    }

    @Override
    public void deleteMaterial(Map<String, Object> map) {
        usageStatisticsDao.deleteMaterial(map);
    }

    @Override
    public void updateMaterialById(Map<String, Object> map) {
        usageStatisticsDao.updateMaterialById(map);
    }

    @Override
    public UsageStatisticsEntity getUsageStatisticsEntityById(int id) {
        return usageStatisticsDao.getUsageStatisticsEntityById(id);
    }

    @Override
    public void deleteMaterialByMap(Map<String, Object> map) {
        usageStatisticsDao.deleteMaterialByMap(map);
    }


}
