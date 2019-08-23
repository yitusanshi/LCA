package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author ä¹ä¹
 * @email 875253371@qq.com
 * @date 2019-08-23 15:49:14
 */
@Data
@TableName("calculate_feature")
public class CalculateFeatureEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 特征化计算数据excel-影响类型
	 */
	private String name;
	/**
	 * 对应dict中typeid为11的second_id,eg,电特征化为103
	 */
	private Integer feature11SecondId;
	/**
	 * 特征化数据
	 */
	private BigDecimal factor;
	/**
	 * 单位
	 */
	private String unit;
	/**
	 * 
	 */
	private Date createdTime;

	private Integer excelOrder;

}
