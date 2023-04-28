package com.kiviweb.service.iml;

import com.kiviweb.mapper.VideoMapper;
import com.kiviweb.pojo.Video;
import com.kiviweb.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service.iml
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/27 - 20:15
 * @Version : v1.0
 */

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoMapper videoMapper;
    @Override
    public List<Video> getVideosByCid(int cid) {
        return videoMapper.getVideosByCid(cid);
    }
}
