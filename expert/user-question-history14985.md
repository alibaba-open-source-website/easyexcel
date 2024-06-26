---
id: "question-history-14985"
title: "EasyExcel 是否支持公式计算？"
date: "2024-06-26"
category: "expertConsultation"
description: "EasyExcel 本身并不直接支持公式计算。但是，通过结合 Apache POI 的 `FormulaEvaluator`，你可以实现对含有公式的Excel文件进行读取、计算及写回的操作。具体步骤如下：1. **读取Excel文件**：首先使用EasyExcel的读取功能加载Excel文件的数据。"
---

## 用户问题 ： 
 EasyExcel 是否支持公式计算？  

---------------
## 专家官方解答 ：

EasyExcel 本身并不直接支持公式计算。但是，通过结合 Apache POI 的 `FormulaEvaluator`，你可以实现对含有公式的Excel文件进行读取、计算及写回的操作。具体步骤如下：

1. **读取Excel文件**：首先使用EasyExcel的读取功能加载Excel文件的数据。
   
2. **使用Apache POI计算公式**：接着，利用Apache POI打开同一个文件，并创建一个`FormulaEvaluator`实例来遍历工作簿中的所有公式单元格进行计算。

3. **写回计算结果**：最后，使用EasyExcel将计算后的数据（包括已计算的公式结果）写回到原Excel文件或新的文件中。

这是一个示例代码段，展示了如何结合EasyExcel和Apache POI完成这一过程：
```java
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.read.metadata.ReadSheet;
import com.alibaba.excel.write.ExcelWriter;
import com.alibaba.excel.write.metadata.WriteSheet;
import org.apache.poi.ss.usermodel.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class EasyExcelWithFormulaEvaluator {
    public static void main(String[] args) throws IOException {
        String fileName = "your_excel_file_path";

        // 读取Excel文件
        List<Object> data = EasyExcel.read(fileName).sheet().doReadSync();

        // 使用Apache POI计算公式
        Workbook workbook = WorkbookFactory.create(new File(fileName));
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        for (Sheet sheet : workbook) {
            for (Row row : sheet) {
                for (Cell cell : row) {
                    if (cell.getCellType() == CellType.FORMULA) {
                        evaluator.evaluateFormulaCell(cell);
                    }
                }
            }
        }

        // 写回计算结果
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(fileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        excelWriter.fill(data, writeSheet);
        excelWriter.finish();
    }
}
```
请注意，如果Excel文件非常大，直接在内存中操作可能会导致内存溢出。对于大文件，官方建议是在Java层面预先计算好数据，直接写入Excel，避免使用公式。

此过程解释了如何绕过EasyExcel的限制，实现对含有公式的Excel文件的处理，确保公式能够被正确计算。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：easyexcel 结合 FormulaEvaluator 
 
 *专家经验：easyexcel模板填充后，有公式的单元格不会自动计算，而需要我手动算，如何处理？ 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15910)给我们反馈。
