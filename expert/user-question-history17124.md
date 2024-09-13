---
id: "question-history-17124"
title: "easyExcel 日期格式化，给我具体的代码样例"
date: "2024-09-13"
category: "expertConsultation"
description: "在EasyExcel中进行日期格式化的具体代码样例如下：1. **定义数据模型**：首先，你需要定义一个数据模型类，在该类中使用`@ExcelProperty`和`@DateTimeFormat`注解来指定日期字段的列名以及期望的日期格式。```javapublic class DemoTimeFo"
---

## 用户问题 ： 
 easyExcel 日期格式化，给我具体的代码样例  

---------------
## 专家官方解答 ：

在EasyExcel中进行日期格式化的具体代码样例如下：

1. **定义数据模型**：首先，你需要定义一个数据模型类，在该类中使用`@ExcelProperty`和`@DateTimeFormat`注解来指定日期字段的列名以及期望的日期格式。

```java
public class DemoTimeFormatData {
    // 使用ExcelProperty指定列的标题，用DateTimeFormat指定日期格式
    @ExcelProperty("日期标题")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss") // 这里定义了日期的格式
    private Date date;

    // Getter和Setter方法
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
```

2. **编写写入逻辑**：之后，你需要编写一个方法来生成数据并使用EasyExcel的API将这些数据写入Excel文件。

```java
public class TimeFormat {
    public static void main(String[] args) {
        String fileName = "time_format_" + System.currentTimeMillis() + ".xlsx";
        
        // 使用EasyExcel的write方法开始写操作，指定文件名和数据模型类
        EasyExcel.write(fileName, DemoTimeFormatData.class)
            // 指定工作表的名称
            .sheet("sheet1")
            // 调用doWrite方法，传入数据列表完成写入操作
            .doWrite(data());
    }

    // 生成数据的静态方法
    public static List<DemoTimeFormatData> data() {
        List<DemoTimeFormatData> list = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            DemoTimeFormatData data = new DemoTimeFormatData();
            // 设置当前日期作为示例数据
            data.setDate(new Date());
            list.add(data);
        }
        return list;
    }
}
```

**解释**：
- 上述代码首先定义了一个`DemoTimeFormatData`类，其中的`date`字段通过`@ExcelProperty`和`@DateTimeFormat`注解来控制其在Excel中的显示方式。`@DateTimeFormat`注解的值`"yyyy-MM-dd HH:mm:ss"`定义了日期时间的格式，确保了Java中的`Date`对象会被正确转换为指定格式的字符串写入Excel。
- 在`TimeFormat`类的`main`方法中，我们利用EasyExcel的API创建一个新的Excel文件，并指定了数据写入的模型类和工作表名称。通过`data()`方法生成了一组示例数据，每个数据对象的`date`字段被设置为当前日期时间，然后这组数据被写入Excel文件中。

这样，当你运行这段代码时，EasyExcel会根据指定的日期格式将日期数据转换并写入Excel文件中，实现了日期格式化的功能。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：Easyexcel 写日期转换 
 
 * 专家经验：EasyExcel 写ExcelNew 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=17130)给我们反馈。
