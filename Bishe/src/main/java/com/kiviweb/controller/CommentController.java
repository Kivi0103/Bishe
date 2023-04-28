package com.kiviweb.controller;

import com.kiviweb.pojo.AjaxResult;
import com.kiviweb.pojo.Comment;
import com.kiviweb.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.controller
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/26 - 20:13
 * @Version : v1.0
 */

@Slf4j  //日志注解
@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/addComment")
    public AjaxResult addComment(@RequestBody Comment comment){
        int c = commentService.addComment(comment.getCourseid(),comment.getContent(),comment.getTime(),comment.getUsername());
        if(c==1){
            return AjaxResult.success("添加评论成功");
        }else {
            return AjaxResult.error("添加评论失败");
        }
    }

    @PostMapping("/getComments")
    public AjaxResult getComments(@RequestParam("cid") int cid){
        List<Comment> comments = commentService.getComments(cid);
        return AjaxResult.success("查询评论成功",comments);
    }
}
