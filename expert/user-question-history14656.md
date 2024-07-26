---
id: "question-history-14656"
title: "relativeheadrowindex 是什么意思？具体举个例子？"
date: "2024-06-26"
category: "expertConsultation"
description: "在`easyExcel`中，`relativeHeadRowIndex`参数是指写入数据到Excel时，与Excel表头相对的起始行索引。简单来说，这个值决定了你的数据从哪一行开始写入，默认值为0，意味着数据将紧接着表头下方开始写入。### 具体举例：假设你有一个需求，需要在写入数据前，在Excel"
---

## 用户问题 ： 
 relativeheadrowindex 是什么意思？具体举个例子？  

---------------
## 专家官方解答 ：

在`easyExcel`中，`relativeHeadRowIndex`参数是指写入数据到Excel时，与Excel表头相对的起始行索引。简单来说，这个值决定了你的数据从哪一行开始写入，默认值为0，意味着数据将紧接着表头下方开始写入。

### 具体举例：

假设你有一个需求，需要在写入数据前，在Excel的表头上方添加一些说明或者留空几行。这时，`relativeHeadRowIndex`就派上用场了。

**场景设定：**
- 你希望数据写入前，Excel的前两行为空（可能是为了手动填写标题或说明）。
- 你的数据模型已经定义好，使用`EasyExcel.write()`方法来写入数据。

**代码示例：**
```java
// 导出数据到Excel，数据实际写入从第3行开始（因为索引是从0开始计数）
EasyExcel.write(fileName, YourDataClass.class)
    .relativeHeadRowIndex(2) // 设置relativeHeadRowIndex为2，意味着数据将从第3行开始写入
    .sheet("数据表")
    .doWrite(dataList);
```
在这个例子中，`relativeHeadRowIndex(2)`的设置会让EasyExcel在写入数据时，自动跳过前两行，从第三行开始写入数据，从而实现了在数据上方预留空行的目的。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 参数介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15904)给我们反馈。
