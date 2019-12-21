package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.DictEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 字段映射表  id和name的映射
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Mapper
public interface DictDao extends BaseMapper<DictEntity> {
    List<DictEntity> getQueryList(HashMap<String, Object> map);

    DictEntity getByseconId(int secondId);

    public void updateBysencondId(DictEntity dictEntity);

    void removeSecondIds(List<Integer> list);

    Integer saveDict(DictEntity dictEntity);

    List<DictEntity> quertByTypeId(int typeId);
    int querySystemBoundry(int prid);
    List<DictEntity> query(Map<String, Object> map);
    int maxSecondId();
}
