<template>
    <div class="page">
        <div>
            <el-button type="text" @click="changeModel(1)">新建1</el-button>
            <el-button type="text" @click="changeModel(2)">新建2</el-button>
        </div>
        <TVTable
            :expandOption="ExpandOption"
            :columns="columns"
            :tableOption="tableOption"
            :data="data"
            @changePopup="changeModal"
        ></TVTable>
        <FormModal v-bind="model.formModal" :submintloading="loading.all" @close="closeModal"></FormModal>
    </div>
</template>
<script>
    import { TVTable, FormModal } from '@/components/index';
    import { defaultData,getTestData } from './testdata/index';
    import ExpandTag from './ExpandTag';
    import ExpandBtn from './ExpandBtn';
    let fields = Object.freeze([
        {
            formKey: 'title',
            label: '标题',
            class: 'form-a-item',
            rules: [{ required: true }, { selfType: 'phone' }],
            canShow: model => model.desc != '1',
            control: {
                type: 'input',
                // controlOption: { 'active-text': '', 'inactive-value': 'off' }
            },
        },
        {
            formKey: 'time',
            label: '时间',
            rules: [
                { required: true },
                {
                    validator: (rule, value, callback) => {
                        if (value == this.test) {
                            callback('不能相等');
                        } else {
                            callback();
                        }
                    },
                },
                {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                },
            ],
            control: {
                type: 'input',
                controlOptions: { placeholder: '值为1电话显示消失' },
            },
        },
    ]);

    export default {
        name: 'TablePage',
        // eslint-disable-next-line vue/no-unused-components
        components: { TVTable, FormModal },
        data() {
            return {
                loading: { all: false },
                tableOption: Object.freeze({
                    border: true,
                }),
                model: {
                    formModal: { visible: false },
                },

                ExpandOption: Object.freeze({

                    isOnly: true,
                    tag: ExpandTag,
                }),
                columns: Object.freeze([
                    { prop: 'title', label: '标题', align: 'center' },
                    { prop: 'time', label: '时间' },
                    {
                        prop: 'status',
                        label: '状态',
                        columnType: 'TranlateColumn',
                        translate: { 0: '禁用', 1: '启用' },
                    },
                    {
                        prop: 'operate',
                        label: '操作',
                        columnType: 'ListColumn',
                        labelClassName: 'test',
                        children: [
                            {
                                selfTag: ExpandBtn,
                            },
                            {
                                title: '修改',
                                action: Object.freeze({
                                    title: '修改数据',
                                    type: 'modal',
                                    fieldOptions: fields,
                                    submit: {
                                        service: () => {},
                                    },
                                }),
                            },
                        ],
                    },
                ]),
                data: defaultData,
            };
        },
        methods: {
            changeSearch({tableSearch,condtionSearch}) {

            },
            submitCancelDo({ ajaxId, response, }) {
                this.changeSearch();
            },

            changeLoading({ ajaxId, loadingKey, status }) {
                this.$set(this.loading, loadingKey, status);
            },

            changeModal({ visible, model, action, modalKey }) {
                this.$set(this.model, modalKey, {
                    visible,
                    model,
                    action,
                });
            },

            closeModal(type) {
                this.model[type] = { visible: false };
            },
        },
    };
</script>