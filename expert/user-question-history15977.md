---
id: "question-history-15977"
title: "easyexcel可以读取csv文件吗"
date: "2024-07-01"
category: "expertConsultation"
description: "可以，EasyExcel从3.0.0-beta1版本开始支持读取CSV文件。当你需要写入CSV文件时，可以通过指定`.excelType(ExcelTypeEnum.CSV)`来实现。以下是一个具体的写入CSV文件的Java代码示例，基于EasyExcel库：```javaEasyExcel.wri"
---

## 用户问题 ： 
 easyexcel可以读取csv文件吗  

---------------
## 专家官方解答 ：

可以，EasyExcel从3.0.0-beta1版本开始支持读取CSV文件。当你需要写入CSV文件时，可以通过指定`.excelType(ExcelTypeEnum.CSV)`来实现。以下是一个具体的写入CSV文件的Java代码示例，基于EasyExcel库：

```java
EasyExcel.write(fileName, DemoData.class)
            // 指定导出类型为csv
            .excelType(ExcelTypeEnum.CSV)
            .sheet("模板")
            .doWrite(() -> {
                // 分页查询数据
                return data();
            });
```

这段代码展示了如何使用EasyExcel API指定输出文件类型为CSV，并执行写入操作。请确保你使用的EasyExcel版本支持CSV读写功能，根据[EasyExcel版本选择](#Zr1lP)中的指导，推荐使用3.1.0以上的版本，这些版本对poi依赖有较好的兼容性，并且支持JDK8至JDK17。

如果你有其他关于EasyExcel使用的问题，或需要了解如何读取CSV文件的具体代码示例，请告知，以便提供进一步的帮助。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel csv读写的支持 
 
 *专家经验：EasyExcel 版本选择 
 
 *专家经验：EasyExcel 读Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15983)给我们反馈。
