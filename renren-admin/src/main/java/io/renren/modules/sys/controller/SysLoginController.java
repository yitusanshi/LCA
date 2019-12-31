/**
 * Copyright (c) 2016-2019 人人开源 All rights reserved.
 * <p>
 * .io
 * <p>
 * 版权所有，侵权必究！
 */

package io.renren.modules.sys.controller;


import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.common.validator.group.AddGroup;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.SysUserService;
import io.renren.modules.sys.shiro.ShiroUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 登录相关
 *
 * @author Mark sunlightcs@gmail.com
 */
@Controller
public class SysLoginController {
    @Autowired
    private Producer producer;

    @Autowired
    private SysUserService sysUserService;


    @RequestMapping("captcha.jpg")
    public void captcha(HttpServletResponse response) throws IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");

        //生成文字验证码
        String text = producer.createText();
        //生成图片验证码
        BufferedImage image = producer.createImage(text);
        //保存到shiro session
        ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
    }

    /**
     * 登录
     */
    @ResponseBody
    @RequestMapping(value = "/sys/login", method = RequestMethod.POST)
    public R login(String username, String password, String captcha) {
        String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
        if (!captcha.equalsIgnoreCase(kaptcha)) {
            return R.error("验证码不正确");
        }

        try {
            Subject subject = ShiroUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            subject.login(token);
        } catch (UnknownAccountException e) {
            return R.error(e.getMessage());
        } catch (IncorrectCredentialsException e) {
            return R.error("账号或密码不正确");
        } catch (LockedAccountException e) {
            return R.error("" +
                    "账号未激活,请联系管理员激活" +
                    "联系人：张吉春           " +
                    "电话：13521606046       ");
        } catch (AuthenticationException e) {
            return R.error("账户验证失败");
        }

        return R.ok();
    }

    /**
     * 退出
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public String logout() {
        ShiroUtils.logout();
        return "redirect:login.html";
    }


    @ResponseBody
    @RequestMapping(value = "/sys/regist", method = RequestMethod.POST)
    public R saveuser(@RequestParam Map<String, Object> params) {
        System.out.println("开始进入了保存用户的滚滚滚");

        String email = params.get("email").toString();

        String userName = params.get("userName").toString();


        String inputPassword1 = params.get("inputPassword1").toString();
        String inputPassword3 = params.get("inputPassword3").toString();
        String mobile = params.get("mobile").toString();
        SysUserEntity user = new SysUserEntity();
        user.setMobile(mobile);
        user.setEmail(email);
        user.setUsername(userName);
        user.setPassword(inputPassword1);
        user.setStatus(0);
        user.setDeptId(1l);


        SysUserEntity userEntity = sysUserService.getUserByUserName(userName);
        System.out.println("usrt" + userEntity);
        if (userEntity != null) {
            System.out.println("保存失败了。。。。。");
            return R.error("用户名已经存在,请重新输入");
        }
        sysUserService.saveUser(user);
        System.out.println("已经保存成功了!!");
        return R.ok();
    }

}
