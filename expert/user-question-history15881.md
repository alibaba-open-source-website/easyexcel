---
id: "question-history-15881"
title: "我需要使用easyexcel填充数据，填充一共3列，A、B列填充数值，C列用公式计算（A列 B列）"
date: "2024-06-26"
category: "expertConsultation"
description: "根据您的需求和提供的信息，您希望使用EasyExcel填充数据，并在C列自动计算A列和B列的比值。根据已有的知识内容，我们可以这样解决您的问题：### 问题原因分析EasyExcel默认填充模板时不自动计算含有公式的单元格，这可能是出于性能或兼容性的考虑，尤其是对于大型Excel文件，直接计算可能导"
---

## 用户问题 ： 
 我需要使用easyexcel填充数据，填充一共3列，A、B列填充数值，C列用公式计算（A列 B列）  

---------------
## 专家官方解答 ：

根据您的需求和提供的信息，您希望使用EasyExcel填充数据，并在C列自动计算A列和B列的比值。根据已有的知识内容，我们可以这样解决您的问题：

### 问题原因分析
EasyExcel默认填充模板时不自动计算含有公式的单元格，这可能是出于性能或兼容性的考虑，尤其是对于大型Excel文件，直接计算可能导致处理时间过长或内存溢出。

### 解决方案步骤
1. **准备数据映射**  
   首先，准备您的数据映射，确保A列和B列的数据准备就绪。例如：
   ```java
   List<DemoData> data = new ArrayList<>();
   // 假设DemoData类有name（对应A列）、number（对应B列）属性
   data.add(new DemoData("数据A1", 10));
   data.add(new DemoData("数据A2", 20));
   ```

2. **写入模板并启用内存模式**  
   使用EasyExcel写入模板文件，并开启`inMemory`模式，以允许进一步操作Excel对象。
   ```java
   String templateFilePath = "您的模板文件路径.xlsx";
   String outputPath = "输出文件路径.xlsx";
   ExcelWriter excelWriter = EasyExcel.write(outputPath)
                                   .withTemplate(templateFilePath)
                                   .inMemory(true) // 启用内存模式
                                   .build();
   WriteSheet writeSheet = EasyExcel.writerSheet().build();
   excelWriter.fill(data, writeSheet); // 填充数据
   ```

3. **获取Workbook对象并计算公式**  
   在完成数据填充后，通过`excelWriter`获取`Workbook`对象，并使用`FormulaEvaluator`强制计算所有公式。
   ```java
   Workbook workbook = excelWriter.writeContext().writeWorkbookHolder().getWorkbook();
   workbook.getCreationHelper().createFormulaEvaluator().evaluateAll(); // 强制计算公式
   ```

4. **完成并关闭写入**  
   最后，记得关闭ExcelWriter以释放资源。
   ```java
   excelWriter.finish();
   ```

### 解释
- **启用内存模式**：这一步是为了能够在内存中直接操作Excel对象，从而可以对公式进行计算。但请注意，如果Excel文件非常大，这可能会导致内存溢出。
- **强制计算公式**：通过调用`evaluateAll()`方法，我们强制Excel计算所有公式，包括C列的A/B计算，从而实现自动计算的需求。

综上所述，通过上述步骤，您应该能够使用EasyExcel填充数据并自动计算含有公式的单元格。如果您的Excel文件特别大或者遇到其他问题，请参考EasyExcel官方文档或社区的进一步指导。

**参考资料**:
- [EasyExcel官方文档](https://easyexcel.opensource.alibaba.com/docs/current/)
- [关于自动计算公式的讨论](https://github.com/alibaba/easyexcel/issues/1464)


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？ 
 
 *专家经验：EasyExcel 填充Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15916)给我们反馈。
