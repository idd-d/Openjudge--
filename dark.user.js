// ==UserScript==
// @name        OpenJudge Dark Mode / 深色模式切换
// @match       http://dsa.openjudge.cn/*
// @match       http://*.openjudge.cn/*
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    // 定义深色模式的 CSS 样式
    const darkModeCSS = `
        /* 强制覆盖全局背景和文字颜色 */
        html.dark-mode,
        html.dark-mode body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
        }
        /* 去掉部分文字的白色阴影 */
        html.dark-mode #userMenu a {
            text-shadow: none !important;
        }
        html.dark-mode .problem-statistics h4 {
            color: #cfd8dc !important;   /* 冷灰，适合暗色背景 */
            margin: 18px 0 5px 0;
        }

        /* 对一部份选中按钮背景的优化 */
        html.dark-mode #mainNav .current a {
            color: #eaf6ff !important;
            background: #0a3d62 !important; /* 深蓝 */
            padding: 5px 10px 3px;
        }
        html.dark-mode #mainNav a:hover {
            background: #193b63 !important; /* 蓝黑提升 */
            color: #eaf6ff !important;
        }
        html.dark-mode #topMenu .current-show a {
            background: #0a3d62 !important;          /* 深蓝背景 */
            border-color: #2a3b55 #2a3b55 #0a3d62 !important;
            border-style: solid;
            border-width: 1px;
            font-size: 120%;
            color: #eaf6ff !important;              /* 浅蓝白文字 */
            height: 28px;
            line-height: 30px;
            margin-top: 3px;
            padding: 0 15px;
            border-radius: 4px;
        }

        /* 链接颜色优化 - 浅蓝色更易读 */
        html.dark-mode a {
            color: #64b5f6 !important;
        }
        html.dark-mode a:hover {
            color: #9be7ff !important;
        }

        /* 常见的容器处理 (div, table, lists) */
        html.dark-mode div,
        html.dark-mode p,
        html.dark-mode ul,
        html.dark-mode li {
            background-color: transparent !important;
            color: inherit !important;
        }

        /* 顶部修改 */
        html.dark-mode #headerTop {
            background: none !important;
            background-color: #0f2a44 !important;
        }
        html.dark-mode #siteBody {
            background:
            linear-gradient(#0f2a44 0, #0f2a44 80px, rgba(15,42,68,0) 80px) no-repeat,
            #121212 !important;   /* base body color */
            background-image: none !important;    /* clear old image */
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: 100% 80px;           /* stripe height */
        }


        /* logo问题 */
        html.dark-mode .logo {
            background: none !important;
        }
        html.dark-mode .logo a {
            color: #b0cfff !important;
            text-decoration: none !important;
        }

        /* userToolbar */
        html.dark-mode #userToolbar {
            background-color: #1f2630 !important;
            border: 1px solid #2c3b4a !important;
            border-radius: 4px;
        }
        html.dark-mode #userToolbar li {
            background: transparent !important;
        }
        html.dark-mode #userToolbar a {
            color: #9fbce1 !important;
        }
        html.dark-mode #userToolbar a:hover {
            background-color: #1e3a5a !important;
            color: #eaf2ff !important;
        }
        html.dark-mode #userToolbar .account-list {
            background: #1a2233 !important;              /* 蓝黑背景替代原图 */
            border: 1px solid #2a3b55 !important;        /* 深蓝灰边框 */
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            box-shadow: 1px 1px 6px rgba(0,0,0,0.6);     /* 更深的阴影，适合暗色 */
            color: #eaf6ff !important;                   /* 浅蓝白文字 */
            overflow: hidden;
            padding: 2px 1px 4px;
            position: absolute;
            right: 0;
            top: 29px;
            width: 130px;
            display: none;
            z-index: 999;
        }

        /* praticeSearch */
        html.dark-mode .practice-search {
                background-color: #181b1f !important;
        }
        html.dark-mode .practice-search input {
                background-color: #232b36 !important;
                color: #e4eeff !important;
                border: 1px solid #3a4b5f !important;
        }
        html.dark-mode .practice-search input:focus {
                border-color: #6fa8ff !important;
                outline: none !important;
        }

        /* 对于主页侧边栏的处理 */
        html.dark-mode .admin-list h4,
        html.dark-mode .new-group-user h4,
        html.dark-mode .announcement h4 {
            background: #142338 !important;   /* 深蓝灰 */
            color: #8ec9ff !important;        /* 柔和浅蓝字 */
            border-left: 3px solid #2f6fa5;   /* 轻微蓝色强调 */
        }
        /* 主页滚动字幕处理 */
        html.dark-mode .statsBox .number {
            color: #82b1ff !important;             /* 明亮浅蓝，醒目但不刺眼 */
            display: inline-block;
            font-family: Arial,Helvetica,sans-serif;
            font-size: 22px;
            font-weight: bold;
            text-shadow: none !important;            /* 去除阴影 */
            width: 100%;
        }

        /* 首页右边栏处理 */
        html.dark-mode .announcements h3 {
            background: #1a2233 !important;              /* 蓝黑背景替代原图 */
            border-bottom: 1px solid #2a3b55 !important; /* 深蓝灰边框 */
            height: 2em;
            line-height: 2em;
            font-size: 12px;
            margin: 0 0 2px;
            overflow: hidden;
            padding-left: 1.5em;
            color: #eaf6ff !important;                  /* 浅蓝白文字 */
        }
        
        /* 侧边栏小组设置边框 */
        html.dark-mode .group-setting li {
            border-bottom: 1px solid #2a3e55 !important;
        }
        html.dark-mode .admin-list,
        html.dark-mode .new-group-user,
        html.dark-mode .announcement {
            border-right: 1px solid rgba(120,160,220,0.2);
        }

        /* 顶部导航和底部区域通常需要深一点的背景 */
        html.dark-mode #header,
        html.dark-mode .header,
        html.dark-mode #footer,
        html.dark-mode .footer,
        html.dark-mode #top {
            background-color: #1f1f1f !important;
            border-bottom: 1px solid #333 !important;
        }

        /* 表格样式处理 (OpenJudge 常用表格布局) */
        html.dark-mode table,
        html.dark-mode tr,
        html.dark-mode td,
        html.dark-mode th {
            background-color: #1e1e1e !important;
            color: #e0e0e0 !important;
            border-color: #333 !important;
        }

        /* 偶数行稍微变色，增加可读性 */
        html.dark-mode tr:nth-child(even) td {
            background-color: #252525 !important;
        }

        /* 输入框和文本域 */
        html.dark-mode input,
        html.dark-mode textarea,
        html.dark-mode select {
            background-color: #2c2c2c !important;
            color: #fff !important;
            border: 1px solid #555 !important;
        }

        /* 代码块 (Code Blocks) - 最重要的部分 */
        html.dark-mode pre,
        html.dark-mode code {
            background-color: #1e242c !important;   /* 比 #282c34 更浅一点的蓝灰 */
            color: #abb2bf !important;              /* 中灰白 */
            border: 1px solid #2f3540 !important;   /* 边框降低对比度 */
            font-family: 'Consolas', 'Monaco', monospace !important;
        }
        /* 预处理/宏 */
        html.dark-mode pre.sh_sourceCode .sh_preproc {
            color: #d19a66; /* 橙色 */
            font-weight: bold;
        }
        /* 字符串 */
        html.dark-mode pre.sh_sourceCode .sh_string {
            color: #98c379; /* 绿色 */
            font-family: monospace;
        }
        /* 关键字 */
        html.dark-mode pre.sh_sourceCode .sh_keyword {
            color: #c678dd; /* 紫色 */
            font-weight: bold;
        }
        /* 符号/运算符 */
        html.dark-mode pre.sh_sourceCode .sh_symbol {
            color: #56b6c2; /* 浅蓝 */
        }
        /* 类名 */
        html.dark-mode pre.sh_sourceCode .sh_classname {
            color: #61afef; /* 蓝色 */
        }
        /* 括号 */
        html.dark-mode pre.sh_sourceCode .sh_cbracket {
            color: #abb2bf; /* 默认灰蓝 */
        }
        /* 用户类型 */
        html.dark-mode pre.sh_sourceCode .sh_usertype {
            color: #61afef; /* 蓝色 */
        }
        /* 函数名 */
        html.dark-mode pre.sh_sourceCode .sh_function {
            color: #61afef; /* 蓝色 */
            font-weight: bold;
        }
        /* 类型 */
        html.dark-mode pre.sh_sourceCode .sh_type {
            color: #d19a66; /* 橙色 */
        }
        /* 注释 */
        html.dark-mode pre.sh_sourceCode .sh_comment {
            color: #5c6370; /* 灰色 */
            font-style: italic;
        }
        /* 数字 */
        html.dark-mode pre.sh_sourceCode .sh_number {
            color: #d19a66; /* 橙色 */
        }


        /* 处理特定的 OpenJudge 元素可能出现的白色背景 */
        html.dark-mode .main,
        html.dark-mode #main {
            background-color: #121212 !important;
        }

        /* 切换按钮样式 */
        #dm-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color: #007bff;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #dm-toggle-btn:hover {
            transform: scale(1.1);
            background-color: #0056b3;
        }

        /* 针对特定高亮代码样式的修复 */
        html.dark-mode .syntaxhighlighter {
            background-color: #282c34 !important;
        }
        html.dark-mode .syntaxhighlighter .line.alt1,
        html.dark-mode .syntaxhighlighter .line.alt2 {
            background-color: #282c34 !important;
        }
    `;

    // 注入 CSS
    GM_addStyle(darkModeCSS);

    // 创建切换按钮
    const btn = document.createElement('button');
    btn.id = 'dm-toggle-btn';
    btn.innerHTML = '🌙'; // 默认月亮图标
    btn.title = "切换深色/浅色模式";
    document.body.appendChild(btn);

    // 状态管理函数
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
            btn.innerHTML = '☀️'; // 切换为太阳图标
            GM_setValue('oj_dark_mode', true);
        } else {
            document.documentElement.classList.remove('dark-mode');
            btn.innerHTML = '🌙'; // 切换为月亮图标
            GM_setValue('oj_dark_mode', false);
        }
    }

    // 初始化：读取存储的设置
    const savedMode = GM_getValue('oj_dark_mode', false);
    setDarkMode(savedMode);

    // 绑定点击事件
    btn.addEventListener('click', function () {
        const isCurrentlyDark = document.documentElement.classList.contains('dark-mode');
        setDarkMode(!isCurrentlyDark);
    });

})();