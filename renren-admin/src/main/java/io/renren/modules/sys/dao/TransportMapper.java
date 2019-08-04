package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.Transport;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TransportMapper {


    int deleteByPrimaryKey(Integer id);

    int insert(Transport record);

    int insertSelective(Transport record);


    Transport selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Transport record);

    int updateByPrimaryKey(Transport record);
}