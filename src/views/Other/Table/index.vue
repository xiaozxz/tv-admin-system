<script>
import { defaultData, getTestData, ajaxService } from './testdata/index'
import NormalTable from './NormalTable'
import ExpandTag from './ExpandTag'
import ExpandBtn from './ExpandBtn'
import SelfModal from './SelfModal'
let fields = Object.freeze([
  {
    formKey: 'title',
    label: '标题',
    class: 'form-a-item',
    rules: [{ required: true }],
    canShow: model => model.desc != '1',
    control: {
      type: 'input'
      // controlOption: { 'active-text': '', 'inactive-value': 'off' }
    }
  },
  {
    formKey: 'time',
    label: '时间',
    control: {
      type: 'datePicker',
      controlOption: { type: 'daterange' }
    }
  }
])
export default {
  name: 'TablePage',
  components: { SelfModal },
  mixins: [NormalTable],
  data() {
    return {
      loading: { all: false },
      tableOption: Object.freeze({
        border: true
      }),
      selfModalKeys: ['SelfModal'],
      expandOption: Object.freeze({
        isOnly: true,
        tag: ExpandTag
      }),
      columns: Object.freeze([
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
          children: [
            {
              selfTag: ExpandBtn
            },
            {
              title: '修改',
              action: Object.freeze({
                title: '修改数据',
                modelClass: 'testClass',
                type: 'modal',
                fieldOptions: fields,
                submit: {
                  service: ajaxService
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
                ajax: {
                  loadingKey: 'all',
                  service: ajaxService
                }
              })
            },
            {
              title: model => (model.status == 0 ? '启用' : '禁用'),
              action: Object.freeze({
                type: 'normal',
                ajax: {
                  loadingKey: 'all',
                  service: ajaxService
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
      ]),
      pageBtns: Object.freeze([
        {
          title: '新增数据',
          modelKey: [],
          tagAttr: { type: 'primary' },
          action: Object.freeze({
            title: '新增数据',
            type: 'modal',
            fieldOptions: fields,
            submit: {
              service: () => {}
            }
          })
        }
      ]),
      searchFileOptions: fields,
      getPageDataService: getTestData
    }
  },
  mounted() {
    this.changeSearch({})
  },
  methods: {}
}
</script>
