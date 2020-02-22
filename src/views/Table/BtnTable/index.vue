<script>
import { createControl, createColumn, createAction } from 'tv-admin-ui'
import { getData, updateService, list } from '@/util/testdata'
import { NormalPageTable } from '@/util/mix'
import ExpandTag from './component/ExpandTag'
import SelfModal from './component/SelfModal'
export default {
  name: '',
  mixins: [NormalPageTable],
  components: { SelfModal },
  data() {
    let tableBtns = [
      {
        title: '展开',
        action: createAction.expand({ type: 'expand' })
      },
      {
        title: '修改',
        action: createAction.modal({
          title: '修改数据',
          fieldOptions: [
            {
              props: 'title',
              label: '标题',
              rules: [{ required: true }, { vType: 'specialChar' }],
              control: createControl.Input()
            }
          ],
          submit: {
            service: updateService
          }
        })
      },
      {
        title: model => (model.status == 0 ? '启用' : '禁用'),
        action: createAction.confirm({
          confirm: {
            content: model =>
              `您确定要${model.status == 0 ? '启用' : '禁用'}该数据`
          },
          submit: {
            params: model => {
              let newModel = { ...model }
              model.status = model.status == 0 ? 1 : 0
              return model
            },
            service: updateService
          }
        })
      },
      {
        title: '去普通列表',
        action: createAction.goOther({
          url: '/table/normal'
        })
      },
      {
        title: '自定义modal',
        action: createAction.selfModal({
          title: '标题',
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
      createColumn.normal({ prop: 'title', label: '标题', align: 'center' }),
      createColumn.normal({ prop: 'time', label: '时间' }),
      createColumn.btnlist({
        prop: 'status',
        label: '状态',
        width: 80,
        align: 'center',
        children: [
          {
            icon: model =>
              model.status == 0
                ? 'el-icon-switch-button'
                : 'el-icon-video-pause',
            action: createAction.normal({
              submit: {
                params: model => {
                  let newModel = { ...model }
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
        prop: 'op',
        label: '操作',
        btnNumber: 3,
        children: tableBtns
      })
    ]
    return {
      pageTitle: '普通列表',
      tableColumns,
      selectRows: [{ id: 20 }],
      tableExpandOption: {
        tag: ExpandTag
      },
      selfModalKeys: ['SelfModal'],
      getPageDataService: getData
    }
  }
}
</script>
