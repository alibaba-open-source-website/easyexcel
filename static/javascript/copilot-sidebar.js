document.addEventListener('DOMContentLoaded', function() {
  const copilotJSScript = document.createElement('script');
  copilotJSScript.type = 'text/javascript';
  copilotJSScript.src = '//g.alicdn.com/cm-design/copilot-booter/0.0.23/copilot-booter.js';
  copilotJSScript.addEventListener('load', function (){
      if(window.CNPilot){
          window.CNPilot.mounted({
            CNPilot_OPEN_SOURCE: ['answer.opensource.alibaba.com','localhost:3000','pre-ali-open-source.alibaba-inc.com','ali-open-source.alibaba-inc.com','opensource.alibaba.com','localhost:3333'], // 需要展示的开源网站
            CNPilot_OPEN_SOURCE_API: 'https://ai.nacos.io', // 需要使用的后端地址
            CNPilot_OPEN_SOURCE_PRODUCT_NAME: "opensource",
            //CNPilot_OPEN_SOURCE_API: 'http://localhost:9000',
            showFloatICON: true,                                 // 展示 icon 浮窗
            globalStyle:{                                         // 弹窗外层样式（react style 写法）
              top:'0px',               // 默认置于浏览器顶部
              height:'100vh',          // 高度设置为浏览器可视最大高度
              //zIndex:'999999'       // 若被页面其他元素遮挡、可适当调整 zindex 值，值越大，显示层级越高
            },
            entryIconProps:{                                      // 入口 ICON 配置
              'position-type':'updown',
              'icon-hover-text':'专家答疑',
              'icon-style': {
              color:'red', // 配置文字颜色
              background:'white', // 配置背景色
              border:'2px solid red', // 配置边框
              borderRadius:'20px', // 配置圆角
              // ...其他 css
              }

            },
            headerProps:{
              // titleIcon: 'https://xxxxxx.jpeg',                // 自定义 header icon 图片
              titleText: "无疑 AI答疑专家",                       // 自定义 header 文字
              closeIcon: { show: true },                          // 展示 header 部分右边关闭按钮
            }
          });
      };
  });
  document.body.append(copilotJSScript);
});