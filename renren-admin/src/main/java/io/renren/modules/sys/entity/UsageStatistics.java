package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class UsageStatistics {
    private Integer id;

    private Integer materialId;

    private String name;

    private Double usage;

    private String unit;

    private String desc;

    private Integer parentId;

    private Integer flag;

    private Date createdTime;

    private String version;

    private Integer userId;

}