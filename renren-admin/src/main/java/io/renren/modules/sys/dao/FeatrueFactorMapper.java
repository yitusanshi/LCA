package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.FeatrueFactor;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FeatrueFactorMapper {

    int insert(FeatrueFactor record);

    int insertSelective(FeatrueFactor record);

}