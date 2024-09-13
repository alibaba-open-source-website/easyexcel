---
id: "question-history-16626"
title: "easyexcel 支持poi5.2.3吗"
date: "2024-08-28"
category: "expertConsultation"
description: "根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，这包括了您询问的poi 5.2.3版本。但是，需要注意的是，如果决定在项目中使用EasyExcel 3.1.0+版本搭配poi 5"
---

## 用户问题 ： 
 easyexcel 支持poi5.2.3吗  

---------------
## 专家官方解答 ：

根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，这包括了您询问的poi 5.2.3版本。但是，需要注意的是，如果决定在项目中使用EasyExcel 3.1.0+版本搭配poi 5+，必须手动引入poi 5+的依赖并排除`poi-ooxml-schemas`，示例如下：

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

此步骤是为了避免潜在的冲突问题，确保EasyExcel与poi库的顺畅集成。请按照以上指引操作，以确保您的项目中EasyExcel与poi 5.2.3的兼容性。同时，考虑到稳定性，推荐定期检查EasyExcel是否有新版本发布，以便及时获取可能的错误修复和性能改进。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：EasyExcel 版本选择 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16627)给我们反馈。
