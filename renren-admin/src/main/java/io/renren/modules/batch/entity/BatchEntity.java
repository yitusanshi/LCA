package io.renren.modules.batch.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-12 23:58:32
 */
@Data
@TableName("batch")
public class BatchEntity implements Serializable {
    private static final long serialVersionUID = 1L;

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

    /*
     * 产品ID
     * */
    private int prId;
    /**
     *
     */
    private Date createTime;

    //产品使用量
    private double prUsage;

    //产品单位
    private String prUnit;

}
