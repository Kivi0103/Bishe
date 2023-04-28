package com.kiviweb.mapper;

import com.kiviweb.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.mapper
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/21 - 11:54
 * @Version : v1.0
 */

@Mapper
public interface UserMapper {

    @Select("select * from user where username = #{username} and password = #{password};")
    User login(String username,String password);


    @Select("select * from user;")
    List<User> test();

    @Insert("insert into user(username,password, phone,  signDate) values ( #{username},  #{password},  #{phone},  #{signDate});")
    int signup(String username, String password, String phone, String signDate);

    @Select("select * from user where id = #{id};")
    User getById(int id);

    @Select("select distinct (courseid) from favorites where userid = #{id};")
    int[] getFavorites(Integer id);

    @Select("select count(*) from favorites where userid =#{uid} and courseid = #{cid};")
    int isFavorites(int uid, int cid);

    @Select("select count(*) from likes where userid =#{uid} and courseid = #{cid};")
    int isLikes(int uid, int cid);
    @Insert("insert into favorites(userid,courseid) values (#{uid},#{cid});")
    int colFavorites(int uid, int cid);

    @Delete("delete from favorites where userid = #{uid} and courseid = #{cid}")
    int cancelFavorites(int uid, int cid);

    @Insert("insert into likes(userid,courseid) values (#{uid},#{cid});")
    int addLike(int uid, int cid);

    @Delete("delete from likes where userid = #{uid} and courseid = #{cid}")
    int minLike(int uid, int cid);

    @Select("select count(*) from user where username = #{username};")
    int isExist(String username);

    @Update("update user set username=#{username},age=#{age},stage=#{stage},phone=#{phone},gender=#{gender},schoolname=#{schoolname} where id = #{id};")
    int updateUserInfo(int id, String username, int age, String stage, String phone, String gender, String schoolname);

    @Update("update user set commentnum = commentnum+1 where id = #{uid};")
    int addOneComment(int uid);
}
