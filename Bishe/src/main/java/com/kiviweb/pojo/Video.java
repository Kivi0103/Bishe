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
 * @Create: 2023/4/27 - 20:12
 * @Version : v1.0
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    private int cid;
    private String cname;
    private String videourl;
    private int serialNumber;
    private String videoName;
}
