package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 特征化指标详情
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("factor_table")
public class FactorTableEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private Integer featureId;
	/**
	 * 
	 */
	private String materialName;
	/**
	 * 
	 */
	private String unit;
	/**
	 * 
	 */
	private Double factor1;
	/**
	 * 
	 */
	private Double factor2;
	/**
	 * 
	 */
	private String stdError;
	/**
	 * 
	 */
	private Date createdTime;

}
