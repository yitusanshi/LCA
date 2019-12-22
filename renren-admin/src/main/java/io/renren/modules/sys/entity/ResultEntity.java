package io.renren.modules.sys.entity;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;


import java.util.List;
import java.util.Map;

/**
 * @Author:wanglei1
 * @Date: 2019/8/31 14:19
 */
@Data
public class ResultEntity {
    private String id;
    private String typeName;
    private String unit;
    private String productName;
    private String materialStage;
    private JSONObject materialPropertyStage;
    private JSONObject recoveryPropertyStage;
    private String productStage;
    private String sellStage;
    private String useStage;
    private String recoveryStage;
    private String total;
    private String average;

    @Override
    public String toString() {
        return "ResultEntity{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                ", unit='" + unit + '\'' +
                ", productName='" + productName + '\'' +
                ", materialStage=" + materialStage +
                ", productStage='" + productStage + '\'' +
                ", sellStage='" + sellStage + '\'' +
                ", useStage='" + useStage + '\'' +
                ", recoveryStage='" + recoveryStage + '\'' +
                '}';
    }
}
