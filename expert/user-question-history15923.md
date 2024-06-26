---
id: "question-history-15923"
title: "模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？"
date: "2024-06-26"
category: "expertConsultation"
description: "在处理EasyExcel模板填充后，有公式的单元格不自动计算的问题时，首先理解这是由于EasyExcel默认并不执行Excel中的公式计算。根据提供的知识内容，这里有两个主要的解决策略：### 分析问题原因EasyExcel设计初衷是为了快速读写大量数据，对于公式计算的支持并非其核心功能，因此在填充"
---

## 用户问题 ： 
 模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？  

---------------
## 专家官方解答 ：

在处理EasyExcel模板填充后，有公式的单元格不自动计算的问题时，首先理解这是由于EasyExcel默认并不执行Excel中的公式计算。根据提供的知识内容，这里有两个主要的解决策略：

### 分析问题原因
EasyExcel设计初衷是为了快速读写大量数据，对于公式计算的支持并非其核心功能，因此在填充模板后，公式单元格保持原样，需要额外的操作来触发计算。

### 解决策略一：使用`evaluateAll`方法
1. **准备数据**：首先，和往常一样，准备需要填充的数据并放入一个`Map`中。
2. **写入数据**：使用`EasyExcel.write()`方法初始化写操作，并通过`.inMemory(true)`设置使用内存模式，这一步是为了解决大文件可能导致的内存溢出问题（但需注意文件大小，避免内存溢出）。
3. **获取Workbook对象**：在填充数据之后，通过`excelWriter.writeContext().writeWorkbookHolder().getWorkbook();`获取到`Workbook`对象。
4. **执行公式计算**：调用`workbook.getCreationHelper().createFormulaEvaluator().evaluateAll();`来计算工作簿中所有公式。
5. **完成并关闭**：最后，使用`excelWriter.finish();`完成写入并关闭资源。

### 解决策略二：结合Apache POI的FormulaEvaluator
1. **读取数据**：首先利用EasyExcel读取Excel文件数据。
2. **打开工作簿并计算公式**：使用Apache POI的`WorkbookFactory.create()`打开Excel文件，创建`FormulaEvaluator`实例，并遍历所有含公式的单元格执行计算。
3. **写回数据**：再次使用EasyExcel将计算后的数据写回原Excel文件。

### 解释
- **为什么需要这些步骤**：EasyExcel本身不对公式进行计算，为了实现自动计算，需要借助Excel本身的API（如通过Apache POI库）来显式执行公式计算。内存模式的使用是为了在处理大文件时能更灵活地管理内存资源，避免直接操作大文件导致的性能问题。
- **注意事项**：如果Excel文件非常大，频繁的内存操作可能会导致内存溢出，此时可能需要考虑在应用层面预先计算好数据再写入，而非依赖Excel中的公式计算。

综上所述，通过上述策略可以解决EasyExcel填充模板后公式不自动计算的问题，但具体采用哪种方式需根据实际应用场景和文件大小来决定。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？ 
 
 *专家经验：easyexcel 结合 FormulaEvaluator 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15925)给我们反馈。
