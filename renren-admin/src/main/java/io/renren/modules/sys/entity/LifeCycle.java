package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class LifeCycle {
    private Integer materialId;

    private Integer parentId;

    private String name;

    private String unit;

    private String desc;

    private Date createdTime;

    private Integer userId;

}