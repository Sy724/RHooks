# RHooks
基于React 19 的 Hooks 集合

## 安装
```
npm install b-hooks-core
```

## Hooks列表

### useRequest：
#### 使用
```
import { useRequest } from 'b-hooks-core'
```
``` ts
const { data, loading, run } = useRequest(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello world')
    }, 1000)
  })
}, {
  manual: true,
  ready: true,
  onSuccess: (data) => {
    console.log(data)
  },
  onFailure: (error) => {
    console.log(error)
  }
})
```

### useVirtual:
#### 使用
```
import { useVirtual } from 'b-hooks-core'
```
``` ts
const { state, wrapperRef, scrollRef } = useVirtual({
  itemHeight: 50,
  dataSource: Array(1000).fill(0)
})
```