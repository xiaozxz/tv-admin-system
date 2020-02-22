<template>
  <div class="page detail-page-inline">
    <div class="page-header">详情页面</div>

    <div class="page-content">
      <tv-form
        :model.sync="model"
        :fieldOptions="fields"
        mode="inline"
      ></tv-form>
    </div>
  </div>
</template>

<script>
import { TvForm, createControl } from 'tv-admin-ui/components'
export default {
  name: 'detailPage',
  components: { TvForm },
  data() {
    let fields = [
      {
        props: 'select',
        label: '下拉框',
        control: createControl.Text({
          controlOption: {
            textShow: true,
            translate: { 0: '启用', 1: '禁用' }
          }
        })
      },
      {
        props: 'input',
        label: '输入框',
        control: createControl.Text()
      },
      {
        props: 'text',
        label: '时间点',
        control: createControl.Text()
      },
      {
        props: 'detail',
        label: '时间段',
        control: createControl.Text()
      }
    ]
    return {
      model: {
        text:
          '这是一个很长的文本这是一个很长的文本这是一个很长的文本这是一个很长的文本这是一个很长的文本这是一个很长的文本',
        input: '这是一个很长的文本',
        select: 1,
        detail: '这是一个很长的文本'
      },
      mode: 'horizontal',
      fields
    }
  },
  methods: {
    submit(isOk) {
      debugger
    },
    setMode(mode) {
      this.mode = mode
    }
  }
}
</script>
<style lang="less">
.detail-page-inline {
  .d-from-inline {
    margin: 0 -20px;
  }
  .d-form-item {
    width: 33.33%;
    margin-bottom: 20px;
    padding: 0px 20px;
  }
}
</style>
