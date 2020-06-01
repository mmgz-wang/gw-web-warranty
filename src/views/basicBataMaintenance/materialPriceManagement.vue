<template>
  <div class="container">
    
    <a-form layout="inline"  :form='form'>
      <a-form-item :colon="false" label="标准">
        <a-select
          placeholder="请选择"
          @change="handleSelectChange"
          style="min-width:180px"
          v-decorator="[
                'type',
                { initialValue:form.reportType,
                  rules: [{ required: true, message: '请输入物料号', }]}
              ]"
        >
          <a-select-option value="male">
            male
          </a-select-option>
          <a-select-option value="female">
            female
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :colon="false" label="物料号" >
        <a-input :maxLength="20"  placeholder=" 请输入" 
        v-decorator="[
                'code',
                { initialValue:form.code,
                  rules: [{ required: true, message: '请输入物料号', }]}
              ]"></a-input>
      </a-form-item>
      <a-form-item :colon="false" label="物料名称" >
        <a-input :maxLength="20"  placeholder=" 请输入" 
        v-decorator="[
                'name',
                { initialValue:form.name,
                  rules: [{ required: true, message: '请输入物料号', }]}
              ]"></a-input>
      </a-form-item>
      <a-form-item>
        <span class="table-page-search-submitButtons">
          <a-button type="primary"  @click='onSubmit'>检索</a-button>
        </span>
      </a-form-item>
    </a-form>
    <div>
      <Table  :impor='impor' :expor='expor' @addclick='addclick' :total='data.length' :current='current' >
        <template slot='table'>
            <a-table
              size="small"
              :columns="columns"
              :dataSource="data"
              :row-selection="rowSelection"
              :pagination='paginations'
              bordered>
              
              <template slot="radio">
                  <a-checkbox default-checked disabled/>
              </template>
              <template slot="radio2">
                  <a-checkbox disabled/>
              </template>
              <template slot="radio3">
                  <a-checkbox disabled/>
              </template>
              <template slot="radio4">
                  <a-checkbox default-checked disabled/>
              </template>
              <span slot="operation" slot-scope="text, record">
                <template>
                  <a @click="handleEdit(record)">编辑</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="handleRemove(record)">删除</a>
                </template>
              </span>
            </a-table>
        </template>
      </Table>  
    </div>
    <a-modal
      title="物料详情"
      :visible="modal1Visible"
      :footer='null'
      @cancel='hideModal'
      width='700px'
    >
      <template>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>物料号</a-col>
                <a-col :span='10'>3878342847</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>报告类型</a-col>
                <a-col :span='12'>类型一</a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>返回标志</a-col>
                <a-col :span='10'><a-checkbox default-checked disabled/></a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>是否辅料</a-col>
                <a-col :span='12'><a-checkbox default-checked disabled/></a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>特殊材料</a-col>
                <a-col :span='10'><a-checkbox default-checked disabled/></a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>质检标志</a-col>
                <a-col :span='12'><a-checkbox default-checked disabled/></a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>维护人</a-col>
                <a-col :span='10'>赵丽</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>维护时间</a-col>
                <a-col :span='12'>2020/01/21  18：08：00</a-col>
              </a-row>
          </a-col>
        </a-row>
      </template>
    </a-modal>
    <a-modal
      title="添加"
      v-model="add"
      width='700px'
    >
      <a-form :form="form2" :label-col="{ span: 8}" :wrapper-col="{ span: 14 }"  @submit="handleSubmit2">

        <a-row>
            <a-col :span='12'>
              <a-form-item label="标准">
                <a-select
                  v-decorator="[
                    'standard',
                    { rules: [{ required: true, message: '请选择!' }] },
                  ]"
                  placeholder="请选择!"
                  @change="handleSelectChange"
                  style="min-width:200px"
                >
                  <a-select-option value="male">
                    male
                  </a-select-option>
                  <a-select-option value="female">
                    female
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="物料号">
                <a-input
                  v-decorator="['code', { rules: [{ required: true, message: '请输入！' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span='12'>
              <a-form-item label="物料名称">
                <a-input
                  v-decorator="['name', { rules: [{ required: true, message: '请输入！' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="调整前单价">
                <a-input
                  v-decorator="['befor', { rules: [{ required: true, message: '请输入！' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span='12'>
              <a-form-item label="调整后单价">
                <a-input
                  v-decorator="['after', { rules: [{ required: true, message: '请输入！' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="调整日期">
                <a-checkbox v-decorator="['changeTime']"></a-checkbox>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span='12'>
              <a-form-item label="币种">
                <a-input
                  v-decorator="['currency', { rules: [{ required: false, message: '请输入！' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="大件标志">
                <a-checkbox v-decorator="['sign']"></a-checkbox>
              </a-form-item>
            </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
          <a-button key="btn" type="primary" :loading="loading" @click="handleOk">
            提交
          </a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
            保存
          </a-button>
          <a-button key="back" @click="handleCancel">取消</a-button>
        </template>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '标准',
    dataIndex: 'standard',
    width:'10%',
    scopedSlots: { customRender: 'standard' }
  },
  {
    title: '物料号',
    dataIndex: 'code',
    width:'10%',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '物料名称',
    dataIndex: 'name',
    width:'10%',
  },
  {
    title: '调整前单价',
    dataIndex: 'befor',
    width:'8%',
    scopedSlots: { customRender: 'befor' }
  },
  {
    title: '调整后单价',
    dataIndex: 'after',
    width:'8%',
    scopedSlots: { customRender: 'after' }
  },
  {
    title: '调整日期',
    dataIndex: 'changeTime',
    width:'8%',
    scopedSlots: { customRender: 'changeTime' }
  },
  {
    title: '币种',
    dataIndex: 'currency',
    width:'8%',
  },
  {
    title: '大件标志',
    dataIndex: 'sign',
    width:'8%',
    scopedSlots: { customRender: 'radio' }
  },
  {
    title: '创建人',
    dataIndex: 'author',
    width:'8%',
  },
  {
    title: '创建时间',
    dataIndex: 'startTime',
    width:'10%',
  },
];
const data = [
  {
    key:'1',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
  {
    key:'2',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
  {
     key:'3',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
  {
     key:'4',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
  {
     key:'5',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
  {
     key:'6',
    standard:'102',
    code:'321322353',
    name: '钢球S',
    befor:'0.05',
    after:'0.07',
    changeTime:"2020-02-21",
    currency:'USD',
    sign:false,
    startTime:'2020-1-21 18:02:08',
    author:'康磊',
  },
];
import Table from '@/components/Table/Table'
export default {
  data() {
    return {
      data,
      columns,
      add:false,
      impor:false,
      expor:false,
      modal1Visible:false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'retrieval' }),
      form2: this.$form.createForm(this, { name: 'add' }),
      loading:false,
      code:null,
      reportType:null,
      current:1,//当前页
      pageSize:5,//默认每页条数
      pagination: {
          pageNo: 1,
          pageSize: 10, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ["10", "20", "50", "100"], // 每页数量选项
          showTotal: total => `共${total}条`, // 显示总数
          onShowSizeChange: (pageSize) =>(this.pageSize = pageSize), // 改变每页数量时更新显示
          onChange:this.onPageChange.bind(this), //点击页码事件
          total: 0, //总条数
          current: 0,
          buildOptionText:pageSizeOptions => `${pageSizeOptions.value}条/页`,
          // size: "small",
      },
      paginations:{
        total: 0,  
        defaultPageSize:5,   
        showSizeChanger:true,  
        pageSizeOptions: ["10", "20", "50", "100"], // 每页数量选项
        onShowSizeChange: (current, pageSize) =>  
          (this.pageSize = pageSize),  
          //showQuickJumper:false
        showQuickJumper:true
      }
    };
  },
  components:{
    Table
  },
  computed:{
    //////首列复选框
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'retrieval' });
  },
  methods: {
    handleSelectChange() {
    },
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(err)
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleCancel(){
      this.add = false
    },
    handleOk(){
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.data.push(values)
          this.add = false
        }
      });
      
    },
    addclick(){
      this.add = true
    },
    hideModal(){
      this.modal1Visible = false
    },
    handleRemove(record){
      //单个删除
      let num = record.key
      this.data.forEach(obj => {
        if(obj.key == num){
          this.data.splice(obj,1)
        }
      })
    },
    handleEdit(){
      //单个编辑
      this.modal1Visible = true
    },
    handleSubmit(){
      //表单校验成功回调
      this.form.resetFields()
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) {
          // 这里做逻辑处理
          console.log(values) // { name: '' }
        }
      })
    },
    onPageChange(){
      console.log(1)
    }
  },
  mounted(){
    
  }
};
</script>
<style lang='less' scoped>

.user {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
  position: absolute;
  top: 20px;
  right: 25px;
}
.editable-row-operations a {
  margin-right: 8px;
}
.ant-form{
  padding:10px 0 10px 15px;
  margin:0 0 10px 0; 
  background:#fff;
}
.ant-table-content{
  background-color:#fff;
}
/deep/.ant-table-pagination{
  margin-right: 30px;
}
</style>