<template>
  <div class="page form-page form-inline-page ">
    <div class="page-header">
      <h3>这是普通form</h3>
    </div>
    <div class="page-content">
      <TvForm
        :model.sync="model"
        @formSubmit="formSubmit"
        :fieldOptions="files"
        :mode="mode"
      ></TvForm>
    </div>
    <div>{{ model }}</div>
  </div>
</template>
<script>
import { TvForm, createControl } from 'tv-admin-ui'
export default {
  name: '',
  components: { TvForm },
  data() {
    let files = Object.seal([
      {
        props: 'name',
        label: '名称',
        rules: [{ required: true }],
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
        props: 'list',
        label: '集合',
        fields: [
          {
            props: 'desc',
            label: '描述字段1',
            control: createControl.Input()
          },
          {
            props: 'number',
            label: '总数',
            control: createControl.Number()
          }
        ]
      }
    ])
    return {
      mode: 'inline',
      model: {},
      files
    }
  },
  methods: {
    formSubmit(params) {
      console.info(this.model)
    }
  }
}
</script>
<style lang="less">
.form-inline-page {
  .d-form-item {
    width: 33.33%;
    margin-bottom: 20px;
  }
}
</style>
