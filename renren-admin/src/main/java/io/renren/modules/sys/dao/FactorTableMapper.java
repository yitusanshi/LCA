package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.FactorTable;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FactorTableMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(FactorTable record);

    int insertSelective(FactorTable record);

    FactorTable selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FactorTable record);

    int updateByPrimaryKey(FactorTable record);
}