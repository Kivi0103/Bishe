package com.kiviweb.service;

import com.kiviweb.pojo.Course;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/23 - 9:37
 * @Version : v1.0
 */
public interface CourseService {
    int insert(String cname, String stage, String category, String videourl, String coverimgurl);

    List<Course> selectByStageAndCategory(String bigstage,String category);

    Course getCourseByids(int id);

    int updateAddColNum(int id);

    int updateMinColNum(int cid);

    int updateAddLikeNum(int cid);

    int updateMinLikeNum(int cid);
}
