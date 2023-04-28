package com.kiviweb.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.stream.util.StreamReaderDelegate;

/**
 * ClassName : Comment
 * Package: com.kiviweb.pojo
 * Description:
 *
 * @Author:Kivi
 * @Create: 2023/4/26 - 20:10
 * @Version : v1.0
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private String username;
    private String time;
    private String content;
    private int courseid;
}
