package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.ProductDefine;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ProductDefineMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(ProductDefine record);

    int insertSelective(ProductDefine record);

    ProductDefine selectByPrimaryKey(Integer id);


    int updateByPrimaryKeySelective(ProductDefine record);

    int updateByPrimaryKey(ProductDefine record);
}