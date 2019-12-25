package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 九九
 * @email 875253371@qq.com
 * @date 2019-08-24 10:34:17
 */
@Data
@TableName("transport")
public class TransportEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId
    private Integer id;
    /**
     * 物质ID
     */
    private Integer materialId;
    /**
     * 产地
     */
    private String source;
    /**
     * 0海， 1陆， 2空
     */
    private Integer type;
    /**
     * 运输距离（单位是km）
     */
    private Double distance;
    /**
     * 批次号
     */
    private String version;
    /**
     *
     */
    private Long userId;
    /**
     *
     */
    private Date createdTime;
    /**
     * 运输重量（单位是t）
     */
    private Double weight;
    /**
     * 运输物质名称
     */
    private String materialName;
    /**
     * 属于的标识 0 原料 1 生产 2 销售 3 使用 4 回收
     */
    private int flag;

    /*
     * 父类ID
     * */
    private int parentId;

    /*
     * 产品ID
     * */

    private int prId;

    private String prName;

    private String typeName;
}
