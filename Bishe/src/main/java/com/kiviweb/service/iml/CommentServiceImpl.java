package com.kiviweb.service.iml;

import com.kiviweb.mapper.CommentMapper;
import com.kiviweb.pojo.Comment;
import com.kiviweb.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service.iml
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/26 - 20:15
 * @Version : v1.0
 */

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;
    @Override
    public int addComment(int courseid,String content,String time,String username) {
        return commentMapper.addComment(courseid,content, time, username);
    }

    @Override
    public List<Comment> getComments(int cid) {
        return commentMapper.getComments(cid);
    }
}
