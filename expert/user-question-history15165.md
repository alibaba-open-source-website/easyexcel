---
id: "question-history-15165"
title: "easyexcel3.3.4如何进行单元格合并"
date: "2024-06-26"
category: "expertConsultation"
description: "在`easyExcel 3.3.4`中进行单元格合并，你可以采用以下两种方法：### 方法1：使用注解1. **定义实体类**：在实体类中使用注解来标记需要合并的单元格。例如，在`DemoMergeData`类中，使用了`@ContentLoopMerge(eachRow = 2)`来实现每隔2行合"
---

## 用户问题 ： 
 easyexcel3.3.4如何进行单元格合并  

---------------
## 专家官方解答 ：

在`easyExcel 3.3.4`中进行单元格合并，你可以采用以下两种方法：

### 方法1：使用注解

1. **定义实体类**：在实体类中使用注解来标记需要合并的单元格。例如，在`DemoMergeData`类中，使用了`@ContentLoopMerge(eachRow = 2)`来实现每隔2行合并单元格的效果。

   ```java
   @Getter
   @Setter
   @EqualsAndHashCode
   public class DemoMergeData {
       // 这一列 每隔2行 合并单元格
       @ContentLoopMerge(eachRow = 2)
       @ExcelProperty("字符串标题")
       private String string;
       ...
   }
   ```

2. **写入数据**：使用`EasyExcel.write()`方法，指定实体类和写入的文件路径，执行写操作。

   ```java
   String fileName = TestFileUtil.getPath() + "mergeWrite" + System.currentTimeMillis() + ".xlsx";
   EasyExcel.write(fileName, DemoMergeData.class).sheet("模板").doWrite(data());
   ```

### 方法2：自定义合并单元格策略

1. **创建合并策略**：如`LoopMergeStrategy`，你可以根据需求自定义合并策略，比如每隔多少行或列进行合并。

   ```java
   LoopMergeStrategy loopMergeStrategy = new LoopMergeStrategy(2, 0); // 每隔2行会合并
   ```

2. **注册合并策略并写入数据**：在写操作时，通过`registerWriteHandler()`方法注册自定义的合并策略。

   ```java
   String fileName = TestFileUtil.getPath() + "mergeWrite" + System.currentTimeMillis() + ".xlsx";
   EasyExcel.write(fileName, DemoData.class)
            .registerWriteHandler(loopMergeStrategy)
            .sheet("模板")
            .doWrite(data());
   ```

### 解释

- **注解方式**直接在实体类中通过注解定义合并规则，适用于规则较为固定且简单的场景。
- **自定义策略**提供了更高的灵活性，当合并规则复杂或者需要动态调整时，可以通过编写自定义策略来实现。

请确保你已正确引入了`easyExcel`的相关依赖，并注意版本兼容性，虽然示例基于较早版本，但基本原理和API在`3.3.4`版本中应该是类似的。如果遇到具体实现上的困难，检查官方文档或查看是否有更新的API变更。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel 写Excel 
 
 *专家经验：EasyExcel 读Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15912)给我们反馈。
