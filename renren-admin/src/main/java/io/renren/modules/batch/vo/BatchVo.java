package io.renren.modules.batch.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author 九九
 * @Date: 2019/8/13 23:22
 * @Version 1.0
 */
@Data
public class BatchVo implements Serializable {
    /**
     * 用户ID
     */
    private Long userId;
    /**
     * 批次号对应version
     */
    private String batchNo;
    /**
     * 创建人
     */
    private String batchName;
    /**
     *
     */
    private Date createTime;

}