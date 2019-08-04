package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class Dict {
    private Integer typeId;

    private Integer secondId;

    private String secondName;

    private String desc;

    private Date createdTime;

}