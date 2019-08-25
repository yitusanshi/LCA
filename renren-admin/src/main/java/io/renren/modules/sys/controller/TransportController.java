package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.common.utils.Query;
import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.TransportEntity;
import io.renren.modules.sys.service.TransportService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;


/**
 * @author 九九
 * @email 875253371@qq.com
 * @date 2019-08-24 10:34:17
 */
@RestController
@RequestMapping("sys/transport")
public class TransportController extends AbstractController {
    @Autowired
    private TransportService transportService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:transport:list")
    public R list(@RequestParam Map<String, Object> params) {
        PageUtils page = transportService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:transport:info")
    public R info(@PathVariable("id") Integer id) {
        TransportEntity transport = transportService.getById(id);

        return R.ok().put("transport", transport);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:transport:save")
    public R save(@RequestBody TransportEntity transport) {
        transportService.save(transport);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:transport:update")
    public R update(@RequestBody TransportEntity transport) {
        ValidatorUtils.validateEntity(transport);
        transportService.updateById(transport);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:transport:delete")
    public R delete(@RequestBody Integer[] ids) {
        transportService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    //通过用户的的version和用户ID查询用户的信息
    @RequestMapping("/listTransport")
    public R listMaterial(@RequestParam Map<String, Object> params) {
        System.out.println("运输查询开始。。。start");
        String batchNo = (String) params.get("batchNo");
        String parentId = (String) params.get("materialId");
        String flag = (String) params.get("flag");
        String typeId = (String) params.get("typeId");
        System.out.println("batchNo【" + batchNo + "】parentId【" + parentId + "】" + "【" + flag + "】" + flag + "typeId【" + typeId + getUserId());
        if (batchNo == "-1" || "-1".equals(batchNo)) {
            return R.ok();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("version", batchNo);
        map.put("userId", getUserId());
        map.put("flag", flag);
        map.put("parentId", parentId);
        map.put("typeId", typeId);
        IPage<TransportEntity> page = new Query<TransportEntity>().getPage(params);
        List<TransportEntity> usageStatisticsEntityList = transportService.getMaterialByBatch(map);
        page.setRecords(usageStatisticsEntityList);
        return R.ok().put("page", new PageUtils(page));
    }

}
