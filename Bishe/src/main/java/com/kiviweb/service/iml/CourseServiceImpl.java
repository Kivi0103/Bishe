package com.kiviweb.service.iml;

import com.kiviweb.mapper.CourseMapper;
import com.kiviweb.pojo.Course;
import com.kiviweb.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.zip.CheckedOutputStream;

/**
 * ClassName :
 * Package: com.kiviweb.service.iml
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/23 - 9:38
 * @Version : v1.0
 */
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseMapper courseMapper;
    @Override
    public int insert(String cname, String stage, String category, String videourl, String coverimgurl) {
        return courseMapper.insert(cname,  stage,  category,  videourl,  coverimgurl);
    }

    @Override
    public List<Course> selectByStageAndCategory(String bigstage,String category) {
        return courseMapper.selectByStageAndCategory(bigstage,category);
    }

    @Override
    public Course getCourseByids(int id) {
        return courseMapper.getCourseByids(id);
    }

    @Override
    public int updateAddColNum(int id){
        return courseMapper.updateAddColNum(id);
    }

    @Override
    public int updateMinColNum(int cid) {
        return courseMapper.updateMinColNum(cid);
    }

    @Override
    public int updateAddLikeNum(int cid) {
        return courseMapper.updateAddLikeNum(cid);
    }

    @Override
    public int updateMinLikeNum(int cid) {
        return courseMapper.updateMinLikeNum(cid);
    }
}
