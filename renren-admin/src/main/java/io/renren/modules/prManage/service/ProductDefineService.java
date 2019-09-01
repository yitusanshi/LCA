package io.renren.modules.prManage.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.prManage.entity.ProductDefineEntity;

import java.util.List;
import java.util.Map;

/**
 * 目标产品定义表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
public interface ProductDefineService extends IService<ProductDefineEntity> {

    PageUtils queryPage(Map<String, Object> params);
    void delById(List<Integer> list);

    List<ProductDefineEntity> getPrByUserId(Long userId);
}

