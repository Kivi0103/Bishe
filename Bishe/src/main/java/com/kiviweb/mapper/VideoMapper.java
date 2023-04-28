package com.kiviweb.mapper;

import com.kiviweb.pojo.Video;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.mapper
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/27 - 20:16
 * @Version : v1.0
 */

@Mapper
public interface VideoMapper {

    @Select("select * from video where cid = #{cid};")
    List<Video> getVideosByCid(int cid);
}
