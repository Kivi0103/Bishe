package com.kiviweb.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName :User
 * Package: com.kiviweb.pojo
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/21 - 11:53
 * @Version : v1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;
    private String signDate;
    private int age;
    private String stage;
    private String phone;
    private String gender;
    private String schoolname;
    private int studytime;
    private int commentnum;
}
