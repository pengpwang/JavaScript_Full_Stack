
### vm

1. [为 Node.js 应用建立一个更安全的沙箱环境](https://zhuanlan.zhihu.com/p/35992886 'vm')
  a. 使用场景：用户自定义脚本逻辑的场景
  b. 如何安全的执行动态脚本：
    eval
    new Function()
    Proxy
    iframe
    以上方案的劣势
  c. nodejs中的vm模块
    异步操作的运行，延迟不可操作
    不安全
  d. 做了进一步工作的社区模块：
    sandbox
    vm2
    jailed
    以上社区模块的劣势
  e. 如何建立一个更安全的沙箱：(解决异步不能检查超时的问题和宿主程序在相同进程的问题)
    通过进程池统调度管理沙箱进程
    处理的数据和结果，还有公开给沙箱的方法
    针对沙箱进程进行 CPU 和内存配额限制
    Safeify
