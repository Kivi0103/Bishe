package com.kiviweb.mapper;

import com.kiviweb.pojo.Comment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.mapper
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/26 - 20:14
 * @Version : v1.0
 */

@Mapper
public interface CommentMapper {

    @Insert("insert into comments (courseid,content,time,username) values (#{courseid},#{content},#{time},#{username});")
    int addComment(int courseid,String content,String time,String username);

    @Select("select * from comments where courseid = #{cid} order by time desc")
    List<Comment> getComments(int cid);
}
