package com.kiviweb.service;

import com.kiviweb.pojo.Video;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/27 - 20:15
 * @Version : v1.0
 */
public interface VideoService {
    List<Video> getVideosByCid(int cid);
}
