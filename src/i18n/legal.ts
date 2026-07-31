export interface LegalSection {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export interface LegalDocument {
  eyebrow: string
  title: string
  effectiveDate: string
  sections: LegalSection[]
  footer: string
}

export const legalMessages: Record<string, {
  legalPrivacy: LegalDocument
  legalTerms: LegalDocument
}> = {
  'zh-CN': {
    legalPrivacy: {
      eyebrow: '隐私政策',
      title: '健康重启计划隐私政策',
      effectiveDate: '生效日期：2026 年 7 月 17 日',
      sections: [
        {
          title: '一、我们是谁以及如何联系',
          paragraphs: ['“健康重启计划”由北京微零记科技有限公司运营。公司地址：北京市大兴区荣华街道亦庄经济开发区宏达南路 5 号宏达利德 A 座 303。涉及个人信息保护、账号注销或投诉建议，可通过 87103978@qq.com 或 13436574850 联系我们。'],
        },
        {
          title: '二、我们处理的信息',
          items: [
            '账号使用：昵称、健康档案（如年龄、身高、体重、病史和用药信息）、健康指标、饮食运动计划、打卡记录、提醒、备注和用户主动选择的图片，与登录账号绑定并在线保存。',
            '注册或登录账号：手机号、验证码或密码、账号标识、登录会话，以及与账号绑定的上述健康数据。我们用这些信息完成账号认证、数据保存和在线健康管理功能。',
            '报告识别：仅在你主动选择图片并确认上传后，上传检查报告图片至我们的服务端进行识别；识别结果须经你确认后才会写入健康记录。',
            '云端 AI：仅在你单独同意后，用于 AI 问诊、7 天计划生成、报告识别、餐食图片热量估算，以及皮肤、舌象和头皮图片分析。我们仅处理你为本次功能主动提交或确认发送的必要文本、健康摘要或图片；图片可能包含面部或健康相关信息，仅用于当次分析。',
            '必要运行信息：网络连接状态、通知授权状态和崩溃所需的基础运行信息，用于保障服务和排查故障。我们不收集定位信息。',
          ],
        },
        {
          title: '三、权限与敏感信息说明',
          paragraphs: [
            '健康、病史、用药、体征指标和报告图片属于敏感个人信息。我们仅在你录入、上传、注册登录或开启相关功能时处理。相机和相册仅用于你主动选择的报告或饮食图片；通知、精确闹钟和开机恢复仅在你主动创建提醒后用于今天和明天的健康或用药提醒；“同步到手机闹钟”会打开系统时钟，需你在系统界面自行确认。',
            '使用皮肤图片分析时，用户可主动选择包含面部的图片。我们不进行身份识别、人脸比对或生物识别模板提取；图片仅用于当次 AI 分析，不用于训练、广告、用户画像或运营统计。',
          ],
        },
        {
          title: '四、存储、同步与安全',
          items: [
            '健康业务功能需要登录账号，业务数据自动保存到服务器；退出后本机不保留健康业务数据。',
            '敏感健康字段由服务器使用 AES-256-GCM 加密后写入数据库，加密密钥仅由服务器安全环境配置提供；传输使用 HTTPS。',
            '账号存续期间，我们保存提供服务所必需的数据。你注销账号后，账号、会话、健康业务数据及关联文件进入 30 天保留期，期满后删除。',
            '我们采取访问控制、加密传输和最小权限等措施保护信息，请妥善保管设备、账号、密码和验证码。',
            '数据库敏感数据由服务器使用 AES-256-GCM 加密存储，报告图片等文件加密后存入私有对象存储。使用云端 AI 时，必要内容会在受控服务端内存中短暂处理并经 HTTPS 转发。',
          ],
        },
        {
          title: '五、对外提供与第三方',
          paragraphs: ['我们不会出售个人信息，也不会向第三方共享、转让或公开披露你的个人信息，法律法规另有规定或取得你单独同意的情形除外。你单独同意云端 AI 后，我们会将完成该次请求所必需的信息提供给你在授权页面确认的 AI 服务商（千问、豆包、智谱 GLM 或 DeepSeek）。我们要求其仅按指令处理，不用于广告、用户画像或模型训练。当前市场版不接入广告、统计、推送或社交类第三方数据服务。'],
        },
        {
          title: '六、AI 单独同意与撤回',
          paragraphs: ['首次使用云端 AI 前，我们会单独说明处理目的、数据类型、服务商及风险并取得你的同意。涉及皮肤、舌象、头皮等图片时，用户确认后才会发送图片。你可在“我的 - AI 数据处理授权”中撤回同意；撤回后 AI 功能停止，账号中的健康记录不受影响。'],
        },
        {
          title: '七、你的权利',
          paragraphs: ['你可以在应用内查看、修改、删除账号健康记录，管理提醒，退出登录，或在“我的 - 账号与数据安全”中注销账号。涉及访问、更正、删除、撤回同意、获取副本或投诉的请求，可按本政策第一部分的联系方式提出。撤回通知或相机权限不会影响此前已完成的处理，但相关功能将无法继续使用。'],
        },
        {
          title: '八、未成年人和政策更新',
          paragraphs: ['本服务主要面向成年人。未满 14 周岁的用户应由监护人阅读本政策并在取得监护人同意后使用。我们更新本政策时会在应用内或官网提示；涉及处理目的、方式或范围的重大变化，将在重新取得必要同意后实施。'],
        },
      ],
      footer: '北京微零记科技有限公司 · 联系邮箱：87103978@qq.com · 联系电话：13436574850',
    },
    legalTerms: {
      eyebrow: '用户协议',
      title: '健康重启计划用户协议',
      effectiveDate: '生效日期：2026 年 7 月 17 日',
      sections: [
        {
          title: '一、协议主体与服务',
          paragraphs: ['本协议由你与北京微零记科技有限公司共同订立。健康重启计划提供健康档案记录、指标管理、饮食运动计划、提醒打卡、统计、账号同步和 AI 辅助分析等健康管理工具。你使用本服务即表示同意本协议及《隐私政策》。'],
        },
        {
          title: '二、账号与数据',
          items: [
            '使用健康业务功能需要注册或登录账号。请提供真实、合法的信息并妥善保管账号、密码和验证码。',
            '你对录入的健康、用药、饮食和运动信息的真实性负责。因账号泄露或不当操作导致的数据损失，我们将在法律要求范围内提供协助。',
            '你可在应用内注销账号。注销后，云端数据保留 30 天以支持恢复，期满后删除。',
          ],
        },
        {
          title: '三、健康提示与使用限制',
          paragraphs: [
            '本服务是日常健康管理辅助工具，不提供医疗诊断、处方、急救或治疗服务，也不替代医生、药师或其他专业医疗人员的建议。AI 生成内容和报告识别结果仅供参考。出现不适、异常指标、疾病诊断、特殊用药或运动禁忌时，请及时咨询专业医疗人员。',
            '云端 AI 功能须经用户单独同意后使用。用户可随时撤回授权；撤回后 AI 功能将停止，不影响账号中的健康记录。',
            '你不得利用本服务发布违法信息、侵犯他人权益、攻击系统、绕过安全措施，或将服务用于任何违反法律法规的用途。',
          ],
        },
        {
          title: '四、服务变更、终止与联系',
          paragraphs: ['我们可能因产品迭代、安全维护或法律要求调整功能，并会以合理方式通知你。你可随时停止使用服务并按应用内路径处理数据。对本协议或服务有疑问，请联系：87103978@qq.com，电话：13436574850，地址：北京市大兴区荣华街道亦庄经济开发区宏达南路 5 号宏达利德 A 座 303。'],
        },
      ],
      footer: '北京微零记科技有限公司',
    },
  },
  'zh-TW': {
    legalPrivacy: {
      eyebrow: '隱私政策',
      title: '健康重啟計劃隱私政策',
      effectiveDate: '生效日期：2026 年 7 月 17 日',
      sections: [
        {
          title: '一、我們是誰以及如何聯絡',
          paragraphs: ['「健康重啟計劃」由北京微零記科技有限公司營運。公司地址：北京市大興區榮華街道亦莊經濟開發區宏達南路 5 號宏達利德 A 座 303。涉及個人資訊保護、帳號註銷或投訴建議，可透過 87103978@qq.com 或 13436574850 聯絡我們。'],
        },
        {
          title: '二、我們處理的資訊',
          items: [
            '帳號使用：暱稱、健康檔案（如年齡、身高、體重、病史和用藥資訊）、健康指標、飲食運動計劃、打卡記錄、提醒、備註和使用者主動選擇的圖片，與登入帳號綁定並線上儲存。',
            '註冊或登入帳號：手機號碼、驗證碼或密碼、帳號識別碼、登入工作階段，以及你選擇儲存或同步的上述健康資料。我們使用這些資訊完成帳號驗證、雲端同步、資料復原和線上健康管理功能。',
            '報告辨識：僅在你主動選擇圖片並確認上傳後，才將檢查報告圖片上傳至我們的伺服器辨識；辨識結果須經你確認後才會寫入健康記錄。',
            '雲端 AI：僅在你單獨同意後，用於 AI 諮詢、7 天計劃生成、報告辨識、餐食圖片熱量估算，以及皮膚、舌象和頭皮圖片分析。我們僅處理你為本次功能主動提交或確認傳送的必要文字、健康摘要或圖片；圖片可能包含面部或健康相關資訊，僅用於當次分析。',
            '必要運行資訊：網路連線狀態、通知授權狀態和當機所需的基礎運行資訊，用於保障服務和排查故障。我們不收集定位資訊。',
          ],
        },
        {
          title: '三、權限與敏感資訊說明',
          paragraphs: [
            '健康、病史、用藥、體徵指標和報告圖片屬於敏感個人資訊。我們僅在你輸入、上傳、註冊登入或開啟相關功能時處理。相機和相簿僅用於你主動選擇的報告或飲食圖片；通知、精確鬧鐘和開機恢復僅在你主動建立提醒後，用於今天和明天的健康或用藥提醒；「同步到手機鬧鐘」會開啟系統時鐘，需由你在系統介面自行確認。',
            '使用皮膚圖片分析時，使用者可主動選擇包含面部的圖片。我們不進行身分識別、人臉比對或生物識別範本提取；圖片僅用於當次 AI 分析，不用於訓練、廣告、使用者畫像或營運統計。',
          ],
        },
        {
          title: '四、儲存、同步與安全',
          items: [
            '健康業務功能需要登入帳號，業務資料自動儲存到伺服器；登出後本機不保留健康業務資料。',
            '敏感健康欄位由伺服器使用 AES-256-GCM 加密後寫入資料庫，加密金鑰僅由伺服器安全環境設定提供；傳輸使用 HTTPS。',
            '帳號存續期間，我們儲存提供服務所必需的資料。你註銷帳號後，帳號、工作階段及線上資料進入 30 天保留期，期滿後刪除。',
            '我們採取存取控制、加密傳輸和最小權限等措施保護資訊，請妥善保管裝置、帳號、密碼和驗證碼。',
            '資料庫敏感資料由伺服器使用 AES-256-GCM 加密儲存，報告圖片等檔案加密後存入私有物件儲存。使用雲端 AI 時，必要內容會在受控伺服器記憶體中短暫處理並經 HTTPS 轉送。',
          ],
        },
        {
          title: '五、對外提供與第三方',
          paragraphs: ['我們不會出售個人資訊，也不會向第三方分享、轉讓或公開揭露你的個人資訊，法律另有規定或取得你單獨同意的情形除外。你單獨同意雲端 AI 後，我們會將完成該次請求所必需的資訊提供給你在授權頁面確認的 AI 服務商（千問、豆包、智譜 GLM 或 DeepSeek）。我們要求其僅依指示處理，不用於廣告、使用者畫像或模型訓練。目前市場版不接入廣告、統計、推播或社交類第三方資料服務。'],
        },
        {
          title: '六、AI 單獨同意與撤回',
          paragraphs: ['首次使用雲端 AI 前，我們會單獨說明處理目的、資料類型、服務商及風險並取得你的同意。涉及皮膚、舌象、頭皮等圖片時，使用者確認後才會傳送圖片。你可在「我的 - AI 資料處理授權」中撤回同意；撤回後 AI 功能停止，帳號中的健康記錄不受影響。'],
        },
        {
          title: '七、你的權利',
          paragraphs: ['你可以在應用程式內查看、修改、刪除帳號健康記錄，管理提醒，登出，或在「我的 - 帳號與資料安全」中註銷帳號。涉及存取、更正、刪除、撤回同意、取得副本或投訴的請求，可依本政策第一部分的聯絡方式提出。撤回通知或相機權限不會影響此前已完成的處理，但相關功能將無法繼續使用。'],
        },
        {
          title: '八、未成年人和政策更新',
          paragraphs: ['本服務主要面向成年人。未滿 14 歲的使用者應由監護人閱讀本政策，並在取得監護人同意後使用。我們更新本政策時會在應用程式內或官網提示；涉及處理目的、方式或範圍的重大變化，將在重新取得必要同意後實施。'],
        },
      ],
      footer: '北京微零記科技有限公司 · 聯絡信箱：87103978@qq.com · 聯絡電話：13436574850',
    },
    legalTerms: {
      eyebrow: '使用者協議',
      title: '健康重啟計劃使用者協議',
      effectiveDate: '生效日期：2026 年 7 月 17 日',
      sections: [
        {
          title: '一、協議主體與服務',
          paragraphs: ['本協議由你與北京微零記科技有限公司共同訂立。健康重啟計劃提供健康檔案記錄、指標管理、飲食運動計劃、提醒打卡、統計、帳號同步和 AI 輔助分析等健康管理工具。你使用本服務即表示同意本協議及《隱私政策》。'],
        },
        {
          title: '二、帳號與資料',
          items: [
            '使用健康業務功能需要註冊或登入帳號。請提供真實、合法的資訊並妥善保管帳號、密碼和驗證碼。',
            '你對輸入的健康、用藥、飲食和運動資訊的真實性負責。因帳號洩漏或不當操作導致的資料損失，我們將在法律要求範圍內提供協助。',
            '你可在應用程式內註銷帳號。註銷後，雲端資料保留 30 天以支援復原，期滿後刪除。',
          ],
        },
        {
          title: '三、健康提示與使用限制',
          paragraphs: [
            '本服務是日常健康管理輔助工具，不提供醫療診斷、處方、急救或治療服務，也不替代醫師、藥師或其他專業醫療人員的建議。AI 生成內容和報告辨識結果僅供參考。出現不適、異常指標、疾病診斷、特殊用藥或運動禁忌時，請及時諮詢專業醫療人員。',
            '雲端 AI 功能須經使用者單獨同意後使用。使用者可隨時撤回授權；撤回後 AI 功能將停止，不影響帳號中的健康記錄。',
            '你不得利用本服務發布違法資訊、侵犯他人權益、攻擊系統、繞過安全措施，或將服務用於任何違反法律法規的用途。',
          ],
        },
        {
          title: '四、服務變更、終止與聯絡',
          paragraphs: ['我們可能因產品迭代、安全維護或法律要求調整功能，並會以合理方式通知你。你可隨時停止使用服務並依應用程式內路徑處理資料。對本協議或服務有疑問，請聯絡：87103978@qq.com，電話：13436574850，地址：北京市大興區榮華街道亦莊經濟開發區宏達南路 5 號宏達利德 A 座 303。'],
        },
      ],
      footer: '北京微零記科技有限公司',
    },
  },
  en: {
    legalPrivacy: {
      eyebrow: 'Privacy Policy',
      title: 'HealthResetPlan Privacy Policy',
      effectiveDate: 'Effective: July 17, 2026',
      sections: [
        {
          title: '1. Who We Are and How to Contact Us',
          paragraphs: ['HealthResetPlan is operated by Beijing Weilingji Technology Co., Ltd., located at Room 303, Building A, Hongda Lide, No. 5 Hongda South Road, Yizhuang Economic Development Zone, Ronghua Subdistrict, Daxing District, Beijing, China. For privacy protection, account deletion, complaints, or suggestions, contact us at 87103978@qq.com or +86 134 3657 4850.'],
        },
        {
          title: '2. Information We Process',
          items: [
            'Account use: Your nickname, health profile, health metrics, plans, check-ins, reminders, notes, and selected images are linked to your signed-in account and stored online.',
            'Registration or sign-in: Your mobile number, verification code or password, account identifier, sign-in session, and the health data above that you choose to save or sync. We use this information for account authentication, cloud sync, data recovery, and online health management.',
            'Report recognition: We upload a medical report image to our server for recognition only after you select it and confirm the upload. Recognition results are added to your health records only after you confirm them.',
            'Cloud AI: With your separate consent, cloud AI may be used for AI consultations, seven-day plan generation, report recognition, meal calorie estimates, and analysis of skin, tongue, and scalp images. We process only the necessary text, health summary, or images that you submit or confirm for that request. Images may contain facial or health-related information and are used only for that analysis.',
            'Essential operational information: Network connectivity, notification permission status, and basic crash-related information are used to maintain the service and diagnose faults. We do not collect location information.',
          ],
        },
        {
          title: '3. Permissions and Sensitive Information',
          paragraphs: [
            'Health data, medical history, medication information, vital signs, and report images are sensitive personal information. We process them only when you enter or upload them, register or sign in, or enable the relevant feature. Camera and photo permissions are used only for reports or food images you choose. Notifications, exact alarms, and startup recovery are used only after you create a reminder, for health or medication reminders today and tomorrow. “Sync to phone alarm” opens the system clock and requires your confirmation in the system interface.',
            'For skin image analysis, you may choose an image that includes your face. We do not identify you, compare faces, or extract biometric templates. Images are used only for the requested AI analysis and not for training, advertising, profiling, or operational analytics.',
          ],
        },
        {
          title: '4. Storage, Sync, and Security',
          items: [
            'Health features require sign-in. Business data is saved online automatically, and health business data is not retained on the device after sign-out.',
            'The server encrypts sensitive health fields with AES-256-GCM before database storage. Encryption keys are supplied only through secure server configuration, and transmission uses HTTPS.',
            'While your account is active, we retain data necessary to provide the service. After account deletion, account, session, and online data enter a 30-day retention period and are then deleted.',
            'We protect information using access controls, encrypted transmission, and least-privilege access. Please protect your device, account, password, and verification codes.',
            'Sensitive database data is encrypted server-side with AES-256-GCM, and files such as report images are encrypted in private object storage. Cloud AI content is processed briefly in controlled server memory and forwarded over HTTPS.',
          ],
        },
        {
          title: '5. Disclosure and Third Parties',
          paragraphs: ['We do not sell personal information or share, transfer, or publicly disclose it to third parties unless required by law or with your separate consent. After you separately consent to cloud AI, we provide information necessary for the request to the AI provider you confirm on the authorization page (Qwen, Doubao, Zhipu GLM, or DeepSeek). We require providers to process it only as instructed and not for advertising, profiling, or model training. The current marketplace release does not integrate third-party advertising, analytics, push-notification, or social data services.'],
        },
        {
          title: '6. Separate Consent for AI and Withdrawal',
          paragraphs: ['Before you first use cloud AI, we separately explain the purpose, data types, provider, and risks, and obtain your consent. Skin, tongue, scalp, and similar images are sent only after you confirm. You may withdraw consent under “Me - AI Data Processing Authorization.” Cloud AI stops after withdrawal; health records in your account are unaffected.'],
        },
        {
          title: '7. Your Rights',
          paragraphs: ['In the app, you may view, change, or delete account health records, manage reminders, sign out, or delete your account under “Me - Account and Data Security.” To request access, correction, deletion, withdrawal of consent, a copy of your data, or to make a complaint, use the contact details in Section 1. Revoking notification or camera permission does not affect completed processing, but the related feature will no longer work.'],
        },
        {
          title: '8. Children and Policy Updates',
          paragraphs: ['This service is primarily intended for adults. Users under 14 must have a guardian read this policy and consent before use. We will announce policy updates in the app or on our website. Material changes to processing purposes, methods, or scope will take effect only after we obtain any newly required consent.'],
        },
      ],
      footer: 'Beijing Weilingji Technology Co., Ltd. · Email: 87103978@qq.com · Phone: +86 134 3657 4850',
    },
    legalTerms: {
      eyebrow: 'Terms of Service',
      title: 'HealthResetPlan Terms of Service',
      effectiveDate: 'Effective: July 17, 2026',
      sections: [
        {
          title: '1. Parties and Services',
          paragraphs: ['This agreement is between you and Beijing Weilingji Technology Co., Ltd. HealthResetPlan provides health profile records, metric management, diet and exercise plans, reminders and check-ins, statistics, account sync, and AI-assisted analysis. By using the service, you agree to these Terms and the Privacy Policy.'],
        },
        {
          title: '2. Accounts and Data',
          items: [
            'Health features require registration or sign-in. Provide accurate, lawful information and keep your account, password, and verification codes secure.',
            'You are responsible for the accuracy of the health, medication, diet, and exercise information you enter. If data is lost because an account is compromised or the service is used improperly, we will assist as required by law.',
            'You may delete your account in the app. After deletion, cloud data is retained for 30 days to support recovery and is then deleted.',
          ],
        },
        {
          title: '3. Health Notice and Usage Restrictions',
          paragraphs: [
            'The service is a daily health management aid. It does not provide medical diagnosis, prescriptions, emergency care, or treatment, and does not replace advice from physicians, pharmacists, or other healthcare professionals. AI-generated content and report recognition results are for reference only. Seek professional medical advice for discomfort, abnormal readings, diagnosed conditions, special medications, or exercise contraindications.',
            'Cloud AI features require your separate consent. You may withdraw authorization at any time. Cloud AI will stop after withdrawal without affecting health records in your account.',
            'You must not use the service to publish illegal information, infringe others’ rights, attack systems, bypass security measures, or for any purpose that violates applicable law.',
          ],
        },
        {
          title: '4. Service Changes, Termination, and Contact',
          paragraphs: ['We may adjust features for product updates, security maintenance, or legal requirements and will notify you reasonably. You may stop using the service at any time and manage your data through the in-app controls. Questions about these Terms or the service may be sent to 87103978@qq.com or +86 134 3657 4850. Our address is Room 303, Building A, Hongda Lide, No. 5 Hongda South Road, Yizhuang Economic Development Zone, Ronghua Subdistrict, Daxing District, Beijing, China.'],
        },
      ],
      footer: 'Beijing Weilingji Technology Co., Ltd.',
    },
  },
  ja: {
    legalPrivacy: {
      eyebrow: 'プライバシーポリシー',
      title: 'HealthResetPlan プライバシーポリシー',
      effectiveDate: '施行日：2026年7月17日',
      sections: [
        {
          title: '1. 運営者およびお問い合わせ先',
          paragraphs: ['HealthResetPlan は北京微零記科技有限公司が運営しています。所在地：中国北京市大興区栄華街道亦荘経済開発区宏達南路5号 宏達利徳A棟303号室。個人情報保護、アカウント削除、苦情またはご意見については、87103978@qq.com または +86 134 3657 4850 までお問い合わせください。'],
        },
        {
          title: '2. 取り扱う情報',
          items: [
            'アカウント利用：健康プロフィール、健康指標、計画、チェックイン、リマインダー、メモ、選択した画像は、ログイン中のアカウントに紐づけてオンライン保存されます。',
            '登録またはログイン：携帯電話番号、認証コードまたはパスワード、アカウント識別子、ログインセッション、および保存・同期を選択した上記健康データ。これらはアカウント認証、クラウド同期、データ復元、オンライン健康管理に使用します。',
            'レポート認識：ユーザーが画像を選択してアップロードを確認した場合に限り、検査レポート画像をサーバーへ送信します。認識結果はユーザーの確認後にのみ健康記録へ保存されます。',
            'クラウド AI：個別の同意を得た場合に限り、AI 相談、7日間計画の生成、レポート認識、食事画像のカロリー推定、皮膚・舌・頭皮画像の分析に使用します。当該機能のためにユーザーが送信または確認した必要なテキスト、健康概要、画像のみを処理します。画像に顔や健康関連情報が含まれる場合も、当該分析にのみ使用します。',
            '必要な稼働情報：ネットワーク接続状態、通知権限の状態、クラッシュ調査に必要な基本情報を、サービス維持と障害調査に使用します。位置情報は収集しません。',
          ],
        },
        {
          title: '3. 権限および機微情報',
          paragraphs: [
            '健康情報、病歴、服薬情報、バイタル指標、レポート画像は機微な個人情報です。入力・アップロード、登録・ログイン、または関連機能を有効にした場合にのみ処理します。カメラと写真へのアクセスは、ユーザーが選択したレポートまたは食事画像にのみ使用します。通知、正確なアラーム、起動時の復元は、リマインダー作成後に今日と明日の健康・服薬通知のためにのみ使用します。「スマートフォンのアラームに同期」はシステム時計を開き、システム画面での確認が必要です。',
            '皮膚画像分析では、顔を含む画像をユーザー自身が選択できます。当社は本人識別、顔照合、生体認証テンプレートの抽出を行いません。画像は当該 AI 分析にのみ使用し、学習、広告、プロファイリング、運用統計には使用しません。',
          ],
        },
        {
          title: '4. 保存、同期、セキュリティ',
          items: [
            '健康機能の利用にはログインが必要です。業務データは自動的にオンライン保存され、ログアウト後は端末に健康業務データを保持しません。',
            '機微な健康項目は、データベース保存前にサーバーが AES-256-GCM で暗号化します。鍵は安全なサーバー設定からのみ提供され、通信には HTTPS を使用します。',
            'アカウントの利用中はサービス提供に必要なデータを保持します。アカウント削除後、アカウント、セッション、オンラインデータは30日間保持され、その後削除されます。',
            'アクセス制御、暗号化通信、最小権限などの措置で情報を保護します。端末、アカウント、パスワード、認証コードも適切に管理してください。',
            'データベースの機密情報はサーバー側で AES-256-GCM 暗号化され、レポート画像などは暗号化して非公開オブジェクトストレージに保存されます。',
          ],
        },
        {
          title: '5. 第三者への提供',
          paragraphs: ['当社は個人情報を販売せず、法令に基づく場合または個別の同意を得た場合を除き、第三者への共有、譲渡、公開を行いません。クラウド AI に個別同意した場合、当該リクエストに必要な情報を、認可画面で確認した AI 提供者（Qwen、Doubao、Zhipu GLM、DeepSeek）へ提供します。提供者には、指示に従った処理のみを求め、広告、プロファイリング、モデル学習への利用を認めません。現在のストア版は、第三者の広告、解析、プッシュ通知、ソーシャルデータサービスを組み込んでいません。'],
        },
        {
          title: '6. AI への個別同意と撤回',
          paragraphs: ['クラウド AI を初めて使用する前に、処理目的、データ種類、提供者、リスクを個別に説明し、同意を取得します。皮膚、舌、頭皮などの画像は確認後にのみ送信します。同意撤回後は AI 機能が停止しますが、アカウント内の健康記録には影響しません。'],
        },
        {
          title: '7. ユーザーの権利',
          paragraphs: ['アプリ内でアカウントの健康記録を閲覧、変更、削除し、リマインダー管理やログアウトができます。「マイページ - アカウントとデータのセキュリティ」からアカウントを削除できます。'],
        },
        {
          title: '8. 未成年者およびポリシーの更新',
          paragraphs: ['本サービスは主に成人を対象としています。14歳未満のユーザーは、保護者が本ポリシーを読み、同意したうえで利用してください。ポリシーの更新はアプリ内または公式サイトでお知らせします。処理目的、方法、範囲に重大な変更がある場合は、必要な同意を改めて取得した後に実施します。'],
        },
      ],
      footer: '北京微零記科技有限公司 · メール：87103978@qq.com · 電話：+86 134 3657 4850',
    },
    legalTerms: {
      eyebrow: '利用規約',
      title: 'HealthResetPlan 利用規約',
      effectiveDate: '施行日：2026年7月17日',
      sections: [
        {
          title: '1. 契約当事者およびサービス',
          paragraphs: ['本規約はユーザーと北京微零記科技有限公司との間で締結されます。HealthResetPlan は、健康プロフィール、指標管理、食事・運動計画、リマインダーとチェックイン、統計、アカウント同期、AI 支援分析などの健康管理ツールを提供します。本サービスの利用により、本規約およびプライバシーポリシーに同意したものとみなされます。'],
        },
        {
          title: '2. アカウントとデータ',
          items: [
            '健康機能の利用には登録またはログインが必要です。正確かつ適法な情報を提供し、アカウント、パスワード、認証コードを安全に管理してください。',
            '入力する健康、服薬、食事、運動情報の正確性はユーザーの責任です。端末紛失、リカバリーフレーズの未保存、不適切な操作によるデータ損失については、法令で求められる範囲で支援します。',
            'アプリ内でアカウントを削除できます。削除後、復元対応のためクラウドデータを30日間保持し、その後削除します。',
          ],
        },
        {
          title: '3. 健康上の注意と利用制限',
          paragraphs: [
            '本サービスは日常の健康管理を支援するもので、医療診断、処方、救急、治療を提供せず、医師、薬剤師、その他の医療専門家の助言に代わるものではありません。AI 生成内容とレポート認識結果は参考情報です。不調、異常値、診断済み疾患、特別な投薬、運動禁忌がある場合は、速やかに医療専門家へ相談してください。',
            'クラウド AI 機能には個別の同意が必要です。承認はいつでも撤回でき、撤回後は AI 機能が停止しますが、アカウント内の健康記録には影響しません。',
            '違法情報の公開、他者の権利侵害、システム攻撃、セキュリティ対策の回避、その他法令に反する目的で本サービスを利用してはなりません。',
          ],
        },
        {
          title: '4. サービス変更、終了、お問い合わせ',
          paragraphs: ['製品更新、セキュリティ保守、法的要件により機能を変更する場合があり、合理的な方法で通知します。ユーザーはいつでも利用を停止し、アプリ内の手順でデータを処理できます。本規約またはサービスに関するお問い合わせ先：87103978@qq.com、+86 134 3657 4850。所在地：中国北京市大興区栄華街道亦荘経済開発区宏達南路5号 宏達利徳A棟303号室。'],
        },
      ],
      footer: '北京微零記科技有限公司',
    },
  },
  ko: {
    legalPrivacy: {
      eyebrow: '개인정보 처리방침',
      title: 'HealthResetPlan 개인정보 처리방침',
      effectiveDate: '시행일: 2026년 7월 17일',
      sections: [
        {
          title: '1. 운영자 및 연락처',
          paragraphs: ['HealthResetPlan은 Beijing Weilingji Technology Co., Ltd.가 운영합니다. 주소: 중국 베이징시 다싱구 룽화 가도 이좡 경제개발구 훙다남로 5호 훙다리더 A동 303호. 개인정보 보호, 계정 삭제, 불만 또는 제안은 87103978@qq.com 또는 +86 134 3657 4850으로 문의해 주세요.'],
        },
        {
          title: '2. 처리하는 정보',
          items: [
            '계정 사용: 건강 프로필, 건강 지표, 계획, 체크인, 알림, 메모 및 선택한 이미지는 로그인 계정에 연결되어 온라인으로 저장됩니다.',
            '가입 또는 로그인: 휴대전화 번호, 인증 코드 또는 비밀번호, 계정 식별자, 로그인 세션 및 사용자가 저장하거나 동기화하기로 선택한 위 건강 데이터. 계정 인증, 클라우드 동기화, 데이터 복구 및 온라인 건강 관리에 사용합니다.',
            '보고서 인식: 사용자가 이미지를 선택하고 업로드를 확인한 경우에만 검사 보고서 이미지를 서버로 전송해 인식합니다. 인식 결과는 사용자가 확인한 후에만 건강 기록에 저장됩니다.',
            '클라우드 AI: 별도 동의를 받은 경우에만 AI 상담, 7일 계획 생성, 보고서 인식, 음식 이미지 열량 추정, 피부·혀·두피 이미지 분석에 사용합니다. 해당 기능을 위해 사용자가 제출하거나 전송을 확인한 필수 텍스트, 건강 요약 또는 이미지만 처리합니다. 이미지에 얼굴이나 건강 관련 정보가 포함될 수 있으며 해당 분석에만 사용됩니다.',
            '필수 운영 정보: 네트워크 연결 상태, 알림 권한 상태, 충돌 분석에 필요한 기본 정보를 서비스 유지와 장애 해결에 사용합니다. 위치 정보는 수집하지 않습니다.',
          ],
        },
        {
          title: '3. 권한 및 민감정보',
          paragraphs: [
            '건강 정보, 병력, 복약 정보, 생체 지표 및 보고서 이미지는 민감한 개인정보입니다. 사용자가 입력·업로드하거나 가입·로그인하거나 관련 기능을 켠 경우에만 처리합니다. 카메라와 사진 권한은 사용자가 선택한 보고서 또는 음식 이미지에만 사용됩니다. 알림, 정확한 알람, 부팅 시 복원은 사용자가 알림을 만든 후 오늘과 내일의 건강·복약 알림에만 사용됩니다. “휴대전화 알람에 동기화”는 시스템 시계를 열며 시스템 화면에서 사용자가 직접 확인해야 합니다.',
            '피부 이미지 분석 시 사용자는 얼굴이 포함된 이미지를 선택할 수 있습니다. 당사는 신원 식별, 얼굴 비교 또는 생체인식 템플릿 추출을 하지 않습니다. 이미지는 해당 AI 분석에만 사용되며 학습, 광고, 프로파일링 또는 운영 통계에 사용되지 않습니다.',
          ],
        },
        {
          title: '4. 저장, 동기화 및 보안',
          items: [
            '건강 기능은 로그인이 필요합니다. 업무 데이터는 온라인에 자동 저장되며 로그아웃 후 기기에 건강 업무 데이터를 보관하지 않습니다.',
            '민감한 건강 필드는 데이터베이스 저장 전에 서버가 AES-256-GCM으로 암호화합니다. 키는 안전한 서버 설정에서만 제공되며 전송에는 HTTPS를 사용합니다.',
            '계정이 활성 상태인 동안 서비스 제공에 필요한 데이터를 보관합니다. 계정 삭제 후 계정, 세션 및 온라인 데이터는 30일간 보관된 뒤 삭제됩니다.',
            '접근 제어, 암호화 전송, 최소 권한 등의 조치로 정보를 보호합니다. 기기, 계정, 비밀번호와 인증 코드도 안전하게 관리해 주세요.',
            '데이터베이스의 민감한 내용은 서버에서 AES-256-GCM으로 암호화되고 보고서 이미지 등 파일은 암호화하여 비공개 객체 저장소에 보관됩니다.',
          ],
        },
        {
          title: '5. 외부 제공 및 제3자',
          paragraphs: ['당사는 개인정보를 판매하지 않으며, 법률에서 요구하거나 사용자의 별도 동의를 받은 경우를 제외하고 제3자와 공유·양도·공개하지 않습니다. 클라우드 AI에 별도 동의하면 해당 요청에 필요한 정보를 승인 화면에서 확인한 AI 제공업체(Qwen, Doubao, Zhipu GLM 또는 DeepSeek)에 제공합니다. 제공업체는 지시에 따라서만 처리하고 광고, 프로파일링 또는 모델 학습에 사용하지 않아야 합니다. 현재 스토어 버전에는 제3자 광고, 분석, 푸시 알림 또는 소셜 데이터 서비스가 포함되지 않습니다.'],
        },
        {
          title: '6. AI 별도 동의 및 철회',
          paragraphs: ['클라우드 AI를 처음 사용하기 전에 처리 목적, 데이터 유형, 제공업체 및 위험을 별도로 설명하고 동의를 받습니다. 철회 후 AI 기능은 중지되지만 계정의 건강 기록에는 영향을 주지 않습니다.'],
        },
        {
          title: '7. 사용자의 권리',
          paragraphs: ['앱에서 계정 건강 기록을 조회·수정·삭제하고 알림을 관리하거나 로그아웃할 수 있으며, “내 정보 - 계정 및 데이터 보안”에서 계정을 삭제할 수 있습니다.'],
        },
        {
          title: '8. 아동 및 방침 변경',
          paragraphs: ['본 서비스는 주로 성인을 대상으로 합니다. 만 14세 미만 사용자는 보호자가 이 방침을 읽고 동의한 후 이용해야 합니다. 방침 변경은 앱 또는 공식 웹사이트에서 안내합니다. 처리 목적, 방식 또는 범위의 중대한 변경은 필요한 동의를 다시 받은 후 시행합니다.'],
        },
      ],
      footer: 'Beijing Weilingji Technology Co., Ltd. · 이메일: 87103978@qq.com · 전화: +86 134 3657 4850',
    },
    legalTerms: {
      eyebrow: '이용약관',
      title: 'HealthResetPlan 이용약관',
      effectiveDate: '시행일: 2026년 7월 17일',
      sections: [
        {
          title: '1. 계약 당사자 및 서비스',
          paragraphs: ['본 약관은 사용자와 Beijing Weilingji Technology Co., Ltd. 사이에 체결됩니다. HealthResetPlan은 건강 프로필 기록, 지표 관리, 식단·운동 계획, 알림 및 체크인, 통계, 계정 동기화, AI 보조 분석 등의 건강 관리 도구를 제공합니다. 서비스를 사용하면 본 약관과 개인정보 처리방침에 동의한 것으로 간주됩니다.'],
        },
        {
          title: '2. 계정 및 데이터',
          items: [
            '건강 기능은 가입 또는 로그인이 필요합니다. 정확하고 적법한 정보를 제공하고 계정, 비밀번호 및 인증 코드를 안전하게 관리해 주세요.',
            '입력한 건강, 복약, 식단 및 운동 정보의 정확성은 사용자에게 책임이 있습니다. 기기 분실, 복구 문구 미백업 또는 부적절한 조작으로 데이터가 손실된 경우 법률이 요구하는 범위에서 지원합니다.',
            '앱에서 계정을 삭제할 수 있습니다. 삭제 후 복구 지원을 위해 클라우드 데이터를 30일간 보관한 뒤 삭제합니다.',
          ],
        },
        {
          title: '3. 건강 고지 및 이용 제한',
          paragraphs: [
            '본 서비스는 일상 건강 관리 보조 도구이며 의료 진단, 처방, 응급 처치 또는 치료를 제공하지 않고 의사, 약사 또는 기타 의료 전문가의 조언을 대체하지 않습니다. AI 생성 콘텐츠와 보고서 인식 결과는 참고용입니다. 불편함, 비정상 지표, 진단된 질환, 특수 약물 또는 운동 금기가 있으면 즉시 의료 전문가와 상담해 주세요.',
            '클라우드 AI 기능은 사용자의 별도 동의가 필요합니다. 언제든지 권한을 철회할 수 있으며 철회 후 AI 기능은 중지되지만 계정의 건강 기록에는 영향을 주지 않습니다.',
            '불법 정보 게시, 타인의 권리 침해, 시스템 공격, 보안 조치 우회 또는 법률을 위반하는 목적으로 서비스를 이용해서는 안 됩니다.',
          ],
        },
        {
          title: '4. 서비스 변경, 종료 및 연락처',
          paragraphs: ['제품 업데이트, 보안 유지 또는 법적 요구로 기능을 조정할 수 있으며 합리적인 방법으로 안내합니다. 사용자는 언제든지 서비스 이용을 중단하고 앱 내 절차에 따라 데이터를 처리할 수 있습니다. 문의: 87103978@qq.com, +86 134 3657 4850. 주소: 중국 베이징시 다싱구 룽화 가도 이좡 경제개발구 훙다남로 5호 훙다리더 A동 303호.'],
        },
      ],
      footer: 'Beijing Weilingji Technology Co., Ltd.',
    },
  },
}
