package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LifeCycleEntity;

import java.util.Map;

/**
 * 可参考sys_menu
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface LifeCycleService extends IService<LifeCycleEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

