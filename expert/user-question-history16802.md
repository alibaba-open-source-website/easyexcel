---
id: "question-history-16802"
title: "easyexecl 设置图片大小"
date: "2024-09-06"
category: "expertConsultation"
description: "在EasyExcel中设置图片大小，可以通过自定义一个`CellWriteHandler`来实现对图片尺寸的调整。根据提供的知识内容，以下是具体的步骤和解释：### 问题分析用户希望在使用EasyExcel导出数据时，能够控制插入图片的大小。这通常涉及到对Excel单元格中图片属性的直接操作。###"
---

## 用户问题 ： 
 easyexecl 设置图片大小  

---------------
## 专家官方解答 ：

在EasyExcel中设置图片大小，可以通过自定义一个`CellWriteHandler`来实现对图片尺寸的调整。根据提供的知识内容，以下是具体的步骤和解释：

### 问题分析
用户希望在使用EasyExcel导出数据时，能够控制插入图片的大小。这通常涉及到对Excel单元格中图片属性的直接操作。

### 解决方案步骤
#### 步骤1: 定义图片数据模型
首先，定义一个存储图片URL的类，如`ImageDemoData`，这将用于存放图片的网络地址或本地路径。

```java
@Getter
@Setter
@EqualsAndHashCode
public class ImageDemoData {
    private URL url;
}
```

#### 步骤2: 准备图片数据并写入
接下来，创建一个`ImageDemoData`对象实例，为其分配图片URL，然后将这个对象加入到一个列表中，准备写入Excel。

```java
ImageDemoData imageDemoData = new ImageDemoData();
imageDemoData.setUrl(new URL("图片URL"));
List<ImageDemoData> imageDemoDataList = new ArrayList<>();
imageDemoDataList.add(imageDemoData);
```

#### 步骤3: 创建ExcelWriter并配置自定义处理器
利用`EasyExcel.write()`方法创建`ExcelWriter`实例，并传入自定义的`CellWriteHandler`——`QuotationCustomCellWriteHandler`，该处理器负责调整图片大小。

```java
ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream())
                               .registerWriteHandler(new QuotationCustomCellWriteHandler(宽度像素, 高度像素))
                               .build();
excelWriter.write(imageDemoDataList, writeSheet);
```

#### 步骤4: 实现自定义图片大小调整处理器
创建`QuotationCustomCellWriteHandler`类，继承自`AbstractCellWriteHandler`，在其中覆写`afterCellDispose`方法，用于在单元格写入后调整图片大小。

```java
public class QuotationCustomCellWriteHandler extends AbstractCellWriteHandler {
    // 构造函数接收图片新宽度和高度（以像素为单位）
    public QuotationCustomCellWriteHandler(int newWidthPixels, int newHeightPixels) {
        // 将像素转换为EMU单位
        this.newWidthEMU = pixelsToEMU(newWidthPixels);
        this.newHeightEMU = pixelsToEMU(newHeightPixels);
    }
    
    // 其他方法...
    
    // 将像素转换为EMU的辅助方法
    private int pixelsToEMU(int pixels) {
        return (int)Math.round(pixels * EMU_PER_PIXEL);
    }
    
    // 在此方法中调整图片大小
    @Override
    public void afterCellDispose(CellWriteHandlerContext context) {
        // 确定图片URL匹配，然后调整图片大小
        // ...具体调整逻辑如知识中所示
    }
}
```

#### 步骤解释
- **定义图片数据模型**：这是为了方便将图片信息作为数据源的一部分处理。
- **准备图片数据并写入**：实际操作中，你需要将图片的实际URL或其他标识替换掉示例代码中的"图片URL"。
- **创建ExcelWriter并配置自定义处理器**：注册自定义处理器是为了在写入Excel时能自动执行图片尺寸调整的逻辑。
- **实现自定义图片大小调整处理器**：在`QuotationCustomCellWriteHandler`中，通过检查单元格内容是否包含特定图片URL，找到对应的图片形状，并调整其大小。通过修改`ClientAnchor`的`dx1`和`dy1`属性来设定图片的新尺寸（以EMU为单位），最后调用`picture.resize()`更新图片尺寸。

### 结论
通过上述步骤，你可以实现在EasyExcel导出时动态调整插入图片的大小。需要注意的是，调整图片位置的逻辑也可以类似地集成到这个处理器中，通过修改`ClientAnchor`的行和列偏移属性来实现。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：EasyExcel中对图片大小及位置进行调整 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16803)给我们反馈。
