---
id: "question-history-16174"
title: "EasyExcel 如何指定CSV 读取时候的分隔符"
date: "2024-07-09"
category: "expertConsultation"
description: "在EasyExcel中，指定CSV读取时的分隔符可以通过以下步骤进行：1. **分析问题原因**：根据你的需求，CSV文件可能使用了非默认的分隔符（如分号`;`而非逗号`,`）。EasyExcel默认使用逗号作为CSV文件的分隔符，因此需要手动设置以适应特定的文件格式。2. **指定读取CSV的分隔"
---

## 用户问题 ： 
 EasyExcel 如何指定CSV 读取时候的分隔符  

---------------
## 专家官方解答 ：

在EasyExcel中，指定CSV读取时的分隔符可以通过以下步骤进行：

1. **分析问题原因**：根据你的需求，CSV文件可能使用了非默认的分隔符（如分号`;`而非逗号`,`）。EasyExcel默认使用逗号作为CSV文件的分隔符，因此需要手动设置以适应特定的文件格式。

2. **指定读取CSV的分隔符**：
   - 首先，创建并初始化`ExcelReader`对象，指向你的CSV文件路径。
   - 然后，通过检查`ReadWorkbookHolder`实例来判断是否处理的是CSV文件。
   - 接着，将`CsvFormat`的分隔符设置为你需要的字符（例如`;`）。
   - 最后，执行读取操作。

具体代码示例（源自提供的知识内容）：
```java
String fileName = "你的CSV文件路径.csv";
try (ExcelReader excelReader = EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).build()) {
    ReadWorkbookHolder readWorkbookHolder = excelReader.analysisContext().readWorkbookHolder();
    // 判断只有csv才需要修改配置信息
    if (readWorkbookHolder instanceof CsvReadWorkbookHolder) {
        CsvReadWorkbookHolder csvReadWorkbookHolder = (CsvReadWorkbookHolder)readWorkbookHolder;
        // 底层读取csv用的是apache的common-csv，所以设置CsvFormat即可
        csvReadWorkbookHolder.setCsvFormat(csvReadWorkbookHolder.getCsvFormat().withDelimiter(';')); // 这里设置为分号作为分隔符
    }
    ReadSheet readSheet = EasyExcel.readSheet(0).build();
    excelReader.read(readSheet);
}
```

**解释**：上述代码段首先尝试读取指定路径的CSV文件，并通过条件判断确保仅对CSV文件进行分隔符的修改。通过`.withDelimiter(';')`方法，我们将读取时使用的分隔符从默认的逗号改为了分号。这样，EasyExcel就能正确地识别CSV文件中的字段边界，即使它们不是用逗号分隔的。

以上步骤和代码示例应该能够帮助你解决如何在EasyExcel中指定CSV读取时的分隔符问题。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 如何指定CSV 读取时候的分隔符 
 
 *专家经验：EasyExcel csv读写的支持 
 
 *专家经验：EasyExcel介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16175)给我们反馈。
