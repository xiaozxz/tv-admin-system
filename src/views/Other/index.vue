<template>
  <div class="page">
    <section>
      <DForm :model.sync="itemForm" :layout="layout" :fieldOptions="files">
        <span>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </span>
      </DForm>
    </section>
    <section>
      <button @click="click()">测试</button>
      <h2>回车查看提交事件</h2>
      <DForm
        :model.sync="nomalForm"
        FormClass="form-a"
        :labelLayout="labelLayout"
        @formSubmit="formSubmit"
        :fieldOptions="files"
      ></DForm>
    </section>
    <section>
      <h1>根据FormItem生成的form</h1>
      <h2>回车查看提交事件</h2>
      <DForm
        :model.sync="itemForm"
        FormClass="form-a"
        :labelLayout="labelLayout"
        @formSubmit="formSubmit"
      >
        <TVFormItems :getFieldOptions="files"></TVFormItems>

        <TVFormItem
          label="测试13123"
          formKey="notInFrom"
          :rules="[{ required: true, message: '请输入活动名称' }]"
        >
          <FormInput v-model="itemForm.notInFrom"></FormInput>
        </TVFormItem>
      </DForm>
    </section>
    <section>
      <FormInputT :form="testData"></FormInputT>
    </section>
  </div>
</template>

<script>
import vue from 'vue'
import FormInput from '../../testComponent/FormInput'
import FormInputT from '../../testComponent/FormInputT'
import { TVForm, TVFormItems, TVFormItem } from '@/components/index'
function compareObj(n, o) {
  let changeKey = ''
  Object.keys(n).forEach(key => {
    if (n[key] != o[key] && key == '') {
      changeKey = key
    }
  })
  return changeKey
}
// function createNoProxyProto(data, key, _this) {
//     let type = typeof data;
//     let typeDo = {
//         object: data => {
//             Object.freeze(data);
//         },
//     };
//     if (typeDo[type]) {
//         typeDo[type](data);
//     }
//     return data;
// }
export default {
  name: 'app',
  components: {
    DForm: TVForm,
    TVFormItems,
    TVFormItem,
    FormInput,
    FormInputT
  },

  mounted() {
    this._test = { name: 'zxz' }
  },
  data() {
    return {
      testData: '',
      nomalForm: {},
      // eslint-disable-next-line vue/no-reserved-keys
      // testN: createNoProxyProto({ name: { title: 'zxz' } }, 'testN',this),
      list: Object.freeze([
        { formKey: 'name', label: '电话' },
        { formKey: 'name', label: '电话' }
      ]),
      itemForm: {
        name: '姓名',
        desc: '描述',
        notInFrom: '数据4',
        nameF: '描述',
        descF: '描述'
      },
      layout: { mode: 'inline', class: 'form-a' },
      labelLayout: { width: 300, class: 'form-a-label', colon: '-' },
      files: Object.freeze([
        {
          formKey: 'name',
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
        },
        {
          formKey: 'selfDescs',
          label: '描述',
          rules: [
            { required: true, message: '请输入活动名称' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符'
            }
          ],
          control: { type: 'self', selfControl: FormInput }
        }
      ]),
      hasSelfFields: [
        {
          formKey: 'name',
          label: '电话',
          rules: [{ required: true }, { selfType: 'phone' }],
          canShow: model => {
            return model.desc != '1'
          },
          control: {
            type: 'input'
            // controlOption: { 'active-text': '', 'inactive-value': 'off' }
          }
        },
        {
          formKey: 'desc',
          label: '描述',
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
          control: { type: 'input' }
        },
        {
          formKey: 'selfDesc',
          label: '描述',
          rules: [
            { required: true, message: '请输入活动名称' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符'
            }
          ],
          control: { type: 'self', selfType: 'selfInput' }
        }
      ],
      dyfields: [
        {
          formKey: 'selfDesc1',
          label: '描述1',
          rules: [
            { required: true, message: '请输入活动名称1' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符'
            }
          ],
          control: { type: 'self', selfType: 'selfInput' }
        },
        {
          formKey: 'selfDesc1',
          label: '描述1',
          rules: [
            { required: true, message: '请输入活动名称1' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符'
            }
          ],
          control: { type: 'self', selfType: 'selfInput' }
        }
      ]
    }
  },

  methods: {
    click() {
      debugger
    },
    formSubmit(isValid) {
      this.$message('验证完成')
    }
  }
}
</script>
