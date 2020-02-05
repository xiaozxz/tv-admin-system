<template>
  <div class="page table-page">
    <div class="page-header">{{ pageTitle }}</div>
    <div class="page-filter">
      <TvFilterForm
        v-if="$data.pageFilter"
        :filter="search.filter"
        :loading="loading.all"
        :fieldOptions="pageFilter"
      ></TvFilterForm>
    </div>
    <div class="page-content">
      <div class="page-button" v-if="$data.pageBtns">
        <!-- <el-button type="primary" size="small">新增</el-button> -->
        <TvTableBtn
          v-for="(node, index) in pageBtns"
          :is="node.selfTag || 'TvTableBtn'"
          :loading="loading.all"
          :nodeInfo="node"
          :model="node.modelKeys ? getPageBtnModel(node.modelKeys) : ''"
          @changePopup="changeModal"
          @submitCancelDo="submitCancelDo"
          @changeLoading="changeLoading"
          :key="index"
        ></TvTableBtn>
      </div>
      <TvTable
        :loading="loading.all"
        :columns="tableColumns"
        :tableOption="tableOption || {}"
        :data="tableData"
        :selectRows.sync="selectRows"
        :pageOption="pageOption"
        :pageInfo="search.tableSearch"
        :tableSearch="search.tableSearch"
        :expandOption="tableExpandOption"
        :clearSelect="clearSelect"
        @changeModal="changeModal"
        @changeLoading="changeLoading"
        @changeTableSearch="changeSearch"
        @submitCancelDo="submitCancelDo"
      ></TvTable>
    </div>
    <div>{{ selectRows }}</div>
    <TvFormModal
      v-bind="modal.formModal"
      :submintloading="loading.all"
      @close="closeModal"
      @submitCancelDo="submitCancelDo"
    ></TvFormModal>
    <component
      v-for="key in selfModalKeys"
      :key="key"
      :is="key"
      v-bind="modal[key]"
      :submintloading="loading.all"
      @close="closeModal"
      @submitCancelDo="submitCancelDo"
    ></component>
  </div>
</template>

<script>
import { TvFilterForm, TvTable, TvFormModal, TvTableBtn } from 'tv-admin-ui'
import { handleSearchParams, handlePageDataRes } from './method'
import _ from 'lodash'
export default {
  name: 'NormalTablePage',
  components: { TvFilterForm, TvTableBtn, TvTable, TvFormModal },
  data() {
    return {
      pageTitle: '',
      loading: { all: false },
      modal: {
        formModal: { visible: false }
        // SelfModal: { visible: true,modal:{name:1},action:{} },
      },
      search: {
        tableSearch: { page: 1, size: 5, total: 0 },
        filter: {}
      },
      tableOption: { border: true },
      selfModalKeys: [],
      selectRows: null,
      clearSelect: true,
      tableExpandOption: null,
      tableData: [],
      pageOption: Object.freeze({
        sizes: [5, 10, 15, 20],
        layout: 'prev, pager, next, sizes, jumper'
      })
    }
  },
  computed: {
    getPageBtnModel: keys => {
      let modelKeys = typeof keys == 'string' ? [keys] : keys
      let model = {}
      keys.forEach(key => {
        model[key] = this[key]
      })
      return model
    }
  },
  created() {
    this._defaultTableSearch = _.cloneDeep(this.search.tableSearch)
    this.changeSearch()
  },
  methods: {
    changeSearch({ tableSearch, filterSearch } = {}) {
      if (tableSearch) {
        this.search.tableSearch = tableSearch
      }
      if (filterSearch) {
        this.search.filterSearch = filterSearch
        this.search.tableSearch.page = this._defaultTableSearch.page
        this.search.tableSearch.size = this._defaultTableSearch.size
      }

      this.loading.all = true

      let { search } = this

      const searchParams = Object.assign(
        {},
        search.tableSearch,
        search.filterSearch
      )

      this.getPageData(searchParams)
    },

    getPageData(searchParams) {
      let changeSearchParams = this.handleSearchParams
        ? this.handleSearchParams
        : handleSearchParams
      let changeResponse = this.handlePageDataRes
        ? this.handlePageDataRes
        : handlePageDataRes
      this.getPageDataService(changeSearchParams(searchParams))
        .then(res => {
          if (res.content) {
            let responseDetail = changeResponse(res.content)
            if (res.content.content == [] && responseDetail.page > 0) {
              searchParams.page = Math.ceil(
                responseDetail.total / responseDetail.size
              )
              this.getPageData(searchParams)
            }

            this.tableData = responseDetail.content || []
            let { page, size, total } = responseDetail
            this.search.tableSearch = { page, size, total }
          }
        })
        .finally(res => {
          this.loading.all = false
        })
    },

    submitCancelDo({ ajaxId, response }) {
      this.changeSearch()
    },

    changeLoading({ ajaxId, loadingKey, status }) {
      this.$set(this.loading, loadingKey, status)
    },

    changeModal({ visible, model, action, modalKey }) {
      debugger
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
