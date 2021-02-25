网上看到好多commander的教程，先从选项开始介，简直就是反人类。我重新总结一下

## 环境设置

### 安装
>npm install commander
### 声明变量
```js
const { program } = require('commander');
program.version('0.0.1');

//或者

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
```
## 正经部分

#### 怎样创建一个init命令？
```js
program
  .command('init')
  .action(()=>{
    console.log('init')
  })
  .parse()

```
>node index init 

就会输出 init

### 怎样创建带参数命令 create fileName
.command()的第一个参数可以配置命令名称及命令参数，参数支持必选（尖括号表示）、可选（方括号表示）及变长参数（点号表示，如果使用，只能是最后一个参数）。
```js
program
  .command('create <source>')
  .action((source) => {
    console.log(source, 'command called');
  })
  .parse()

```
>node index create 123 

就会输出 create command called

#### 怎样添加参数选项 -s -v 等等

```js
program
    .command('init')
    .option('-s,--save', '指令参数')
    .option('-t,--text <type>', '文本')
    .option('-p,--point', '打印')
    .action((option)=>{
       console.log(option)
    })
    .parse()
```
>node index init -st 12345 -p

输出 init { save: true, text: '12345', point: true }

#### 必填选项 .requiredOption
```js
program
  .command('pizza')
  .requiredOption('-c, --cheese <type>', 'pizza must have cheese')
  .action(option => {
    console.log(option)
  })
  .parse();
```
> node index pizza

输出 required option '-c, --cheese <type>' not specified

>node index pizza -c

输出 option '-c, --cheese <type>' argument missing

>node index pizza -c 1234

输出 { cheese: '1234' }

### 自定义选项处理
```js
function commaSeparatedList(value, dummyPrevious) {
  return value.split(',');
}
program
  .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
  .parse();
const options = program.opts();
if (options.list !== undefined) console.log(options.list);
```
>node index -l 1234

输出 [ '1234' ]