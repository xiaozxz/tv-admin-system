<script>
import { createControl, createColumn, createAction } from 'tv-admin-ui'
import { getData, updateService, list } from '@/util/testdata'
import { NormalPageTable } from '@/util/mix'
import ExpandTag from './component/ExpandTag'
import SelfModal from './component/SelfModal'

export default {
  name: 'search-page',
  mixins: [NormalPageTable],
  components: { SelfModal },
  data() {
    let pageFilter = [
      {
        props: 'title',
        label: '标题',
        control: createControl.Input()
      },
      {
        props: 'time',
        label: '时间',
        control: createControl.DatePicker({
          controlOption: { type: 'daterange' }
        })
      }
    ]

    let updateFields = [
      {
        props: 'title',
        label: '标题',
        control: createControl.Input()
      },
      {
        props: 'time',
        label: '时间',
        control: createControl.DatePicker()
      }
    ]

    let pageBtns = [
      {
        title: '批量删除',
        modelKeys: ['selectRows'],
        action: createAction.modal({
          title: '新增数据',
          fieldOptions: updateFields,
          submit: {
            service: updateService
          }
        })
      }
    ]

    let tableBtns = [
      {
        title: '详情',
        action: createAction.expand({ type: 'expand' })
      },
      {
        title: '修改',
        action: createAction.modal({
          title: '修改数据',
          fieldOptions: updateFields,
          submit: {
            service: updateService
          }
        })
      },
      {
        title: '无提示启用',
        action: createAction.normal({
          submit: {
            params: modal => {
              modal.status = modal.status == 0 ? 1 : 0
              return modal
            },
            successMsg: '操作成功',
            service: updateService
          }
        })
      },
      {
        title: '详情页面',
        action: createAction.goOther({
          url: 'pageDetail',
          params: 'id'
        })
      },
      {
        title: '自定义弹出框',
        action: createAction.selfModal({
          options: {
            selfModal: 'SelfModal'
          },
          submit: {
            service: updateService
          }
        })
      }
    ]

    let tableColumns = [
      createColumn.normal({ type: 'index', label: '序号', width: 60 }),
      createColumn.normal({ prop: 'title', label: '标题' }),
      createColumn.normal({ prop: 'time', label: '时间' }),
      createColumn.btnlist({
        prop: 'status',
        label: '状态',
        children: [
          {
            icon: model =>
              model.status == 0 ? 'el-icon-star-off' : 'el-icon-star-on',
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
      }),
      createColumn.btnlist({
        prop: 'opearte',
        label: '操作',
        btnNumber: 3,
        children: tableBtns
      })
    ]

    return {
      pageTitle: '',
      pageBtns,
      pageFilter,
      tableColumns,
      selectRows: [],
      tableExpandOption: {
        tag: ExpandTag
      },
      selfModalKeys: ['SelfModal'],
      getPageDataService: getData
    }
  }
}
</script>
