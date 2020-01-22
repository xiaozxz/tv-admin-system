<template>
  <div class="page form-page">
    <div class="page-header">
      <h3>类似element</h3>
    </div>
    <div class="page-content">
      <TvForm :model.sync="model">
        <TvFormItem :label="'名称'">
          <el-input v-model="model.name"></el-input>
        </TvFormItem>
        <TvFormItem
          :props="'desc'"
          :label="'描述'"
          :control="{ type: 'input' }"
        ></TvFormItem>
      </TvForm>
    </div>
    <div>{{ model }}</div>
  </div>
</template>
<script>
import { TvForm, TvFormItem } from 'tv-admin-ui/components'
export default {
  name: '',
  components: { TvForm, TvFormItem },
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
      },
      {
        props: 'list',
        label: '集合',
        controls: [
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
      model: {},
      files
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
