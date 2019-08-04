package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.Dict;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DictMapper {

    int insert(Dict record);

    int insertSelective(Dict record);

}