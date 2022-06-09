---
title: 写Excel
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

### 导出的excel打不开

大概率由以下2个原因导致：

* 前端用各种框架来导出，然后把文件流改了
* 后端各种拦截器，把文件流改了
  解决方案：
* 先测试把文件导出到本地，而不是通过浏览器
    * 这个核心定位是不是自己代码写错了，通过代表代码没问题
    * 不通过自己参照下最简单的写试试
* 再通过浏览器访问的方案去导出
    * 这个核心确认是否被后端的各种拦截器或者nginx把流给改坏了，通过代表后端+网络没问题
    * 不通过自己试下不用nginx等自己访问行不行，如果还不行那就是后端的各种拦截器导致
        * 这里注意下注解是`@Controller` ，不是`RestController`
        * 返回是void,然后后面不能再的修改流的信息
* 接下来就是甩锅给前端
    * 后端只要确保浏览器直接访问能下载就行，接下来前端各种框架处理的方案都不一样

### 导出的excel提示需要修复

一般情况是自己各种拦截器，比如改样式，合并单元格等把文件搞坏了。   
解决方案：   
参照下最简单的写，试试，写别搞那么复杂，可以了再慢慢的加拦截器，然后拦截器也慢慢的加各种花里胡哨的代码。

