package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.FeatrueFactorEntity;

import java.util.Map;

/**
 * 特征化因子
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface FeatrueFactorService extends IService<FeatrueFactorEntity> {

    PageUtils queryPage(Map<String, Object> params);
    String getUnitById(int id);
}

