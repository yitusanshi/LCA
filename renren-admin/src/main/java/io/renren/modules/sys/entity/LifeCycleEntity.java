package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 可参考sys_menu
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("life_cycle")
public class LifeCycleEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer materialId;
	/**
	 * 
	 */
	private Integer parentId;
	/**
	 * 
	 */
	private String name;
	/**
	 * 
	 */
	private String unit;
	/**
	 * 
	 */
	private String desc;
	/**
	 * 
	 */
	private Date createdTime;
	/**
	 * 
	 */
	private Long userId;

}
