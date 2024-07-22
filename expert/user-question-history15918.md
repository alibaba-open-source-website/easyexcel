---
id: "question-history-15918"
title: "EasyExcel 我想在导出excel文件的时候添加水印，要怎么做，请给出代码示例和解释"
date: "2024-06-26"
category: "expertConsultation"
description: "根据你的需求和提供的知识内容，要在使用EasyExcel导出Excel文件时添加水印，可以遵循以下步骤进行：### 分析问题原因你想在利用EasyExcel导出数据到Excel文件的同时，为该文件添加一个水印效果。这通常涉及到对Excel样式的定制，特别是背景图片的设置，因为水印通常是作为一种背景图"
---

## 用户问题 ： 
 EasyExcel 我想在导出excel文件的时候添加水印，要怎么做，请给出代码示例和解释  

---------------
## 专家官方解答 ：

根据你的需求和提供的知识内容，要在使用EasyExcel导出Excel文件时添加水印，可以遵循以下步骤进行：

### 分析问题原因
你想在利用EasyExcel导出数据到Excel文件的同时，为该文件添加一个水印效果。这通常涉及到对Excel样式的定制，特别是背景图片的设置，因为水印通常是作为一种背景图片或图案来实现的。

### 解决方案步骤
#### 1. 添加依赖
确保你的项目中包含了EasyExcel以及必要的依赖，特别是`ooxml-schemas`，用于支持更丰富的Excel样式功能。参考知识中的依赖配置如下：
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>2.2.5</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>ooxml-schemas</artifactId>
    <version>1.4</version>
</dependency>
```

#### 2. 实现`WaterMarkHandler`
创建一个类`WaterMarkHandler`，实现`SheetWriteHandler`接口，用于在Excel工作表创建后添加水印。具体实现如知识中所示，包括生成水印图片的逻辑和将图片设置为工作表背景的逻辑。

#### 3. 生成水印图片
使用Java的`Graphics2D`类在内存中生成一张含有水印文字的PNG图片。这一步骤涉及字体选择、颜色设定、透明度调整及文本旋转等操作，确保水印效果符合预期。

#### 4. 应用水印
在`WaterMarkHandler`的`afterSheetCreate`方法中，利用生成的水印图片字节流，将其作为背景添加到Excel工作表中。这一步通过与`XSSFWorkbook`的交互完成，确保了水印能正确显示。

#### 5. 调用EasyExcel进行导出
在导出Excel时，使用EasyExcel的写操作，并注册自定义的`WaterMarkHandler`。同时，不要忘记设置`inMemory(true)`，因为默认的`SXSSFWorkbook`模式不支持水印添加。
```java
EasyExcel.write(response.getOutputStream(), DemoData.class)
    .inMemory(true) // 必须设置，以便使用XSSFWorkbook而非SXSSFWorkbook
    .registerWriteHandler(new WaterMarkHandler("我是水印"))
    .sheet("模板")
    .doWrite(data());
```

### 解释
- **为何需要`inMemory(true)`**：EasyExcel默认使用`SXSSFWorkbook`以减少内存消耗，但它不支持复杂的样式设置（如水印）。通过设置`inMemory(true)`，我们改用`XSSFWorkbook`，它提供了更全面的样式支持。
- **水印实现机制**：通过在Excel工作簿中添加一个图片关系，并将其设置为工作表的背景，实现了水印效果。这要求我们手动创建水印图片并将其嵌入到Excel文档中。
- **代码示例的作用**：给出的代码示例展示了如何整合上述步骤，从依赖管理、水印图片生成到最终的导出操作，形成了一个完整的解决方案流程。

综上所述，通过实现自定义的`SheetWriteHandler`并在EasyExcel导出过程中应用它，你可以成功地在生成的Excel文件中添加水印。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel增加水印 
 
 *专家经验：EasyExcel 写Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15920)给我们反馈。
