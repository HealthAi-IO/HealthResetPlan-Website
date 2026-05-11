<script setup lang="ts"></script>

<template>
  <section class="container">
    <h1>隐私政策 · 端到端加密</h1>
    <p class="lead">「健康重启计划」的设计理念是：<strong>您的健康数据，只有您能看见</strong>。</p>

    <h2>1. 我们采集什么</h2>
    <ul>
      <li>身高、体重、年龄、性别、既往病史、用药信息（保留在您的设备本地）</li>
      <li>体检报告图片、OCR 识别结果（端到端加密）</li>
      <li>AI 生成的饮食 / 运动 / 用药计划（端到端加密）</li>
      <li>打卡记录、可穿戴设备测量数据（端到端加密）</li>
    </ul>

    <h2>2. 主密钥如何生成与保存</h2>
    <ul>
      <li>客户端生成 AES-256 随机密钥（UMK），256 bit 强度</li>
      <li>macOS / iOS：Keychain；Android：Keystore；Windows：Credential Manager</li>
      <li>不会上传到服务器；不会被开发者、客服、平台方知晓</li>
      <li>开通云同步前必须完成 BIP39 助记词或加密 keystore 备份</li>
    </ul>

    <h2>3. 服务端能看到什么</h2>
    <ul>
      <li>账号元数据（昵称、注册时间、设备 ID）</li>
      <li>所有敏感字段：仅密文（AES-256-GCM）</li>
      <li>无法解密、无法读取明文健康数据</li>
    </ul>

    <h2>4. 数据删除</h2>
    <ul>
      <li>用户可一键注销账号并物理删除云端数据</li>
      <li>本地数据由用户主动删除或卸载应用清理</li>
    </ul>

    <h2>5. 合规</h2>
    <ul>
      <li>遵守《个人信息保护法》、《GB/T 35273》、《信息安全技术 健康医疗数据安全指南》</li>
      <li>未成年人请在监护人陪同下使用</li>
    </ul>

    <p class="footer-note">最近更新：2026-05-11。如有疑问请发邮件至 <a href="mailto:privacy@healthresetplan.io">privacy@healthresetplan.io</a>。</p>
  </section>
</template>

<style scoped>
section { padding: 64px 32px; max-width: 880px; }
h1 { font-size: 32px; }
h2 { color: var(--hrp-green); margin-top: 32px; }
ul { line-height: 2; }
.lead { font-size: 16px; color: var(--hrp-muted); }
.footer-note { color: var(--hrp-muted); font-size: 13px; margin-top: 48px; }
</style>
