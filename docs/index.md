---
title: 文档
sidebar_position: 1
---

# EasyExcel
EasyExcel是一个基于Java的简单、省内存的读写Excel的开源项目。在尽可能节约内存的情况下支持读写百M的Excel。
github地址:[https://github.com/alibaba/easyexcel](https://github.com/alibaba/easyexcel)
开源项目不容易，如果觉得本项目对您的工作还是有帮助的话，请在帮忙在<a target="_blank" href='https://github.com/alibaba/easyexcel'><img src="https://img.shields.io/github/stars/alibaba/easyexcel.svg?style=flat-square&label=Stars&logo=github" alt="github star"/></a>点个★Star。

## 常见问题
[常见问题](/qa)

### 联系方式
[QQ群: 662022184](//shang.qq.com/wpa/qunwpa?idkey=53d9d821b0833e3c14670f007488a61e300f00ff4f1b81fd950590d90dd80f80)
[钉钉群: 21960511](https://qr.dingtalk.com/action/joingroup?code=v1,k1,cchz6k12ci9B08NNqhNRFGXocNVHrZtW0kaOtTKg/Rk=&_dt_no_comment=1&origin=11)
#### 因为公司不方便用QQ，所以建议加钉钉群

### 64M内存1分钟内读取75M(46W行25列)的Excel
当然还有急速模式能更快，但是内存占用会在100M多一点
![img](/img/2.x/large.png)

### 快速开始
#### 读Excel
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/read/ReadTest.java](https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/read/ReadTest.java)

```java
    /**
     * 最简单的读
     * <p>1. 创建excel对应的实体对象 参照{@link DemoData}
     * <p>2. 由于默认一行行的读取excel，所以需要创建excel一行一行的回调监听器，参照{@link DemoDataListener}
     * <p>3. 直接读即可
     */
    @Test
    public void simpleRead() {
        String fileName = TestFileUtil.getPath() + "demo" + File.separator + "demo.xlsx";
        // 这里 需要指定读用哪个class去读，然后读取第一个sheet 文件流会自动关闭
        EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).sheet().doRead();
    }
```

#### 写Excel
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/write/WriteTest.java](https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/write/WriteTest.java)
```java
    /**
     * 最简单的写
     * <p>1. 创建excel对应的实体对象 参照{@link com.alibaba.easyexcel.test.demo.write.DemoData}
     * <p>2. 直接写即可
     */
    @Test
    public void simpleWrite() {
        String fileName = TestFileUtil.getPath() + "write" + System.currentTimeMillis() + ".xlsx";
        // 这里 需要指定写用哪个class去读，然后写到第一个sheet，名字为模板 然后文件流会自动关闭
        // 如果这里想使用03 则 传入excelType参数即可
        EasyExcel.write(fileName, DemoData.class).sheet("模板").doWrite(data());
    }
```

#### web上传、下载
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/web/WebTest.java](https://github.com/alibaba/easyexcel/blob/v2.2.11/src/test/java/com/alibaba/easyexcel/test/demo/web/WebTest.java)
```java
 /**
     * 文件下载（失败了会返回一个有部分数据的Excel）
     * <p>1. 创建excel对应的实体对象 参照{@link DownloadData}
     * <p>2. 设置返回的 参数
     * <p>3. 直接写，这里注意，finish的时候会自动关闭OutputStream,当然你外面再关闭流问题不大
     */
    @GetMapping("download")
    public void download(HttpServletResponse response) throws IOException {
        // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
        response.setContentType("application/vnd.ms-excel");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = URLEncoder.encode("测试", "UTF-8");
        response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
        EasyExcel.write(response.getOutputStream(), DownloadData.class).sheet("模板").doWrite(data());
    }

    /**
     * 文件上传
     * <p>1. 创建excel对应的实体对象 参照{@link UploadData}
     * <p>2. 由于默认一行行的读取excel，所以需要创建excel一行一行的回调监听器，参照{@link UploadDataListener}
     * <p>3. 直接读即可
     */
    @PostMapping("upload")
    @ResponseBody
    public String upload(MultipartFile file) throws IOException {
        EasyExcel.read(file.getInputStream(), UploadData.class, new UploadDataListener(uploadDAO)).sheet().doRead();
        return "success";
    }
```
