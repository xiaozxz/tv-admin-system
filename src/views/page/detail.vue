<template>
  <div class="page">
    tv
    <div class="page-header">详情页面</div>
    <div class="page-content">
      <tv-form
        :model.sync="model"
        :fieldOptions="fieldOptions"
        mode="inline"
      ></tv-form>
    </div>
  </div>
</template>

<script>
import { TvForm, createControl } from 'tv-admin-ui'
export default {
  name: '',
  components: { TvForm },
  data() {
    let fieldOptions = [
      {
        props: 'id',
        label: 'id',
        control: createControl.Input()
      },
      {
        props: 'title',
        label: '标题',
        control: createControl.createInput()
      },
      {
        props: 'time',
        label: '时间',
        rules: [],
        control: createControl.createDatePicker()
      },
      {
        props: 'status',
        label: '状态',
        rules: [],
        control: createControl.createSwitch()
      }
    ]
    return {
      data: {
        model: {},
        fieldOptions
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less"></style>
