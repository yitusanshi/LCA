package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.TransportEntity;

import java.util.List;
import java.util.Map;

/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface TransportService extends IService<TransportEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<TransportEntity> getMaterialByBatch(Map<String, Object> params);
}

