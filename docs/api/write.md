---
title: 写excel
sidebar_position: 2
---

## 注解

使用注解很简单，只要在对应的实体类上面加上注解即可。

### `ExcelProperty`

用于匹配excel和实体类的匹配,参数如下：

| 名称                  | 默认值               | 描述                                                                                                                                                    |
|---------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| value           | 空                 | 用于匹配excel中的头，必须全匹配,如果有多行头，会匹配最后一行头                                                                                                                    |
| order           | Integer.MAX_VALUE | 优先级高于`value`，会根据`order`的顺序来匹配实体和excel中数据的顺序                                                                                                           |
| index           | &#45;1            | 优先级高于`value`和`order`，会根据`index`直接指定到excel中具体的哪一列                                                                                                      |
| converter           | 自动选择              | 指定当前字段用什么转换器，默认会自动选择。写的情况下只要实现`com.alibaba.excel.converters.Converter#convertToExcelData(com.alibaba.excel.converters.WriteConverterContext<T>)` 方法即可 |

### `ExcelIgnore`

默认所有字段都会和excel去匹配，加了这个注解会忽略该字段

### `ExcelIgnoreUnannotated`

默认不加`ExcelProperty` 的注解的都会参与读写，加了不会参与

### `DateTimeFormat`

日期转换，用`String`去接收excel日期格式的数据会调用这个注解,参数如下：

| 名称                  | 默认值  | 描述                                                             |
|---------------------|------|----------------------------------------------------------------|
| value           | 空    | 参照`java.text.SimpleDateFormat`书写即可                             |
| use1904windowing           | 自动选择 | excel中时间是存储1900年起的一个双精度浮点数，但是有时候默认开始日期是1904，所以设置这个值改成默认1904年开始 |

### `NumberFormat`

数字转换，用`String`去接收excel数字格式的数据会调用这个注解。

| 名称                  | 默认值  | 描述                          |
|---------------------|------|-----------------------------|
| value           | 空    | 参照`java.text.DecimalFormat`书写即可 |
| roundingMode           | RoundingMode.HALF_UP | 格式化的时候设置舍入模式                    |

## 参数

### 概念介绍

* `WriteWorkbook` 可以理解成一个excel
* `WriteSheet` 理解成一个excel里面的一个表单
* `WriteTable` 一个表单里面如果有多个实际用的表格，则可以用`WriteTable`

### 通用参数

`WriteWorkbook`,`WriteSheet` ,`WriteTable`都会有的参数，如果为空，默认使用上级。

| 名称                  | 默认值   | 描述                                                                                                         |
|---------------------|-------|------------------------------------------------------------------------------------------------------------|
| converter           | 空     | 默认加载了很多转换器，这里可以加入不支持的字段                                                                                    |
| writeHandler           | 空     | 写的处理器。可以实现`WorkbookWriteHandler`,`SheetWriteHandler`,`RowWriteHandler`,`CellWriteHandler`，在写入excel的不同阶段会调用 |
| relativeHeadRowIndex           | 0     | 写入到excel和上面空开几行                                                                                            |
| head           | 空     | 与`clazz`二选一。读取文件头对应的列表，会根据列表匹配数据，建议使用class                                                                 |
| clazz           | 空     | 与`head`二选一。读取文件的头对应的class，也可以使用注解。如果两个都不指定，则会读取全部数据                                                        |
| autoTrim           | true  | 会对头、读取数据等进行自动trim                                                                                          |
| use1904windowing           | false | excel中时间是存储1900年起的一个双精度浮点数，但是有时候默认开始日期是1904，所以设置这个值改成默认1904年开始                                             |
| useScientificFormat           | false | 数字转文本的时候在较大的数值的是否是否采用科学计数法                                                                                 |
| needHead           | true  | 是否需要写入头到excel                                                                                              |
| useDefaultStyle           | true  | 是否使用默认的样式                                                                                                  |
| automaticMergeHead           | true  | 自动合并头，头中相同的字段上下左右都会去尝试匹配                                                                                   |
| excludeColumnIndexes           | 空     | 需要排除对象中的index的数据                                                                                           |
| excludeColumnFieldNames           | 空  | 需要排除对象中的字段的数据                                                                                              |
| includeColumnIndexes           | 空  | 只要导出对象中的index的数据                                                                                           |
| includeColumnFieldNames           | 空  | 只要导出对象中的字段的数据                                                                                              |

### WriteWorkbook

:::tip
设置方法如下，找不到参数的看下通用参数里面是否存在。

```java 
 EasyExcel.write(fileName, DemoData.class)
            // 在 write 方法之后， 在 sheet方法之前都是设置WriteWorkbook的参数
            .sheet("模板")
            .doWrite(() -> {
                // 分页查询数据
                return data();
            });
```

:::

| 名称                  | 默认值                    | 描述                                       |
|---------------------|------------------------|------------------------------------------|
| excelType           | 空                      | 当前excel的类型,支持XLS、XLSX、CSV                |
| outputStream           | 空                      | 与`file`二选一。写入文件的流                        |
| file           | 空                      | 与`outputStream`二选一。写入的文件                 |
| templateInputStream           | 空                      | 模板的文件流                                   |
| templateFile           | 空                      | 模板文件                                     |
| charset           | Charset#defaultCharset | 只有csv文件有用，写入文件的时候使用的编码                   |
| autoCloseStream           | true                   | 自动关闭写入的流。                                |
| password           | 空                      | 读取文件的密码                                  |
| inMemory           | false                  | 是否在内存处理，默认会生成临时文件以节约内存。内存模式效率会更好，但是容易OOM |
| writeExcelOnException           | false                  | 写入过程中抛出异常了，是否尝试把数据写入到excel               |

### WriteSheet

:::tip
设置方法如下，找不到参数的看下通用参数里面是否存在。

```java 
 EasyExcel.write(fileName, DemoData.class)
            .sheet("模板")
             // 在 sheet 方法之后， 在 doWrite方法之前都是设置WriteSheet的参数
            .doWrite(() -> {
                // 分页查询数据
                return data();
            });
```

:::

| 名称 | 默认值 | 描述 |
|---------------------|-----|---------------------------------|
| sheetNo | 0 | 需要写入的编码 |
| sheetName | 空 | 需要些的Sheet名称，默认同`sheetNo`                |

### WriteTable

:::tip
设置方法如下，找不到参数的看下通用参数里面是否存在。

```java 
        EasyExcel.write(fileName, DemoData.class)
            .sheet("模板")
            .table()
            // 在 table 方法之后， 在 doWrite方法之前都是设置WriteTable的参数
            .doWrite(() -> {
                // 分页查询数据
                return data();
            });
```

:::

| 名称                  | 默认值 | 描述                              |
|---------------------|-----|---------------------------------|
| tableNo           | 0   | 需要写入的编码            |
