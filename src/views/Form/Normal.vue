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
import { TvForm } from 'tv-admin-ui/components'
export default {
  name: '',
  components: { TvForm },
  data() {
    let files = Object.seal([
      {
        props: 'name',
        label: '名称',
        rules: [{ required: true }],
        control: {
          type: 'input',
          controlOption: { placeholder: '这是是个测试' }
        }
      },
      {
        props: 'desc',
        label: '描述',
        control: {
          type: 'input',
          controlOptions: { placeholder: '值为1电话显示消失' }
        }
      },
      {
        props: ['start', 'end'],
        label: '日期',
        control: {
          type: 'datePicker',
          controlOption: { type: 'daterange' }
        }
      },
      {
        props: 'list',
        label: '集合',
        fields: [
          {
            props: 'desc',
            label: '描述字段1',
            control: {
              type: 'input',
              controlOption: { placeholder: '值为1电话显示消失' }
            }
          },
          {
            props: 'number',
            label: '总数',
            control: {
              type: 'number'
            }
          }
        ]
      }
    ])
    return {
      mode: 'inline',
      // eslint-disable-next-line vue/no-reserved-keys
      _test: '1233',
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
