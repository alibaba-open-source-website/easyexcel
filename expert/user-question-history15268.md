---
id: "question-history-15268"
title: "EasyExcel根据注解写入excel的工具类"
date: "2024-06-26"
category: "expertConsultation"
description: "EasyExcel确实提供了一个强大的工具来根据注解写入Excel数据。以下是如何利用EasyExcel和注解来实现这一功能的详细步骤：### 1. 定义数据模型首先，你需要创建一个Java实体类来表示Excel表格中的每一行数据。在这个类中，使用`@ExcelProperty`注解来指定每个字段对"
---

## 用户问题 ： 
 EasyExcel根据注解写入excel的工具类  

---------------
## 专家官方解答 ：

EasyExcel确实提供了一个强大的工具来根据注解写入Excel数据。以下是如何利用EasyExcel和注解来实现这一功能的详细步骤：

### 1. 定义数据模型

首先，你需要创建一个Java实体类来表示Excel表格中的每一行数据。在这个类中，使用`@ExcelProperty`注解来指定每个字段对应Excel表格中的哪一列以及列的标题。例如，从参考内容中我们可以看到如下的`IndexData`类：

```java
@Getter
@Setter
@EqualsAndHashCode
public class IndexData {
    @ExcelProperty(value = "字符串标题", index = 0)
    private String string;
    @ExcelProperty(value = "日期标题", index = 1)
    private Date date;
    @ExcelProperty(value = "数字标题", index = 3)
    private Double doubleData;
}
```

### 2. 实现写入逻辑

接下来，使用`EasyExcel.write()`方法来实现数据写入Excel的功能。这个方法需要指定输出的文件路径、实体类的类型，以及可选的模板和 sheet 名称等参数。

#### 使用模板写入

如果需要根据现有的Excel模板写入数据，可以这样做：

```java
String templateFileName = "你的模板文件路径.xlsx";
String outputFileName = "输出文件的路径.xlsx";
EasyExcel.write(outputFileName, DemoData.class)
          .withTemplate(templateFileName)
          .sheet()
          .doWrite(yourDataList);
```

这里，`DemoData`是你定义的数据模型类，`yourDataList`是该模型类实例的列表，每个实例代表Excel中的一行数据。

#### 不使用模板直接写入

如果不使用模板，而是直接写入数据并指定列的位置：

```java
String fileName = "输出文件的路径.xlsx";
EasyExcel.write(fileName, IndexData.class)
          .sheet("Sheet名称")
          .doWrite(data());
```

### 3. 支持CSV格式

自3.0.0-beta1版本起，EasyExcel还支持CSV格式的读写。若需写入CSV文件，只需在写操作时指定`excelType`为`ExcelTypeEnum.CSV`：

```java
EasyExcel.write(fileName, DemoData.class)
          .excelType(ExcelTypeEnum.CSV)
          .sheet("Sheet名称")
          .doWrite(data());
```

### 解释

- **定义数据模型**步骤确保了数据结构与Excel表格结构的匹配，通过注解简化了映射过程。
- **实现写入逻辑**提供了两种方式：一种是基于模板写入，适用于样式和布局已有固定模板的情况；另一种是直接写入，更加灵活，适合动态生成列或不关心样式的情况。
- **CSV支持**扩展了EasyExcel的适用范围，使得它不仅限于Excel文件，也适用于更轻量级的CSV数据交换。

综上所述，EasyExcel通过注解驱动的方式，简化了将Java对象数据写入Excel或CSV文件的过程，无论是基于模板还是直接写入，都能提供高效且灵活的解决方案。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 写Excel 
 
 *专家经验：EasyExcel csv读写的支持 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15913)给我们反馈。
