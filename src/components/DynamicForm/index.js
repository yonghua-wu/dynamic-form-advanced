import Vue from 'vue'

function getValueByPath(object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

const DFormRoot = Vue.component('DFormRoot', {
  props: {
    groups: Array
  },
  render(h) {
    const content = this.groups && this.groups.map(group => {
      if (this.$slots[group.index]) {
        return <div class="df-group">
          <div class="df-header">{group.names}</div>
          <div class="df-content">
            {this.$slots[group.index]}
          </div>
        </div>
      } else {
        return <div class="df-group"></div>
      }
    })
    return (<div class="df-root">
      {content}
    </div>)
  }
})

const FormItem = Vue.component('DFormItem', {
  props: {
    item: Object,
    tiledData: Object
  },
  methods: {
    syncVModel(value, field) {

      this.$emit('input', {
        field,
        value
      })
    },
    renderItem() {
      switch (this.item.formType) {
        case 'radio': {
          const elRadio = this.item.attributes ? this.item.attributes.elRadio : {}
          const rAttr = {
            props: {
              ...elRadio
            }
          }
          const ElOptions = this.item.options.map(option => {
            const a = {
              props: {
                ...rAttr.props,
                ...option
              }
            }
            return (<el-radio {...a} key={option.value} label={option.value}>{option.label}</el-radio>)
          })

          const elRadioGroup = this.item.attributes ? this.item.attributes.elRadioGroup : {}
          const rgAttr = {
            props: {
              ...elRadioGroup,
              value: this.tiledData[this.item.field]
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (
            <el-radio-group {...rgAttr}>
              {ElOptions}
            </el-radio-group>
          )
        }
        case 'select': {
          const elOption = this.item.attributes ? this.item.attributes.elOption : {}
          const oAttr = {
            props: {
              ...elOption
            }
          }
          const ElOptions = this.item.options.map((option, index) => {
            const a = {
              props: {
                ...oAttr.props,
                ...option
              }
            }
            return (<el-option {...a} key={option.value} value={option.value} label={option.label} />)
          })

          const elSelect = this.item.attributes ? this.item.attributes.elSelect : {}
          const attr = {
            props: {
              ...elSelect,
              value: this.tiledData[this.item.field]
            },
            on: {
              change: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (
            <el-select {...attr}>
              {ElOptions}
            </el-select>
          )
        }
        case 'input': {
          const elInput = this.item.attributes ? this.item.attributes.elInput : {}
          const attr = {
            props: {
              ...elInput,
              value: this.tiledData[this.item.field],
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-input {...attr} />)
        }
        case 'checkbox': {
          if (this.tiledData[this.item.field] === null) {
            this.syncVModel([], this.item.field)
          }
          const elCheckbox = this.item.attributes ? this.item.attributes.elCheckbox : {}
          const cAttr = {
            props: {
              ...elCheckbox
            }
          }
          const ElCheckbox = this.item.options.map(option => {
            const a = {
              props: {
                ...cAttr.props,
                ...option
              }
            }
            return (<el-checkbox {...a} label={option.label}></el-checkbox>)
          })
          const elCheckboxGroup = this.item.attributes ? this.item.attributes.elCheckboxGroup : {}
          const cgAttr = {
            props: {
              ...elCheckboxGroup,
              value: this.tiledData[this.item.field]
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            }
          }
          
          return (<el-checkbox-group {...cgAttr}>
            {ElCheckbox}
          </el-checkbox-group>)
        }
        case 'input-number': {
          if (this.tiledData[this.item.field] === null) {
            this.syncVModel(0, this.item.field)
          }
          const elInputNumber = this.item.attributes ? this.item.attributes.elInputNumber : {}
          const attr = {
            props: {
              ...elInputNumber,
              value: this.tiledData[this.item.field]
            },
            on: {
              change: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-input-number {...attr} />)
        }
        case 'switch': {
          const elSwitch = this.item.attributes ? this.item.attributes.elSwitch : {}
          const attr = {
            props: {
              ...elSwitch,
              value: this.tiledData[this.item.field]
            },
            on: {
              change: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-switch {...attr} />)
        }
        case 'slider': {
          const elSlider = this.item.attributes ? this.item.attributes.elSlider : {}
          const attr = {
            props: {
              ...elSlider,
              value: this.tiledData[this.item.field]
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-slider {...attr} />)
        }
        case 'time-select': {
          const elTimeSelect = this.item.attributes ? this.item.attributes.elTimeSelect : {}
          const attr = {
            props: {
              ...elTimeSelect,
              value: this.tiledData[this.item.field]
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-time-select {...attr} />)
        }
        case 'date-picker': {
          const elDatePicker = this.item.attributes ? this.item.attributes.elDatePicker : {}
          const attr = {
            props: {
              ...elDatePicker,
              value: this.tiledData[this.item.field]
            },
            on: {
              input: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-date-picker {...attr} />)
        }
        case 'rate': {
          const elRate = this.item.attributes ? this.item.attributes.elRate : {}
          const attr = {
            props: {
              ...elRate,
              value: this.tiledData[this.item.field]
            },
            on: {
              change: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-rate {...attr} />)
        }
        case 'color-picker': {
          const elColorPicker = this.item.attributes ? this.item.attributes.elColorPicker : {}
          const attr = {
            props: {
              ...elColorPicker,
              value: this.tiledData[this.item.field]
            },
            on: {
              change: (e) => this.syncVModel(e, this.item.field)
            },
          }
          return (<el-color-picker {...attr} />)
        }
        default: {
          return (<div class="df-item-default-value">{this.item.default}</div>)
        }
      }
    }
  },
  beforeDestroy() {
    this.$emit('destroy', {
      field: this.item.field
    })
  },
  render(h) {
    const formItemAttributes = this.item.attributes ? this.item.attributes.elFormItem : {}
    const attr = {
      props: {
        ...formItemAttributes
      }
    }
    return (
      <el-form-item  key={this.item.field} label={this.item.label} prop={this.item.field} {...attr}>
        {this.renderItem()}
      </el-form-item>
    )
  }
})

export default Vue.component('DForm', {
  props: {
    structure: {
      type: Object,
      default() {
        return {
          groups: []
        }
      }
    },
    value: Object,
    abc: Number
  },
  data: function() {
    return {
      formData: {},
      tiledData: {},
      formItemElem: '',
      abcde: '12321'
    }
  },
  watch: {
    structure() {
      this.formItemRender()
    },
    formData: {
      deep: true,
      handler: function(v) {
        this.$emit('input', v)
        this.$emit('change', v)
      }
    },
    tiledData: {
      deep: true,
      handler: function(v) {
        this.formItemRender()
      }
    }
  },
  created() {
    this.formData = this.value
  },
  mounted() {
    this.formItemRender()
  },
  methods: {
    syncVModel(value) {
      this.formData = value
    },
    formItemRender() {
      // 根据 tiledData 中的内容构建 formItem
      if (!this.structure) {
        return
      }
      const that = this
      const formItemDefine = this.structure.formItemDefine
      const formItemList = []
      function handler(_structure) {
        const keys = Object.keys(_structure)
        if (keys.length === 0) {
          return
        }
        const currentFormStructure = keys.map(k => { // 构建当前层级的 form-item
          return {
            ...formItemDefine[k],
            group: _structure[k].group
          }
        })
        currentFormStructure.forEach(item => {
          formItemList.push(item)
        })
        keys.forEach(k => {
          if (that.tiledData[formItemDefine[k].field]) {
            if (_structure[k].children && _structure[k].children[that.tiledData[formItemDefine[k].field]]) {
              handler(_structure[k].children[that.tiledData[formItemDefine[k].field]])
            }
          }
        })
      }
      handler(this.structure.structureDefine)
      this.formItemElem = formItemList.map((item, index) => {
        // 初始值处理
        // 如果 this.tiledData[item.field] 不存在值，获取 formData 中的值，如果 formData没有值，则赋值为配置的默认值，再没有就赋值 null
        let v = this.tiledData[item.field]
        if (v === undefined) {
          v = getValueByPath(this.formData, item.field)
          if (v === undefined) {
            v = item.default
            if (v === undefined) {
              v = null
            }
          }
        }
        this.inputEventHander({ // 调用输入事件，创建该键，并赋值
          field: item.field,
          value: v
        })
        const attr = {
          props: {
            item: item,
            tiledData: this.tiledData
          },
          on: {
            input(e) {
              that.inputEventHander(e)
            },
            destroy(e) {
              that.destroyEventHander(e)
            }
          }
        }
        return (<FormItem slot={item.group} key={item.field} {...attr} />)
      })
    },
    inputEventHander(e) {
      const that = this
      function handler(fields, value, targetObject ) {
        // 如果只有一个字段了
        if (fields.length === 1) {
          // 判断是否为空，为空则创建一下
          if (!targetObject || targetObject === undefined) {
            // 如果是数字，则创建数组并返回
            if (/^\d+$/.test(fields[0])) {
              const a = [];
              a[parseInt(fields[0])] = value;
              return a;
            }
            // 否则返回一个建好的对象
            return {
              [fields[0]]: value,
            };
          }
          // 如果目标对象非空，且待插入的字段名是数字，则表示要将 value 插入到数组
          if (/^\d+$/.test(fields[0])) {
            that.$set(targetObject, parseInt(fields[0]), value)
          // 字段名不是数字，则直接插入
          } else {
            that.$set(targetObject, fields[0], value)
          }
          return targetObject;
        }
        // 下面两个判断是在当前 fields 有一个以上的长度时进行的
        // 如果目标对象为空
        if (!targetObject || targetObject === undefined) {
          // 数组
          if (/^\d+$/.test(fields[0])) {
            const arr = [];
            // 构建下一层级
            arr[parseInt(fields[0])] = handler(fields.slice(1, fields.length), value, undefined);
            return arr;
          }
          // 对象
          return { [fields[0]]: handler(fields.slice(1, fields.length), value, undefined) };
        }
        if (/^\d+$/.test(fields[0])) {
          const v = handler(fields.slice(1, fields.length), value, targetObject[parseInt(fields[0])])
          that.$set(targetObject, parseInt(fields[0]), v)
        } else {
          const v = handler(fields.slice(1, fields.length), value, targetObject[fields[0]]);
          that.$set(targetObject, fields[0], v)
        }
        return targetObject;
      }
      this.$set(this.tiledData, e.field, e.value)
      handler(e.field.split('.'), e.value, this.formData) // 重新赋值，触发响应式更新
    },
    destroyEventHander(e) {
      function handler(fields, targetObject) {
        if (fields.length === 1) {
          if (targetObject[fields[0]] !== undefined) {
            delete targetObject[fields[0]];
          }
        } else {
          handler(fields.slice(1, fields.length), targetObject[fields[0]]);
          if (Object.keys(targetObject[fields[0]]).length === 0) {
            delete targetObject[fields[0]];
          }
        }
      }
      handler(e.field.split('.'), this.formData)
    }
  },
  render: function(h) {
    const attr = {
      props: {
        groups: this.structure && this.structure.groups
      },
      ref: 'df-root'
    }
    return <DFormRoot {...attr} >
      {this.formItemElem}
    </DFormRoot>
  }
})
