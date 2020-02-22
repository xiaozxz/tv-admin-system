<template>
  <div class="page form-page form-page-inline">
    <div class="page-header">
      <h3>这是普通form</h3>
      <el-button-group>
        <el-button type="primary" @click="setMode('horizontal')"
          >普通</el-button
        >
        <el-button type="primary" @click="setMode('vertical')">垂直</el-button>
        <el-button type="primary" @click="setMode('inline')">行内</el-button>
      </el-button-group>
    </div>
    <div class="page-content">
      <TvForm
        :model.sync="model"
        @formSubmit="formSubmit"
        :fieldOptions="fileds"
        :mode="mode"
        :labelLayout="{ width: '110' }"
      ></TvForm>
    </div>
    <div>{{ model }}</div>
  </div>
</template>
<script>
import { TvForm, createControl } from 'tv-admin-ui/components'
import AddComponent from './component/AddGroup'
import DelComponent from './component/DelGroup'
export default {
  name: '',
  components: { TvForm },
  data() {
    let fileds = Object.seal([
      {
        props: 'name',
        label: '名称',
        control: createControl.Input()
      },
      {
        props: 'phone',
        label: '电话',
        rules: [{ required: true }, { vType: 'phone' }],
        control: createControl.Input()
      },
      {
        props: 'number',
        label: '数字',
        rules: [{ required: true }],
        control: createControl.Input()
      },
      {
        props: 'self',
        label: '自定义',
        rules: [
          {
            validator: (rule, value, callback) => {
              if (value == '12') {
                callback('错了')
              }
              callback()
            }
          }
        ],
        control: createControl.Input()
      },
      {
        props: 'desc',
        label: '描述',
        control: createControl.Input()
      },
      {
        props: 'select',
        label: '下拉框',
        control: createControl.Select({
          controlOption: {
            options: [
              { label: '数据1', value: '这是值1' },
              { label: '数据1', value: '这是值2' }
            ]
          }
        })
      },
      {
        props: 'radio',
        label: '单选框',
        control: createControl.Radio({
          controlOption: {
            options: [
              { label: '数据1', value: '这是值1' },
              { label: '数据1', value: '这是值2' }
            ]
          }
        })
      },
      {
        props: 'checkbox',
        label: '多选框',
        control: createControl.Checkbox({
          controlOption: {
            options: [
              { label: '数据1', value: '这是值1' },
              { label: '数据1', value: '这是值2' }
            ]
          }
        })
      },
      {
        props: ['start', 'end'],
        label: '日期',
        control: createControl.DatePicker({
          controlOption: { type: 'daterange' }
        })
      },
      {
        props: 'time',
        label: '创建时间',
        control: createControl.DatePicker({
          controlOption: {
            //  format: 'yyyy 年 MM 月 dd 日',
            valueFormat: 'yyyy-MM-dd'
          }
        })
      },
      {
        props: 'list',
        label: '集合',
        fields: createControl.Fields({
          addComponent: AddComponent,
          delComponent: DelComponent,
          list: [
            {
              props: 'Input',
              // label: '输入框',
              control: createControl.Input()
            },
            {
              props: 'time',
              // label: '时间',
              control: createControl.DatePicker()
            }
          ]
        })
      }
    ])
    return {
      mode: 'inline',
      model: {},
      fileds
    }
  },
  methods: {
    formSubmit(params) {
      console.info(this.model)
    },
    setMode(mode) {
      this.mode = mode
    }
  }
}
</script>
<style lang="less">
.form-page-inline {
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .d-from-inline {
    margin: 0 -20px;
    .d-form-item {
      width: 33.33%;
      padding: 0 20px;
      margin-bottom: 20px;
    }
    .d-form-items {
      padding: 0 20px;
    }
  }
}
</style>
