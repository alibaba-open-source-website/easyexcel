---
title: 必读
sidebar_position: 1
---

## 基础功能

### 💥💥💥重要

发现很多同学不懂怎么看异常，java 看异常不是看最上面的，是要看最后一个 `Caused by: ` 后面的异常，这个是根本原因。所以提问或者咨询需要提供全部异常。

### 不支持功能

* 单个文件的并发写入、读取
* 读取图片
* 宏

### pom导入

复制以下代码，并替换成最新版本，或者直接打开：[![Maven central](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel)
，右边可以直接复制   
如果看不到图片则直接打开：[https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel)

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>最新版本</version>
</dependency>
```

### 查看最新版本

图片的绿色小字就是最新版本：
[![Maven central](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.alibaba/easyexcel)   
如果看不到图片则直接打开：[https://mvnrepository.com/artifact/com.alibaba/easyexcel](https://mvnrepository.com/artifact/com.alibaba/easyexcel)

### 写excel的情况下填充和写怎么选择？

填充其实也不会占用大量内存，用的也是文件缓存，最后统一书写，如果导出的内容各种格式复杂，建议直接用模板然后填充（填充的数据会自动有格式）。如果格式相对简单，建议直接用写，相对来说，直接导出性能还是高一丢丢。

### 关于`@Getter`、`@Setter`、`@EqualsAndHashCode`

读写的对象都用到了[Lombok](https://www.projectlombok.org/),他会自动生成`get`,`set` ，如果不需要的话，自己创建对象并生成`get`,`set` 。

### 只要部分字段去匹配excel(excel写入内容匹配不上等)

`easyexcel`默认是全部实体字段都会参与读写，不管你是否加了`@ExcelProperty`注解

* 如果您的版本低于2.1.6,建升级到以上版本
* 升级了还有，在类的最上面加入`@ExcelIgnoreUnannotated`注解，加入这个注解后只有加了`@ExcelProperty`才会参与读写。

### `csv`读写的支持

在`3.0.0-beta1`版本开始支持，读的时候会自动判断。写的时候指定`excelType`就行。

```java 
   EasyExcel.write(fileName, DemoData.class)
            // 指定导出类型为csv
            .excelType(ExcelTypeEnum.CSV)
            .sheet("模板")
            .doWrite(() -> {
                // 分页查询数据
                return data();
            });
```

## 兼容性问题

### 读取文件务必使用2.0.5+

2.0.0-beta1到2.0.2有小概率会丢失数字。

### beta版本使用注意

用beta版本的同学注意，建议一个月以后看看有没有正式版(一般一个月内肯定会升级正式版)
，有的话改成正式版，因为beta版，容易如有bug,然后也别跳级升级比如你用的是2.1.0-beat1,建议一个月后升级到2.1.x，第一第二位不变，第三位用最新的就可以。

### 关于版本选择

:::tip
如果项目中没有使用过poi,且jdk版本在8-21之间，直接使用最新版本，别犹豫。
:::
如果项目中已经使用过poi或者jdk版本小于8的，请参看下面表格做出选择。

| 版本                  | poi依赖版本 (支持范围)        | jdk版本支持范围    | 备注                                         |
|---------------------|-----------------------|--------------|--------------------------------------------|
| 4.0.0+              | 5.2.5 (5.0.0 - 5.2.5) | jkd8 - jdk21 | 推荐使用，会更新的版本                                |
| 3.1.0 - 3.3.4       | 4.1.2 (4.1.2 - 5.2.5) | jkd8 - jdk21 | 不推荐项目新引入此版本，除非超级严重bug,否则不再更新                                      |
| 3.0.0-beta1 - 3.0.5 | 4.1.2 (4.1.2 - 5.2.5) | jkd8 - jdk11 | 不推荐项目新引入此版本，除非超级严重bug,否则不再更新               |
| 2.0.0-beta1-2.2.11  | 3.17 (3.17 - 4.1.2)   | jdk6 - jdk11 | 不推荐项目新引入此版本，除非是jdk6否则不推荐使用，除非超级严重bug,否则不再更新 |
| 1+版本                | 3.17 (3.17 - 4.1.2)   | jdk6 - jdk11 | 不推荐项目新引入此版本，超级严重bug,也不再更新                  |

:::important
3+版本的的easyexcel，使用poi 5+版本时，需要自己引入poi 5+版本的包，且手动排除：poi-ooxml-schemas，例如：

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.3.4</version>
    <exclusions>
        <exclusion>
            <artifactId>poi-ooxml-schemas</artifactId>
            <groupId>org.apache.poi</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

:::

### 出现 `NoSuchMethodException`， `ClassNotFoundException`, `NoClassDefFoundError` 等兼容性问题

极大概率是jar冲突，可能是以下原因。

* 直接`clean`项目后查看是否可行
* `poi`版本冲突（项目中已经含有poi的其他版本了），参照:[关于版本选择](#关于版本选择)来指定版本。
* `ehcache`
  版本冲突，打开[https://mvnrepository.com/artifact/com.alibaba/easyexcel](https://mvnrepository.com/artifact/com.alibaba/easyexcel)
  ，打开对应的版本，看下所需要的`ehcache`版本

### 关于版本升级

* 不建议跨大版本升级 尤其跨2个大版本
* 大版本升级后建议相关内容重新测试下
* 2+ 升级到 3+ ，下面3个地方不兼容:
* 使用了自定义拦截器去修改样式的会出问题（不会编译报错）

```java
// 以前的写法
@Override
protected void setHeadCellStyle(Cell cell, Head head, Integer relativeRowIndex) {
            cell.setCellStyle(style);
 }

// 现在的写法1
// 这个写完也需要测试下 还是老代码 不管使用了什么拦截器 都可以这么写 
// 这个会导致格式化数据失效
    protected void setHeadCellStyle(CellWriteHandlerContext context) {
            cell.setCellStyle(style);

         // 这里要把 WriteCellData的样式清空， 不然后面还有一个拦截器 FillStyleCellWriteHandler 默认会将 WriteCellStyle 设置到
         // cell里面去 会导致自己设置的不一样
         context.getFirstCellData().setWriteCellStyle(null);
    }


// 现在的写法2 推荐
// 这个方案靠谱 以前用 poi的CellStyle  现在用 WriteCellStyle 入参基本都一致
    protected void setHeadCellStyle(CellWriteHandlerContext context) {
                     // 第一个单元格
                        // 只要不是头 一定会有数据 当然fill的情况 可能要context.getCellDataList() ,这个需要看模板，因为一个单元格会有多个 WriteCellData
                        WriteCellData<?> cellData = context.getFirstCellData();
                        // 这里需要去cellData 获取样式
                        // 很重要的一个原因是 WriteCellStyle 和 dataFormatData绑定的 简单的说 比如你加了 DateTimeFormat
                        // ，已经将writeCellStyle里面的dataFormatData 改了 如果你自己new了一个WriteCellStyle，可能注解的样式就失效了
                        // 然后 getOrCreateStyle 用于返回一个样式，如果为空，则创建一个后返回
                        WriteCellStyle writeCellStyle = cellData.getOrCreateStyle();
                        writeCellStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
                        // 这里需要指定 FillPatternType 为FillPatternType.SOLID_FOREGROUND
                        writeCellStyle.setFillPatternType(FillPatternType.SOLID_FOREGROUND);
    }
```

* 读的时候`invoke`里面抛出异常，不会再额外封装一层`ExcelAnalysisException` （不会编译报错）
    * 这个捕获异常的时候 不用再`getCause`了
* 样式等注解涉及到 `boolean` or 一些枚举 值的 有变动，新增默认值（会编译报错，注解改就行）
    * 这个直接改了就行

### 我在本地可以，发布到线上环境怎么不可以了？

大概率是缺少字体库导致，2个方案：

* 安装字体（推荐）
    * 看下服务器是否安装了字体，jdk8字体需要自己安装请安装字体：dejavu-sans-fonts 和 fontconfig 在dockerfile中增加字体安装命令：
      ```RUN yum install dejavu-sans-fonts fontconfig -y```
    * 普通的线上环境直接运行： ```yum install dejavu-sans-fonts fontconfig -y```
* 开启内存处理模式（不推荐，1W数据以内可以考虑，大了很容易OOM）

```java 
        EasyExcel
        .write(fileName, DemoData.class)
        // 核心这个配置 开始内存处理模式
        .inMemory(Boolean.TRUE)
        .sheet("模板")
        .doWrite(data());
```

## 高频问题

### 我的部分字段为什么没法读取或者写入？

* 读写反射对象用到了`Cglib`,所以成员变量必须符合驼峰规范，请确认是否符合驼峰规范
    * 在`3.0.0-beta1` 兼容了部分非驼峰，但是还是不建议使用非驼峰字段
* 使用了`lombok`的`@Accessors(chain = true)` ，无法被`Cglib`读取
    * 建议使用`@Builder`来替换`@Accessors(chain = true)`

### 出现 `NoSuchMethodException` ， `ClassNotFoundException`, `NoClassDefFoundError`等异常

一般是版本兼容出问题了，参照:[关于版本选择](#关于版本选择)

### `NullPointerException at sun.awt.FontConfiguration.getVersion` ，`Could not initialize class sun.awt.X11FontManage`

这个一般是缺少字体导致,请参照：[我在本地可以，发布到线上环境怎么不可以了？](/qa/#%E6%88%91%E5%9C%A8%E6%9C%AC%E5%9C%B0%E5%8F%AF%E4%BB%A5%E5%8F%91%E5%B8%83%E5%88%B0%E7%BA%BF%E4%B8%8A%E7%8E%AF%E5%A2%83%E6%80%8E%E4%B9%88%E4%B8%8D%E5%8F%AF%E4%BB%A5%E4%BA%86)