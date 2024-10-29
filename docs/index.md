---
title: 关于Easyexcel
sidebar_position: 1
description: EasyExcel是一个基于Java的简单、省内存的读写Excel的开源项目，在尽可能节约内存的情况下支持读写百M的Excel。
---

# 维护公告
尊敬的EasyExcel用户们：

首先，我们想表达最深的谢意，感谢您长期以来对EasyExcel的信任与支持。在这段旅程中，EasyExcel有幸陪伴众多开发者和企业共同成长，见证了无数数据处理任务的高效完成。

近期，我们注意到市场上出现了更多优秀的数据处理工具和解决方案，为用户提供了更丰富的选择。为了确保每位用户都能享受到最佳的体验和服务，我们决定采取一项重要措施：EasyExcel将逐步进入维护模式，并给予用户充足的时间评估并迁移到其他产品。同时，我们也欢迎并乐于见到社区内外分享关于同类优秀产品的使用心得和迁移经验，共同促进技术生态的健康发展。

请放心，即使进入维护模式，我们仍会确保EasyExcel的基本功能稳定运行，会进行Bug修复，但不再主动新增功能。我们相信，通过大家的共同努力，每一段代码、每一个项目都将继续在各自的领域发光发热，服务于更广泛的用户群体。
再次感谢您对EasyExcel的支持与理解！期待在技术的广阔天地里，我们能以新的形式再度携手，共创辉煌。

祝您在未来的工作与学习中一切顺利！

阿里巴巴EasyExcel团队敬上

# 新手必读

* 官方网站：[https://easyexcel.opensource.alibaba.com/](https://easyexcel.opensource.alibaba.com/)
* github地址：[https://github.com/alibaba/easyexcel](https://github.com/alibaba/easyexcel)
* gitee地址：[https://gitee.com/easyexcel/easyexcel](https://gitee.com/easyexcel/easyexcel)
* 
# EasyExcel
Java解析、生成Excel比较有名的框架有Apache poi、jxl。但他们都存在一个严重的问题就是非常的耗内存，poi有一套SAX模式的API可以一定程度的解决一些内存溢出的问题，但POI还是有一些缺陷，比如07版Excel解压缩以及解压后存储都是在内存中完成的，内存消耗依然很大。  
easyexcel重写了poi对07版Excel的解析，一个3M的excel用POI sax解析依然需要100M左右内存，改用easyexcel可以降低到几M，并且再大的excel也不会出现内存溢出；03版依赖POI的sax模式，在上层做了模型转换的封装，让使用者更加简单方便


# 网站
*  官方网站：[https://easyexcel.opensource.alibaba.com/](https://easyexcel.opensource.alibaba.com/)
* github地址：[https://github.com/alibaba/easyexcel](https://github.com/alibaba/easyexcel)
* gitee地址：[https://gitee.com/easyexcel/easyexcel](https://gitee.com/easyexcel/easyexcel)

# 16M内存23秒读取75M(46W行25列)的Excel（3.2.1+版本）

当然还有[极速模式](/qa/read#%E5%BC%80%E5%90%AF%E6%80%A5%E9%80%9F%E6%A8%A1%E5%BC%8F)能更快，但是内存占用会在100M多一点
![img](./img/large.png)

# 帮忙点个⭐Star

开源不易，如果觉得EasyExcel对您的工作还是有帮助的话，请帮忙在<a target="_blank" href='https://github.com/alibaba/easyexcel'><img src="https://img.shields.io/github/stars/alibaba/easyexcel.svg?style=flat-square&label=Stars&logo=github" alt="github star"/></a>
的右上角点个⭐Star，您的支持是使EasyExcel变得更好最大的动力。

### 如何获取帮助
[如何获取帮助](/community/support)

## 维护者
姬朋飞（玉霄)、庄家钜
## 快速开始
### 读Excel
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/read/ReadTest.java](https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/read/ReadTest.java)

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

### 写Excel
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/write/WriteTest.java](https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/write/WriteTest.java)
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

### web上传、下载
DEMO代码地址：[https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/web/WebTest.java](https://github.com/alibaba/easyexcel/blob/master/easyexcel-test/src/test/java/com/alibaba/easyexcel/test/demo/web/WebTest.java)
```java
   /**
     * 文件下载（失败了会返回一个有部分数据的Excel）
     * <p>
     * 1. 创建excel对应的实体对象 参照{@link DownloadData}
     * <p>
     * 2. 设置返回的 参数
     * <p>
     * 3. 直接写，这里注意，finish的时候会自动关闭OutputStream,当然你外面再关闭流问题不大
     */
    @GetMapping("download")
    public void download(HttpServletResponse response) throws IOException {
        // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
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
