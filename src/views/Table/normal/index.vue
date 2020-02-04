<template>
  <div class="page table-page">
    <div class="page-header">
      <h3>普通列表页面</h3>
    </div>
    <div class="page-content">
      <TvTable
        @changeTableSearch="tableSearchData"
        :pageInfo="tableSearch"
        :tableOption="tableOption"
        :columns="columns"
        :data="tableData"
      ></TvTable>
    </div>
  </div>
</template>
<script>
import { TvFilterForm, TvTable } from 'tv-admin-ui'
import { getTestData } from '@/util/testdata'

export default {
  name: '',
  components: { TvTable },
  data() {
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
      columns: Object.freeze(columns),
      tableData: [],
      tableOption: { border: true },
      tableSearch: { page: 1, size: 5, total: 20 }
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
