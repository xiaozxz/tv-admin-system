<template>
    <div class="table-page">
        <TVSearchForm
            v-if="$data.searchFileOptions"
            @submit="changeSearch"
            :loading="loading.all"
            :formData="search.filterSearch"
            :fieldOptions="searchFileOptions"
        />
        <div class="table-content">
            <div class="page-op" v-if="$data.pageBtns">
                <TVTableBtn
                    v-for="(node,index) in pageBtns"
                    :is="node.selfTag||'TVTableBtn'"
                    :loading="loading.all"
                    :nodeInfo="node"
                    @changePopup="changeModal"
                    @submitCancelDo="submitCancelDo"
                    @changeLoading="changeLoading"
                    :key="index"
                ></TVTableBtn>
            </div>
            <TVTable
                :loading="loading.all"
                :columns="columns"
                :tableOption="tableOption||{}"
                :data="content"
                :pageOption="pageOption"
                :pageInfo="search.tableSearch"
                :tableSearch="search.tableSearch"
                :expandOption="expandOption"
                @changePopup="changeModal"
                @changeLoading="changeLoading"
                @changeTableSearch="changeSearch"
                @submitCancelDo="submitCancelDo"
            ></TVTable>
        </div>

        <FormModal
            v-bind="modal.formModal"
            :submintloading="loading.all"
            @close="closeModal"
            @submitCancelDo="submitCancelDo"
        ></FormModal>
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
    import {
        TVTable,
        FormModal,
        TVSearchForm,
        TVTableBtn,
    } from '@/components/index';
    import { handleSearchParams, handlePageDataRes } from './method';
    import _ from 'lodash';
    export default {
        name: 'NormalTablePage',
        components: { TVTable, FormModal, TVSearchForm, TVTableBtn },
        data() {
            return {
                loading: { all: false },
                modal: {
                    formModal: { visible: false },
                    // SelfModal: { visible: true,modal:{name:1},action:{} },
                },
                search: {
                    tableSearch: { page: 1, size: 5, total: 0 },
                    filterSearch: {},
                },
                selfModalKeys: [],
                expandOption: null,
                content: [],
                pageOption: Object.freeze({
                    sizes: [5, 10, 15, 20],
                    layout: 'prev, pager, next, sizes, jumper',
                }),
            };
        },
        created() {
            this._defaultTableSearch = _.cloneDeep(this.search.tableSearch);
        },
        methods: {
            changeSearch({ tableSearch, filterSearch } = {}) {
                if (tableSearch) {
                    this.search.tableSearch = tableSearch;
                }
                if (filterSearch) {
                    this.search.filterSearch = filterSearch;
                    this.search.tableSearch.page = this._defaultTableSearch.page;
                    this.search.tableSearch.size = this._defaultTableSearch.size;
                }

                this.loading.all = true;

                let { search } = this;

                const searchParams = Object.assign(
                    {},
                    search.tableSearch,
                    search.filterSearch
                );

                this.getPageData(searchParams);
            },

            getPageData(searchParams) {
                let changeSearchParams = this.handleSearchParams
                    ? this.handleSearchParams
                    : handleSearchParams;
                let changeResponse = this.handlePageDataRes
                    ? this.handlePageDataRes
                    : handlePageDataRes;
                this.getPageDataService(changeSearchParams(searchParams))
                    .then(res => {
                        if (res.content) {
                            let responseDetail = changeResponse(res.content);
                            if (
                                res.content.content == [] &&
                                responseDetail.page > 0
                            ) {
                                searchParams.page = Math.ceil(
                                    responseDetail.total / responseDetail.size
                                );
                                this.getPageData(searchParams);
                            }
                            this.content = responseDetail.content || [];
                            let { page, size, total } = responseDetail;
                            this.search.tableSearch = { page, size, total };
                        }
                    })
                    .finally(res => {
                        this.loading.all = false;
                    });
            },

            submitCancelDo({ ajaxId, response }) {
                this.changeSearch();
            },

            changeLoading({ ajaxId, loadingKey, status }) {
                this.$set(this.loading, loadingKey, status);
            },

            changeModal({ visible, model, action, modalKey }) {
                console.info({ visible, model, action, modalKey });
                this.$set(this.modal, modalKey, {
                    visible,
                    model,
                    action,
                });
            },

            closeModal(type) {
                this.modal[type] = { visible: false };
            },
        },
    };
</script>
<style lang="less">
.table-page {
    .search-from {
        .d-from-op {
            justify-content: flex-end;
            flex: 1 0 auto;
        }
    }
    .table-op {
        margin-bottom: 20px;
    }
}
</style>