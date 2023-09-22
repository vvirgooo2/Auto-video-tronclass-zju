# Auto-video-tronclass-zju
### 自动刷课-学在浙大油猴脚本  
### 使用说明：
1. 请使用Edge浏览器，如果您有一定的前端知识并且可以在chrome中调试运行
2. 在Edge浏览器->设置中，搜索 “媒体自动播放”，并修改为允许
![Alt text](图片链接 "optional title")

4. 在Edge浏览器->扩展程序中，获取tampermonkey插件并启用  
5. 油猴->添加新脚本，将js文件复制进新脚本中  
6. 打开视频播放页面例如https://courses.zju.edu.cn/course/*/learning-activity/full-screen#/*的网址格式  
7. 开启用户脚本并刷新页面即可自动播放并在视频完成后切换下一条视频  

### 注意：  
1. 进入视频播放界面时，请保持脚本关闭。  
2. 选定开始的视频后，开启脚本并刷新页面即可  
3. 如果出现视频没有自动播放，有可能是网速过慢，在脚本中将opentime属性的值增加，单位为ms  
