package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class Transport {
    private Integer id;

    private Integer materialId;

    private String source;

    private Integer type;

    private Double distance;

    private String version;

    private Integer userId;

    private Date createdTime;

}