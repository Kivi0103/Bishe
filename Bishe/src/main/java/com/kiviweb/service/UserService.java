package com.kiviweb.service;

import com.kiviweb.pojo.User;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/21 - 11:55
 * @Version : v1.0
 */
public interface UserService {
    User login(String username,String password);

    List<User> test();

    int signup(String username, String password, String phone, String signDate);

    User getById(int id);

    int[] getFavorites(Integer id);

    int isFavorites(int uid, int cid);

    int isLikes(int uid, int cid);

    int colFavorites(int uid, int cid);

    int cancelFavorites(int uid, int cid);

    int addLike(int uid, int cid);

    int minLike(int uid, int cid);

    int isExist(String username);

    int updateUserInfo(int id, String username, int age, String stage, String phone, String gender, String schoolname);

    int addOneComment(int uid);
}
