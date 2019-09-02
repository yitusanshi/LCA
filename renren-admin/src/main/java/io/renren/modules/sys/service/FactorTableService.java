package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.FactorTableEntity;

import java.util.List;
import java.util.Map;

/**
 * 特征化指标详情
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface FactorTableService extends IService<FactorTableEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<FactorTableEntity> getFactorTableById(Map<String, Object> params);
}

