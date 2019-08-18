package io.renren.modules.batch.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.batch.entity.BatchEntity;
import io.renren.modules.batch.service.BatchService;
import io.renren.modules.batch.vo.BatchVo;
import io.renren.modules.sys.controller.AbstractController;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
@RestController
@RequestMapping("sys/batch")
public class BatchController extends AbstractController {
    @Autowired
    private BatchService batchService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:batch:list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = batchService.queryPage(params);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{userId}")
    @RequiresPermissions("sys:batch:info")
    public R info(@PathVariable("userId") Long userId) {
        BatchEntity batch = batchService.getById(userId);

        return R.ok().put("batch", batch);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:batch:save")
    public R save(String batchNo, String batchName) {
        System.out.println(batchNo + "===" + batchName);
        if (!StringUtils.isNotBlank(batchNo) || batchNo == null) {
            return R.error("批次号为空！");
        }

        BatchVo batchVo = new BatchVo();
        batchVo.setBatchNo(batchNo);
        batchVo.setUserId(getUserId());


        List<BatchEntity> list = batchService.getBatchByBatchVo(batchVo);
        if (list.size() > 0) {
            return R.error("该用户下已经存在此批次号：" + batchNo);
        }
        BatchEntity batch = new BatchEntity();
        batch.setBatchName(batchName);
        batch.setBatchNo(batchNo);
        batch.setUserId(getUserId());


        batchService.save(batch);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:batch:update")
    public R update(@RequestBody BatchEntity batch) {
        ValidatorUtils.validateEntity(batch);
        batchService.updateById(batch);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:batch:delete")
    public R delete(@RequestBody Long[] userIds) {
        batchService.removeByIds(Arrays.asList(userIds));
        return R.ok();
    }

    @RequestMapping("/getBatch")
    public R getBatch() {
        List<BatchEntity> listBatch = batchService.getBatchByUserId(getUserId());
        return R.ok().put("batchNos", listBatch);
    }

}
