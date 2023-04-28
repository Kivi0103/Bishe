package com.kiviweb.controller;

import com.kiviweb.mapper.CourseMapper;
import com.kiviweb.pojo.AjaxResult;
import com.kiviweb.pojo.Course;
import com.kiviweb.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.IncorrectResultSetColumnCountException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.controller
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/23 - 9:37
 * @Version : v1.0
 */

@Slf4j  //日志注解
@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/test")
    public AjaxResult test() {
        //测试插入课程，例如插入一年级上册数学，则年级为一年级，category为数学，video_url为：video/movie.mp4 封面cover_img_url为：images/course01.png


        String cname;
        String[] stage = {"一年级", "二年级", "三年级", "四年级", "五年级", "六年级",
                "初一", "初二", "初三", "高一", "高二", "高三",
                "大学"};
        String[] shangxia = {"上册", "下册"};
        String[] category = {"数学", "语文", "英语", "政治", "历史", "地理", "物理", "化学", "生物", "科学","高数上","高数下",
                "大学物理","考研英语一","考研英语二",
                "计算机二级", "英语四级", "英语六级", "python", "java", "教资"};
        String videourl = "video/movie.mp4";
        String coverimgurl = "images/course01.png";
        int c = 0;
        for (int i = 12; i < stage.length; i++) {
            for (int k = 10; k < category.length; k++) {
                cname = stage[i]  + category[k];
                if (courseService.insert(cname, stage[i], category[k], videourl, coverimgurl) == 1) {
                    c++;
                } else {
                }
            }
        }
        return AjaxResult.success(c + "条记录插入成功");
    }

    @PostMapping("/load")
    public AjaxResult load(@RequestBody Course course){
        List<Course> courses = courseService.selectByStageAndCategory(course.getBigstage(),course.getCategory());
        return AjaxResult.success("加载成功",courses);
    }


    @PostMapping("/getCourseByids")
    public AjaxResult getCourseByids(@RequestBody Integer[] ids){
        List<Course> courses = new ArrayList<>();
        for (int i=0;i<ids.length;i++){
            System.out.println(ids[i]);
            courses.add(courseService.getCourseByids(ids[i]));
        }
        System.out.println(courses);
        return AjaxResult.success("成功", courses);
    }


    @PostMapping("/updateAddColNum")
    public AjaxResult updateAddColNum(@RequestParam("cid") int cid){
        int i = courseService.updateAddColNum(cid);
        if(i==1){
            return AjaxResult.success("添加收藏数成功");
        }else {
            return AjaxResult.error("添加收藏数失败");
        }
    }

    @PostMapping("/updateMinColNum")
    public AjaxResult updateMinColNum(@RequestParam("cid") int cid){
        int i = courseService.updateMinColNum(cid);
        if(i==1){
            return AjaxResult.success("减少收藏数成功");
        }else {
            return AjaxResult.error("减少收藏数失败");
        }
    }

    @PostMapping("/updateAddLikeNum")
    public AjaxResult updateAddLikeNum(@RequestParam("cid") int cid){
        int i = courseService.updateAddLikeNum(cid);
        if(i==1){
            return AjaxResult.success("添加点赞数成功");
        }else {
            return AjaxResult.error("添加点赞数失败");
        }
    }

    @PostMapping("/updateMinLikeNum")
    public AjaxResult updateMinLikeNum(@RequestParam("cid") int cid){
        int i = courseService.updateMinLikeNum(cid);
        if(i==1){
            return AjaxResult.success("减少点赞数成功");
        }else {
            return AjaxResult.error("减少点赞数失败");
        }
    }
}
