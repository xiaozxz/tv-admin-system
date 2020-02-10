<script>
import { createControl, createColumn, createAction } from 'tv-admin-ui'
import { getData, updateService, list } from '@/util/testdata'
import { NormalPageTable } from '@/util/mix'
import SelfModal from './component/SelfModal'
import ExpandTag from './component/ExpandTag'
export default {
  name: 'search-page',
  mixins: [NormalPageTable],
  components: { SelfModal },
  data() {
    let updateFileds = [
      {
        props: 'title',
        label: '标题',
        rules: [{ required: true }],
        control: createControl.Input()
      },
      {
        props: 'time',
        label: '时间',
        rules: [{ required: true }],
        control: createControl.DatePicker()
      }
    ]

    let tableBtns = [
      {
        title: '展开',
        action: createAction.expand({ type: 'expand' })
      },
      {
        title: '修改',
        action: createAction.modal({
          title: '修改数据',
          fieldOptions: updateFileds,
          submit: {
            service: updateService
          }
        })
      },
      {
        title: model => (model.status == 1 ? '无提示禁用' : '无提示启用'),
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
        title: '去详情',
        action: createAction.goOther({
          url: '/table/normal'
        })
      },
      {
        title: '自定义弹出框',
        action: createAction.selfModal({
          modalKey: 'SelfModal',
          submit: {
            service: updateService
          }
        })
      }
    ]
    let tableColumns = [
      createColumn.normal({
        type: 'index',
        label: '序号',
        width: 60,
        align: 'center'
      }),
      createColumn.normal({
        prop: 'title',
        label: '标题',
        align: 'center'
      }),
      createColumn.normal({
        prop: 'time',
        label: '时间',
        align: 'center'
      }),
      createColumn.btnlist({
        prop: 'status',
        label: '状态',
        children: [
          {
            icon: model =>
              model.status == 0 ? 'el-icon-star-off' : 'el-icon-star-on',
            action: createAction.normal({
              submit: {
                params: model => {
                  model.status = model.status == 0 ? 1 : 0
                  return model
                },
                service: updateService
              }
            })
          }
        ]
      }),
      createColumn.btnlist({
        prop: 'operate',
        label: '操作',
        btnNumber: 3,
        children: tableBtns
      })
    ]
    return {
      pageTitle: '',
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
