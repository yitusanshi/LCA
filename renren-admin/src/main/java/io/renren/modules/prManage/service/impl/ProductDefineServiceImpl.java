package io.renren.modules.prManage.service.impl;

import io.renren.modules.sys.dao.DictDao;
import io.renren.modules.sys.entity.DictEntity;
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

import io.renren.modules.prManage.dao.ProductDefineDao;
import io.renren.modules.prManage.entity.ProductDefineEntity;
import io.renren.modules.prManage.service.ProductDefineService;


@Service("productDefineService")
public class ProductDefineServiceImpl extends ServiceImpl<ProductDefineDao, ProductDefineEntity> implements ProductDefineService {
    @Autowired
    private ProductDefineDao productDefineDao;
    @Autowired
    private DictDao dictDao;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Integer industryId = Integer.valueOf((String) params.get("id"));
        String prName = (String) params.get("roleName");
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        IPage<ProductDefineEntity> page = new Query<ProductDefineEntity>().getPage(params);
        HashMap<String, Object> map = new HashMap<>();
        if (userid == 1) {
            map.put("userid", null);
        } else {
            map.put("userid", userid);
        }
        map.put("prName", prName);
        map.put("industryId", industryId);
        List<ProductDefineEntity> list = productDefineDao.getQueryList(map);
        for (ProductDefineEntity productDefineEntity : list) {
            int i = productDefineEntity.getSystemBoundary();
            DictEntity dictEntity = dictDao.getByseconId(i);
            productDefineEntity.setSystemBoundaryName(dictEntity.getSecondName());
        }
        page.setRecords(list);
        return new PageUtils(page);
    }

    public void delById(List<Integer> list) {
        productDefineDao.delById(list);
    }

    @Override
    public List<ProductDefineEntity> getPrByUserId(Long userId) {
        return productDefineDao.getPrByUserId(userId);
    }

    @Override
    public ProductDefineEntity getById(int id) {
        return productDefineDao.getById(id);
    }

}
