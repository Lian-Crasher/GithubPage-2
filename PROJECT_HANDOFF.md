# 项目交接摘要

## 项目目标

为“人教版八年级物理”制作一个覆盖上、下学期的预习与查漏补缺静态站点。站点需要图文并茂、便于探索，每章独立页面，包含知识讲解、互动体验、章节检查，并通过 GitHub Pages 对外访问；首页和导航既要明确区分上下册，也要保持全年连续的学习路径。

上册内容重点不只是覆盖教材六章，也对接深圳南山区 2025-2026 学年八年级上学期期末物理试卷中暴露出的考察方式：图像分析、光路作图、实验步骤、误差判断、项目化应用题和阅读信息题。下册已依据人教版八年级物理下册扩展第七至第十二章，强调力、压强、浮力、功和机械能、简单机械等知识的可视化与可操作理解。

## 当前进展

项目位于 `/Users/lianliu/Documents/GithubPage 2`。目前已完成原生静态网页版本，包含首页、第一至第十二章页面、上下册各自的综合检查页、全年章节导航、阶段检查和综合检查入口。代码结构保持每章独立 HTML；上册沿用每章独立 JS，下册六章共享 `scripts/chapter-volume2.js`，公共样式集中在 `styles/main.css`。

GitHub 仓库为 `Lian-Crasher/GithubPage-2`。GitHub Pages 访问地址：

https://lian-crasher.github.io/GithubPage-2/

截至 2026-07-23，本轮全站分层检测扩展已在 `codex/layered-assessment-preview` 完成功能提交：

- `71711ad Expand layered assessments across all chapters`

本文档提交将紧随功能提交，并与其一起快进合并到 `main`。发布完成后仍需分别核对本地 `HEAD`、`origin/main`、GitHub 远端 `main` 和 Pages 线上内容，不能把“已提交”“已推送”和“已发布”视为同一状态。

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
- `chapters/chapter7-force.html`
- `chapters/chapter8-motion-force.html`
- `chapters/chapter9-pressure.html`
- `chapters/chapter10-buoyancy.html`
- `chapters/chapter11-work-energy.html`
- `chapters/chapter12-simple-machines.html`
- `chapters/final-check-volume2.html`
- `scripts/chapter1-motion.js`
- `scripts/chapter2-sound.js`
- `scripts/chapter3-states.js`
- `scripts/chapter4-light.js`
- `scripts/chapter5-lenses.js`
- `scripts/chapter6-density.js`
- `scripts/final-check.js`
- `scripts/chapter-volume2.js`
- `scripts/final-check-volume2.js`
- `scripts/quiz.js`
- `scripts/common.js`
- `styles/main.css`
- `assets/favicon.svg`
- `RELEASE_CHECKLIST.md`
- `.nojekyll`

章节配图已统一为轻量教学插画风格，资源包括：

- `assets/favicon.svg`
- `assets/chapter1-motion-hero.jpg`
- `assets/chapter2-sound-hero.jpg`
- `assets/chapter3-states-hero.jpg`
- `assets/chapter4-light-hero.jpg`
- `assets/chapter5-lenses-hero.jpg`
- `assets/chapter6-density-hero.jpg`
- `assets/chapter7-force-hero.jpg`
- `assets/chapter8-motion-force-hero.jpg`
- `assets/chapter9-pressure-hero.jpg`
- `assets/chapter10-buoyancy-hero.jpg`
- `assets/chapter11-work-energy-hero.jpg`
- `assets/chapter12-simple-machines-hero.jpg`

下册扩展重点：

- 首页新增上下册切换与第七至第十二章学习地图，同时保持检查进度、错题回看和清空记录能力。
- 第七章补充力的三要素、弹力、重力和力的示意图互动，并统一力箭头为细线、尖角箭头。
- 第八章补充牛顿第一定律、惯性、二力平衡、摩擦力和同一直线上二力合成的互动演示。
- 第九章系统覆盖固体压强、液体压强、连通器、船闸、大气压、托里拆利实验、气压随海拔变化、活塞式抽水机和流体压强。最近一次复审重做了测压管方向、深度标尺、船闸四阶段、玻璃管倾斜、抽水机阀门与水流、纸条和机翼互动。
- 第十章覆盖浮力方向、称重法、阿基米德原理、物体浮沉、轮船、潜水艇、气球飞艇和密度计；溢水实验已明确先浸没、稳定后再比较排液质量，弹簧测力计和力箭头按真实结构重画。
- 第十一章覆盖功、功率、动能、重力势能和机械能转化；互动图已修正物体高度基准、绳物连接、小车车轮与斜面的接触关系，并量化动能和势能。
- 第十二章覆盖杠杆平衡条件、生活杠杆、托盘天平、杆秤、定滑轮、动滑轮、滑轮组和机械效率。
- 新增下册综合检查 `chapters/final-check-volume2.html`，与上册综合检查分开保存与展示，避免上下册学习记录混淆。

全站分层检测扩展：

- 第一至第十二章的章节检查统一为“基础、应用、探究、挑战”四层，学生一次只作答当前层；完成当前层后再进入下一层，降低长题页带来的认知负担。
- 分层导航改为单行紧凑标签，去掉重复的四层说明卡；桌面端和 390px 移动端均保持可读、可操作且无页面级横向溢出。
- 题型覆盖单选、多选、填空、排序和配对；上、下册综合检查也补充诊断层级，保持章节检查与综合检查之间的学习闭环。
- `scripts/quiz.js` 新增数值答案归一化，可接受等值小数、科学计数法和常见单位写法；分层进度会保存题目 key 签名，题库变化后自动使旧的“已通过”状态失效，避免新增题目被历史记录跳过。
- 挑战层提示已修正：基础、应用或探究层尚未完成时，不再显示容易误解为“全章已掌握”的完成文案。
- 参考用户提供的八年级物理试卷，首批加入六道优先级较高的期末卷式变式题：平均速度计时偏差、鸭蛋密度测量、双 U 形管液体密度、浮力控制变量、引体向上功率测量、地下车库机械效率与功率。
- 本轮浏览器 QA 覆盖十二章四层切换、题目可见性、桌面与 390px 布局、挑战层真实提交、数值答案容错、旧进度失效、新进度刷新后保留和控制台错误检查。

近期重点变更：

- 第一章新增“路程-时间图像”期末题型模块。
  - 第一章首图和首页 hero 已切换为生成式位图 `assets/chapter1-motion-hero.jpg`，用斜面小车、刻度尺和秒表表现平均速度实验场景。
  - 小图已标明横轴 `t/s`、纵轴 `s/m` 和原点 `0`。
  - 图线从原点出发，说明水平线段表示静止。
  - 强调 s-t 图像中斜率表示速度；同一时刻高度表示路程，若都从原点出发，较陡的线速度更大。
  - 修正机械运动检查第 7 题：补充“同一地点、同一直线、同方向、相同时间”的条件，并把正文相对运动讲解从图像“向上”改为实际“向前”，避免混淆图像方向和运动方向。
  - 审核后将“斜线向上”改为“倾斜直线向上”，避免把任意上升曲线误说成匀速直线运动。
  - 刻度尺读数说明已统一为“估读到分度值的下一位”：分度值为 1 mm 时记录到 0.1 mm，即 0.01 cm；互动读数和反馈同步保留估读位。
- 第二章首图已切换为生成式位图 `assets/chapter2-sound-hero.jpg`，用音叉、水面波纹、扬声器和玻璃钟罩表现振动、传播和介质相关的声音实验场景。
- 第三章新增水沸腾实验专项和热胀冷缩阅读题专项。
  - 第三章首图已从旧 SVG 切换为生成式位图 `assets/chapter3-states-hero.jpg`，用冰块、清水、蒸汽、冷凝水珠和霜晶表现固态、液态和气态变化；六种物态变化的准确名称继续保留在正文交互模块中。
  - 覆盖器材从下往上安装、沸腾现象判断、沸腾持续吸热、控制变量。
  - 补充线膨胀系数、双金属片温度计、图像判断和改进措施。
  - 新增“实验步骤排序”互动，用上移/下移按钮排列水的沸腾实验步骤，并即时反馈错误位置和正确实验逻辑。
  - 新增“温度计读数姿势纠错”互动：选择从上方斜看、视线相平或从下方斜看，正确反馈强调视线与液柱上表面相平，错题回看会跳到该练习。
  - 修正温度计读数示意图：温度计管和玻璃泡已插入烧杯液体中，刻度保留在外侧便于读数，避免误示为在杯外测温。
  - 优化六种物态变化图：桌面端改为“固态-标签-液态-标签-气态”的稳定网格，移动端改为纵向阅读顺序，避免标签被圆形状态节点遮挡或显示不完整。
- 第四章补强光现象作图与实验专项。
  - 顶部首图已切换为生成式位图 `assets/chapter4-light-hero.jpg`，用灯光、镜面、玻璃块和屏幕表现光的传播、反射、折射和影子；正文互动仍负责更严格的直线传播和光路作图训练。
  - “影子实验台”已从静态光锥改为动态 SVG 光路：挡板移动时，上下边界光线、被挡住的中间光线、挡板后阴影锥和屏上阴影大小同步更新。
  - 第四章页面已对 `styles/main.css` 和 `scripts/chapter4-light.js` 加查询版本号，避免线上/浏览器缓存旧版光路。
  - 反射、折射、平面镜实验卡片已从 CSS 线条改为 SVG 示意图，箭头方向、法线、界面和物像关系更清楚。
  - 水到空气折射图明确标出空气/水界面和“远离法线”。
  - 审核后将反射作图说明改为“入射光线和反射光线分居法线两侧，且与法线夹角相等”，避免误解为反射光线也发生“向法线偏折”。
  - 新增“小孔成像：倒立实像从哪里来”知识卡，用蜡烛、小孔板、光屏和交叉光线说明上端光线到下方、下端光线到上方；第四章检查第 2 题错题回看会跳转到该模块。
  - 新增“光路作图台”互动：可切换反射/折射，调整入射角，选择反射角相等、折射靠近法线或远离法线，并在检查后自动补出正确出射光线。
- 第五章修正透镜应用互动。
  - 顶部首图已切换为生成式位图 `assets/chapter5-lenses-hero.jpg`，用光具座、凸透镜、物体、光屏和倒立实像表现透镜成像场景。
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
  - 第六章首图已切换为生成式位图 `assets/chapter6-density-hero.jpg`，用电子天平、金属块、量筒排水法和不同材料样品表现质量、体积和密度测量。
  - 覆盖天平调平、砝码使用、容器质量扣除、排水法体积、红豆空隙导致密度偏小。
  - 修正第六章检查第 5 题：补充量筒原有水体积 `V1`、小石块完全浸没后水面体积 `V2` 的背景信息，说明 `V2 - V1` 来自排开水的体积。
  - 新增“误差方向诊断”互动，围绕红豆空隙、石块带水、量筒读数偏大、单位换算等情境判断密度偏大/偏小/基本不变，并逐项解释原因。
  - 误差方向诊断已从 4 个情境扩展到 6 个，新增“先在量筒中测液体体积，再倒入烧杯称质量”和“先称总质量、倒入量筒后再称剩余质量”两类液体密度顺序误差。
- 各章检查题和综合检查已扩充。
  - 第一至第十二章均已采用四层检测，不再以旧版单组固定题数描述章节检查。
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
  - `scripts/quiz.js` 现在还会保存错题对应的回看模块、链接和主题标签，供首页生成更具体的下一步复习建议。
  - `scripts/common.js` 会在首页学习地图显示“未检查 / 待巩固 x/y / 已掌握 x/y”进度徽章。
  - `scripts/common.js` 会在首页生成“下一步复习建议”，根据检查记录优先推荐未掌握且得分比例最低的章节；没有记录时推荐第一个未开始章节，六章完成后推荐综合检查。
  - 首页“下一步复习建议”已升级为优先使用最近错题的具体回看模块，例如“s-t 图像”“沸腾条件”“透镜作图”，没有具体错题记录时仍回退到章节级建议。
  - 首页新增“清空检查记录”按钮，可删除浏览器本地 `physics-preview-quiz-progress`，让章节徽章和下一步建议恢复到未检查状态。
  - 检查提交新增完整性校验：有未答题时标出对应题卡，提示题号并阻止计分、答案解析和进度保存；完整作答后才进入原有评分流程。
  - 各章检查、阶段检查和综合检查都已配置 `quizId` 与 `reviewLinks`。
- 测量表述与移动端导航已完成一轮准确性和可用性修正。
  - 温度计读数统一表述为“视线与温度计内液柱上表面相平”，避免把烧杯液面误认为读数基准。
  - 章节导航为当前链接增加 `aria-current="page"`，并在窄屏横向导航中自动滚动到当前章节。
- 页面结构与交互无障碍已完成一轮补强。
  - 六个章节页和综合检查页均设置唯一 `h1`，其余知识模块继续使用 `h2`，页面标题层级完整。
  - 分段选择、状态节点和判断按钮会同步 `.is-active` 与 `aria-pressed`，让视觉状态和屏幕阅读器状态保持一致。
  - 公共样式加入 `prefers-reduced-motion` 降级规则，减少动态效果时关闭平滑滚动并将动画、过渡缩短到近乎即时。
  - 综合检查第 19 题 SVG 的无障碍标题已改为中性数据描述，不再包含“二倍焦距”等解题提示。
- 公共样式新增考试题型卡片、规则卡片、SVG 光路图、公式卡片、填空输入和下拉题样式，并修复窄屏导航可能撑宽页面的问题。
- 已完成一轮 390px 移动端 QA，覆盖首页进度徽章、第三章排序练习、第四章光路作图台、第五章透镜作图台、第六章误差诊断、各章检查和综合检查。主体页面未发现非预期横向溢出；导航和表格保留局部横向滚动。检查题单选/多选项已增强为整行触控目标，主要触控高度约 40px 以上。
- 首页和各章节页的 `styles/main.css` 引用已统一升级到 `?v=42`，`scripts/quiz.js` 升级到 `?v=10`，下册共享脚本 `scripts/chapter-volume2.js` 升级到 `?v=23`，上册各章脚本也已同步提升查询版本号，避免浏览器或 GitHub Pages 继续使用旧版检测架构和样式。
- 发布与页面元信息已完成一轮维护收尾。
  - 首页、六个章节页和综合检查页均补充独立 `meta description`，并统一显式引用 `assets/favicon.svg`。
  - 已确认网页只使用六张 `*-hero.jpg` 章节首图，并删除 12 个不再引用的旧 PNG/SVG 首图资源。
  - 发布检查增加页面描述、favicon 和静态资源加载核对，避免再次出现默认 `favicon.ico` 404 或文档列出已删除资源。
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

- 本文档更新时当前分支为 `codex/layered-assessment-preview`，功能提交为 `71711ad`；交接文档提交完成后将快进合并到 `main` 并推送。
- 发布完成后应重新核对本地 `HEAD`、`origin/main`、远端 `main` 和 Pages 部署结果，并以发布后的实际提交为准。
- 不要假设本地和远端必然同步。每次发布都应核对 `git status -sb`、`HEAD`、`origin/main` 和 Pages 部署结果。

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
- 四层检测已经覆盖多种题型，后续重点应放在各层题量平衡、背景材料充分性、参考答案容错和实验探究题质量，而不是单纯增加题数。
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
node --check scripts/chapter-volume2.js
node --check scripts/final-check-volume2.js
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
- `http://localhost:8000/chapters/chapter9-pressure.html`
- `http://localhost:8000/chapters/chapter10-buoyancy.html`
- `http://localhost:8000/chapters/chapter11-work-energy.html`
- `http://localhost:8000/chapters/chapter12-simple-machines.html`
- `http://localhost:8000/chapters/final-check-volume2.html`

线上访问：

- https://lian-crasher.github.io/GithubPage-2/
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter1-motion.html
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter4-light.html#ray-drawing
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter5-lenses.html#image-rule
- https://lian-crasher.github.io/GithubPage-2/chapters/final-check.html
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter9-pressure.html
- https://lian-crasher.github.io/GithubPage-2/chapters/chapter10-buoyancy.html
- https://lian-crasher.github.io/GithubPage-2/chapters/final-check-volume2.html

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
rg -n "chapter1-motion-hero\\.jpg" /tmp/ghpage-index.html
curl -L -s -D /tmp/ghpage-hero-headers.txt -o /tmp/chapter1-motion-hero.jpg 'https://lian-crasher.github.io/GithubPage-2/assets/chapter1-motion-hero.jpg'
sed -n '1,40p' /tmp/ghpage-hero-headers.txt
```

预期线上发布成功后，首页 HTML 应包含 `assets/chapter1-motion-hero.jpg` 和 `assets/favicon.svg`，对应资源均应返回 HTTP 200。若新资源返回 404，先检查 Pages Actions 的 deploy 状态，再判断是否为缓存或发布延迟。

浏览器验证重点：

- 任一章节检查：四层标签应保持单行紧凑显示，一次只出现当前层题目；未完成前置层时，挑战层不能给出全章完成提示。
- 分层进度：完成某层后刷新页面应保留结果；题库 question key 发生变化时，旧的该层通过状态应自动失效。
- 数值填空：等值小数、科学计数法和题目允许的常见单位写法应按配置正确判分。
- 第一章 `#motion-graph`：坐标轴、原点、斜率含义是否清楚。
- 首页 hero 与第一章首图：是否表达平均速度实验，刻度尺测路程、秒表测时间、`v = s / t` 是否清楚。
- 第一章 `#measure`：1 mm 分度值读数、cm/mm 显示和反馈是否一致。
- 第四章首图：生成式位图是否作为章节氛围图清楚呈现光的传播、反射、折射和影子；严格光路关系以正文 `#straight-light` 和 `#ray-drawing` 为准。
- 第四章 `#straight-light`：拖动挡板时，上下边界光线、被挡住的中间光线、阴影锥和屏上阴影是否同步变化。
- 第四章 `#ray-drawing`：反射光线是否从入射点射出、是否与入射光线分居法线两侧且角度相等；折射是否远离法线，平面镜物像是否对称。
- 第四章 `#ray-drawing` 的“光路作图台”：反射模式选“分居法线两侧，角度相等”应反馈正确；折射模式中空气到水应靠近法线，水到空气应远离法线；移动端 390px 宽度不应横向溢出。
- 首页学习地图：做过章节检查后，应显示“待巩固 x/y”或“已掌握 x/y”进度徽章。
- 第三章 `#boiling-exam`：实验步骤排序应能用上移/下移调整，正确顺序为酒精灯/装置、温度计、加热、记录、结论。
- 第三章 `#temperature-reading-practice`：选择“视线与液柱上表面相平”应反馈正确；从上方/下方斜看应提示会产生偏差。
- 第三章首图：生成式位图是否清楚表现冰块、清水、蒸汽、冷凝水珠和霜晶；正文 `#state-change` 交互图仍需检查六种物态变化名称和吸放热方向是否准确。
- 第五章首图：是否表达凸透镜将物体光线会聚到光屏上形成倒立缩小实像，三条特殊光线是否自洽。
- 第五章 `#lens-basics`：凸透镜会聚、凹透镜发散是否准确。
- 第五章 `#image-rule`：不同物距时像的位置、正倒、大小是否符合凸透镜成像规律。
- 第五章 `#real-virtual-image`：实像是否由实际光线会聚形成并可落在光屏上；虚像是否由实际发散光线的反向延长线形成；光屏是否明确标注且不被误认为光线。
- 第五章 `#eyes-tools`：近视图应显示像在视网膜前方并用凹透镜矫正；远视图应显示像在视网膜后方并用凸透镜矫正。
- 第五章 `#lens-practice`：平行主光轴应选“通过另一侧焦点”，过焦点应选“平行于主光轴”，过光心应选“方向不改变”；390px 移动宽度不应横向溢出。
- 第六章 `#density-errors`：误差方向表述是否准确；误差方向诊断中红豆总体积偏大和量筒读数偏大应判密度偏小，石块带水称质量应判密度偏大，正确单位换算应基本不变。
- 第六章首图：天平测质量、量筒排水法测体积、`ρ = m / V` 三者是否形成清楚的实验链条。
- 独立页面 `chapters/final-check.html`：综合检查应有 20 张题卡，其中后 12 题为混合题型。正确填写后应显示 `上册预习非常稳：20/20`；内嵌 SVG 图像题的坐标轴和标注应清楚；移动端 390px 宽度不应横向溢出。
- 首页：上下册切换、十二章学习地图和上下册综合检查入口应能正确显示；切换学期后地址参数和当前状态一致。
- 第九章：测压管方向和深度变化应自洽；船闸四阶段、托里拆利倾斜实验、海拔气压、抽水机阀门与流向、纸条和机翼互动应符合物理规律。
- 第十章：称重法应满足 `F浮 = G - F示`；溢水实验应在物体浸入并稳定后显示排液；浮沉状态、排水量和密度计读数应相互一致。
- 第十一章：物体位于地面时高度为 0，绳子与物体连接；斜面小车车轮接触斜面，动能和势能量化结果与控件同步。
- 下册综合检查 `chapters/final-check-volume2.html`：题目、反馈、错题回看和下册进度保存应完整，且不覆盖上册综合检查记录。

## 下一步建议

优先级从高到低：

- 继续做更细的全站物理准确性复审，优先检查新增试卷变式题、数值答案容错、排序/配对题和各层难度是否符合教材规律与学习路径。
- 继续优化四层题量与题型分布，尤其把更多实验题组织成“步骤判断 + 误差分析 + 结论表达”的组合任务，同时控制单层长度。
- 继续做浏览器端错题反馈 QA，重点验证多选少选/多选、填空带单位答案、排序重复选择、配对漏选时的提示是否清楚。
- 后续移动端 QA 可继续补充更小宽度（例如 360px）和真实手机浏览器检查，重点看长反馈文本、表格横向滚动提示和 canvas 图中文字可读性。
- 如果要进一步提高“下一步复习建议”的精度，可以给错题增加更细的主题标签，例如 `实验误差`、`光路作图`、`图像分析`，再让首页优先推荐具体模块而不只是章节。
- 后续发布按 `RELEASE_CHECKLIST.md` 执行；如果要使用 `gh api`，先处理 GitHub CLI token invalid 问题。
- 如果后续再次出现 GitHub Pages 内容滞后，发布问题优先级高于继续扩内容：先让 Pages deploy 成功，再继续做下一轮站点优化，否则线上用户看不到最新变更。
