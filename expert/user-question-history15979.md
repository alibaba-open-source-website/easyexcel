---
id: "question-history-15979"
title: "EasyExcel 如何在导出的时候动态去除某一些列"
date: "2024-07-01"
category: "expertConsultation"
description: "在使用EasyExcel进行导出操作时，若需动态去除某些列，可以采取以下策略，这些建议基于提供的知识内容：### 原因分析根据提供的知识，EasyExcel推荐避免使用`includeColumnFieldNames`属性，而是倾向于采用更灵活的动态处理方式。动态去除列的需求通常源于用户希望根据特定"
---

## 用户问题 ： 
 EasyExcel 如何在导出的时候动态去除某一些列  

---------------
## 专家官方解答 ：

在使用EasyExcel进行导出操作时，若需动态去除某些列，可以采取以下策略，这些建议基于提供的知识内容：

### 原因分析
根据提供的知识，EasyExcel推荐避免使用`includeColumnFieldNames`属性，而是倾向于采用更灵活的动态处理方式。动态去除列的需求通常源于用户希望根据特定条件自定义导出内容，例如只导出用户勾选的列或根据业务需求排除某些列。

### 解决方案步骤

#### 方法一：动态头方式
1. **创建动态表头**：首先，你需要为你的导出定义一个方法来生成动态的表头。这可以通过创建一个返回`List<List<String>>`的函数实现，每个内部列表代表一行表头，列表中的字符串即为表头的列名。可以根据实际需求调整这些列名，从而实现动态去除某些列的目的。

```java
private List<List<String>> dynamicHead() {
    List<List<String>> list = new ArrayList<>();
    // 根据逻辑判断，决定哪些列需要被包含
    if (shouldIncludeColumn1) {
        List<String> head1 = new ArrayList<>();
        head1.add("列1标题");
        list.add(head1);
    }
    if (shouldIncludeColumn2) {
        List<String> head2 = new ArrayList<>();
        head2.add("列2标题");
        list.add(head2);
    }
    // 重复此过程以添加或排除其他列
    return list;
}
```

2. **写入表头**：使用`EasyExcel.write().head(dynamicHead())...`方法写入动态生成的表头。

3. **写入数据**：之后，通过`.sheet()`和`.doWrite()`方法写入实际数据。确保数据模型（如`DemoData`类）与最终确定的表头列对应。

#### 方法二：排除指定列
虽然官方不推荐，但在某些场景下，直接使用`.excludeColumnFiledNames(Set<String>)`方法也可以达到目的。你需要明确哪些列名是要从导出中排除的，并将它们放入一个`Set`中传递给该方法。

```java
Set<String> columnsToExclude = new HashSet<>();
columnsToExclude.add("列1标题");
// 添加更多需要排除的列名
EasyExcel.write(fileName, DemoData.class).excludeColumnFiledNames(columnsToExclude)...;
```

### 解释
- 动态头方式提供了最大的灵活性，允许你完全控制导出的列结构，特别适合于用户可定制的导出需求。
- 使用排除列的方法较为直接，适用于已知哪些列固定不需要导出的情况，但不如动态头灵活，特别是当排除规则复杂时。

以上步骤结合了提供的知识内容，旨在帮助你实现EasyExcel导出时动态去除某些列的功能。请根据实际应用场景选择最合适的方法实施。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：Excel动态表头 
 
 *专家经验：EasyExcel 写Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15985)给我们反馈。
