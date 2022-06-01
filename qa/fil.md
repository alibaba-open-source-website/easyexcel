---
title: 填充
sidebar_position: 4
---

## 常见问题

## 模板中的字段未替换

使用EasyExcel生成的模板，去填充，结果填充字段未替换。   
这个问题原因比较复杂，感兴趣的同学可以了解下:ShardingStrings ,EasyExcel在写入的时候，为了省内存，而未使用ShardingStrings。

#### 解决方案：

在导出模板时，使用参数inMemory=true即可。

```java 
// 这里使用inMemory(true) 会触发 写入到ShardingStrings 但是这样所有的数据都会在内存 所以容易OOM
// 但是如果我们仅仅是需要导出模板，字段不是很多，所以问题不大。
// 这里注意 导出模板的加入这个参数 实际写数据千万别加，不然容易OOM
EasyExcel.write(fileName, DemoData.class).inMemory(true).sheet("模板").doWrite(fillData());
```