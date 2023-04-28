package com.kiviweb.service.iml;

import com.kiviweb.mapper.UserMapper;
import com.kiviweb.pojo.User;
import com.kiviweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ClassName :
 * Package: com.kiviweb.service.iml
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/21 - 11:56
 * @Version : v1.0
 */

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> test(){
        return userMapper.test();
    }

    @Override
    public User login(String username,String password){
        return userMapper.login(username,password);
    }



    @Override
    public int signup(String username, String password, String phone, String signDate){
        return userMapper.signup( username,  password,  phone,  signDate);
    }

    @Override
    public User getById(int id) {
        return userMapper.getById(id);
    }

    @Override
    public int[] getFavorites(Integer id) {
        return userMapper.getFavorites(id);
    }

    @Override
    public int isFavorites(int uid, int cid) {
        return userMapper.isFavorites(uid,cid);
    }


    @Override
    public int isLikes(int uid, int cid) {
        return userMapper.isLikes(uid,cid);
    }

    @Override
    public int colFavorites(int uid, int cid) {
        return userMapper.colFavorites(uid,cid);
    }

    @Override
    public int cancelFavorites(int uid, int cid) {
        return userMapper.cancelFavorites(uid,cid);
    }

    @Override
    public int addLike(int uid, int cid) {
        return userMapper.addLike(uid,cid);
    }

    @Override
    public int minLike(int uid, int cid) {
        return userMapper.minLike(uid,cid);
    }

    @Override
    public int isExist(String username) {
        return userMapper.isExist(username);
    }

    @Override
    public int updateUserInfo(int id, String username, int age, String stage, String phone, String gender, String schoolname) {
        return userMapper.updateUserInfo(id,  username,  age,  stage,  phone,  gender,  schoolname);
    }

    @Override
    public int addOneComment(int uid) {
        return userMapper.addOneComment(uid);
    }
}
