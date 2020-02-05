<script>
import { createControl, createColumn, createAction } from 'tv-admin-ui'
import { getData, updateService, list } from '@/util/testdata'
import { NormalPageTable } from '@/util/mix'
import ExpandTag from './component/ExpandTag'

export default {
  name: 'search-page',
  mixins: [NormalPageTable],
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
        title: '新增',
        action: createAction.modal({
          title: '新增数据',
          fieldOptions: updateFields,
          submit: {
            service: updateService
          }
        })
      }
    ]

    let tableColumns = [
      createColumn.normal({ prop: '', label: '' }),
      createColumn.normal({ type: 'index', label: '序号' }),
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
        children: [
          {
            title: '修改',
            action: createAction.modal({
              title: '',
              fieldOptions: updateFields,
              submit: {
                service: updateService
              }
            })
          }
        ]
      })
    ]

    return {
      pageTitle: '',
      pageBtns,
      pageFilter,
      tableColumns,
      selectRows: [],
      tableExpandOption: {},
      getPageDataService: getData
    }
  }
}
</script>
