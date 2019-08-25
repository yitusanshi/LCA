package io.renren;

import java.math.BigDecimal;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 17:26
 */
public class App {
    public static void main(String[] args) {
        BigDecimal bigDecimal1 = new BigDecimal("2.344231");
        BigDecimal bigDecimal2 = new BigDecimal("0.0033500000000000001");
        System.out.println(bigDecimal1.multiply(bigDecimal2));
    }
}
