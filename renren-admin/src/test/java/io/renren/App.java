package io.renren;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 17:26
 */
public class App {
    public static void main(String[] args) {
       /* BigDecimal bigDecimal1 = new BigDecimal("0.000000000000003351");
        BigDecimal bigDecimal2 = new BigDecimal("0.00001");
        System.out.println(bigDecimal1.compareTo(bigDecimal2));
        System.out.println(bigDecimal1.setScale(30, BigDecimal.ROUND_HALF_DOWN));
        System.out.println(bigDecimal1.stripTrailingZeros().toString());*/
        System.out.println(toEngineering(new BigDecimal("2286.43799999999984446")));
        ;
        /*BigDecimal bigDecimal2 = new BigDecimal("0.0033500000000000001");
        System.out.println(bigDecimal1.multiply(bigDecimal2));*/
    }
    public static String toEngineering(BigDecimal bigDecimal){
        if (bigDecimal == null){
            return null;
        }
        BigDecimal flag = new BigDecimal("0.00001");
        if (bigDecimal.compareTo(flag) >= 0){
           return bigDecimal.setScale(4, BigDecimal.ROUND_HALF_DOWN).toString();
        }else {
            return new DecimalFormat("#.#####E0").format(bigDecimal);
            //bigDecimal.stripTrailingZeros().toString();
        }
    }
}
