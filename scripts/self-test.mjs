#!/usr/bin/env node
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = ['SKILL.md', 'manifest.yaml', 'agents/openai.yaml', 'README.md', 'README.en.md', 'LICENSE', 'icon-512.png', 'fixtures/success-page.json', 'fixtures/failure-unconfirmed-filter.json'];
for (const file of required) if (!fs.existsSync(path.join(root, file))) throw new Error(`缺少 ${file}`);
const manifest = fs.readFileSync(path.join(root, 'manifest.yaml'), 'utf8');
const skill = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
if (!manifest.includes('name: shop-order-status-digest-free') || !manifest.includes('slug: shop-order-status-digest-free')) throw new Error('manifest 名称错误');
if (!skill.includes('name: shop-order-status-digest-free')) throw new Error('SKILL frontmatter 名称错误');
const png = fs.readFileSync(path.join(root, 'icon-512.png'));
if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('图标不是 PNG');
if (png.readUInt32BE(16) !== 512 || png.readUInt32BE(20) !== 512) throw new Error('图标不是 512×512');
const success = execFileSync(process.execPath, ['scripts/summarize-fixture.mjs', 'fixtures/success-page.json'], {cwd: root, encoding: 'utf8'});
const report = JSON.parse(success);
if (!report.reportable || report.status_counts['待发货'] !== 1 || report.needs_action.length !== 2) throw new Error('成功样例摘要不正确');
if (success.includes('ORD-202609-001') || report.needs_action[0]?.order_id !== 'ORD-…001') throw new Error('成功样例未遮盖完整订单号');
try {
  execFileSync(process.execPath, ['scripts/summarize-fixture.mjs', 'fixtures/failure-unconfirmed-filter.json'], {cwd: root, encoding: 'utf8', stdio: 'pipe'});
  throw new Error('失败样例应拒绝报告');
} catch (error) {
  if (error.message === '失败样例应拒绝报告') throw error;
  if (error.status !== 2 || !String(error.stdout).includes('不报告全店总数')) throw new Error('失败样例没有正确拒绝');
}
console.log('self-test passed: structure, icon PNG, success digest, and unconfirmed-filter refusal verified');
