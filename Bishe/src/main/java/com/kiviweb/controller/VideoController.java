package com.kiviweb.controller;

import com.kiviweb.pojo.AjaxResult;
import com.kiviweb.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * ClassName :
 * Package: com.kiviweb.controller
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/27 - 20:14
 * @Version : v1.0
 */

@Slf4j  //日志注解
@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @PostMapping("/getVideosByCid")
    public AjaxResult getVideosByCid(@RequestParam("cid") int cid){
        System.out.println(cid);
        return AjaxResult.success("获取视频成功", videoService.getVideosByCid(cid));
    }
}
