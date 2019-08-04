package io.renren.modules.sys.entity;

import lombok.Data;

import java.util.Date;
@Data
public class FeatrueFactor {
    private Integer id;

    private String zhName;

    private String enName;

    private String abb;

    private String unit;

    private String source;

    private Date createdTime;

    private Integer userName;

}