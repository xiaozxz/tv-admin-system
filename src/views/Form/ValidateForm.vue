<template>
  <div class="page form-page-inline">
    <div class="page-header">
      <h3>这是普通form</h3>
      <el-button-group>
        <el-button type="primary" @click="setMode('horizontal')"
          >普通</el-button
        >
        <el-button type="primary" @click="setMode('inline')">行内</el-button>
      </el-button-group>
    </div>
    <div class="page-content">
      <tv-form
        :mode="mode"
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
        props: 'specialChar',
        label: '特殊字符',
        rules: [{ required: true }, { vType: 'specialChar' }],
        control: createControl.Input()
      },
      {
        props: 'specialChar',
        label: '',
        rules: [{ required: true }],
        control: createControl.Input()
      }
    ]
    return {
      model: {},
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
.form-page-inline {
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .d-form-item {
    width: 33.33%;
    margin-bottom: 20px;
  }
}
</style>
