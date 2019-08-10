package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 目标产品定义表
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("product_define")
public class ProductDefineEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 产品名称
	 */
	private String prName;
	/**
	 * 公司名称
	 */
	private String companyName;
	/**
	 * 规则型号
	 */
	private String modelType;
	/**
	 * 产品类别
	 */
	private String productType;
	/**
	 * 形状与形态
	 */
	private String shape;
	/**
	 * 功能单位
	 */
	private String functionUnit;
	/**
	 * 评价数量
	 */
	private Double evalNum;
	/**
	 * 
	 */
	private Integer systemBoundary;
	/**
	 * 
	 */
	private String year;
	/**
	 * 
	 */
	private Integer industryId;
	/**
	 * 
	 */
	private Long userId;
	/**
	 * 
	 */
	private Date insertTime;

	//前端适配字段
	private String userName;
	private String industryName;
}
