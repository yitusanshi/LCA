package io.renren.modules.sys.service.impl;

import io.renren.modules.sys.entity.SysUserEntity;
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

import io.renren.modules.sys.dao.DictDao;
import io.renren.modules.sys.entity.DictEntity;
import io.renren.modules.sys.service.DictService;


@Service("dictService")
public class DictServiceImpl extends ServiceImpl<DictDao, DictEntity> implements DictService {
    @Autowired
    private DictDao dictDao;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Integer typeid = Integer.valueOf((String) params.get("typeid"));
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        IPage<DictEntity> page = new Query<DictEntity>().getPage(params);

        HashMap<String, Object> map = new HashMap<>();
        map.put("userid", userid);
        map.put("typeid", typeid);
        List<DictEntity> list = dictDao.getQueryList(map);
        page.setRecords(list);
        return new PageUtils(page);
    }

    public  DictEntity getByseconId(int secondid){
        DictEntity dictEntity = dictDao.getByseconId(secondid);
        return dictEntity;
    }
    public void updateBysencondId(DictEntity dictEntity){
        dictDao.updateBysencondId(dictEntity);
    }
    public void removeSecondIds(List<Integer> ids){
        dictDao.removeSecondIds(ids);
    }

    public Integer saveDict(DictEntity dictEntity){
        SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Long userid = userEntity.getUserId();
        dictEntity.setUserId(userid);
        dictDao.saveDict(dictEntity);
        System.out.println("-------" + dictEntity.getSecondId());
        return dictEntity.getSecondId();
    }
    public List<DictEntity> quertByTypeId(int typeId){
        return dictDao.quertByTypeId(typeId);
    }
}
