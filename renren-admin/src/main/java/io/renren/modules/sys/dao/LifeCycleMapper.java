package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.LifeCycle;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LifeCycleMapper {

    int deleteByPrimaryKey(Integer materialId);

    int insert(LifeCycle record);

    int insertSelective(LifeCycle record);


    LifeCycle selectByPrimaryKey(Integer materialId);


    int updateByPrimaryKeySelective(LifeCycle record);

    int updateByPrimaryKey(LifeCycle record);
}