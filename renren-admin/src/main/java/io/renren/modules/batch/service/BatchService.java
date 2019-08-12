package io.renren.modules.batch.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.batch.entity.BatchEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
public interface BatchService extends IService<BatchEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

