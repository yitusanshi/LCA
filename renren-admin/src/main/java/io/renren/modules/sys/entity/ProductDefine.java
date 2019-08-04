package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class ProductDefine {
    private Integer id;

    private String prName;

    private String companyName;

    private String modelType;

    private String productType;

    private String shape;

    private String functionUnit;

    private Double evalNum;

    private Integer systemBoundary;

    private String year;

    private Integer industryId;

    private Integer userId;

    private Date insertTime;

}