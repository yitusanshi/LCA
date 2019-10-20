package io.renren.modules.sys.entity;

import lombok.Data;
import org.json.JSONObject;

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
    private List<Map<String, String>> materialPropertyStage;
    private List<Map<String, String>> sellPropertyStage;
    private List<Map<String, String>> recoveryPropertyStage;
    private String productStage;
    private String sellStage;
    private String useStage;
    private String recoveryStage;

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
