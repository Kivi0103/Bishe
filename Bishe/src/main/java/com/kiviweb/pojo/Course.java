package com.kiviweb.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName :
 * Package: com.kiviweb.pojo
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/23 - 9:33
 * @Version : v1.0
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    private int id;
    private String cname;
    private String stage;
    private String bigstage;
    private String category;
    private String videourl;
    private String coverimgurl;
    private String intro;
    private String publishdate;
    private int colnum;
    private int likenum;
}
