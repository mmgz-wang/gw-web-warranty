<template>
  <div class="container">
    
    <a-form layout="inline"  :form='form' >
      <a-form-item :colon="false" label="物料号" >
        <a-input   placeholder=" 23849248" 
        style="min-width:200px"
        v-decorator="[
                'code',
                { initialValue:form.code,
                  rules: [{ required: false, message: '请输入物料号', },{pattern:/[A−Za−z0−9]+/,message:'请输入正确的物料号'}]}
              ]"></a-input>
        
      </a-form-item>
      <a-form-item :colon="false" label="物料名称">
        <a-input  placeholder="铝" 
        style="min-width:200px"
          v-decorator="[
                  'name',
                  { initialValue:form.name,
                    rules: [{ required: false, message: '请输入物料名称', }]}
                ]"></a-input>
      </a-form-item>
      <a-form-item>
        <span class="table-page-search-submitButtons">
          <a-button type="primary"  @click='retrieval'>{{$t('common.retrieval')}}</a-button>
        </span>
      </a-form-item>
    </a-form>
    <div>
      <Table  :impor='impor' :expor='expor' :loading='loading' @addclick='addclick' :deleList='deleList' @pageSize='onPageChange' @sizeChange='onSizeChange' :total='total' :current='current' >
        <template slot='table'>
            <a-table
              size="small"
              :columns="columns"
              :dataSource="data"
              :row-selection="rowSelection"
              :pagination='false'
              rowKey='suppliesManageId' 
              >
              <a slot="code" slot-scope="text" @click='look(text)'>{{ text }}</a>
              <template slot="radio" slot-scope='flag'>
                  <a-checkbox :checked="flag" disabled/>
              </template>
              <template slot="radio2" slot-scope='flag'>
                  <a-checkbox :checked="flag" disabled/>
              </template>
              <template slot="radio3" slot-scope='flag'>
                  <a-checkbox :checked="flag" disabled/>
              </template>
              <template slot="radio4" slot-scope='flag'>
                  <a-checkbox :checked="flag" disabled/>
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
                <a-col :span='10'>{{details.suppliesManageNumber}}</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>物料名称</a-col>
                <a-col :span='12'>{{details.suppliesManageName}}</a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>返回标志</a-col>
                <a-col :span='10'><a-checkbox :checked="details.suppliesManageIsReturn" disabled/>{{details.suppliesManageIsReturn}}</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>是否辅料</a-col>
                <a-col :span='12'><a-checkbox :checked="details.suppliesManageIsQualityInspection" disabled/>{{details.suppliesManageIsQualityInspection}}</a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>特殊材料</a-col>
                <a-col :span='10'><a-checkbox :checked="details.suppliesManageIsSpecialMaterials" disabled/>{{details.suppliesManageIsSpecialMaterials}}</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>质检标志</a-col>
                <a-col :span='12'><a-checkbox :checked="details.suppliesManageIsQualityInspection" disabled/>{{details.suppliesManageIsQualityInspection}}</a-col>
              </a-row>
          </a-col>
        </a-row>
        <a-row justify='start' style="padding:10px 0">
          <a-col :span='10'>
              <a-row>
                <a-col :span='8' :offset='2'>维护人</a-col>
                <a-col :span='10'>{{details.updatePeople}}</a-col>
              </a-row>
          </a-col>
          <a-col :span='14'>
              <a-row>
                <a-col :span='6' :offset='2'>维护时间</a-col>
                <a-col :span='12'>{{details.updateDate}}</a-col>
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
      <a-form :form="form2" :label-col="{ span: 8}" :wrapper-col="{ span: 14 }"  >

        <a-row>
            <a-col :span='12'>
              <a-form-item label="物料号">
                <a-input
                  v-decorator="['code', { rules: [{ required: true, message: '3244242' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="物料名称">
                <a-input
                  v-decorator="['name', { rules: [{ required: true, message: '3244242' }] }]"
                  placeholder="请选择!"
                  style="min-width:200px"
                />
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span='12'>
              <a-form-item label="返回标志">
                <a-checkbox v-decorator="['radio1']"></a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="是否辅料" >
                <a-checkbox v-decorator="['radio2']"></a-checkbox>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span='12'>
              <a-form-item label="特殊材料">
              <a-checkbox v-decorator="['radio3']"></a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span='12'>
              <a-form-item label="质检标志">
                <a-checkbox v-decorator="['radio4']"></a-checkbox>
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
    title: '物料号',
    dataIndex: 'suppliesManageNumber',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '物料名称',
    dataIndex: 'suppliesManageName',
    width:'10%',
  },
  {
    title: '是否返回',
    dataIndex: 'suppliesManageIsReturn',
    width:'10%',
    scopedSlots: { customRender: 'radio' }
  },
  {
    title: '是否辅料',
    dataIndex: 'suppliesManageIsAccessories',
    width:'10%',
    scopedSlots: { customRender: 'radio2' }
  },
  {
    title: '是否质检',
    dataIndex: 'suppliesManageIsQualityInspection',
    width:'10%',
    scopedSlots: { customRender: 'radio3' }
  },
  {
    title: '是否特殊材料',
    dataIndex: 'suppliesManageIsSpecialMaterials',
    width:'10%',
    scopedSlots: { customRender: 'radio4' }
  },
  {
    title: '创建时间',
    dataIndex: 'updateDate',
    width:'10%',
  },
  {
    title: '创建人',
    dataIndex: 'updatePeople',
    width:'8%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width:'10%',
    scopedSlots: { customRender: 'operation' }
  },
];

import Table from '@/components/Table/Table'
export default {
  data() {
    return {
      data:[],
      columns,
      add:false,
      impor:false,
      expor:false,
      modal1Visible:false,
      form: this.$form.createForm(this, { name: 'retrieval' }),
      form2: this.$form.createForm(this, { name: 'add' }),
      loading:true,
      total:null,
      current:1,//当前页
      pageSize:5,
      paginations:{
        total: this.total,  
        defaultPageSize:this.pageSize,   
        showSizeChanger:true,  
        pageSizeOptions: ["5","10", "20", "50", "100"], // 每页数量选项
        onShowSizeChange: (current, pageSize) =>  
          (this.pageSize = pageSize),  
          //showQuickJumper:false
        showQuickJumper:true
      },
      deleList:'',
      details:{}
    }
  },
  components:{
    Table
  },
  computed:{
    //////首列复选框
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.deleList += selectedRowKeys
          // console.log(this.deleList)
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
    this.form2 = this.$form.createForm(this, { name: 'add' });
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      this.$axios.get('api/suppliesManage/findAllPage',{
        params:{
          suppliesManage:{
            page:this.current,
            size:this.pageSize
          }
        }
      })
      .then(res => {
        this.data = res.data.result.rows
        this.current = res.data.result.page
        this.pageSize = res.data.result.size
        this.total = res.data.result.total
        // this.loading = false
      })
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleCancel(){
      this.add = false
    },
    handleOk(e){
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$axios.post('api/suppliesManage/add',{
              suppliesManage:{
                  "countryCode": "CN",
                  "suppliesManageNumber": values.code,
                  "suppliesManageName": values.name,
                  "suppliesManageIsReturn": values.radio1 == true?true:false,
                  "suppliesManageIsAccessories": values.radio2 == true?true:false,
                  "suppliesManageIsQualityInspection": values.radio3 == true?true:false,
                  "suppliesManageIsSpecialMaterials": values.radio4 == true?true:false,
                  "updatePeople": "小明",
              }
          }).then(res => {
            this.getList()
          })
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
      
      this.$axios.delete('api/suppliesManage/deleteOne',{
        params:{
          'suppliesManageId':record.suppliesManageId
        }
      }).then(res => {
        console.log(res.data)
        this.getList()
      })
    },
    handleEdit(){
      //单个编辑
      // this.modal1Visible = true
    },
    look(id){
      //单个查看
      this.$axios.get('api/suppliesManage/findOne',{
        params:{
          suppliesManageId:id
        }
      }).then(res => {
        this.details = res.data.result
        console.log(this.details)
      })
      this.modal1Visible = true
    },
    handleSubmit(){
      //表单校验成功回调
    },
    retrieval(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.code || values.name){
              this.$axios.get('api/suppliesManage/findAllPage',{
                params:{
                  suppliesManage:{
                    suppliesManageName:values.name,
                    suppliesManageNumber:values.code,
                    page:1,
                    size:5
                  }
                }
              }).then(res => {
                console.log(res)

              })
          }else{
            this.$message.error('请输入查询条件!');
          }
        }
      });
    },
    onPageChange(pageNumber){
      console.log(pageNumber)
      this.$axios.get('api/suppliesManage/findAllPage',{
        params:{
            suppliesManage:{
              page:pageNumber,
              size:this.pageSize
            }
        }
      })
      .then(res => {
        this.data = res.data.result.rows
        this.current = res.data.result.page
        this.pageSize = res.data.result.size
        this.total = res.data.result.total
      })
    },
    onSizeChange(obj){
      this.$axios.get('api/suppliesManage/findAllPage',{
        params:{
            suppliesManage:{
              page:obj.currebt,
              size:obj.pageSize
            }
        }
      }).then(res => {
        this.data = res.data.result.rows
        this.current = res.data.result.page
        this.pageSize = res.data.result.size
        this.total = res.data.result.total
      })
    }
  },
  mounted(){
    
  }
}
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
.ant-form-inline{
  margin:0;
}
.ant-form{
  padding:10px 0 0 15px;
}
</style>