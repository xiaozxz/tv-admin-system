<template>
  <div class="page table-page">
    <div class="page-header">
      <h3>按钮列表页面</h3>
    </div>
    <div class="page-content">
      <TvTable
        :columns="columns"
        :pageOption="pageOption"
        :data="tableData"
        :pageInfo="tableSearch"
        @changeTableSearch="tableSearchData"
        @changeModal="changeModal"
        @changeLoading="changeLoading"
        @submitCancelDo="submitCancelDo"
      ></TvTable>
      <TvFormModal
        v-bind="modal.formModal"
        :submintloading="loading.all"
        @close="closeModal"
        @submitCancelDo="submitCancelDo"
      ></TvFormModal>
      <SelfModal
        v-bind="modal.SelfModal"
        :submintloading="loading.all"
        @close="closeModal"
        @submitCancelDo="submitCancelDo"
      ></SelfModal>
    </div>
  </div>
</template>
<script>
import { TvFormModal, createControl, TvTable } from 'tv-admin-ui/components'
import { getTestData, updateService, list } from '@/util/testdata'
import SelfModal from './SelfModal.vue'

export default {
  name: '',
  components: { TvTable, TvFormModal, SelfModal },
  data() {
    let fields = Object.seal([
      {
        props: 'title',
        label: '标题',
        class: 'form-a-item',
        rules: [{ required: true }],
        canShow: model => model.desc != '1',
        control: {
          type: 'el-input'
          // controlOption: { 'active-text': '', 'inactive-value': 'off' }
        }
      },
      {
        props: 'time',
        label: '时间',
        control: createControl.createDatePicker()
      }
    ])
    const columns = [
      { label: '序号', type: 'index', width: '60', align: 'center' },
      { prop: 'title', label: '标题', align: 'center' },
      { prop: 'time', label: '时间' },
      {
        prop: 'status',
        label: '状态',
        columnType: 'TranlateColumn',
        translate: { 0: '禁用', 1: '启用' }
      },
      {
        prop: 'operate',
        label: '操作',
        columnType: 'ListColumn',
        labelClassName: 'test',
        btnNumber: 3,
        children: [
          {
            title: '修改',
            action: Object.freeze({
              title: '修改数据',
              modelClass: 'testClass',
              type: 'modal',
              fieldOptions: fields,
              submit: {
                service: updateService
              }
            })
          },

          {
            title: model => (model.status == 0 ? '启用' : '禁用'),
            action: Object.freeze({
              type: 'confirm',
              confirm: {
                title: '提示',
                content: model =>
                  `您是否要${model.status == 0 ? '启用' : '禁用'}该数据`
              },
              submit: {
                params: modal => {
                  modal.status = modal.status == 0 ? 1 : 0
                  debugger
                  return modal
                },
                service: updateService
              }
            })
          },
          {
            title: model => (model.status == 0 ? '无提示启用' : '无提示禁用'),
            action: Object.freeze({
              type: 'normal',
              submit: {
                service: updateService
              }
            })
          },
          {
            title: '查看测试',
            action: Object.freeze({
              type: 'goOther',
              url: '/form'
            })
          },
          {
            title: '自定义弹出框',
            action: Object.freeze({
              type: 'selfModal',
              options: {
                selfModal: 'SelfModal'
              }
            })
          }
        ]
      }
    ]
    return {
      loading: { all: false },
      columns: Object.freeze(columns),
      getPageDataService: getTestData,
      tableData: [],
      tableSearch: { page: 1, size: 5, total: 20 },
      search: {
        tableSearch: { page: 1, size: 5, total: 20 },
        filter: {
          phone: '123456789',
          desc: '这是一个新的描述'
        }
      },
      modal: {
        formModal: { visible: false }
        // SelfModal: { visible: true,modal:{name:1},action:{} },
      },
      pageOption: Object.freeze({
        sizes: [5, 10, 15, 20],
        layout: 'prev, pager, next, sizes, jumper'
      })
    }
  },
  mounted() {
    this.tableSearchData()
  },
  methods: {
    tableSearchData({ tableSearch } = {}) {
      if (tableSearch) {
        this.tableSearch = tableSearch
      }

      getTestData(this.tableSearch).then(reponse => {
        let { number = 0, size, totalElements = 0, content } = reponse.content
        this.tableData = content
        this.tableSearch = {
          page: number + 1,
          size,
          total: totalElements
        }
      })
    },

    submitCancelDo({ ajaxId, response }) {
      this.tableSearchData()
    },

    changeLoading({ ajaxId, loadingKey, status }) {
      this.$set(this.loading, loadingKey, status)
    },

    changeModal({ visible, model, action, modalKey }) {
      console.info({ visible, model, action, modalKey })
      this.$set(this.modal, modalKey, {
        visible,
        model,
        action
      })
    },

    closeModal(type) {
      this.modal[type] = { visible: false }
    }
  }
}
</script>
<style lang="less">
.table-page {
  .page-button {
    margin-bottom: 20px;
  }
}
</style>
