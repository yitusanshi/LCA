package io.renren.modules.sys.service.impl;

import io.renren.modules.sys.entity.DictEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    public List<CalculateFeatureEntity> queryPage(Map<String, Object> params) {
        IPage<CalculateFeatureEntity> page = new Query<CalculateFeatureEntity>().getPage(params);
        List<CalculateFeatureEntity> list = calculateFeatureDao.queryByIds((Set<Integer>) params.get("secondIdList"));
        return list;

    }

    @Override
    public List<CalculateFeatureEntity> getById(int id) {
        return calculateFeatureDao.getById(id);
    }

    @Override
    public void update(int id, double factor) {
        calculateFeatureDao.update(id, factor);
    }

    @Override
    public void saveList(List<CalculateFeatureEntity> list) {
        calculateFeatureDao.saveList(list);
    }

}
