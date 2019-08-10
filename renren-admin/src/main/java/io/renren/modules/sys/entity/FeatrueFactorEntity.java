package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 特征化因子
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("featrue_factor")
public class FeatrueFactorEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private String zhName;
	/**
	 * 
	 */
	private String enName;
	/**
	 * 
	 */
	private String abb;
	/**
	 * 
	 */
	private String unit;
	/**
	 * 
	 */
	private String source;
	/**
	 * 
	 */
	private Date createdTime;
	/**
	 * 
	 */
	private Integer userName;

}
