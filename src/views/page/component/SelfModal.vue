<template>
  <el-dialog
    :title="action.title"
    :close-on-click-modal="false"
    :custom-class="'dd-cc'"
    @close="close"
    :visible="visible"
    :destroy-on-close="true"
  >
    <template v-if="visible">
      <div>
        <h1>这是一个自定义弹出框</h1>
        <div>{{ data }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="isSubmit" @click="close">取 消</el-button>
        <el-button :loading="isSubmit" type="primary">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'SelfModal',
  // components: { TVForm },
  props: {
    visible: { default: false },
    action: {
      default: function() {
        return {}
      }
    },
    submintloading: { default: false },
    model: {}
  },
  data() {
    return {
      init: false,
      isSubmit: false,
      data: {}
    }
  },

  methods: {
    initModal(model) {
      let _this = this
      if (this.action.init) {
        let { service, getModelByResponse, params } = this.action.init
        //  let request = handleParams(model, params);
        this.init = true
        service(params)
          .then(res => {
            let model = res.content
            if (getModelByResponse) {
              model = getModelByResponse(model)
            }
            _this.data = model
          })
          .catch(res => {})
          .finally(res => {
            this.init = false
          })
      } else {
        _this.data = { ...model }
      }
    },

    submit(params) {
      let { ...actionSubmit } = this.action.submit
      this.isSubmit = true
      actionSubmit
        .service(params)
        .then(res => {
          this.$emit('submitCancelDo', res)
          let key = this.action.selfModal || 'formModal'
          this.$emit('close', key)
        })
        .catch(res => {
          this.$emit('submitCancel', res)
        })
        .finally(res => {
          this.isSubmit = false
        })
    },
    close() {
      if (this.isSubmit) {
        return false
      }
      if (this.action && this.action.modalKey) {
        let key = this.action.modalKey
        this.$emit('close', key)
      }
    }
  }
}
</script>
<style lang="less">
.dd-cc {
  width: 600px;
}
</style>
