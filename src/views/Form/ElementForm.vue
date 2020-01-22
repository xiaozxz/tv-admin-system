<template>
  <div class="page form-page">
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
          :control="{ type: 'input' }"
        ></TvFormItem>
        <TvFormItem
          :props="['workStart', 'workEnd']"
          :label="'工作日期'"
          :control="{
            type: 'datePicker',
            controlOption: { type: 'daterange' }
          }"
        ></TvFormItem>
        <div class="item">
          <div class="item-header">其他</div>
          <div>
            <TvFormItems :fieldOptions="files"></TvFormItems>
          </div>
        </div>
        <div class="item">
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
import { TvForm, TvFormItems, TvFormItem } from 'tv-admin-ui/components'
export default {
  name: '',
  components: { TvForm, TvFormItems, TvFormItem },
  data() {
    let files = Object.seal([
      {
        props: 'name',
        label: '名称',
        control: {
          type: 'input'
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
.form-page {
  .d-form-item {
    width: 33.33%;
    margin-bottom: 20px;
  }
}
</style>
