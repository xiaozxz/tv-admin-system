<template>
  <div class="page table-page">
    <div class="page-header">
      <h3>普通列表页面</h3>
    </div>
    <div class="page-content">
      <div class="table-page-filter">
        <TvFilterForm
          :filter="search.filter"
          :fieldOptions="filterForm"
        ></TvFilterForm>
      </div>
      <div class="page-button">
        <el-button type="primary" size="small">新增</el-button>
      </div>
      <TvTable
        :columns="columns"
        :pageOption="pageOption"
        :data="tableData"
        :pageInfo="search.tableSearch"
      ></TvTable>
    </div>
  </div>
</template>
<script>
import { TvFilterForm, TvTable } from 'tv-admin-ui/components'
import { getTestData, list } from '@/util/testdata'

export default {
  name: '',
  components: { TvFilterForm, TvTable },
  data() {
    const filterForm = [
      {
        formKey: 'phone',
        label: '电话',
        class: 'form-a-item',
        rules: [{ required: true }, { selfType: 'phone' }],
        canShow: model => model.desc != '1',
        control: {
          type: 'input'
          // controlOption: { 'active-text': '', 'inactive-value': 'off' }
        }
      },
      {
        formKey: 'desc',
        label: '字段2',
        rules: [
          { required: true },
          {
            validator: (rule, value, callback) => {
              if (value == this.test) {
                callback('不能相等')
              } else {
                callback()
              }
            }
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符'
          }
        ],
        control: {
          type: 'input',
          controlOptions: { placeholder: '值为1电话显示消失' }
        }
      }
    ]
    const columns = [
      { label: '序号', type: 'index', width: '60', align: 'center' },
      { prop: 'title', label: '标题', align: 'center' },
      { prop: 'time', label: '时间' },
      {
        prop: 'status',
        label: '状态',
        columnType: 'TranlateColumn',
        translate: { 0: '禁用', 1: '启用' }
      }
    ]
    return {
      filterForm: Object.seal(filterForm),
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
