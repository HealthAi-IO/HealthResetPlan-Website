<template>
  <article class="legal-page">
    <span class="eyebrow">Privacy</span>
    <h1>隐私政策与端到端加密说明</h1>
    <p class="legal-lead">
      健康重启计划的产品原则是：用户的健康数据优先保存在本地，选择云同步时也应尽可能保持用户可控和密文同步。
    </p>

    <section>
      <h2>我们处理的数据</h2>
      <ul class="check-list">
        <li>健康档案：身高、体重、年龄、性别、既往病史、用药信息。</li>
        <li>健康指标：血压、血脂、血糖、体重、体脂、BMI 等记录。</li>
        <li>计划数据：AI 生成或用户调整后的饮食、运动、用药、称重计划。</li>
        <li>执行数据：提醒状态、打卡记录、备注和用户主动上传的图片。</li>
      </ul>
    </section>

    <section>
      <h2>加密与同步</h2>
      <p>
        开启云同步时，客户端会生成用户主密钥，并使用 AES-256-GCM 加密敏感健康字段。密钥保存在设备安全能力中，
        例如 iOS/macOS Keychain、Android Keystore 或 Windows Credential Manager。
      </p>
      <p>服务端负责账号、同步和密文存储，不应具备读取敏感健康明文的能力。</p>
    </section>

    <section>
      <h2>用户控制权</h2>
      <ul class="check-list">
        <li>用户可选择仅本地使用或开启云同步。</li>
        <li>用户可导出个人健康数据，用于备份或迁移。</li>
        <li>用户可申请注销账号并删除云端数据。</li>
        <li>主密钥丢失可能导致云端密文无法恢复，请妥善备份。</li>
      </ul>
    </section>

    <section>
      <h2>合规与限制</h2>
      <p>
        平台会参考《个人信息保护法》、GB/T 35273 以及健康医疗数据安全相关要求进行设计。
        未成年人应在监护人陪同下使用。AI 计划仅作为健康管理辅助，不替代医生诊疗。
      </p>
    </section>

    <p class="legal-footer">最近更新：2026-05-13。如需联系，请发送邮件至 hello@jkcqplan.com。</p>
  </article>
</template>
