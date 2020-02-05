<script>
import { TvFormModal, createControl, TvTable } from 'tv-admin-ui'
import { getData, updateService, list } from '@/util/testdata'
import { NormalPageTable } from '@/util/mix'
import ExpandTag from './component/ExpandTag'

export default {
  name: 'searchPage',
  mixins: [NormalPageTable],
  data() {
    let pageFilter = [
      {
        props: 'title',
        label: '标题',
        class: 'form-a-item',
        rules: [{ required: true }],
        canShow: model => model.desc != '1',
        control: createControl.createInput()
      },
      {
        props: ['start', 'end'],
        label: '时间',
        control: createControl.createDatePicker({
          controlOption: { type: 'daterange' }
        })
      }
    ]
    let pageBtns = [
      {
        title: '新增',
        action: Object.freeze({
          title: '修改数据',
          modelClass: 'testClass',
          type: 'modal',
          fieldOptions: pageFilter,
          submit: {
            service: updateService
          }
        })
      },
      {
        title: '批量删除',
        action: Object.freeze({
          title: '修改数据',
          modelClass: 'testClass',
          type: 'modal',
          fieldOptions: pageFilter,
          submit: {
            service: updateService
          }
        })
      }
    ]
    let tableBtn = [
      {
        title: '修改',
        action: Object.freeze({
          title: '修改数据',
          modelClass: 'testClass',
          type: 'modal',
          fieldOptions: pageFilter,
          submit: {
            service: updateService
          }
        })
      },
      {
        title: '数据',
        action: Object.freeze({
          type: 'expand'
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
            params: modal => {
              modal.status = modal.status == 0 ? 1 : 0
              return modal
            },
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
    let tableColumns = [
      { label: '序号', type: 'index', width: '60', align: 'center' },
      { prop: 'title', label: '标题', align: 'center' },
      { prop: 'time', label: '时间' },
      {
        prop: 'status',
        label: '状态',
        columnType: 'ListColumn',
        children: [
          {
            icon: model =>
              model.status == 0 ? 'el-icon-plus' : 'el-icon-minus',
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
                  return modal
                },
                service: updateService
              }
            })
          }
        ]
      },
      {
        prop: 'operate',
        label: '操作',
        columnType: 'ListColumn',
        labelClassName: 'test',
        btnNumber: 3,
        children: tableBtn
      }
    ]
    return {
      pageTitle: '普通检索页面',
      pageBtns,
      pageFilter,
      tableColumns,
      clearSelect: true,
      selectRows: [{ id: 20 }, { id: 19 }],
      tableExpandOption: Object.freeze({
        isOnly: true,
        tag: ExpandTag
      }),
      getPageDataService: getData
    }
  },
  methods: {}
}
</script>
