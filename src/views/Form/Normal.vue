<template>
  <div class="page form-page-inline">
    <div class="page-header">标题</div>
    <div class="page-content">
      <tv-form
        :model.sync="model"
        @formSubmit="submit"
        :fieldOptions="fields"
      ></tv-form>
      <div>{{ model }}</div>
    </div>
  </div>
</template>
<script>
import { TvForm, createControl } from 'tv-admin-ui'
export default {
  name: 'formPage',
  components: { TvForm },
  data() {
    let fields = [
      {
        props: 'select',
        label: '下拉框',
        control: createControl.Select({
          controlOption: {
            options: [
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' }
            ]
          }
        })
      },
      {
        props: 'Input',
        label: '输入框',
        canShow: model => model.select == 2,
        rules: [{ required: true }, { vType: 'specialChar' }],
        control: createControl.Input()
      },
      {
        props: 'time',
        label: '时间点',
        control: createControl.DatePicker()
      },
      {
        props: ['start', 'end'],
        label: '时间段',
        control: createControl.DatePicker({
          controlOption: { type: 'daterange' }
        })
      },
      {
        props: 'list',
        label: '集合',
        fields: createControl.Fields({
          list: [
            {
              props: 'Input',
              label: '输入框',
              control: createControl.Input()
            },
            {
              props: 'time',
              label: '时间',
              control: createControl.DatePicker()
            }
          ]
        })
      }
    ]
    return {
      model: {},
      fields
    }
  },
  methods: {
    submit(isOk) {
      debugger
    }
  }
}
</script>
<style lang="less">
.form-page-inline {
}
</style>
