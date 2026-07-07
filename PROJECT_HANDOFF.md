# 项目交接摘要

## 项目目标

为“人教版八年级物理上册”制作一个适合初中生预习和期末前查漏补缺的静态网页站点。站点需要图文并茂、便于探索，每章独立页面，包含知识讲解、互动体验、章节检查，并通过 GitHub Pages 对外访问。

当前内容重点不只是覆盖教材六章，也要对接深圳南山区 2025-2026 学年八年级上学期期末物理试卷中暴露出的考察方式：图像分析、光路作图、实验步骤、误差判断、项目化应用题和阅读信息题。

## 当前进展

项目位于 `/Users/lianliu/Documents/GithubPage 2`。目前已完成原生静态网页版本，包含首页、第一至第六章页面、独立综合检查页、章节导航、阶段检查和综合检查入口。代码结构仍保持每章独立 HTML、每章独立 JS、公共样式集中在 `styles/main.css`。

GitHub 仓库为 `Lian-Crasher/GithubPage-2`。GitHub Pages 访问地址：

https://lian-crasher.github.io/GithubPage-2/

截至 2026-07-07，最近一次功能更新已成功推送到 GitHub，GitHub Pages 线上发布也已恢复成功。更新本文档前，本地 `main` 与 `origin/main` 对齐，最新提交为：

- `e084afc Split final check into standalone page`

最近一次 Pages 验证中，线上首页已指向 `chapters/final-check.html`，独立综合检查页返回 HTTP 200。此前 `bea0f08` 对应的 Pages run #32 曾出现 build/artifact 成功但 deploy 失败，已通过后续提交触发重新部署解决。后续交接时仍建议区分“GitHub 已同步”和“GitHub Pages 已发布”。

历史上曾因 GitHub HTTPS/HTTP2 网络错误改用 `gh api` 发布，造成过本地提交 SHA 与远端提交 SHA 不一致。近期推送中普通 `git push origin main` 有时可成功，有时会遇到 DNS 或 `Error in the HTTP2 framing layer`；遇到 HTTP2 framing 问题时，`git -c http.version=HTTP/1.1 push origin main` 已验证可作为 fallback。当前 `gh auth status` 显示 GitHub CLI token invalid，Codex 内置浏览器也未登录 GitHub。后续交接时仍建议先看 `git status -sb`、`git log --oneline --decorate -5`、远端提交状态和 Pages Actions 状态，再判断是 Git 同步问题还是 Pages 发布问题。

## 已做的代码/文件变更

主要文件结构：

- `index.html`
- `chapters/chapter1-motion.html`
- `chapters/chapter2-sound.html`
- `chapters/chapter3-states.html`
- `chapters/chapter4-light.html`
- `chapters/chapter5-lenses.html`
- `chapters/chapter6-density.html`
- `chapters/final-check.html`
- `scripts/chapter1-motion.js`
- `scripts/chapter2-sound.js`
- `scripts/chapter3-states.js`
- `scripts/chapter4-light.js`
- `scripts/chapter5-lenses.js`
- `scripts/chapter6-density.js`
- `scripts/final-check.js`
- `scripts/quiz.js`
- `scripts/common.js`
- `styles/main.css`
- `RELEASE_CHECKLIST.md`
- `.nojekyll`

章节配图已统一为轻量教学插画风格，资源包括：

- `assets/chapter1-motion.svg`
- `assets/chapter1-motion.png`
- `assets/chapter2-sound.png`
- `assets/chapter3-states.svg`
- `assets/chapter3-states.png`
- `assets/chapter4-light.png`
- `assets/chapter4-light.svg`
- `assets/chapter5-lenses.png`
- `assets/chapter5-lenses.svg`
- `assets/chapter6-density.svg`
- `assets/chapter6-density.png`

近期重点变更：

- 第一章新增“路程-时间图像”期末题型模块。
  - 第一章首图和首页 hero 已从旧 PNG 切换为 `assets/chapter1-motion.svg`，改成“斜面小车 + 刻度尺 + 秒表 + v = s / t”的平均速度实验场景，避免旧图中秒表悬空、运动线偏装饰的问题。
  - 小图已标明横轴 `t/s`、纵轴 `s/m` 和原点 `0`。
  - 图线从原点出发，说明水平线段表示静止。
  - 强调 s-t 图像中斜率表示速度；同一时刻高度表示路程，若都从原点出发，较陡的线速度更大。
  - 审核后将“斜线向上”改为“倾斜直线向上”，避免把任意上升曲线误说成匀速直线运动。
  - 刻度尺读数说明已改为“分度值为 1 mm 时通常读到 1 mm，对应 0.1 cm”，并在互动反馈里同步显示 cm 和 mm，避免“估读下一位”和当前读数位数不一致。
- 第三章新增水沸腾实验专项和热胀冷缩阅读题专项。
  - 第三章首图已从旧 PNG 切换为 `assets/chapter3-states.svg`，改成冰、水、水蒸气之间的物态变化循环图，并标出熔化、凝固、汽化、液化、升华、凝华六种变化。
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
  - “眼睛和光学仪器”已补强近视/远视专项：说明晶状体和角膜共同相当于凸透镜、视网膜相当于光屏；近视通常像落在视网膜前方，用凹透镜发散矫正；远视通常像落在视网膜后方，用凸透镜会聚矫正。
  - 第五章新增近视和远视 SVG 示意图，并加入“近视：前、凹、发散；远视：后、凸、会聚”的考试速记。
- 第六章新增密度实验误差专项。
  - 第六章首图已从旧 PNG 切换为 `assets/chapter6-density.svg`，改成“天平测质量 m + 量筒排水法测体积 V + ρ = m / V”的实验链条，强化密度公式与测量步骤的关系。
  - 覆盖天平调平、砝码使用、容器质量扣除、排水法体积、红豆空隙导致密度偏小。
  - 新增“误差方向诊断”互动，围绕红豆空隙、石块带水、量筒读数偏大、单位换算等情境判断密度偏大/偏小/基本不变，并逐项解释原因。
  - 误差方向诊断已从 4 个情境扩展到 6 个，新增“先在量筒中测液体体积，再倒入烧杯称质量”和“先称总质量、倒入量筒后再称剩余质量”两类液体密度顺序误差。
- 各章检查题和综合检查已扩充。
  - 第一章 7 题、第三章 8 题、第四章 8 题、第五章 11 题、第六章 8 题。
  - 第一至第六章的章节检查已完成首轮混合题型升级：第一章加入速度计算填空和 s-t 图像填空，第二章加入声传递信息多选，第三章加入沸腾实验安装排序，第四章加入反射/折射光路配对，第五章加入凸透镜特殊光线配对，第六章加入密度计算填空和误差方向多选。
  - 综合检查从 10 题扩展到 20 题，加入 s-t 图像、折射作图、投影仪调试、热胀冷缩、近视/远视判断，以及参考深圳中学期末卷改写的图像分析、沸腾条件、凸透镜焦距和声学阅读题。
  - 综合检查已从纯单选升级为混合题型：前 8 题保留基础单选，后 12 题覆盖多选、速度计算填空、s-t 图像填空、液体密度实验排序、透镜特殊光线配对、密度误差多选、近视远视多选、m-V 图像判断、u-v 图像求焦距和阅读信息题。
  - 综合检查已从第六章页面拆出为 `chapters/final-check.html`，题目配置移到 `scripts/final-check.js`，便于未来继续扩展综合题库。
  - 综合检查中涉及图像的变式题采用内嵌 SVG 小图，而不是直接裁试卷截图，便于控制坐标轴、标注、线段比例和移动端清晰度。
  - 首页综合检查入口文案已同步为“20 道题”，避免首页仍显示旧题数。
- 学习闭环已升级。
  - `scripts/quiz.js` 现在会在提交检查后生成错题回看清单，每道错题可跳转到对应章节模块。
  - `scripts/quiz.js` 支持单选、多选、填空、排序、配对等题型；旧的单选配置仍保持兼容。
  - 混合题型错题反馈已完成首轮增强：多选题会提示少选/多选，填空题会显示学生答案和参考答案，排序题会指出第几步需要调整并展示正确顺序，配对题会指出具体配错的项目。各章关键混合题已补充计算过程、实验逻辑或作图口诀。
  - `scripts/quiz.js` 会把答题分数、错题 key、完成状态保存到 `localStorage`。
  - `scripts/common.js` 会在首页学习地图显示“未检查 / 待巩固 x/y / 已掌握 x/y”进度徽章。
  - `scripts/common.js` 会在首页生成“下一步复习建议”，根据检查记录优先推荐未掌握且得分比例最低的章节；没有记录时推荐第一个未开始章节，六章完成后推荐综合检查。
  - 各章检查、阶段检查和综合检查都已配置 `quizId` 与 `reviewLinks`。
- 公共样式新增考试题型卡片、规则卡片、SVG 光路图、公式卡片、填空输入和下拉题样式，并修复窄屏导航可能撑宽页面的问题。
- 已完成一轮 390px 移动端 QA，覆盖首页进度徽章、第三章排序练习、第四章光路作图台、第五章透镜作图台、第六章误差诊断、各章检查和综合检查。主体页面未发现非预期横向溢出；导航和表格保留局部横向滚动。检查题单选/多选项已增强为整行触控目标，主要触控高度约 40px 以上。
- 由于公共样式、综合检查 SVG 图像题和首页推荐链接继续调整，首页和各章节页的 `styles/main.css` 引用已统一升级到 `?v=6`，避免浏览器或 GitHub Pages 继续使用旧样式缓存；`scripts/common.js` 引用已升级到 `?v=3`，确保首页推荐逻辑刷新。
- 首页已新增“下一步复习建议”区块，并已在 390px 移动端验证无横向溢出。
- 已新增 `RELEASE_CHECKLIST.md`，固化发布前本地检查、移动端 QA、提交、推送、HTTP/1.1 fallback 和 GitHub Pages 验证步骤。
- 已新增 `.nojekyll`，用于让 GitHub Pages 按纯静态文件发布，减少 Jekyll 对当前原生 HTML/CSS/JS 站点的干预。

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

- 更新本文档前，`git status -sb` 显示 `## main...origin/main`，没有未提交改动；本次扩展综合检查到 20 题后会产生新的本地提交。
- 更新本文档前，`HEAD` 与 `origin/main` 都指向 `e084afc Split final check into standalone page`；提交本交接文档后，以 `git log --oneline --decorate -5` 的最新结果为准。
- 之前的历史不一致已经通过 `git fetch origin main` 后将本地新增提交 rebase 到最新 `origin/main` 上解决；不要再假设本地必然 ahead 多个提交。

GitHub 发布注意事项：

- 当前没有已知的 GitHub Pages 发布阻塞；最近一次验证中线上首页和新 SVG 资源均返回 HTTP 200。
- 历史失败运行可作为排查参考：
  - `pages build and deployment #32`：`bea0f08 Update handoff with Pages deploy status`，build 成功，deploy 失败。
  - 失败日志关键内容为 artifact 找到并创建 Pages deployment 后返回 `Deployment failed, try again later.`；这类情况不是本地代码语法错误，也不是浏览器缓存。
- GitHub 插件能读取 Actions 日志，但没有 Actions 写权限，无法代点 `Re-run failed jobs`；本机 `gh auth status` 曾显示 token invalid。如果后续要用 `gh api`、GitHub CLI 或 rerun workflow，需要先重新认证。
- 普通 `git push origin main` 曾多次成功；最近一次功能发布把 `af8413d` 推到 `1223bbe` 时，沙盒内普通推送因 DNS 失败，提权后 `git push origin main` 成功。
- 如果普通推送遇到 `Error in the HTTP2 framing layer`，使用：`git -c http.version=HTTP/1.1 push origin main`。该 fallback 已在推送 `415b654` 和 `af8413d` 时验证有效。
- `gh auth status` 最近显示 `Lian-Crasher` 的 GitHub CLI token invalid；如果后续要用 `gh api`、GitHub CLI 或 rerun workflow，需要先重新认证。
- 如果普通 `git push` 又遇到网络或 fast-forward 问题，先 `git fetch origin main` 检查远端历史，不要直接强推。
- 除非用户明确同意，不要执行 `git reset --hard` 或强制推送。

内容层面仍可继续加强：

- 部分章节仍是“预习站”深度，不是完整题库。
- 光学、实验和密度题虽然已补强，但还可以继续把各章检查从纯单选逐步改成混合题型，例如多选、填空、排序、配对和情境分析。
- 如果后续线上内容没有更新，先检查 Pages Actions 是否成功，再判断是否只是浏览器或 GitHub Pages 缓存延迟。

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
node --check scripts/final-check.js
node --check scripts/common.js
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
- `http://localhost:8000/chapters/final-check.html`

线上访问：

- https://lian-crasher.github.io/GithubPage-2/
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter1-motion.html
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter4-light.html#ray-drawing
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter5-lenses.html#image-rule
- https://lian-crasher.github.io/GithubPage-2/chapters/final-check.html

远端验证：

```bash
git status -sb
git log --oneline --decorate -5
git rev-parse HEAD
git rev-parse origin/main
git rev-parse HEAD^{tree}
git ls-remote origin refs/heads/main
```

如果 GitHub CLI 重新认证可用，也可以用：

```bash
gh api repos/Lian-Crasher/GithubPage-2/git/ref/heads/main --jq .object.sha
gh api repos/Lian-Crasher/GithubPage-2/git/commits/<remote-sha> --jq .tree.sha
git rev-parse HEAD^{tree}
```

预期 `HEAD` 和 `origin/main` 一致；若使用 `gh api`，预期远端 tree 与本地 tree 一致。

Pages 发布验证：

```bash
curl -L -s -o /tmp/ghpage-index.html https://lian-crasher.github.io/GithubPage-2/index.html
rg -n "chapter1-motion\\.svg|chapter1-hero\\.png" /tmp/ghpage-index.html
curl -L -s -D /tmp/ghpage-svg-headers.txt -o /tmp/chapter1-motion.svg 'https://lian-crasher.github.io/GithubPage-2/assets/chapter1-motion.svg?v=1'
sed -n '1,40p' /tmp/ghpage-svg-headers.txt
```

预期线上发布成功后，首页 HTML 应包含 `assets/chapter1-motion.svg?v=1`，新 SVG 资源应返回 HTTP 200。若线上仍出现旧 `assets/chapter1-hero.png` 引用或新 SVG 返回 404，先检查 Pages Actions 的 deploy 状态，再判断是否为缓存或发布延迟。

浏览器验证重点：

- 第一章 `#motion-graph`：坐标轴、原点、斜率含义是否清楚。
- 首页 hero 与第一章首图：是否表达平均速度实验，刻度尺测路程、秒表测时间、`v = s / t` 是否清楚。
- 第一章 `#measure`：1 mm 分度值读数、cm/mm 显示和反馈是否一致。
- 第四章首图：是否只表达直线传播和影子，不再出现光线穿过挡板或混合反射/色散。
- 第四章 `#straight-light`：拖动挡板时，上下边界光线、被挡住的中间光线、阴影锥和屏上阴影是否同步变化。
- 第四章 `#ray-drawing`：反射光线是否从入射点射出、是否与入射光线分居法线两侧且角度相等；折射是否远离法线，平面镜物像是否对称。
- 第四章 `#ray-drawing` 的“光路作图台”：反射模式选“分居法线两侧，角度相等”应反馈正确；折射模式中空气到水应靠近法线，水到空气应远离法线；移动端 390px 宽度不应横向溢出。
- 首页学习地图：做过章节检查后，应显示“待巩固 x/y”或“已掌握 x/y”进度徽章。
- 第三章 `#boiling-exam`：实验步骤排序应能用上移/下移调整，正确顺序为酒精灯/装置、温度计、加热、记录、结论。
- 第三章 `#temperature-reading-practice`：选择“视线与液柱上表面相平”应反馈正确；从上方/下方斜看应提示会产生偏差。
- 第三章首图：六种物态变化箭头和文字是否清楚，是否比旧三图标并列更容易看出循环关系。
- 第五章首图：是否表达凸透镜将物体光线会聚到光屏上形成倒立缩小实像，三条特殊光线是否自洽。
- 第五章 `#lens-basics`：凸透镜会聚、凹透镜发散是否准确。
- 第五章 `#image-rule`：不同物距时像的位置、正倒、大小是否符合凸透镜成像规律。
- 第五章 `#real-virtual-image`：实像是否由实际光线会聚形成并可落在光屏上；虚像是否由实际发散光线的反向延长线形成；光屏是否明确标注且不被误认为光线。
- 第五章 `#eyes-tools`：近视图应显示像在视网膜前方并用凹透镜矫正；远视图应显示像在视网膜后方并用凸透镜矫正。
- 第五章 `#lens-practice`：平行主光轴应选“通过另一侧焦点”，过焦点应选“平行于主光轴”，过光心应选“方向不改变”；390px 移动宽度不应横向溢出。
- 第六章 `#density-errors`：误差方向表述是否准确；误差方向诊断中红豆总体积偏大和量筒读数偏大应判密度偏小，石块带水称质量应判密度偏大，正确单位换算应基本不变。
- 第六章首图：天平测质量、量筒排水法测体积、`ρ = m / V` 三者是否形成清楚的实验链条。
- 独立页面 `chapters/final-check.html`：综合检查应有 20 张题卡，其中后 12 题为混合题型。正确填写后应显示 `上册预习非常稳：20/20`；内嵌 SVG 图像题的坐标轴和标注应清楚；移动端 390px 宽度不应横向溢出。

## 下一步建议

优先级从高到低：

- 继续做更细的全站物理准确性复审，尤其是新增混合题型、填空答案容错、排序/配对题和首页推荐逻辑是否和教材规律、学习路径一致。最近一次复审未发现高严重度物理错误，已修正 3 个低到中风险表述点。
- 继续深化章节检查的混合题型比例，尤其是把更多实验题改成“步骤判断 + 误差分析 + 结论表达”的组合题。
- 继续做浏览器端错题反馈 QA，重点验证多选少选/多选、填空带单位答案、排序重复选择、配对漏选时的提示是否清楚。
- 后续移动端 QA 可继续补充更小宽度（例如 360px）和真实手机浏览器检查，重点看长反馈文本、表格横向滚动提示和 canvas 图中文字可读性。
- 如果要进一步提高“下一步复习建议”的精度，可以给错题增加更细的主题标签，例如 `实验误差`、`光路作图`、`图像分析`，再让首页优先推荐具体模块而不只是章节。
- 后续发布按 `RELEASE_CHECKLIST.md` 执行；如果要使用 `gh api`，先处理 GitHub CLI token invalid 问题。
- 如果后续再次出现 GitHub Pages 内容滞后，发布问题优先级高于继续扩内容：先让 Pages deploy 成功，再继续做下一轮站点优化，否则线上用户看不到最新变更。
