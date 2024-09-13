---
id: "question-history-16636"
title: "excelWritter的FillWrapper是什么"
date: "2024-09-02"
category: "expertConsultation"
description: "EasyExcel中的`FillWrapper`是用于处理多列表组合填充功能的一个类。当你的Excel模板设计中需要根据不同的数据源（即多个List）进行填充时，就需要用到`FillWrapper`。它可以帮助你区分并绑定每个数据集到模板中指定的前缀，从而实现精准的数据填充。### 基于知识分析问题"
---

## 用户问题 ： 
 excelWritter的FillWrapper是什么  

---------------
## 专家官方解答 ：

EasyExcel中的`FillWrapper`是用于处理多列表组合填充功能的一个类。当你的Excel模板设计中需要根据不同的数据源（即多个List）进行填充时，就需要用到`FillWrapper`。它可以帮助你区分并绑定每个数据集到模板中指定的前缀，从而实现精准的数据填充。

### 基于知识分析问题原因

在EasyExcel的复杂场景下，特别是涉及到多列表格数据填充时，直接使用简单数据填充方法可能无法满足需求。`FillWrapper`的引入正是为了解决这类复杂场景，特别是从2.2.0-beta1版本开始支持的多列表组合填充功能。

### 具体步骤与解释

#### 如何使用FillWrapper

1. **准备模板文件**：确保你的Excel模板中使用了特定的占位符来标记数据源，例如`{data1.xxx}`、`{data2.xxx}`，这里的`data1`和`data2`就是你在代码中将会使用的前缀。

2. **创建FillWrapper实例**：对于每个数据集合，你需要使用`FillWrapper`将其包装起来，并指定一个前缀。这一步是为了告诉EasyExcel如何将这个数据集合对应到模板中的哪个部分。例如：
   ```java
   FillWrapper data1Wrapper = new FillWrapper("data1", dataList1);
   FillWrapper data2Wrapper = new FillWrapper("data2", dataList2);
   ```

3. **执行填充操作**：使用`ExcelWriter`的`fill`方法，传入`FillWrapper`实例以及可能的`FillConfig`（如果需要调整填充方向等）。这样，EasyExcel就能识别出不同数据集的对应关系，并正确填充到Excel模板中。示例代码如下：
   ```java
   try (ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build()) {
       WriteSheet writeSheet = EasyExcel.writerSheet().build();
       excelWriter.fill(data1Wrapper, writeSheet);
       excelWriter.fill(data2Wrapper, writeSheet);
       //...其他操作
   }
   ```

4. **处理非列表数据**：除了List类型的数据，你还可以像之前一样直接填充Map类型的静态数据到模板中，以完成最终的细节填充。

通过这种方式，`FillWrapper`不仅帮助解决了多数据源的复杂填充问题，还保持了代码的清晰度和可维护性。

### 结论

`FillWrapper`是EasyExcel库中用于实现多列表数据精确填充的关键工具，通过定义数据集的前缀，它能有效地指导数据如何被映射到Excel模板的不同部分，尤其是在涉及多数据源或复杂布局的场景下。请确保根据你的具体需求，正确地使用`FillWrapper`以及配置相关的填充方向和策略。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：EasyExcel 填充Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16650)给我们反馈。
