---
title: fill Excel
sidebar_position: 3
---

## 示例代码

DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/master/src/test/java/com/alibaba/easyexcel/test/demo/fill/FillTest.java](https://github.com/alibaba/easyexcel/blob/master/src/test/java/com/alibaba/easyexcel/test/demo/fill/FillTest.java)
## 最简单的填充
##### since
2.1.1
##### 模板
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454713527-4a4500f8-a7ed-46e9-9d68-e282a0221b32.png#height=81&id=FGpZP&originHeight=81&originWidth=575&originalType=binary&ratio=1&size=0&status=done&style=none&width=575)
##### 最终效果
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454912576-3372f8c5-4e94-4960-9910-1c05802d6f26.png#height=88&id=o9I6O&originHeight=88&originWidth=490&originalType=binary&ratio=1&size=0&status=done&style=none&width=490)
##### 对象
```java
@Getter
@Setter
@EqualsAndHashCode
public class FillData {
    private String name;
    private double number;
    private Date date;
}
```

##### 代码
```java
    /**
     * 最简单的填充
     *
     * @since 2.1.1
     */
    @Test
    public void simpleFill() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "simple.xlsx";

        // 方案1 根据对象填充
        String fileName = TestFileUtil.getPath() + "simpleFill" + System.currentTimeMillis() + ".xlsx";
        // 这里 会填充到第一个sheet， 然后文件流会自动关闭
        FillData fillData = new FillData();
        fillData.setName("张三");
        fillData.setNumber(5.2);
        EasyExcel.write(fileName).withTemplate(templateFileName).sheet().doFill(fillData);

        // 方案2 根据Map填充
        fileName = TestFileUtil.getPath() + "simpleFill" + System.currentTimeMillis() + ".xlsx";
        // 这里 会填充到第一个sheet， 然后文件流会自动关闭
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", "张三");
        map.put("number", 5.2);
        EasyExcel.write(fileName).withTemplate(templateFileName).sheet().doFill(map);
    }
```

## 填充列表
##### since
2.1.1
##### 模板
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454735500-872b7d15-a92c-443c-8423-995247257a0f.png#height=70&id=xIEF4&originHeight=70&originWidth=176&originalType=binary&ratio=1&size=0&status=done&style=none&width=176)
##### 最终效果
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454743450-7a4d104f-7fa3-4022-9567-1b1cfa3298ac.png#height=419&id=Kpu1W&originHeight=419&originWidth=202&originalType=binary&ratio=1&size=0&status=done&style=none&width=202)

##### 对象
参照：[对象](#06e004ef)
##### 代码
```java
    /**
     * 填充列表
     *
     * @since 2.1.1
     */
    @Test
    public void listFill() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 填充list 的时候还要注意 模板中{.} 多了个点 表示list
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "list.xlsx";

        // 方案1 一下子全部放到内存里面 并填充
        String fileName = TestFileUtil.getPath() + "listFill" + System.currentTimeMillis() + ".xlsx";
        // 这里 会填充到第一个sheet， 然后文件流会自动关闭
        EasyExcel.write(fileName).withTemplate(templateFileName).sheet().doFill(data());

        // 方案2 分多次 填充 会使用文件缓存（省内存） jdk8
        // since: 3.0.0-beta1
        fileName = TestFileUtil.getPath() + "listFill" + System.currentTimeMillis() + ".xlsx";
        EasyExcel.write(fileName)
            .withTemplate(templateFileName)
            .sheet()
            .doFill(() -> {
                // 分页查询数据
                return data();
            });

        // 方案3 分多次 填充 会使用文件缓存（省内存）
        fileName = TestFileUtil.getPath() + "listFill" + System.currentTimeMillis() + ".xlsx";
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        excelWriter.fill(data(), writeSheet);
        excelWriter.fill(data(), writeSheet);
        // 千万别忘记关闭流
        excelWriter.finish();
    }
```

## 复杂的填充
##### since
2.1.1
##### 模板
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454758427-4756aa7d-f6b2-4850-b93c-8ce57f333f9c.png#height=130&id=WySSI&originHeight=130&originWidth=413&originalType=binary&ratio=1&size=0&status=done&style=none&width=413)

##### 最终效果
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454765982-ded0adfd-fdfb-4c49-9ca8-754fe25364de.png#height=462&id=PQKMA&originHeight=462&originWidth=445&originalType=binary&ratio=1&size=0&status=done&style=none&width=445)
##### 对象
参照：[对象](#06e004ef)
##### 代码
```java
    /**
     * 复杂的填充
     *
     * @since 2.1.1
     */
    @Test
    public void complexFill() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // {} 代表普通变量 {.} 代表是list的变量
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "complex.xlsx";

        String fileName = TestFileUtil.getPath() + "complexFill" + System.currentTimeMillis() + ".xlsx";
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        // 这里注意 入参用了forceNewRow 代表在写入list的时候不管list下面有没有空行 都会创建一行，然后下面的数据往后移动。默认 是false，会直接使用下一行，如果没有则创建。
        // forceNewRow 如果设置了true,有个缺点 就是他会把所有的数据都放到内存了，所以慎用
        // 简单的说 如果你的模板有list,且list不是最后一行，下面还有数据需要填充 就必须设置 forceNewRow=true 但是这个就会把所有数据放到内存 会很耗内存
        // 如果数据量大 list不是最后一行 参照下一个
        FillConfig fillConfig = FillConfig.builder().forceNewRow(Boolean.TRUE).build();
        excelWriter.fill(data(), fillConfig, writeSheet);
        excelWriter.fill(data(), fillConfig, writeSheet);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("date", "2019年10月9日13:28:28");
        map.put("total", 1000);
        excelWriter.fill(map, writeSheet);
        excelWriter.finish();
    }
```

## 数据量大的复杂填充
##### since
2.1.1
##### 模板
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454784206-a32be200-7358-445e-9146-55a2b9563a44.png#height=111&id=O53p2&originHeight=111&originWidth=409&originalType=binary&ratio=1&size=0&status=done&style=none&width=409)
##### 最终效果
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454791956-8bba3c6a-1023-415a-94fa-7d62e4187975.png#height=483&id=uvtB0&originHeight=483&originWidth=430&originalType=binary&ratio=1&size=0&status=done&style=none&width=430)
##### 对象
参照：[对象](#06e004ef)
##### 代码
```java
    /**
     * 数据量大的复杂填充
     * <p>
     * 这里的解决方案是 确保模板list为最后一行，然后再拼接table.还有03版没救，只能刚正面加内存。
     *
     * @since 2.1.1
     */
    @Test
    public void complexFillWithTable() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // {} 代表普通变量 {.} 代表是list的变量
        // 这里模板 删除了list以后的数据，也就是统计的这一行
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "complexFillWithTable.xlsx";

        String fileName = TestFileUtil.getPath() + "complexFillWithTable" + System.currentTimeMillis() + ".xlsx";
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        // 直接写入数据
        excelWriter.fill(data(), writeSheet);
        excelWriter.fill(data(), writeSheet);

        // 写入list之前的数据
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("date", "2019年10月9日13:28:28");
        excelWriter.fill(map, writeSheet);

        // list 后面还有个统计 想办法手动写入
        // 这里偷懒直接用list 也可以用对象
        List<List<String>> totalListList = new ArrayList<List<String>>();
        List<String> totalList = new ArrayList<String>();
        totalListList.add(totalList);
        totalList.add(null);
        totalList.add(null);
        totalList.add(null);
        // 第四列
        totalList.add("统计:1000");
        // 这里是write 别和fill 搞错了
        excelWriter.write(totalListList, writeSheet);
        excelWriter.finish();
        // 总体上写法比较复杂 但是也没有想到好的版本 异步的去写入excel 不支持行的删除和移动，也不支持备注这种的写入，所以也排除了可以
        // 新建一个 然后一点点复制过来的方案，最后导致list需要新增行的时候，后面的列的数据没法后移，后续会继续想想解决方案
    }
```

## 横向的填充
##### since
2.1.1
##### 模板
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454803361-ccdd6a6f-b038-4301-8167-3d4f8a27e560.png#height=131&id=udUUz&originHeight=131&originWidth=357&originalType=binary&ratio=1&size=0&status=done&style=none&width=357)
##### 最终效果
![](https://cdn.nlark.com/yuque/0/2020/png/553000/1584454812137-121ad7f3-299c-42aa-9318-d1a9c75788ba.png#height=149&id=mEtb2&originHeight=149&originWidth=1744&originalType=binary&ratio=1&size=0&status=done&style=none&width=1744)

##### 对象
参照：[对象](#06e004ef)
##### 代码
```java
    /**
     * 横向的填充
     *
     * @since 2.1.1
     */
    @Test
    public void horizontalFill() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // {} 代表普通变量 {.} 代表是list的变量
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "horizontal.xlsx";

        String fileName = TestFileUtil.getPath() + "horizontalFill" + System.currentTimeMillis() + ".xlsx";
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        FillConfig fillConfig = FillConfig.builder().direction(WriteDirectionEnum.HORIZONTAL).build();
        excelWriter.fill(data(), fillConfig, writeSheet);
        excelWriter.fill(data(), fillConfig, writeSheet);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("date", "2019年10月9日13:28:28");
        excelWriter.fill(map, writeSheet);

        // 别忘记关闭流
        excelWriter.finish();
    }
```
## 多列表组合填充填充
##### since
2.2.0-beta1
##### 模板
![image.png](https://cdn.nlark.com/yuque/0/2020/png/553000/1584455041641-7213cce5-56dc-428e-8740-b633cf73e392.png#height=257&id=H77Vv&name=image.png&originHeight=257&originWidth=754&originalType=binary&ratio=1&size=15050&status=done&style=none&width=754)
##### 最终效果
![image.png](https://cdn.nlark.com/yuque/0/2020/png/553000/1584455141005-44d1fb5e-de44-4e3c-8b41-246ec4168ea3.png#height=588&id=lYri6&name=image.png&originHeight=588&originWidth=1130&originalType=binary&ratio=1&size=39686&status=done&style=none&width=1130)

##### 对象
参照：[对象](#06e004ef)
##### 代码
```java
   /**
     * 多列表组合填充填充
     *
     * @since 2.2.0-beta1
     */
    @Test
    public void compositeFill() {
        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // {} 代表普通变量 {.} 代表是list的变量 {前缀.} 前缀可以区分不同的list
        String templateFileName =
            TestFileUtil.getPath() + "demo" + File.separator + "fill" + File.separator + "composite.xlsx";

        String fileName = TestFileUtil.getPath() + "compositeFill" + System.currentTimeMillis() + ".xlsx";
        ExcelWriter excelWriter = EasyExcel.write(fileName).withTemplate(templateFileName).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        FillConfig fillConfig = FillConfig.builder().direction(WriteDirectionEnum.HORIZONTAL).build();
        // 如果有多个list 模板上必须有{前缀.} 这里的前缀就是 data1，然后多个list必须用 FillWrapper包裹
        excelWriter.fill(new FillWrapper("data1", data()), fillConfig, writeSheet);
        excelWriter.fill(new FillWrapper("data1", data()), fillConfig, writeSheet);
        excelWriter.fill(new FillWrapper("data2", data()), writeSheet);
        excelWriter.fill(new FillWrapper("data2", data()), writeSheet);
        excelWriter.fill(new FillWrapper("data3", data()), writeSheet);
        excelWriter.fill(new FillWrapper("data3", data()), writeSheet);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("date", "2019年10月9日13:28:28");
        excelWriter.fill(map, writeSheet);

        // 别忘记关闭流
        excelWriter.finish();
    }
```
