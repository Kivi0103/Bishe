package com.kiviweb.controller;

import com.kiviweb.mapper.UserMapper;
import com.kiviweb.pojo.AjaxResult;
import com.kiviweb.pojo.Result;
import com.kiviweb.pojo.User;
import com.kiviweb.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * ClassName :UserController
 * Package: com.kiviweb.controller
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/21 - 11:52
 * @Version : v1.0
 */

@Slf4j  //日志注解
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

//    测试
    @GetMapping("/test")
    public Result test(){
        log.info("测试");
        List<User> userList = userService.test();
        return Result.success("测试成功");
    }

    @PostMapping("/login")
    public AjaxResult login(@RequestBody User user){
        log.info("登录");
//        String username = user.getUsername();
//        String password = user.getPassword();
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());

        User getUser = userService.login(user.getUsername(),user.getPassword());
        if(getUser!=null){
            return AjaxResult.success("登录成功",getUser.getId());
        }else{
            System.out.println("登陆失败");
            return AjaxResult.error("登陆失败");
        }
    }

    @PostMapping("/signup")
    public AjaxResult signup(@RequestBody User user){
        log.info("注册");
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        System.out.println(user.getPhone());
        //设置当前时间
        Date date = new Date();
        DateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
        String currentTime = df.format(date);
        user.setSignDate(currentTime);

        int count = userService.signup(user.getUsername(),user.getPassword(),user.getPhone(),user.getSignDate());
        if(count==1){
            return AjaxResult.success("注册成功");
        }else{
            System.out.println("注册失败");
            return AjaxResult.error("登陆失败");
        }
    }


    @PostMapping("/getById")
    public AjaxResult getById(@RequestBody User user){
        log.info("查询个人信息");
        System.out.println(user.getId());
        User reUser = userService.getById(user.getId());
        if(reUser!=null){
            return AjaxResult.success("查询成功",reUser);
        }else{
            return AjaxResult.error("查询失败");
        }
    }


    @PostMapping("/getFavorites")
    public AjaxResult getFavorites(@RequestBody User user){
        log.info("查询某人收藏课程");
        System.out.println(user.getId());
        int []courseids= userService.getFavorites(user.getId());
        return AjaxResult.success("查询成功",courseids);
    }

    @PostMapping("/isFavorites")
    public AjaxResult isFavorites(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("查询某人时候收藏该课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.isFavorites(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("查询成功");
        return AjaxResult.error("查询失败");
    }

    @PostMapping("/isLikes")
    public AjaxResult isLikes(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("查询某人时候点赞该课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.isLikes(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("查询成功");
        return AjaxResult.error("查询失败");
    }


    @PostMapping("/colFavorites")
    public AjaxResult colFavorites(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("某人收藏课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.colFavorites(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("收藏成功");
        return AjaxResult.error("收藏失败");
    }

    //取消收藏
    @PostMapping("/cancelFavorites")
    public AjaxResult cancelFavorites(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("取消某人收藏课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.cancelFavorites(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("取消收藏成功");
        return AjaxResult.error("取消收藏失败");
    }


    @PostMapping("/addLike")
    public AjaxResult addLike(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("某人收藏课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.addLike(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("点赞成功");
        return AjaxResult.error("点赞失败");
    }

    //取消点赞
    @PostMapping("/minLike")
    public AjaxResult minLike(@RequestParam("uid") int uid,@RequestParam("cid") int cid){
        log.info("取消某人收藏课程");
        System.out.println(uid);
        System.out.println(cid);
        int c= userService.minLike(uid,cid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("取消点赞成功");
        return AjaxResult.error("取消点赞失败");
    }

    @PostMapping("/isExist")
    public AjaxResult isExist(@RequestParam("username") String username){
        log.info("查询此用户是否已经存在");
        System.out.println(username);
        int c= userService.isExist(username);
        System.out.println(c);
        if(c==1)return AjaxResult.success("该用户已经存在");
        return AjaxResult.error("该用户不存在");
    }


    @PostMapping("/updateUserInfo")
    public AjaxResult updateUserInfo(@RequestBody User user){
        log.info("更新某用户信息");
        System.out.println(user);
        int c = userService.updateUserInfo(user.getId(),user.getUsername(),user.getAge(),user.getStage(),
                user.getPhone(),user.getGender(),user.getSchoolname());
        if(c==1)return AjaxResult.success("更新成功");
        return AjaxResult.error("更新失败");
    }

    @PostMapping("/addOneComment")
    public AjaxResult addOneComment(@RequestParam("uid") int uid){
        log.info("用户评论数加1");
        System.out.println(uid);
        int c= userService.addOneComment(uid);
        System.out.println(c);
        if(c==1)return AjaxResult.success("用户评论数加1成功");
        return AjaxResult.error("用户评论数加1失败");
    }
}
