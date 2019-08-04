package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.UsageStatistics;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UsageStatisticsMapper {


    int deleteByPrimaryKey(Integer id);

    int insert(UsageStatistics record);

    int insertSelective(UsageStatistics record);

    UsageStatistics selectByPrimaryKey(Integer id);


    int updateByPrimaryKeySelective(UsageStatistics record);

    int updateByPrimaryKey(UsageStatistics record);
}