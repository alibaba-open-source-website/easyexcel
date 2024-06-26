---
id: "question-history-15882"
title: "easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？"
date: "2024-06-25"
category: "expertConsultation"
description: "在处理EasyExcel模板填充后公式不自动计算的问题时，原因主要在于EasyExcel默认并不执行Excel文件中的公式计算。根据提供的知识内容，这里有一个推荐的解决方案步骤：### 分析问题原因EasyExcel设计时为了处理大量数据和提升性能，可能并未直接集成公式计算的功能，尤其是在填充模板后"
---

## 用户问题 ： 
 easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？  

---------------
## 专家官方解答 ：

在处理EasyExcel模板填充后公式不自动计算的问题时，原因主要在于EasyExcel默认并不执行Excel文件中的公式计算。根据提供的知识内容，这里有一个推荐的解决方案步骤：

### 分析问题原因
EasyExcel设计时为了处理大量数据和提升性能，可能并未直接集成公式计算的功能，尤其是在填充模板后直接保存文件的情景下，公式不会被自动计算。

### 解决方案步骤
1. **准备数据和模板路径**：首先，你需要准备好要填充的数据以及模板Excel的文件路径。

2. **使用内存模式写入**：通过EasyExcel创建一个工作簿写入器，并启用`inMemory`模式。这一步是为了后续能够更容易地操作Excel的工作簿对象。代码示例如下：
   ```java
   ExcelWriter excelWriter = EasyExcel.write(filePath)
                                   .withTemplate(templateFilePath)
                                   .inMemory(true)
                                   .build();
   ```

3. **填充数据**：接着，使用之前创建的写入器填充你的数据到模板中。
   ```java
   WriteSheet writeSheet = EasyExcelFactory.writerSheet().build();
   excelWriter.fill(map, writeSheet);
   ```

4. **获取Workbook对象并计算公式**：之后，从写入上下文中获取原始的`Workbook`对象，并使用Apache POI的`FormulaEvaluator`来计算所有公式。
   ```java
   Workbook workbook = excelWriter.writeContext().writeWorkbookHolder().getWorkbook();
   workbook.getCreationHelper().createFormulaEvaluator().evaluateAll();
   ```
   注意，这一步是关键，它强制计算了工作簿中的所有公式。

5. **完成并关闭写入器**：最后，别忘了调用`finish()`方法来完成写入操作并关闭资源。
   ```java
   excelWriter.finish();
   ```

### 解释
- **启用内存模式**：这是为了能够在填充数据后直接在内存中访问和操作`Workbook`对象，便于进行公式计算。
- **公式计算**：通过`FormulaEvaluator`手动触发公式计算，这是因为EasyExcel本身不自动处理这一过程。这一步骤确保了填充数据后，公式能够得到正确的计算结果。
- **资源管理**：完成操作后关闭写入器是非常重要的，以避免潜在的资源泄露问题。

如果Excel文件非常大，考虑计算资源和内存限制，官方建议在Java层完成所有计算后直接写入计算结果，而非依赖于Excel公式计算，以避免潜在的性能问题或内存溢出错误。

以上步骤基于提供的知识内容，应该能解决EasyExcel模板填充后公式不自动计算的问题。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？ 
 
 *专家经验：easyexcel 结合 FormulaEvaluator 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15884)给我们反馈。
