---
title: 读Excel | API
sidebar_position: 1
---

## 注解

使用注解很简单，只要在对应的实体类上面加上注解即可。

### `ExcelProperty`

用于匹配excel和实体类的匹配,参数如下：

| 名称                  | 默认值               | 描述                                                                                                                                                  |
|---------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| value           | 空                 | 用于匹配excel中的头，必须全匹配,如果有多行头，会匹配最后一行头                                                                                                                  |
| order           | Integer.MAX_VALUE | 优先级高于`value`，会根据`order`的顺序来匹配实体和excel中数据的顺序                                                                                                         |
| index           | &#45;1            | 优先级高于`value`和`order`，会根据`index`直接指定到excel中具体的哪一列                                                                                                    |
| converter           | 自动选择              | 指定当前字段用什么转换器，默认会自动选择。读的情况下只要实现`com.alibaba.excel.converters.Converter#convertToJavaData(com.alibaba.excel.converters.ReadConverterContext<?>)` 方法即可 |

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

* `ReadWorkbook` 可以理解成一个excel
* `ReadSheet` 理解成一个excel里面的一个表单

### 通用参数

`ReadWorkbook`,`ReadSheet` 都会有的参数，如果为空，默认使用上级。

| 名称                  | 默认值   | 描述                                                       |
|---------------------|-------|----------------------------------------------------------|
| converter           | 空     | 默认加载了很多转换器，这里可以加入不支持的字段                                  |
| readListener           | 空     | 可以注册多个监听器，读取excel的时候会不断的回调监听器中的方法                        |
| headRowNumber           | 1     | excel中头的行数，默认1行                                          |
| head           | 空     | 与`clazz`二选一。读取文件头对应的列表，会根据列表匹配数据，建议使用class               |
| clazz           | 空     | 与`head`二选一。读取文件的头对应的class，也可以使用注解。如果两个都不指定，则会读取全部数据      |
| autoTrim           | true  | 会对头、读取数据等进行自动trim                                        |
| use1904windowing           | false | excel中时间是存储1900年起的一个双精度浮点数，但是有时候默认开始日期是1904，所以设置这个值改成默认1904年开始 |
| useScientificFormat           | false | 数字转文本的时候在较大的数值的是否是否采用科学计数法                               |

### ReadWorkbook

:::tip

设置方法如下，找不到参数的看下通用参数里面是否存在。

```java 
 EasyExcel.read(fileName, DemoData.class, new DemoDataListener())
 // 在 read 方法之后， 在 sheet方法之前都是设置ReadWorkbook的参数
 .sheet()
 .doRead();
```

:::

| 名称                  | 默认值                                                     | 描述                                                                                                                                                                                                                                          |
|---------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| excelType           | 空                                                       | 当前excel的类型,支持XLS、XLSX、CSV                                                                                                                                                                                                                   |
| inputStream           | 空                                                       | 与`file`二选一。读取文件的流，如果接收到的是流就只用，不用流建议使用`file`参数。因为使用了`inputStream` easyexcel会帮忙创建临时文件，最终还是`file`                                                                                                                                              |
| file           | 空                                                       | 与`inputStream`二选一。读取文件的文件。                                                                                                                                                                                                                  |
| mandatoryUseInputStream           | false                                                   | 强制使用  `inputStream` 来创建对象，性能会变差，但是不会创建临文件。                                                                                                                                                                                                  |
| charset           | Charset#defaultCharset                 | 只有csv文件有用，读取文件的时候使用的编码                                                                                                                                                                                                                      |
| autoCloseStream           | true                                                    | 自动关闭读取的流。                                                                                                                                                                                                                                   |
| readCache           | 空                                                       | 默认小于5M用 内存，超过5M会使用 `EhCache`,这里不建议使用这个参数。                                                                                                                                                                                                   |
| readCacheSelector           | SimpleReadCacheSelector | 用于选择什么时候用内存去存储临时数据，什么时候用磁盘存储临时数据                                                                                                                                                                                                            |
| ignoreEmptyRow           | true                                                    | 忽略空的行                                                                                                                                                                                                                                       |
| password           | 空                                                       | 读取文件的密码                                                                                                                                                                                                                                     |
| xlsxSAXParserFactoryName           | 空                                                       | 指定sax读取使用的class的名称，例如：`com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl`                                                                                                                                                        |
| useDefaultListener           | true                                                    | `@since 2.1.4` 默认会加入`ModelBuildEventListener` 来帮忙转换成传入`class`的对象，设置成`false`后将不会协助转换对象，自定义的监听器会接收到`Map<Integer,CellData>`对象，如果还想继续接听到`class`对象，请调用`readListener`方法，加入自定义的`beforeListener`、 `ModelBuildEventListener`、 自定义的`afterListener`即可。 |
| extraReadSet           | 空                                                       | 额外需要读取内容的set，默认不读取这些数据                                                                                                                                                                                                                      |

### ReadSheet

:::tip
设置方法如下，找不到参数的看下通用参数里面是否存在。

```java 
 EasyExcel.read(fileName, DemoData.class, new DemoDataListener())
 .sheet()
  // 在 sheet 方法之后， 在 doRead方法之前都是设置ReadSheet的参数
 .doRead();
```

:::

| 名称                  | 默认值 | 描述                                  |
|---------------------|-----|-------------------------------------|
| sheetNo           | 0   | 需要读取Sheet的编码，建议使用这个来指定读取哪个Sheet            |
| sheetName           | 空   | 根据名字去匹配Sheet                     |