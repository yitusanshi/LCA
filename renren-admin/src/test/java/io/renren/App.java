package io.renren;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

import java.math.BigDecimal;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 17:26
 */
public class App {
    public static void main(String[] args) {
        String str = null;
        JSONArray jsonArray = JSONArray.parseArray(str);
        System.out.println(jsonArray);
        //System.out.println(jsonArray.size());
    }
}
