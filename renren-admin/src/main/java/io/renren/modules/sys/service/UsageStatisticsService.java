package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.UsageStatisticsEntity;

import java.util.Map;

/**
 * 使用量
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface UsageStatisticsService extends IService<UsageStatisticsEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

