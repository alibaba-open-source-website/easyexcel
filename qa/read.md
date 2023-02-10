---
title: 读Excel
sidebar_position: 2
---

## 常见问题

### 在读的时候`Listener`里面需要使用spring的`@Autowired`

* 方案1：避开创建`Listener`的类

```java
        EasyExcel.read(fileName, DemoData.class, new PageReadListener<DemoData>(dataList -> {
            for (DemoData demoData : dataList) {
                log.info("读取到一条数据{}", JSON.toJSONString(demoData));
            }
        })).sheet().doRead();
```

* 方案2
    * 给`Listener`创建成员变量，然后在构造方法里面传进去。必须不让spring管理`Listener`，每次读取都要`new`一个。

### 为什么`Listener` 不能让`spring`管理？

* 在读取excel的时候，会回调`com.alibaba.excel.read.listener.ReadListener#invoke`的方法，而`spring`如果管理`Listener`会导致`Listener`
  变成了单例，在有并发读取文件的情况下都会回调同一个`Listener`，就无法区分是哪个文件读取出来的了。

### 如何获取所有sheet的列表或者名字

目前有2种方案去读取

#### 用监听器去读取

如果没有特殊需求，建议在监听器里面可以获取到当前sheet的名字，
读取所有sheet:

```java 
        EasyExcel.read(file, MultipleSheetsData.class, new MultipleSheetsListener()).doReadAll();
```

然后每个单元格回到能拿到当前的sheet:

```java 
    @Override
	//每一行读取完毕会调用
    public void invoke(MultipleSheetsData data, AnalysisContext context) {
       // 当前sheet的名称 编码获取类似
        context.readSheetHolder().getSheetName();
   }

    @Override
    //每个sheet读取完毕会调用
    public void doAfterAllAnalysed(AnalysisContext context) {
         // 当前sheet的名称 编码获取类似
        context.readSheetHolder().getSheetName();
    }
```

#### 直接读取到列表

如果一定要在读取前获取所有sheet的列表，xls这里注意性能和上一种方法会差一些。但是相差也不是特别大。

```java 
        ExcelReader excelReader = EasyExcel.read(file, MultipleSheetsData.class, multipleSheetsListener).build();
		//所有列表        
        List<ReadSheet> sheets = excelReader.excelExecutor().sheetList();
        for (ReadSheet readSheet : sheets) {
            // 一个个开始读取里面的数据
            excelReader.read(readSheet);
        }
        excelReader.finish();
```

### 如何获取excel的总条数

目前只能获取大概的条数（每个excel都会记录一个总条数，但是这个总条数由于各种空行等原因，不一定正确），无法精确获取，要精确获取的自己在监听器里面一条条统计。   
在监听器里面，

```java 
analysisContext.readSheetHolder().getApproximateTotalRowNumber();
```

### 修改csv文件读取的配置

这里面举例修改 csv的分隔符为 ';' 的情况

```java
        // 修改读取csv文件的配置
        String fileName = TestFileUtil.getPath() + "demo" + File.separator + "demo.csv";
        // 一个文件一个reader
        try (ExcelReader excelReader = EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).build()) {
            // ReadWorkbookHolder 存储了Workbook 的所有信息
            ReadWorkbookHolder readWorkbookHolder = excelReader.analysisContext().readWorkbookHolder();
            // 判断只有csv 才需要修改配置信息
            if (readWorkbookHolder instanceof CsvReadWorkbookHolder) {
                CsvReadWorkbookHolder csvReadWorkbookHolder = (CsvReadWorkbookHolder)readWorkbookHolder;
                // 底层读取csv 用的是apache的common-csv 所以设置 CsvFormat即可
                ucsvReadWorkbookHolder.setCsvFormat(csvReadWorkbookHolder.getCsvFormat().withDelimiter(';'));
            }

            // 构建一个sheet 这里可以指定名字或者no
            ReadSheet readSheet = EasyExcel.readSheet(0).build();
            // 读取一个sheet
            excelReader.read(readSheet);
        }
```

## 10M+文件读取说明(如果感觉目前效率还行后面的都不需要看)

03版没有办法处理，相对内存占用大很多。   
07版本有个共享字符串[共享字符串](https://docs.microsoft.com/zh-cn/office/open-xml/working-with-the-shared-string-table)
的概念，这个会非常占用内存，如果全部读取到内存的话，大概是excel文件的大小的3-10倍，所以easyexcel用存储文件的，然后再反序列化去读取的策略来节约内存。当然需要通过文件反序列化以后，效率会降低，大概降低30-50%（不一定，也看命中率，可能会超过100%）   
如果对读取效率感觉还能接受，就用默认的，永久占用（单个excel读取整个过程）一般不会超过50M(大概率就30M)，剩下临时的GC会很快回收

### 现在`easyexcel`默认大文件处理方案

默认大文件处理会自动判断，共享字符串5M以下会使用内存存储，大概占用15-50M的内存,超过5M则使用文件存储，然后大概会存储10批，每批100条，共20000条的临时数据在内存。除了共享字符串占用内存外，其他占用较少，所以可以预估2M，所以默认大概20M就能读取一个超级大的文件。


### 开启急速模式

急速模式可以自己开启后测试下内存的占用，如果感觉符合预期可以直接开启。   
如果最大文件条数也就十几二十万，然后excel也就是十几二十M，而且不会有很高的并发，并且内存也较大。这种情况下可以考虑开启极速模式。

```java
 // 强制使用内存存储，这样大概一个20M的excel使用150M（很多临时对象，所以100M会一直GC）的内存
// 这样效率会比上面的复杂的策略高很
   // 这里再说明下 就是加了个readCache(new MapCache()) 参数而已，其他的参照其他demo写 这里没有写全 
  EasyExcel.read().readCache(new MapCache());
```

### 对并发要求较高，而且都是经常有超级大文件

```java
 // 第一个参数的意思是 多少M共享字符串以后 采用文件存储 单位MB 默认5M
// 第二个参数 放多少批数据在内存，默认20批
SimpleReadCacheSelector simpleReadCacheSelector=new SimpleReadCacheSelector();
simpleReadCacheSelector.setMaxUseMapCacheSize(5L);
simpleReadCacheSelector.setMaxCacheActivateBatchCount(20);
EasyExcel.read().readCacheSelector(simpleReadCacheSelector);
```

* maxCacheActivateBatchCount 也就是前面第二个参数的详细说明      
  easyexcel在使用文件存储的时候，会把共享字符串拆分成100条一批，然后放到文件存储。然后excel来读取共享字符串大概率是按照顺序的，所以默认20批的100条的数据放在内存，命中后直接返回，没命中去读文件。所以不能设置太小，太小了，很难命中，一直去读取文件，太大了的话会占用过多的内存。
* 如何判断 maxCacheActivateSize是否需要调整   
  开启debug日志会输出`Already put :4000000` 最后一次输出，大概可以得出值为400W,然后看`Cache misses count:4001`得到值为4K，400W/4K=1000
  这代表已经`maxCacheActivateBatchCount` 已经非常合理了。如果小于500 问题就非常大了，500到1000 应该都还行。
