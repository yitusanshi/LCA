package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 字段映射表  id和name的映射
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("dict")
public class DictEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 属于哪种映射
	 */
	@TableId
	private Integer typeId;
	/**
	 * 映射关系的id
	 */
	private Integer secondId;
	/**
	 * 
	 */
	private String secondName;
	/**
	 * 映射关系中的name
	 */
	private String desc;
	/**
	 * 
	 */
	private Date createdTime;

	private Long userId;

}
