package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.TransportDao;
import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;


@Service("transportService")
public class TransportServiceImpl extends ServiceImpl<TransportDao, TransportEntity> implements TransportService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<TransportEntity> page = this.page(
                new Query<TransportEntity>().getPage(params),
                new QueryWrapper<TransportEntity>()
        );

        return new PageUtils(page);
    }

}
