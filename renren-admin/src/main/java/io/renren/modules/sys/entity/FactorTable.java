package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class FactorTable {
    private Integer id;

    private Integer featureId;

    private String materialName;

    private String unit;

    private Double factor1;

    private Double factor2;

    private String stdError;

    private Date createdTime;

}