package io.renren.modules.sys.service.impl;

import io.renren.common.utils.Constant;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.ProductDefineDao;
import io.renren.modules.sys.entity.ProductDefineEntity;
import io.renren.modules.sys.service.ProductDefineService;


@Service("productDefineService")
public class ProductDefineServiceImpl extends ServiceImpl<ProductDefineDao, ProductDefineEntity> implements ProductDefineService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Integer industryId = (Integer)params.get("industryId");
        IPage<ProductDefineEntity> page = null;
        if (industryId == null){
            page = this.page(
                    new Query<ProductDefineEntity>().getPage(params),
                    new QueryWrapper<ProductDefineEntity>()
            );
        }else {
            page = this.page(
                    new Query<ProductDefineEntity>().getPage(params),
                    new QueryWrapper<ProductDefineEntity>().eq("industry_id", industryId)
            );
        }
        System.out.println(222);

        return new PageUtils(page);
    }

}
