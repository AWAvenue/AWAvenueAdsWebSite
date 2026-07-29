<template>
  <section class="subscribe-wizard">
    <header class="wizard-header">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h2>{{ copy.title }}</h2>
      <p>{{ copy.intro }}</p>
    </header>

    <div class="wizard-shell">
      <div v-if="step !== 'result'" class="progress" aria-hidden="true">
        <span>{{ progressLabel }}</span>
        <div class="progress-track">
          <span :style="{ width: `${progressPercent}%` }"></span>
        </div>
      </div>

      <div v-if="step === 'tool'" class="question-panel">
        <div class="question-heading">
          <p class="step-label">{{ copy.stepOne }}</p>
          <h3>{{ copy.toolQuestion }}</h3>
          <p>{{ copy.toolHelp }}</p>
        </div>

        <label class="tool-search">
          <span class="sr-only">{{ copy.searchLabel }}</span>
          <input v-model="toolQuery" type="search" :placeholder="copy.searchPlaceholder" autocomplete="off" />
        </label>

        <div v-for="group in visibleGroups" :key="group" class="tool-group">
          <h4>{{ copy.groups[group] }}</h4>
          <div class="tool-grid">
            <button v-for="tool in filteredTools(group)" :key="tool.id" type="button" class="choice-card tool-card" @click="chooseTool(tool.id)">
              <strong>{{ tool.label }}</strong>
              <span>{{ tool.supportsVariants === false ? copy.independentRule : copy.fourProfiles }}</span>
            </button>
          </div>
        </div>

        <p v-if="visibleGroups.length === 0" class="empty-state">{{ copy.noTools }}</p>
      </div>

      <div v-else-if="step === 'privacy'" class="question-panel narrow-panel">
        <button class="back-button" type="button" @click="resetWizard">{{ copy.backToTools }}</button>
        <div class="question-heading">
          <p class="step-label">{{ copy.stepTwo }}</p>
          <h3>{{ copy.privacyQuestion }}</h3>
          <p>{{ copy.privacyHelp }}</p>
        </div>
        <div class="answer-grid">
          <button type="button" class="choice-card answer-card recommended" @click="answerPrivacy(true)">
            <span class="recommend-badge">{{ copy.recommended }}</span>
            <strong>{{ copy.blockPrivacy }}</strong>
            <span>{{ copy.blockPrivacyHelp }}</span>
          </button>
          <button type="button" class="choice-card answer-card" @click="answerPrivacy(false)">
            <strong>{{ copy.keepPrivacy }}</strong>
            <span>{{ copy.keepPrivacyHelp }}</span>
          </button>
        </div>
      </div>

      <div v-else-if="step === 'unwelcome'" class="question-panel narrow-panel">
        <button class="back-button" type="button" @click="goBackToPrivacy">{{ copy.previous }}</button>
        <div class="question-heading">
          <p class="step-label">{{ copy.stepThree }}</p>
          <h3>{{ copy.unwelcomeQuestion }}</h3>
          <p>{{ copy.unwelcomeHelp }}</p>
        </div>
        <div class="answer-grid">
          <button type="button" class="choice-card answer-card recommended" @click="answerUnwelcome(true)">
            <span class="recommend-badge">{{ copy.recommended }}</span>
            <strong>{{ copy.blockUnwelcome }}</strong>
            <span>{{ copy.blockUnwelcomeHelp }}</span>
          </button>
          <button type="button" class="choice-card answer-card" @click="answerUnwelcome(false)">
            <strong>{{ copy.keepUnwelcome }}</strong>
            <span>{{ copy.keepUnwelcomeHelp }}</span>
          </button>
        </div>
      </div>

      <div v-else-if="selectedTool" class="result-panel">
        <div class="result-summary">
          <div>
            <p class="eyebrow">{{ copy.resultEyebrow }}</p>
            <h3>{{ selectedTool.label }} · {{ profileCopy.title }}</h3>
            <p>{{ profileCopy.description }}</p>
          </div>
          <button class="secondary-button" type="button" @click="editAnswers">{{ copy.changeAnswers }}</button>
        </div>

        <ul v-if="selectedTool.supportsVariants !== false" class="coverage-list" :aria-label="copy.coverageLabel">
          <li class="enabled">{{ copy.ads }}</li>
          <li :class="{ enabled: blockPrivacy }">{{ copy.privacy }}</li>
          <li :class="{ enabled: blockUnwelcome }">{{ copy.unwelcome }}</li>
        </ul>

        <div class="result-actions">
          <a class="tutorial-link" :href="tutorialLink">{{ copy.viewTutorial }}</a>
          <span
            >{{ copy.filename }}：<code>{{ resultFilename }}</code></span
          >
        </div>

        <div class="source-intro">
          <h3>{{ copy.sourceTitle }}</h3>
          <p>{{ copy.sourceIntro }}</p>
          <div class="source-note">{{ copy.sameRuleNote }}</div>
        </div>

        <section class="source-section">
          <div class="source-section-heading">
            <h4>{{ copy.domesticSources }}</h4>
            <p>{{ copy.domesticSourcesHelp }}</p>
          </div>
          <div class="source-grid">
            <article v-for="item in domesticLinks" :key="item.source.id" class="source-card domestic-card">
              <div class="source-card-heading">
                <div>
                  <h5>{{ copy.sources[item.source.id].name }}</h5>
                  <p>{{ copy.sources[item.source.id].description }}</p>
                </div>
                <span class="source-badge">{{ copy.sources[item.source.id].badge }}</span>
              </div>
              <LinkContainer
                :link="item.link"
                :copy-label="copy.copyLink"
                :copied-label="copy.copied"
                :copied-message="`${copy.copiedMessage}${copy.sources[item.source.id].name}`"
              />
            </article>
          </div>
        </section>

        <section class="source-section">
          <div class="source-section-heading">
            <h4>{{ copy.otherSources }}</h4>
            <p>{{ copy.otherSourcesHelp }}</p>
          </div>
          <div class="source-grid">
            <article v-for="item in otherLinks" :key="item.source.id" class="source-card">
              <div class="source-card-heading">
                <div>
                  <h5>{{ copy.sources[item.source.id].name }}</h5>
                  <p>{{ copy.sources[item.source.id].description }}</p>
                </div>
                <span class="source-badge">{{ copy.sources[item.source.id].badge }}</span>
              </div>
              <LinkContainer
                :link="item.link"
                :copy-label="copy.copyLink"
                :copied-label="copy.copied"
                :copied-message="`${copy.copiedMessage}${copy.sources[item.source.id].name}`"
              />
            </article>
          </div>
        </section>

        <p v-if="availableLinks.length < sources.length" class="availability-note">{{ copy.unavailableNote }}</p>
      </div>
    </div>

    <footer class="wizard-footer">
      <p>{{ copy.footer }}</p>
      <span class="footer-links">
        <a :href="localePath('/Protocol.html')">{{ copy.protocol }}</a>
        <a :href="localePath('/Support.html')">{{ copy.feedback }}</a>
      </span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { getFilename, getSubscriptionLink, getTool, getVariantId, sources, tools, type SourceId, type ToolGroup, type VariantId } from '../../../SubData'
import LinkContainer from './linkContainer.vue'

type CopySet = {
  eyebrow: string
  title: string
  intro: string
  stepOne: string
  stepTwo: string
  stepThree: string
  toolQuestion: string
  toolHelp: string
  searchLabel: string
  searchPlaceholder: string
  groups: Record<ToolGroup, string>
  independentRule: string
  fourProfiles: string
  noTools: string
  backToTools: string
  previous: string
  privacyQuestion: string
  privacyHelp: string
  blockPrivacy: string
  blockPrivacyHelp: string
  keepPrivacy: string
  keepPrivacyHelp: string
  unwelcomeQuestion: string
  unwelcomeHelp: string
  blockUnwelcome: string
  blockUnwelcomeHelp: string
  keepUnwelcome: string
  keepUnwelcomeHelp: string
  recommended: string
  resultEyebrow: string
  changeAnswers: string
  coverageLabel: string
  ads: string
  privacy: string
  unwelcome: string
  viewTutorial: string
  filename: string
  sourceTitle: string
  sourceIntro: string
  sameRuleNote: string
  domesticSources: string
  domesticSourcesHelp: string
  otherSources: string
  otherSourcesHelp: string
  copyLink: string
  copied: string
  copiedMessage: string
  unavailableNote: string
  footer: string
  protocol: string
  feedback: string
  profiles: Record<VariantId | 'independent', { title: string; description: string }>
  sources: Record<SourceId, { name: string; description: string; badge: string }>
}

const copySets: Record<string, CopySet> = {
  'zh-CN': {
    eyebrow: '互动式订阅生成器',
    title: '回答三个问题，生成适合你的订阅',
    intro: '不需要先弄懂文件名和规则语法。告诉我们你使用的工具和希望拦截的内容即可。',
    stepOne: '第 1 / 3 步',
    stepTwo: '第 2 / 3 步',
    stepThree: '第 3 / 3 步',
    toolQuestion: '你正在使用什么工具？',
    toolHelp: '选择你准备导入秋风广告规则的应用、代理客户端或 DNS 服务。',
    searchLabel: '搜索工具',
    searchPlaceholder: '搜索 AdGuard、Clash、Surge……',
    groups: { popular: '常用工具', proxy: '代理客户端与格式', dns: 'DNS、路由器与 hosts', advanced: '进阶与独立规则' },
    independentRule: '独立规则，不参与四种方案',
    fourProfiles: '支持四种拦截方案',
    noTools: '没有找到匹配的工具，可以换个关键词试试。',
    backToTools: '← 重新选择工具',
    previous: '← 上一步',
    privacyQuestion: '是否拦截隐私统计与遥测？',
    privacyHelp: '包括统计埋点、遥测、崩溃收集和设备指纹。拦截后隐私更强，但少数功能可能受影响。',
    blockPrivacy: '拦截，减少追踪',
    blockPrivacyHelp: '加入隐私类规则，降低统计、遥测与设备指纹请求。',
    keepPrivacy: '保留，兼容优先',
    keepPrivacyHelp: '不加入隐私类规则，仅处理其他已选择的内容。',
    unwelcomeQuestion: '是否拦截不受欢迎的网络行为？',
    unwelcomeHelp: '包括强制更新、P2P/PCDN、推送和云控下发。请根据你的设备用途选择。',
    blockUnwelcome: '拦截，干预更强',
    blockUnwelcomeHelp: '加入不受欢迎类规则，减少强更、PCDN、推送和云控请求。',
    keepUnwelcome: '保留，减少影响',
    keepUnwelcomeHelp: '不加入不受欢迎类规则，保留这些连接。',
    recommended: '推荐',
    resultEyebrow: '你的订阅方案',
    changeAnswers: '修改选择',
    coverageLabel: '方案包含内容',
    ads: '广告',
    privacy: '隐私与遥测',
    unwelcome: '强更、PCDN、推送与云控',
    viewTutorial: '查看导入教程',
    filename: '技术文件名',
    sourceTitle: '选择订阅源并一键复制',
    sourceIntro: '国内网络建议优先尝试前三条镜像线路；如果某条线路无法更新，直接替换为另一条即可。',
    sameRuleNote: '所有线路提供的是同一份秋风广告规则，仅访问路径和同步速度不同。社区镜像由第三方提供。',
    domesticSources: '国内网络推荐',
    domesticSourcesHelp: '针对国内访问环境优化，按推荐顺序排列。',
    otherSources: '官方与备用线路',
    otherSourcesHelp: '适合能够访问 GitHub 的环境，或作为镜像故障时的备用。',
    copyLink: '复制订阅链接',
    copied: '已复制',
    copiedMessage: '已复制：',
    unavailableNote: '当前格式有少量镜像尚未提供，因此仅展示确认可用的线路。',
    footer: '订阅前请阅读用户协议；遇到误杀、漏拦或链接故障，欢迎反馈。',
    protocol: '用户协议',
    feedback: '反馈渠道',
    profiles: {
      full: { title: '完整防护', description: '同时拦截广告、隐私追踪与不受欢迎的网络行为，保持秋风广告规则的默认完整体验。' },
      ads: { title: '纯广告', description: '只拦截广告相关请求，干预最少，适合更重视功能兼容的环境。' },
      noPrivacy: { title: '广告＋不受欢迎', description: '拦截广告、强更、PCDN、推送与云控，不拦截隐私统计与遥测。' },
      noUnwelcome: { title: '广告＋隐私', description: '拦截广告、统计遥测与设备指纹，保留强更、PCDN、推送和云控连接。' },
      independent: { title: '独立规则', description: '这个格式目前不参与四种分类方案，下面提供它现有的独立订阅。' }
    },
    sources: {
      tmby: { name: '天命 CFCDN', description: '维护者提供的 GitHub Raw 反向代理，更新及时，适合国内网络。', badge: '国内推荐' },
      cxplay: { name: 'CXPLAY 镜像', description: '社区提供的即时镜像服务，针对国内网络优化。', badge: '即时镜像' },
      uura: { name: '王富贵镜像', description: '社区镜像，约每小时同步一次，适合日常稳定订阅。', badge: '约一小时同步' },
      ghraw: { name: 'GitHub Raw', description: '官方文件直链，实时更新；部分国内网络可能无法访问。', badge: '官方实时' },
      jsdelivr: { name: 'jsDelivr', description: 'CDN 加速线路，通常较稳定，但缓存可能导致更新延迟。', badge: 'CDN 备用' },
      ghproxy: { name: 'ghproxy', description: 'GitHub 反向代理，更新通常较快，但服务稳定性可能波动。', badge: '备用线路' }
    }
  },
  'zh-TW': {
    eyebrow: '互動式訂閱產生器',
    title: '回答三個問題，產生適合你的訂閱',
    intro: '不需要先弄懂檔案名稱和規則語法。告訴我們你使用的工具和希望攔截的內容即可。',
    stepOne: '第 1 / 3 步',
    stepTwo: '第 2 / 3 步',
    stepThree: '第 3 / 3 步',
    toolQuestion: '你正在使用什麼工具？',
    toolHelp: '選擇你準備匯入秋風廣告規則的應用程式、代理用戶端或 DNS 服務。',
    searchLabel: '搜尋工具',
    searchPlaceholder: '搜尋 AdGuard、Clash、Surge……',
    groups: { popular: '常用工具', proxy: '代理用戶端與格式', dns: 'DNS、路由器與 hosts', advanced: '進階與獨立規則' },
    independentRule: '獨立規則，不參與四種方案',
    fourProfiles: '支援四種攔截方案',
    noTools: '找不到符合的工具，可以換個關鍵字試試。',
    backToTools: '← 重新選擇工具',
    previous: '← 上一步',
    privacyQuestion: '是否攔截隱私統計與遙測？',
    privacyHelp: '包括統計埋點、遙測、崩潰收集和裝置指紋。攔截後隱私更強，但少數功能可能受影響。',
    blockPrivacy: '攔截，減少追蹤',
    blockPrivacyHelp: '加入隱私類規則，降低統計、遙測與裝置指紋請求。',
    keepPrivacy: '保留，相容優先',
    keepPrivacyHelp: '不加入隱私類規則，只處理其他已選擇的內容。',
    unwelcomeQuestion: '是否攔截不受歡迎的網路行為？',
    unwelcomeHelp: '包括強制更新、P2P/PCDN、推送和雲端控制下發。請依照裝置用途選擇。',
    blockUnwelcome: '攔截，干預更強',
    blockUnwelcomeHelp: '加入不受歡迎類規則，減少強更、PCDN、推送和雲端控制請求。',
    keepUnwelcome: '保留，減少影響',
    keepUnwelcomeHelp: '不加入不受歡迎類規則，保留這些連線。',
    recommended: '推薦',
    resultEyebrow: '你的訂閱方案',
    changeAnswers: '修改選擇',
    coverageLabel: '方案包含內容',
    ads: '廣告',
    privacy: '隱私與遙測',
    unwelcome: '強更、PCDN、推送與雲端控制',
    viewTutorial: '查看匯入教學',
    filename: '技術檔案名稱',
    sourceTitle: '選擇訂閱源並一鍵複製',
    sourceIntro: '國內網路建議優先嘗試前三條鏡像線路；如果某條線路無法更新，直接替換另一條即可。',
    sameRuleNote: '所有線路提供的是同一份秋風廣告規則，只有存取路徑和同步速度不同。社群鏡像由第三方提供。',
    domesticSources: '國內網路推薦',
    domesticSourcesHelp: '針對國內存取環境最佳化，依推薦順序排列。',
    otherSources: '官方與備用線路',
    otherSourcesHelp: '適合能夠存取 GitHub 的環境，或作為鏡像故障時的備用。',
    copyLink: '複製訂閱連結',
    copied: '已複製',
    copiedMessage: '已複製：',
    unavailableNote: '目前格式有少量鏡像尚未提供，因此只顯示確認可用的線路。',
    footer: '訂閱前請閱讀使用者協議；遇到誤殺、漏攔或連結故障，歡迎回報。',
    protocol: '使用者協議',
    feedback: '回報管道',
    profiles: {
      full: { title: '完整防護', description: '同時攔截廣告、隱私追蹤與不受歡迎的網路行為，保留秋風廣告規則的預設完整體驗。' },
      ads: { title: '純廣告', description: '只攔截廣告相關請求，干預最少，適合更重視功能相容的環境。' },
      noPrivacy: { title: '廣告＋不受歡迎', description: '攔截廣告、強更、PCDN、推送與雲端控制，不攔截隱私統計與遙測。' },
      noUnwelcome: { title: '廣告＋隱私', description: '攔截廣告、統計遙測與裝置指紋，保留強更、PCDN、推送和雲端控制連線。' },
      independent: { title: '獨立規則', description: '此格式目前不參與四種分類方案，下方提供既有的獨立訂閱。' }
    },
    sources: {
      tmby: { name: '天命 CFCDN', description: '維護者提供的 GitHub Raw 反向代理，更新即時，適合國內網路。', badge: '國內推薦' },
      cxplay: { name: 'CXPLAY 鏡像', description: '社群提供的即時鏡像服務，針對國內網路最佳化。', badge: '即時鏡像' },
      uura: { name: '王富貴鏡像', description: '社群鏡像，約每小時同步一次，適合日常穩定訂閱。', badge: '約一小時同步' },
      ghraw: { name: 'GitHub Raw', description: '官方檔案直連， 即時更新；部分國內網路可能無法存取。', badge: '官方即時' },
      jsdelivr: { name: 'jsDelivr', description: 'CDN 加速線路，通常較穩定，但快取可能造成更新延遲。', badge: 'CDN 備用' },
      ghproxy: { name: 'ghproxy', description: 'GitHub 反向代理，更新通常較快，但服務穩定性可能波動。', badge: '備用線路' }
    }
  },
  'en-US': {
    eyebrow: 'Interactive subscription builder',
    title: 'Answer three questions to build your subscription',
    intro: 'You do not need to understand filenames or rule syntax first. Choose your tool and what you want to block.',
    stepOne: 'Step 1 of 3',
    stepTwo: 'Step 2 of 3',
    stepThree: 'Step 3 of 3',
    toolQuestion: 'Which tool are you using?',
    toolHelp: 'Choose the app, proxy client, DNS service, or format that will import AWAvenue Ads Rule.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Search AdGuard, Clash, Surge…',
    groups: { popular: 'Popular tools', proxy: 'Proxy clients and formats', dns: 'DNS, routers, and hosts', advanced: 'Advanced and standalone rules' },
    independentRule: 'Standalone rule without four profiles',
    fourProfiles: 'Supports all four blocking profiles',
    noTools: 'No matching tool found. Try another keyword.',
    backToTools: '← Choose another tool',
    previous: '← Previous',
    privacyQuestion: 'Block analytics and privacy telemetry?',
    privacyHelp: 'This includes analytics, telemetry, crash reporting, and device fingerprinting. Blocking improves privacy but may affect a few features.',
    blockPrivacy: 'Block for stronger privacy',
    blockPrivacyHelp: 'Include the privacy category to reduce analytics, telemetry, and fingerprint requests.',
    keepPrivacy: 'Keep for compatibility',
    keepPrivacyHelp: 'Do not include the privacy category; only block the other content you select.',
    unwelcomeQuestion: 'Block unwanted network behavior?',
    unwelcomeHelp: 'This includes forced updates, P2P/PCDN, push services, and remote configuration.',
    blockUnwelcome: 'Block for stronger control',
    blockUnwelcomeHelp: 'Include the unwanted category to reduce forced updates, PCDN, push, and remote-control requests.',
    keepUnwelcome: 'Keep to reduce impact',
    keepUnwelcomeHelp: 'Do not include the unwanted category and preserve these connections.',
    recommended: 'Recommended',
    resultEyebrow: 'Your subscription profile',
    changeAnswers: 'Change answers',
    coverageLabel: 'Included categories',
    ads: 'Advertising',
    privacy: 'Privacy and telemetry',
    unwelcome: 'Forced updates, PCDN, push, and remote control',
    viewTutorial: 'View import guide',
    filename: 'Technical filename',
    sourceTitle: 'Choose a source and copy',
    sourceIntro: 'For mainland networks, try the first three mirrors. If one source stops updating, replace it with another.',
    sameRuleNote: 'Every source delivers the same AWAvenue Ads Rule. Only the access route and sync timing differ. Community mirrors are third-party services.',
    domesticSources: 'Recommended for mainland networks',
    domesticSourcesHelp: 'Optimized for access from mainland networks, in recommended order.',
    otherSources: 'Official and fallback sources',
    otherSourcesHelp: 'Best when GitHub is reachable, or as fallbacks when a mirror is unavailable.',
    copyLink: 'Copy subscription',
    copied: 'Copied',
    copiedMessage: 'Copied: ',
    unavailableNote: 'A few mirrors do not provide this format, so only confirmed working sources are shown.',
    footer: 'Read the user protocol before subscribing. Reports of false positives, missed ads, and broken links are welcome.',
    protocol: 'User Protocol',
    feedback: 'Support channels',
    profiles: {
      full: {
        title: 'Full protection',
        description: 'Blocks advertising, privacy tracking, and unwanted network behavior—the complete default AWAvenue Ads Rule experience.'
      },
      ads: { title: 'Ads only', description: 'Blocks advertising requests only, with the least intervention for compatibility-first environments.' },
      noPrivacy: { title: 'Ads + unwanted', description: 'Blocks ads, forced updates, PCDN, push, and remote control, while keeping analytics and telemetry.' },
      noUnwelcome: {
        title: 'Ads + privacy',
        description: 'Blocks ads, analytics, telemetry, and fingerprinting, while keeping forced updates, PCDN, push, and remote control.'
      },
      independent: {
        title: 'Standalone rule',
        description: 'This format does not currently participate in the four profiles. Its existing standalone subscription is provided below.'
      }
    },
    sources: {
      tmby: { name: 'TMBy CFCDN', description: 'A maintainer-provided GitHub Raw proxy with timely updates for mainland networks.', badge: 'Mainland pick' },
      cxplay: { name: 'CXPLAY Mirror', description: 'A real-time community mirror optimized for mainland networks.', badge: 'Real-time mirror' },
      uura: { name: 'Uura Mirror', description: 'A community mirror that syncs about once per hour.', badge: 'Hourly sync' },
      ghraw: { name: 'GitHub Raw', description: 'The official real-time file URL; it may be unreachable on some mainland networks.', badge: 'Official live' },
      jsdelivr: { name: 'jsDelivr', description: 'A generally stable CDN route whose cache may delay updates.', badge: 'CDN fallback' },
      ghproxy: { name: 'ghproxy', description: 'A GitHub proxy with usually fast updates but variable service stability.', badge: 'Fallback' }
    }
  }
}

const { lang } = useData()
const copy = computed(() => copySets[lang.value] || copySets['zh-CN'])

const toolQuery = ref('')
const selectedToolId = ref('')
const blockPrivacy = ref<boolean | null>(null)
const blockUnwelcome = ref<boolean | null>(null)

const selectedTool = computed(() => getTool(selectedToolId.value))
const step = computed<'tool' | 'privacy' | 'unwelcome' | 'result'>(() => {
  if (!selectedTool.value) return 'tool'
  if (selectedTool.value.supportsVariants === false) return 'result'
  if (blockPrivacy.value === null) return 'privacy'
  if (blockUnwelcome.value === null) return 'unwelcome'
  return 'result'
})

const progressPercent = computed(() => ({ tool: 33, privacy: 66, unwelcome: 100, result: 100 })[step.value])
const progressLabel = computed(() => ({ tool: copy.value.stepOne, privacy: copy.value.stepTwo, unwelcome: copy.value.stepThree, result: '' })[step.value])

const visibleGroups = computed(() => (['popular', 'proxy', 'dns', 'advanced'] as ToolGroup[]).filter(group => filteredTools(group).length > 0))

function filteredTools(group: ToolGroup) {
  const query = toolQuery.value.trim().toLocaleLowerCase()
  return tools.filter(tool => tool.group === group && (!query || tool.label.toLocaleLowerCase().includes(query)))
}

const variantId = computed<VariantId>(() => {
  if (selectedTool.value?.supportsVariants === false) return 'full'
  return getVariantId(Boolean(blockPrivacy.value), Boolean(blockUnwelcome.value))
})

const profileCopy = computed(() => (selectedTool.value?.supportsVariants === false ? copy.value.profiles.independent : copy.value.profiles[variantId.value]))

const resultFilename = computed(() => (selectedTool.value ? getFilename(selectedTool.value, variantId.value) : ''))

const availableLinks = computed(() => {
  if (!selectedTool.value) return []
  return sources
    .map(source => ({
      source,
      link: getSubscriptionLink(selectedTool.value!, variantId.value, source.id)
    }))
    .filter(item => item.link)
})

const domesticLinks = computed(() => availableLinks.value.filter(item => item.source.domestic))
const otherLinks = computed(() => availableLinks.value.filter(item => !item.source.domestic))

const tutorialLink = computed(() => {
  const tutorialMap: Record<string, string> = {
    adguard: '/AdGuard.html',
    quantumultX: '/QuantumultX.html',
    shadowrocket: '/ShadowRocket.html',
    loon: '/Loon.html'
  }
  return localePath(tutorialMap[selectedToolId.value] || '/Knowledge.html')
})

function localePath(path: string) {
  const prefix = lang.value === 'en-US' ? '/en' : lang.value === 'zh-TW' ? '/zh_TW' : ''
  return `${prefix}${path}`
}

function chooseTool(toolId: string) {
  selectedToolId.value = toolId
  blockPrivacy.value = null
  blockUnwelcome.value = null
  persistState()
}

function answerPrivacy(value: boolean) {
  blockPrivacy.value = value
  blockUnwelcome.value = null
  persistState()
}

function answerUnwelcome(value: boolean) {
  blockUnwelcome.value = value
  persistState()
}

function resetWizard() {
  selectedToolId.value = ''
  blockPrivacy.value = null
  blockUnwelcome.value = null
  persistState()
}

function goBackToPrivacy() {
  blockPrivacy.value = null
  blockUnwelcome.value = null
  persistState()
}

function editAnswers() {
  if (selectedTool.value?.supportsVariants === false) {
    resetWizard()
    return
  }
  blockUnwelcome.value = null
  persistState()
}

function persistState() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams()
  if (selectedToolId.value) params.set('tool', selectedToolId.value)
  if (blockPrivacy.value !== null) params.set('privacy', blockPrivacy.value ? 'block' : 'keep')
  if (blockUnwelcome.value !== null) params.set('unwelcome', blockUnwelcome.value ? 'block' : 'keep')
  const query = params.toString()
  window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const toolId = params.get('tool')
  if (toolId && getTool(toolId)) selectedToolId.value = toolId

  const privacy = params.get('privacy')
  if (privacy === 'block' || privacy === 'keep') blockPrivacy.value = privacy === 'block'

  const unwelcome = params.get('unwelcome')
  if (unwelcome === 'block' || unwelcome === 'keep') blockUnwelcome.value = unwelcome === 'block'
})
</script>

<style>
.subscription-page .VPDoc {
  padding: 0;
}

.subscription-page .VPPage {
  width: min(1280px, calc(100% - 48px));
  margin-inline: auto;
}

.subscription-page .container {
  max-width: none;
}

.subscription-page .content {
  max-width: none;
}

.subscription-page .content-container {
  max-width: 1180px;
}

.subscribe-wizard {
  --wizard-border: color-mix(in srgb, var(--vp-c-brand-1) 18%, var(--vp-c-divider));
  padding-bottom: 32px;
}

.wizard-header {
  max-width: 780px;
  margin-bottom: 28px;
}

.wizard-header h2 {
  margin: 4px 0 10px;
  border: 0;
  font-size: clamp(28px, 5vw, 42px);
  line-height: 1.15;
}

.wizard-header > p:last-child {
  color: var(--vp-c-text-2);
  font-size: 17px;
}

.eyebrow,
.step-label {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wizard-shell {
  min-height: 440px;
  border: 1px solid var(--wizard-border);
  border-radius: 20px;
  padding: clamp(20px, 4vw, 38px);
  background: radial-gradient(circle at 100% 0, var(--vp-c-brand-soft), transparent 34%), var(--vp-c-bg-soft);
}

.progress {
  display: grid;
  grid-template-columns: auto minmax(120px, 260px);
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 650;
}

.progress-track {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transition: width 0.25s ease;
}

.question-heading {
  max-width: 720px;
  margin-bottom: 24px;
}

.question-heading h3 {
  margin: 6px 0 8px;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.25;
}

.question-heading p:last-child {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

.narrow-panel {
  max-width: 860px;
  margin: 0 auto;
}

.back-button,
.secondary-button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  padding: 8px 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-weight: 600;
  cursor: pointer;
}

.back-button {
  margin-bottom: 22px;
}

.back-button:hover,
.back-button:focus-visible,
.secondary-button:hover,
.secondary-button:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tool-search {
  display: block;
  max-width: 600px;
  margin-bottom: 28px;
}

.tool-search input {
  width: 100%;
  height: 48px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0 16px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
  outline: none;
}

.tool-search input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.tool-group + .tool-group {
  margin-top: 26px;
}

.tool-group h4,
.source-section-heading h4 {
  margin: 0 0 12px;
  font-size: 16px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.choice-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 18px;
  text-align: left;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.choice-card:hover,
.choice-card:focus-visible {
  border-color: var(--vp-c-brand-1);
  outline: none;
  box-shadow: 0 10px 28px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  transform: translateY(-2px);
}

.choice-card strong {
  font-size: 16px;
}

.choice-card > span:last-child {
  margin-top: 6px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.answer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.answer-card {
  min-height: 180px;
  justify-content: center;
  padding: 26px;
}

.answer-card strong {
  font-size: 20px;
}

.answer-card.recommended {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 48%, var(--vp-c-divider));
}

.recommend-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  border-radius: 999px;
  padding: 3px 9px;
  color: var(--vp-c-brand-1) !important;
  background: var(--vp-c-brand-soft);
  font-size: 12px !important;
  font-weight: 700;
}

.result-summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-summary h3 {
  margin: 6px 0 8px;
  font-size: clamp(25px, 4vw, 36px);
}

.result-summary p:last-child {
  max-width: 760px;
  margin: 0;
  color: var(--vp-c-text-2);
}

.coverage-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 14px;
  padding: 0;
  list-style: none;
}

.coverage-list li {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 6px 11px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  text-decoration: line-through;
}

.coverage-list li.enabled {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  text-decoration: none;
}

.coverage-list li.enabled::before {
  content: '✓ ';
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.tutorial-link {
  border-radius: 9px;
  padding: 9px 14px;
  color: var(--vp-c-white);
  background: var(--vp-c-brand-1);
  font-weight: 700;
}

.tutorial-link:hover {
  color: var(--vp-c-white);
  background: var(--vp-c-brand-2);
}

.source-intro {
  margin-top: 38px;
}

.source-intro h3 {
  margin-bottom: 8px;
  font-size: 25px;
}

.source-intro > p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.source-note {
  margin-top: 14px;
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  padding: 11px 14px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-brand-soft);
  font-size: 14px;
}

.source-section {
  margin-top: 30px;
}

.source-section-heading p {
  margin: -6px 0 14px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.source-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.source-card {
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 15px;
  padding: 18px;
  background: var(--vp-c-bg);
}

.domestic-card {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
}

.source-card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  min-height: 86px;
}

.source-card h5 {
  margin: 0 0 5px;
  font-size: 17px;
}

.source-card p {
  margin: 0 0 14px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

.source-badge {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 4px 8px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-size: 11px;
  font-weight: 700;
}

.availability-note,
.empty-state {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.wizard-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 20px;
  margin-top: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.wizard-footer p {
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 14px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 820px) {
  .tool-grid,
  .source-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .subscription-page .VPPage {
    width: min(100%, calc(100% - 32px));
  }

  .wizard-shell {
    min-height: 0;
    margin-inline: -12px;
    border-radius: 16px;
    padding: 20px 16px;
  }

  .progress {
    grid-template-columns: auto 1fr;
  }

  .tool-grid,
  .answer-grid,
  .source-grid {
    grid-template-columns: 1fr;
  }

  .answer-card {
    min-height: 150px;
  }

  .result-summary {
    flex-direction: column;
  }

  .source-card-heading {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .choice-card,
  .progress-track span {
    transition: none;
  }
}
</style>
