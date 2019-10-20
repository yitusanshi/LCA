package io.renren.modules.cycle.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 使用量
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("usage_statistics")
public class UsageStatisticsEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId
    private Integer id;
    /**
     *
     */
    private Integer materialId;
    /**
     *
     */
    private String materialName;
    /**
     *
     */
    private Double materialUsage;
    /**
     *
     */
    private String unit;
    /**
     *
     */
    private String desc;
    /**
     *
     */
    private Integer parentId;
    /**
     *
     */
    private Integer flag;
    /**
     *
     */
    private Date createdTime;
    /**
     *
     */
    private String version;
    /**
     *
     */
    private long userId;

    /**
     *
     */
    private String formId;

    private int prId;

    private String prName;
}
