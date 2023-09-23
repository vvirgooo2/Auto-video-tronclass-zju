// ==UserScript==
// @name         ATUO-CLASS-ZJU
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://courses.zju.edu.cn/course/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js
// ==/UserScript==
// chrome.exe --disable-features=PreloadMediaEngagementData, MediaEngagementBypassAutoplayPolicies



// 在edge浏览器的设置中搜索 媒体自动播放 允许！！！！！
// 网速过慢请加大opentime和switchtime
// opentime是第一次加载的最长时间
// switchtime是切换视频的最长时间

(function() {
    'use strict';
    let opentime = 10000 //10s
    let switchtime = 8000
    console.log('STARTING OPEN TIME: ' + opentime)

    function timeToMilliseconds(time) {
        // 将时间字符串拆分为小时、分钟、秒的部分
        var parts = time.split(':');
        var hours = parseInt(parts[0]);
        var minutes = parseInt(parts[1]);
        var seconds = parseInt(parts[2]);

        // 将小时、分钟、秒转换为毫秒
        var milliseconds = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;

        return milliseconds;
    }

    //等待opentime来加载网页
    setTimeout(async function(){
        console.log(0)
        let duration = 1000
        let end = false
        let current = null
        // 找到当前的位置元素
        $(".module-block [class='activity-list module-activity'] [class='activity ng-scope active'] a ").each(function(index, element) {
            let text = $(element).find("span").eq(0).text();  // 使用.eq(0)来获取第一个匹配的<span>元素
            console.log("开始章节：", text);
            current = element
        })
        let index = 0
        // 等待时间完成后前往下一节
        while (end != true && current != null) {
            console.log('loop' + index);
            await new Promise(resolve => {
                setTimeout(async function() {
                    console.log(index + "开始播放");
                    duration = $("[class='attribute-value ng-binding']").eq(0).text();
                    duration = timeToMilliseconds(duration);
                    console.log(duration);

                    $("[class='mvp-toggle-play mvp-first-btn-margin']").click();

                    await new Promise(resolve => {
                        setTimeout(function() {
                            // console.log($(current).parent().parent().next()[0])
                            // console.log("L"+$(current).parent().parent().length)
                            if($(current).parent().parent().parent().next().attr('class')=='indent') {
                                console.log('last of chapter')
                                current = $(current).parent().parent().parent().parent().parent().next().children().first()
                                console.log($(current)[0])
                                $(current)[0].dispatchEvent(new MouseEvent('click'));
                                current = $(current).next().find("a").eq(0);
                            }
                            else{
                                current = $(current).parent().parent().parent().next().find("a").eq(0);
                            }

                            console.log('下一个');
                            let b = $(current)[0];
                            b.dispatchEvent(new MouseEvent('click'));
                            resolve();
                        }, duration+ 5000);
                    });

                    index = index + 1;
                    resolve();
                }, switchtime);
            });
        }
    },opentime)




})();
