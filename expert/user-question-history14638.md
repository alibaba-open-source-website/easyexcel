---
id: "question-history-14638"
title: "easy excel简介 easyExcel"
date: "2024-06-20"
category: "expertConsultation"
description: "EasyExcel是一款专为Java设计的Excel处理库，它旨在提供快速、高效且内存友好的读写功能，尤其擅长处理大文件，避免了传统库如Apache POI和jxl在处理大量数据时常见的内存溢出问题。EasyExcel通过重新实现对07版Excel（.xlsx）文件的解析机制，大幅度降低了内存占用，"
---

## 用户问题 ： 
 easy excel简介 easyExcel 

---------------
## 专家官方解答 ：

EasyExcel是一款专为Java设计的Excel处理库，它旨在提供快速、高效且内存友好的读写功能，尤其擅长处理大文件，避免了传统库如Apache POI和jxl在处理大量数据时常见的内存溢出问题。EasyExcel通过重新实现对07版Excel（.xlsx）文件的解析机制，大幅度降低了内存占用，使得即便是数兆字节的Excel文件也能在几兆字节的内存限制下被顺利处理，极大地提高了处理大文件的能力。

### EasyExcel的核心优势与特性：

1. **内存优化**：针对大文件读写进行了深度优化，显著减少内存消耗，避免内存溢出。
2. **简化API**：提供了更为简便的API接口，让用户无需关注底层细节，即可轻松完成Excel的读写操作。
3. **模型映射**：支持直接将Excel数据映射到Java对象，通过注解如`@ExcelProperty`来指定字段与Excel列的映射关系，同时也支持忽略某些字段的读写。
4. **版本兼容**：不仅优化了07版（.xlsx）的处理，对于03版（.xls）文件也提供了基于POI SAX模式的解决方案，确保广泛兼容。
5. **流式处理**：支持数据的分批写入，适合大数据量的场景，进一步减轻内存压力。

### 使用示例简述：

#### 最简单的写入操作步骤：

1. **定义数据模型**：创建一个Java类（如`DemoData`），为每个需要映射到Excel列的属性添加`@ExcelProperty`注解，明确其在Excel中的标题。对于不需要映射的属性，可以使用`@ExcelIgnore`注解忽略。

2. **执行写入**：使用`EasyExcel.write()`方法初始化写操作，指定输出文件路径、数据模型类，以及工作表名称。随后调用`sheet()`方法设置工作表信息，并通过`doWrite()`执行写入操作。传入的数据源可以是直接的数据集合，或者是一个返回数据集合的 Supplier（Lambda表达式），以便支持动态数据加载。

#### 示例代码片段：

```java
// 写法1示例
String fileName = TestFileUtil.getPath() + "simpleWrite" + System.currentTimeMillis() + ".xlsx";
EasyExcel.write(fileName, DemoData.class)
    .sheet("模板")
    .doWrite(() -> data()); // Lambda表达式，返回数据列表
```

通过上述步骤，EasyExcel能够帮助开发者高效、低内存占用地处理Excel文件，特别适合于需要处理大规模数据导出或导入的应用场景。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel介绍 
 
 *专家经验：EasyExcel 写Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15760)给我们反馈。
