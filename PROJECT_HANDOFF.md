# 项目交接摘要

## 项目目标

为“人教版八年级物理上册”制作一个适合初中生预习和期末前查漏补缺的静态网页站点。站点需要图文并茂、便于探索，每章独立页面，包含知识讲解、互动体验、章节检查，并通过 GitHub Pages 对外访问。

当前内容重点不只是覆盖教材六章，也要对接深圳南山区 2025-2026 学年八年级上学期期末物理试卷中暴露出的考察方式：图像分析、光路作图、实验步骤、误差判断、项目化应用题和阅读信息题。

## 当前进展

项目位于 `/Users/lianliu/Documents/GithubPage 2`。目前已完成原生静态网页版本，包含首页、第一至第六章页面、章节导航、阶段检查和综合检查入口。代码结构仍保持每章独立 HTML、每章独立 JS、公共样式集中在 `styles/main.css`。

GitHub 仓库为 `Lian-Crasher/GithubPage-2`。GitHub Pages 访问地址：

https://lian-crasher.github.io/GithubPage-2/

截至 2026-07-05，最近一次功能发布通过 `git -c http.version=HTTP/1.1 push origin main` 成功推送。更新本文档前，本地 `main` 与 `origin/main` 对齐，最新功能提交为：

- `05994c1 Add mixed-format final quiz`

历史上曾因 GitHub HTTPS/HTTP2 网络错误改用 `gh api` 发布，造成过本地提交 SHA 与远端提交 SHA 不一致。本轮普通 `git push origin main` 也曾遇到 `Error in the HTTP2 framing layer`，改用 HTTP/1.1 后成功。后续交接时仍建议先看 `git status -sb`、`git log --oneline --decorate -5` 和远端提交状态，再决定是否需要对齐。

## 已做的代码/文件变更

主要文件结构：

- `index.html`
- `chapters/chapter1-motion.html`
- `chapters/chapter2-sound.html`
- `chapters/chapter3-states.html`
- `chapters/chapter4-light.html`
- `chapters/chapter5-lenses.html`
- `chapters/chapter6-density.html`
- `scripts/chapter1-motion.js`
- `scripts/chapter2-sound.js`
- `scripts/chapter3-states.js`
- `scripts/chapter4-light.js`
- `scripts/chapter5-lenses.js`
- `scripts/chapter6-density.js`
- `scripts/quiz.js`
- `scripts/common.js`
- `styles/main.css`

章节配图已统一为轻量教学插画风格，资源包括：

- `assets/chapter1-motion.png`
- `assets/chapter2-sound.png`
- `assets/chapter3-states.png`
- `assets/chapter4-light.png`
- `assets/chapter4-light.svg`
- `assets/chapter5-lenses.png`
- `assets/chapter5-lenses.svg`
- `assets/chapter6-density.png`

近期重点变更：

- 第一章新增“路程-时间图像”期末题型模块。
  - 小图已标明横轴 `t/s`、纵轴 `s/m` 和原点 `0`。
  - 图线从原点出发，说明水平线段表示静止。
  - 强调 s-t 图像中斜率表示速度；同一时刻高度表示路程，若都从原点出发，较陡的线速度更大。
  - 审核后将“斜线向上”改为“倾斜直线向上”，避免把任意上升曲线误说成匀速直线运动。
  - 刻度尺读数说明已改为“分度值为 1 mm 时通常读到 1 mm，对应 0.1 cm”，并在互动反馈里同步显示 cm 和 mm，避免“估读下一位”和当前读数位数不一致。
- 第三章新增水沸腾实验专项和热胀冷缩阅读题专项。
  - 覆盖器材从下往上安装、沸腾现象判断、沸腾持续吸热、控制变量。
  - 补充线膨胀系数、双金属片温度计、图像判断和改进措施。
  - 新增“实验步骤排序”互动，用上移/下移按钮排列水的沸腾实验步骤，并即时反馈错误位置和正确实验逻辑。
  - 新增“温度计读数姿势纠错”互动：选择从上方斜看、视线相平或从下方斜看，正确反馈强调视线与液柱上表面相平，错题回看会跳到该练习。
- 第四章补强光现象作图与实验专项。
  - 顶部首图已改为 `assets/chapter4-light.svg`，只表达“光沿直线传播并被不透明挡板挡住形成影子”，不再把直线传播、反射、色散硬塞在同一张图中。
  - 首图中间光线到挡板前停止，边界光线保持直线传播，避免误导为“光线穿过挡板后折射”。
  - “影子实验台”已从静态光锥改为动态 SVG 光路：挡板移动时，上下边界光线、被挡住的中间光线、挡板后阴影锥和屏上阴影大小同步更新。
  - 第四章页面已对 `styles/main.css` 和 `scripts/chapter4-light.js` 加查询版本号，避免线上/浏览器缓存旧版光路。
  - 反射、折射、平面镜实验卡片已从 CSS 线条改为 SVG 示意图，箭头方向、法线、界面和物像关系更清楚。
  - 水到空气折射图明确标出空气/水界面和“远离法线”。
  - 审核后将反射作图说明改为“入射光线和反射光线分居法线两侧，且与法线夹角相等”，避免误解为反射光线也发生“向法线偏折”。
  - 新增“光路作图台”互动：可切换反射/折射，调整入射角，选择反射角相等、折射靠近法线或远离法线，并在检查后自动补出正确出射光线。
- 第五章修正透镜应用互动。
  - 顶部首图已从 `assets/chapter5-lenses.png` 切换为 `assets/chapter5-lenses.svg`，改成凸透镜成倒立缩小实像的标准作图：平行光过焦点、过光心方向不变、光线在光屏处会聚。
  - “透镜光路切换”中凸透镜平行光会聚、凹透镜发散和反向延长线示意已检查。
  - “透镜光路切换”已按薄透镜近似重画：入射平行光到透镜中心平面后再折向焦点；凹透镜实际光线发散，反向延长线过同侧虚焦点，且出射线不再被画布裁切。
  - “成像规律滑台”已改为按凸透镜公式 `1/f = 1/u + 1/v` 和统一比例计算像距。
  - `F`、`2F` 标记已左右对称；默认 `u = 28 cm` 时，像位于右侧 `F` 与 `2F` 之间且倒立缩小。
  - 新增“实像和虚像”成像本质模块，说明实像由实际光线会聚形成、能用光屏承接；虚像由反向延长线相交形成，实际光线没有在像的位置会聚。
  - “实像和虚像”图已重画：实像图用同一物点发出的实际光线经凸透镜后会聚到倒立像点；虚像图用焦点内物体、实际出射光发散和反向延长线在物体同侧相交表示正立虚像。
  - 实像图里的光屏已改为浅蓝灰屏幕矩形并标注“光屏”，避免被误认为多余光线。
  - 新增“透镜作图台”互动：可切换平行主光轴、过焦点、过光心三类特殊光线，学生选择折射后走向，检查后自动补出正确光线和反馈。
  - 第五章检查中“特殊光线”和“投影仪调试”相关错题已跳转到 `#lens-practice`，综合检查中的透镜作图配对题也会跳到该模块。
- 第六章新增密度实验误差专项。
  - 覆盖天平调平、砝码使用、容器质量扣除、排水法体积、红豆空隙导致密度偏小。
  - 新增“误差方向诊断”互动，围绕红豆空隙、石块带水、量筒读数偏大、单位换算等情境判断密度偏大/偏小/基本不变，并逐项解释原因。
  - 误差方向诊断已从 4 个情境扩展到 6 个，新增“先在量筒中测液体体积，再倒入烧杯称质量”和“先称总质量、倒入量筒后再称剩余质量”两类液体密度顺序误差。
- 各章检查题和综合检查已扩充。
  - 第一章 7 题、第三章 8 题、第四章 8 题、第五章 10 题、第六章 8 题。
  - 综合检查从 10 题扩展到 14 题，加入 s-t 图像、折射作图、投影仪调试、热胀冷缩等期末常见能力点。
  - 综合检查已从纯单选升级为混合题型：前 8 题保留基础单选，后 6 题覆盖多选、速度计算填空、s-t 图像填空、液体密度实验排序、透镜特殊光线配对、密度误差多选。
  - 首页综合检查入口文案已同步为“14 道题”，避免首页仍显示旧的 10 题。
- 学习闭环已升级。
  - `scripts/quiz.js` 现在会在提交检查后生成错题回看清单，每道错题可跳转到对应章节模块。
  - `scripts/quiz.js` 支持单选、多选、填空、排序、配对等题型；旧的单选配置仍保持兼容。
  - `scripts/quiz.js` 会把答题分数、错题 key、完成状态保存到 `localStorage`。
  - `scripts/common.js` 会在首页学习地图显示“未检查 / 待巩固 x/y / 已掌握 x/y”进度徽章。
  - 各章检查、阶段检查和综合检查都已配置 `quizId` 与 `reviewLinks`。
- 公共样式新增考试题型卡片、规则卡片、SVG 光路图、公式卡片、填空输入和下拉题样式，并修复窄屏导航可能撑宽页面的问题。

## 关键设计决策

采用原生 HTML/CSS/JS，而不是 React。原因：

- 当前目标是 GitHub Pages 静态站，原生方案部署简单、维护直观。
- 每章独立 HTML + 独立 JS，便于未来逐章扩展和修正。
- 公共能力抽在 `scripts/common.js`、`scripts/quiz.js` 和 `styles/main.css`。
- 视觉上保持清爽、教学插画式的科学探索风格，避免章节风格割裂。
- 每章都保留“检查环节”，并逐步从单纯知识点检查升级为期末题型检查。
- 检查题不再只依赖单选。公共 `setupQuiz` 通过 `questionTypes` 支持混合题型，但默认仍按单选处理，避免一次改动影响旧章节。
- 光路、透镜、图像等容易误导学生的内容，优先使用明确坐标、箭头方向、法线、`F/2F` 标记和物理公式驱动的位置计算，而不是随意摆放示意线条。
- 互动内容优先追求物理准确性，再考虑视觉趣味。若两者冲突，以准确性为准。

## 未解决问题

本地 Git 状态：

- 截至本次交接，`git status -sb` 显示 `## main...origin/main`，没有未提交改动。
- 更新本文档前，`HEAD` 与 `origin/main` 都指向 `05994c1 Add mixed-format final quiz`；提交本交接文档后，以 `git log --oneline --decorate -5` 的最新结果为准。
- 之前的历史不一致已经通过 `git fetch origin main` 后将本地新增提交 rebase 到最新 `origin/main` 上解决；不要再假设本地必然 ahead 多个提交。

GitHub 发布注意事项：

- 普通 `git push origin main` 曾多次成功，但最近一次普通推送遇到 `Error in the HTTP2 framing layer`。
- 最近一次成功发布使用：`git -c http.version=HTTP/1.1 push origin main`，将 `873a0ee` 推到 `05994c1`。
- 但 `gh auth status` 最近显示 `Lian-Crasher` 的 GitHub CLI token invalid；如果后续要用 `gh api` 或 GitHub CLI，需要先重新认证。
- 如果普通 `git push` 又遇到网络或 fast-forward 问题，先 `git fetch origin main` 检查远端历史，不要直接强推。
- 除非用户明确同意，不要执行 `git reset --hard` 或强制推送。

内容层面仍可继续加强：

- 部分章节仍是“预习站”深度，不是完整题库。
- 光学、实验和密度题虽然已补强，但还可以继续把各章检查从纯单选逐步改成混合题型，例如多选、填空、排序、配对和情境分析。
- 线上 GitHub Pages 可能有缓存延迟，推送后需要等待 Pages 刷新。

## 如何验证

本地静态检查：

```bash
cd "/Users/lianliu/Documents/GithubPage 2"
node --check scripts/chapter1-motion.js
node --check scripts/chapter2-sound.js
node --check scripts/chapter3-states.js
node --check scripts/chapter4-light.js
node --check scripts/chapter5-lenses.js
node --check scripts/chapter6-density.js
node --check scripts/quiz.js
```

启动本地服务：

```bash
cd "/Users/lianliu/Documents/GithubPage 2"
python3 -m http.server 8000
```

如果 8000 被占用，可换端口，例如：

```bash
python3 -m http.server 8002
```

本地访问：

- `http://localhost:8000/index.html`
- `http://localhost:8000/chapters/chapter1-motion.html#motion-graph`
- `http://localhost:8000/chapters/chapter4-light.html#straight-light`
- `http://localhost:8000/chapters/chapter4-light.html#ray-drawing`
- `http://localhost:8000/chapters/chapter5-lenses.html#image-rule`
- `http://localhost:8000/chapters/chapter5-lenses.html#real-virtual-image`
- `http://localhost:8000/chapters/chapter5-lenses.html#lens-practice`
- `http://localhost:8000/chapters/chapter6-density.html#final-check`

线上访问：

- https://lian-crasher.github.io/GithubPage-2/
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter1-motion.html
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter4-light.html#ray-drawing
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter5-lenses.html#image-rule
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter6-density.html#final-check

远端验证：

```bash
git status -sb
git log --oneline --decorate -5
git rev-parse HEAD
git rev-parse origin/main
git rev-parse HEAD^{tree}
```

如果 GitHub CLI 重新认证可用，也可以用：

```bash
gh api repos/Lian-Crasher/GithubPage-2/git/ref/heads/main --jq .object.sha
gh api repos/Lian-Crasher/GithubPage-2/git/commits/<remote-sha> --jq .tree.sha
git rev-parse HEAD^{tree}
```

预期 `HEAD` 和 `origin/main` 一致；若使用 `gh api`，预期远端 tree 与本地 tree 一致。

浏览器验证重点：

- 第一章 `#motion-graph`：坐标轴、原点、斜率含义是否清楚。
- 第一章 `#measure`：1 mm 分度值读数、cm/mm 显示和反馈是否一致。
- 第四章首图：是否只表达直线传播和影子，不再出现光线穿过挡板或混合反射/色散。
- 第四章 `#straight-light`：拖动挡板时，上下边界光线、被挡住的中间光线、阴影锥和屏上阴影是否同步变化。
- 第四章 `#ray-drawing`：反射光线是否从入射点射出、是否与入射光线分居法线两侧且角度相等；折射是否远离法线，平面镜物像是否对称。
- 第四章 `#ray-drawing` 的“光路作图台”：反射模式选“分居法线两侧，角度相等”应反馈正确；折射模式中空气到水应靠近法线，水到空气应远离法线；移动端 390px 宽度不应横向溢出。
- 首页学习地图：做过章节检查后，应显示“待巩固 x/y”或“已掌握 x/y”进度徽章。
- 第三章 `#boiling-exam`：实验步骤排序应能用上移/下移调整，正确顺序为酒精灯/装置、温度计、加热、记录、结论。
- 第三章 `#temperature-reading-practice`：选择“视线与液柱上表面相平”应反馈正确；从上方/下方斜看应提示会产生偏差。
- 第五章首图：是否表达凸透镜将物体光线会聚到光屏上形成倒立缩小实像，三条特殊光线是否自洽。
- 第五章 `#lens-basics`：凸透镜会聚、凹透镜发散是否准确。
- 第五章 `#image-rule`：不同物距时像的位置、正倒、大小是否符合凸透镜成像规律。
- 第五章 `#real-virtual-image`：实像是否由实际光线会聚形成并可落在光屏上；虚像是否由实际发散光线的反向延长线形成；光屏是否明确标注且不被误认为光线。
- 第五章 `#lens-practice`：平行主光轴应选“通过另一侧焦点”，过焦点应选“平行于主光轴”，过光心应选“方向不改变”；390px 移动宽度不应横向溢出。
- 第六章 `#density-errors`：误差方向表述是否准确；误差方向诊断中红豆总体积偏大和量筒读数偏大应判密度偏小，石块带水称质量应判密度偏大，正确单位换算应基本不变。
- 第六章 `#final-check`：综合检查应有 14 张题卡，其中后 6 题为混合题型。正确填写后应显示 `上册预习非常稳：14/14`；移动端 390px 宽度不应横向溢出。

## 下一步建议

优先级从高到低：

- 继续做更细的全站物理准确性复审，尤其是新增练习和后续交互是否和教材规律一致。最近一次复审未发现高严重度物理错误，已修正 3 个低到中风险表述点。
- 继续做更细的全站物理准确性复审，尤其是新增混合题型、填空答案容错、排序/配对题是否和教材规律一致。
- 将第一至第六章的章节检查逐步从纯单选改成混合题型。建议优先从第一章速度计算/图像题、第三章实验题、第四章光路题、第五章透镜作图题、第六章密度实验题开始。
- 给混合题型错题反馈继续增强：多选题可区分少选/多选，填空题可显示计算过程，排序题可指出第几步位置不对。
- 做一次全站移动端 QA，重点看首页进度徽章、错题回看列表、第四章作图台、第五章透镜作图台、第三章读数/排序按钮、第六章综合检查下拉题在窄屏是否拥挤。
- 若需要继续发布，优先尝试 `git push origin main`；若再次遇到 HTTP/2 错误，使用 `git -c http.version=HTTP/1.1 push origin main`。如果要使用 `gh api`，先处理 GitHub CLI token invalid 问题。
