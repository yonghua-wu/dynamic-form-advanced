# 高级动态表单

> 一个多级联多分组且支持elementUI中所有表单的动态表单插件

## 安装

```shell
npm i dynamic-form-advanced
```

## 使用指引

1. 在 `main.js` 中引入。
```javascript
import Vue from 'vue'
import App from './App.vue'
import DForm from 'dynamic-form-advanced'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI)

Vue.use(DForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

2. 使用示例
```html
<template>
  <el-form ref="form" :model="formData">
    <DForm ref="dform" :structure="structureData" v-model="formData"/>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      structureData: {
        groups: [
          {index: 1,name: "" }, {index: 2,name: ""}
        ],
        formItemDefine: {
          gender: {
            label: "性别",
            formType: "select",
            field: "gender",
            attributes: {
              elFormItem: {
                required: true
              }
            },
            options: [
              {label: "男",value: "male" },
              {label: "女",value: "female" }
            ]
          },
          maleOption1: {
            label: "男选项1",
            formType: "input",
            field: "option.male.0"
          },
          maleOption2: {
            label: "男选项2",
            formType: "input",
            field: "option.male.1"
          },
          femaleOption1: {
            label: "女选项1",
            formType: "input",
            field: "option.female.0"
          },
          femaleOption2: {
            label: "女选项2",
            formType: "input",
            field: "option.female.1"
          }
        },
        structureDefine: {
          gender: {
            group: 1,
            children: {
              male: {
                maleOption1: { group: 1, children: null },
                maleOption2: {  group: 1, children: null }
              },
              female: {
                femaleOption1: { group: 2, children: null },
                femaleOption2: { group: 2, children: null }
              }
            }
          }
        }
      }
    }
  }
}
</script>
```
