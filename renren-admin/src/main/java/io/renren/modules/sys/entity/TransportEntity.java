package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-08-09 19:23:59
 */
@Data
@TableName("transport")
public class TransportEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private Integer materialId;
	/**
	 * 
	 */
	private String source;
	/**
	 * 0海， 1陆， 2空
	 */
	private Integer type;
	/**
	 * 
	 */
	private Double distance;
	/**
	 * 
	 */
	private String version;
	/**
	 * 
	 */
	private Long userId;
	/**
	 * 
	 */
	private Date createdTime;

}
