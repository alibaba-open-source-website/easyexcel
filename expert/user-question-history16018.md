---
id: "question-history-16018"
title: "easyexcel.write 写入csv文件样例"
date: "2024-07-02"
category: "expertConsultation"
description: "根据已有的知识内容，可以为您提供如何使用EasyExcel写入CSV文件的样例。以下是详细的步骤和说明：### 步骤1：确认版本与支持情况确保您使用的EasyExcel版本是3.0.0-beta1或之后的版本，因为从这个版本开始，EasyExcel增加了对CSV文件的支持。### 步骤2：准备数据模"
---

## 用户问题 ： 
 easyexcel.write 写入csv文件样例  

---------------
## 专家官方解答 ：

根据已有的知识内容，可以为您提供如何使用EasyExcel写入CSV文件的样例。以下是详细的步骤和说明：

### 步骤1：确认版本与支持情况
确保您使用的EasyExcel版本是3.0.0-beta1或之后的版本，因为从这个版本开始，EasyExcel增加了对CSV文件的支持。

### 步骤2：准备数据模型
假设您已经有了一个数据模型类，比如`DemoData`，用于映射CSV中每一行的数据结构。如果您还没有定义这个类，请参考文档创建一个符合您需求的Java Bean。

### 步骤3：编写写入CSV的代码
使用以下代码模板来实现CSV文件的写入操作：

```java
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.enums.ExcelTypeEnum;

import java.util.List;

public class CsvWriteExample {

    public static void main(String[] args) {
        String fileName = "your_file_path.csv"; // 指定CSV文件保存路径
        List<DemoData> data = fetchDataFromDatabase(); // 假设此方法从数据库获取数据

        // 使用EasyExcel的write方法，指定文件名和数据模型类型
        // 通过.excelType(ExcelTypeEnum.CSV)指定输出格式为CSV
        EasyExcel.write(fileName, DemoData.class)
                .excelType(ExcelTypeEnum.CSV)
                .sheet("数据") // 设置sheet名称
                .doWrite(data); // 调用data()方法获取数据并写入
    }

    // 假设此方法从数据库或其他来源获取数据
    private static List<DemoData> fetchDataFromDatabase() {
        // 实现数据获取逻辑
        return null; // 返回数据列表
    }
}
```

### 解释
- **版本确认**：首先确认支持CSV是为了确保所使用的库功能完备。
- **数据模型**：准备一个Java Bean来映射CSV中的数据结构，这是数据写入的基础。
- **写入操作**：通过调用`EasyExcel.write()`方法，并明确指定`.excelType(ExcelTypeEnum.CSV)`来指示输出格式为CSV。接着，通过`.sheet()`指定工作表名称（在CSV情况下，这主要是为了代码可读性），最后使用`.doWrite()`方法传递数据列表完成写入。

请根据实际情况调整文件路径、数据模型以及数据获取逻辑。以上代码示例展示了基本的CSV文件写入流程，应能满足您的需求。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：EasyExcel csv读写的支持 
 
 *专家经验：EasyExcel 写Excel 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16022)给我们反馈。
