package com.kiviweb.service;

import com.kiviweb.pojo.Comment;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/26 - 20:14
 * @Version : v1.0
 */
public interface CommentService {
    int addComment(int courseid,String content,String time,String username);

    List<Comment> getComments(int cid);
}
