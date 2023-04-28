package com.kiviweb.mapper;

import com.kiviweb.pojo.Course;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.mapper
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/23 - 9:38
 * @Version : v1.0
 */
@Mapper
public interface CourseMapper {
    @Insert("insert into course (cname, stage,  category,  videourl,  coverimgurl)" +
            " values (#{cname},#{stage},#{category},#{videourl},#{coverimgurl});")
    int insert(String cname, String stage, String category, String videourl, String coverimgurl);

    @Select("select * from course where bigstage = #{bigstage} and category = #{category}")
    List<Course> selectByStageAndCategory(String bigstage,String category);

    @Select("select * from course where id =#{id} ")
    Course getCourseByids(int id);

    @Update("update course set colnum = colnum+1 where id = #{id}")
    int updateAddColNum(int id);

    @Update("update course set colnum = colnum-1 where id = #{id}")
    int updateMinColNum(int cid);

    @Update("update course set likenum = likenum+1 where id = #{id}")
    int updateAddLikeNum(int cid);

    @Update("update course set likenum = likenum-1 where id = #{id}")
    int updateMinLikeNum(int cid);
}
