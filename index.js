#!/usr/bin/env node
const fs = require('fs'); // 引入文件系统模块
const version = require('./package.json').version
// 异步方式转化为promise形式
const { promisify } = require('util')
const ora = require('ora')
const { program } = require('commander')
const downloadGitRepo = require('download-git-repo');
const inquirer = require('inquirer')
// clone 的仓库
const REPO_DESC = 'github:002301/gulp-airzip'

// 主入口


function main() {
  const cb = (filderName) => {
    clone(REPO_DESC, filderName)
  }
  registerCommand(cb)  
}

main()


/**
 * 下载git仓库代码
 * @param {string} repo git仓库地址
 * @param {string} repo 下载要存放目录
 */
async function clone(repo, desc) {
  const down = promisify(downloadGitRepo)
  const downProgress = ora(`下载${repo}中...`)
  await down(repo, desc)
    .then((res) => {
      downProgress.succeed('下载成功')
    })
    .catch((err) => {
      downProgress.failed()
    })
}
/**
 * 注册指令
 * @param {function} callback 执行指令的回调函数
 */
function registerCommand(callback) {
  program
    .version(version)
    .command('init')
    .arguments('<filderName>')
    .description('脚手架初始化的描述')
    .action((filderName) => {
      typeof callback && callback(filderName)
    })
    .parse()
}
