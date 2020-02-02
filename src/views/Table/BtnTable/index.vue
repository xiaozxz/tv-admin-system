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
      ></TvTable>
    </div>
  </div>
</template>
<script>
import { TvFilterForm, createControl, TvTable } from 'tv-admin-ui/components'
import { getTestData, updateService, list } from '@/util/testdata'

export default {
  name: '',
  components: { TvTable },
  data() {
    let fields = Object.freeze([
      {
        formKey: 'title',
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
        formKey: 'time',
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
                loadingKey: 'all',
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
              selfModal: 'SelfModal'
            })
          }
        ]
      }
    ]
    return {
      columns: Object.freeze(columns),
      getPageDataService: getTestData,
      tableData: [],
      search: {
        tableSearch: { page: 1, size: 5, total: 20 },
        filter: {
          phone: '123456789',
          desc: '这是一个新的描述'
        }
      },

      pageOption: Object.freeze({
        sizes: [5, 10, 15, 20],
        layout: 'prev, pager, next, sizes, jumper'
      })
    }
  },
  mounted() {
    this.tableData = list.slice(1, 10)
  },
  methods: {
    // getData() {
    //   this.getPageDataService.then(res => {
    //     debugger
    //     this.tableData = res.data
    //   })
    // }
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
