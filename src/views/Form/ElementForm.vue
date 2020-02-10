<template>
  <div class="page form-page form-inline-page">
    <div class="page-header">
      <h3>类似element</h3>
    </div>
    <div class="page-content">
      <TvForm :model.sync="model">
        <TvFormItem :label="'字段'">
          <el-input v-model="model.filed"></el-input>
        </TvFormItem>
        <TvFormItem
          :props="'filedDesc'"
          :label="'字段描述'"
          :control="{ type: 'el-input' }"
        ></TvFormItem>
        <TvFormItem
          :props="['workStart', 'workEnd']"
          :label="'工作日期'"
          :control="{
            type: 'el-datePicker',
            controlOption: { type: 'daterange' }
          }"
        ></TvFormItem>
        <div class="page-section">
          <div class="item-header">其他</div>
          <div>
            <TvFormItems :fieldOptions="files"></TvFormItems>
          </div>
        </div>
        <div class="page-section">
          <div class="item-header">
            分组
            <el-button @click="addRow" type="primary">新增</el-button>
          </div>
          <div class="row" v-for="(item, index) in model.list" :key="index">
            <TvFormItem
              v-for="(option, optionIndex) in files"
              :position="['list', index, option.props]"
              v-bind="option"
              :key="optionIndex"
            ></TvFormItem>
          </div>
        </div>
      </TvForm>
    </div>
    <div>{{ model }}</div>
  </div>
</template>
<script>
import { TvForm, TvFormItems, createControl, TvFormItem } from 'tv-admin-ui'
export default {
  name: '',
  components: { TvForm, TvFormItems, TvFormItem },
  data() {
    let files = Object.seal([
      {
        props: 'name',
        label: '名称',
        control: createControl.Input()
      },
      {
        props: 'desc',
        label: '描述',
        control: createControl.Input()
      },
      {
        props: ['start', 'end'],
        label: '日期',
        control: createControl.DatePicker({
          controlOption: { type: 'daterange' }
        })
      }
    ])
    return {
      mode: 'inline',
      model: {
        list: [{}]
      },
      files
    }
  },
  methods: {
    addRow() {
      this.model.list.push({})
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
  .page-section {
    width: 100%;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
