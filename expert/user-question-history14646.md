---
id: "question-history-14646"
title: "easyexcel 支持poi5.2.3吗"
date: "2024-06-26"
category: "expertConsultation"
description: "根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，因此它确实支持poi 5.2.3。但请注意，使用3.0.0及以上版本的EasyExcel配合poi 5+时，需要手动在项目的依赖管"
---

## 用户问题 ： 
 easyexcel 支持poi5.2.3吗  

---------------
## 专家官方解答 ：

根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，因此它确实支持poi 5.2.3。但请注意，使用3.0.0及以上版本的EasyExcel配合poi 5+时，需要手动在项目的依赖管理中排除`poi-ooxml-schemas`依赖，示例如下：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.1.0</version>
    <exclusions>
        <exclusion>
            <artifactId>poi-ooxml-schemas</artifactId>
            <groupId>org.apache.poi</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

这样配置可以避免潜在的版本冲突问题。简而言之，若您的项目计划使用poi 5.2.3，选择EasyExcel 3.1.0或更高版本并正确配置依赖即可确保两者兼容性。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 版本选择 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15898)给我们反馈。
