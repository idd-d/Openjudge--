# OpenJudge 深色模式脚本

这是一个用于 [OpenJudge](http://openjudge.cn/) 在线评测系统的 Tampermonkey 用户脚本。它为网站添加了一个全局深色模式，不仅适用于题目列表和文字内容，还特别针对**代码块**和**表格**进行了配色优化，以减轻长时间刷题时的眼部疲劳。

## ✨ 主要功能

* **一键切换**：页面右下角悬浮切换按钮（🌙 / ☀️），随时开启或关闭深色模式。
* **自动记忆**：脚本会自动记住你最后一次的选择，刷新或重新打开浏览器后保持状态。
* **代码阅读优化**：针对 `<pre>` 和 `<code>` 区域使用了类 VS Code (One Dark) 的配色，提高代码可读性。
* **表格适配**：修复了 OpenJudge 常见的表格（如题目列表、排名）在深色背景下的显示问题。
* **多站点支持**：支持 `dsa.openjudge.cn` 以及其他 `*.openjudge.cn` 子站点。

## 🛠️ 安装指南

### 1. 安装管理器插件
你需要先在浏览器中安装用户脚本管理器：
* **Chrome / Edge**: [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
* **Firefox**: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/)

### 2. 添加脚本
1. 点击浏览器扩展栏的 Tampermonkey 图标，选择 **“添加新脚本”**。
2. 清空编辑器中自动生成的默认代码。
3. 将脚本代码（请查看仓库中的 `.js` 文件）完整复制并粘贴到编辑器中。
4. 按下 `Ctrl + S` (或 `Cmd + S`) 保存。

## 📖 使用说明

1. 打开任意 OpenJudge 页面（例如 [http://dsa.openjudge.cn/](http://dsa.openjudge.cn/)）。
2. 查看页面 **右下角**，会出现一个蓝色的圆形悬浮按钮。
3. **点击按钮**：
    * 显示 🌙 图标时：点击切换为 **深色模式**。
    * 显示 ☀️ 图标时：点击切换回 **浅色模式**。

## 🎨 样式预览

| 元素 | 浅色模式 (默认) | 深色模式 (启用后) |
| :--- | :--- | :--- |
| **背景** | 白色 | 深灰色 (`#121212`) |
| **文字** | 黑色 | 浅灰色 (`#e0e0e0`) |
| **链接** | 蓝色 | 浅蓝色 (`#64b5f6`)，悬停高亮 |
| **代码块** | 默认样式 | 深蓝灰色背景 (`#282c34`) + 浅色代码 |
| **输入框** | 白色背景 | 深色背景 + 白色文字 |

## ⚙️ 兼容性

* **浏览器**: Chrome, Edge, Firefox, Safari (配合 Userscripts 插件).
* **网址**: 匹配 `http://dsa.openjudge.cn/*` 及所有 `http://*.openjudge.cn/*`。
