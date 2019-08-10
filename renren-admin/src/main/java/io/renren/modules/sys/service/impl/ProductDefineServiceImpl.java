package io.renren.modules.sys.service.impl;

import io.renren.common.utils.Constant;
import io.renren.modules.sys.entity.SysUserEntity;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
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
    @Autowired
    private ProductDefineDao productDefineDao;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Integer industryId = Integer.valueOf((String) params.get("id"));
        String prName = (String) params.get("roleName");
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        IPage<ProductDefineEntity> page = new Query<ProductDefineEntity>().getPage(params);
        /*if (userid == 1){
            page = this.page(
                    new Query<ProductDefineEntity>().getPage(params)
            );
        }else {
            page = this.page(
                    new Query<ProductDefineEntity>().getPage(params),
                    new QueryWrapper<ProductDefineEntity>().eq("industry_id", industryId)
                            .eq("user_id", userid).eq("pr_name", prName)
            );
        }*/
        HashMap<String, Object> map = new HashMap<>();
        if (userid == 1){
            map.put("userid", null);
        }else {
            map.put("userid", userid);
        }
        map.put("prName", prName);
        map.put("industryId", industryId);
        List<ProductDefineEntity> list = productDefineDao.getQueryList(map);
        page.setRecords(list);
        return new PageUtils(page);
    }

}
