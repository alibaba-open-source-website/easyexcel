---
title: 写Excel | QA
sidebar_label: 写Excel
sidebar_position: 3
---

## 常见问题

### The workbook already contains a sheet named

确认自己是否重复了
sheet，如果不是大概率是找不到字体，请参照：[我在本地可以，发布到线上环境怎么不可以了？](/qa/#%E6%88%91%E5%9C%A8%E6%9C%AC%E5%9C%B0%E5%8F%AF%E4%BB%A5%E5%8F%91%E5%B8%83%E5%88%B0%E7%BA%BF%E4%B8%8A%E7%8E%AF%E5%A2%83%E6%80%8E%E4%B9%88%E4%B8%8D%E5%8F%AF%E4%BB%A5%E4%BA%86)

### 如何设置单元格格式

简单的设置单元格是个如下： 直接在属性上面使用注解

```java
  @ExcelProperty("数字标题")
    @ContentStyle(dataFormat = 4)
    private Double doubleData;
```

注解上面的数值参照:`com.alibaba.excel.constant.BuiltinFormats#BUILTIN_FORMATS_CN`
