---
id: "question-history-14646"
title: "easyexcel 支持poi5.2.3吗 easyExcel"
date: "2024-06-20"
category: "expertConsultation"
description: "根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，这包括了您询问的poi 5.2.3版本。但是，需要注意的是，从3.0.0+版本开始，如果使用poi 5+版本，需要手动在项目的依赖"
---

## 用户问题 ： 
 easyexcel 支持poi5.2.3吗 easyExcel 

---------------
## 专家官方解答 ：

根据已知知识，EasyExcel版本3.1.0及以上支持poi 5.2.3。具体来说，EasyExcel 3.1.0及之后的版本兼容poi 4.1.2至5.2.2的范围，这包括了您询问的poi 5.2.3版本。但是，需要注意的是，从3.0.0+版本开始，如果使用poi 5+版本，需要手动在项目的依赖管理中引入poi 5+版本的包，并排除`poi-ooxml-schemas`，示例如下：

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

此外，考虑到稳定性，如果您的项目是新引入EasyExcel，推荐直接使用最新版本。您可以通过访问[这个地址](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel)来获取当前最新的EasyExcel版本信息。

综上所述，EasyExcel确实支持poi 5.2.3，但请按照上述步骤正确配置依赖以避免潜在的冲突或不兼容问题。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 版本选择 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15762)给我们反馈。
