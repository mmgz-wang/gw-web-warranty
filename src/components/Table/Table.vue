<template>
    <div>
      <div style="overflow-y:hidden">
        <div class="table" style='height:100%;background-color:#fff'>
          <div style="padding:10px 15px">
            <a-button  type="primary" style="margin-right: 5px" @click="handleAdd" >添加</a-button>
            <a-button   style="margin-right: 5px" @click="importXML" >导入</a-button>
            <a-button   style="margin-right: 5px" @click="exportXML" >导出</a-button>
            <a-button  style="margin-right: 5px" @click="handleRemoveList">删除</a-button>
          </div>
          <slot name='table'>

          </slot>
          <div style="position:relative;height:50px">
            <a-pagination size="small" 
            :default-current="1" 
            :total="total" 
            :pageSize.sync='pageSize'
            show-size-changer 
            show-quick-jumper
            :pageSizeOptions='pageSizeOptions'
            :defaultPageSize='pageSize'
            @showSizeChange="onShowSizeChange"
            @change="onChange">
              <!-- <template slot="buildOptionText" slot-scope="props">
                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                <span v-if="props.value === '50'">全部</span>
              </template> -->
            </a-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  name: "Table",
  props:{
    impor:{
        type:Boolean,
        default:false,
    },
    expor:{
        type:Boolean,
        default:false
    },
    deleList:{
      type:String,
      default:null
    },
    total:{
      type:Number,
      default:null
    },
    current:{
      type:Number,
      default:null
    }
  },
  data() {
    return {
        visible: false,
        confirmLoading: false,
        pageSize:5,
        pageSizeOptions: ['5',"10", "20", "50", "100"], // 每页数量选项
    };
  },
  computed:{
    
  },
  mounted(){
  },
  methods: {
    handleAdd(){
        this.$emit('addclick')
    },
    handleRemoveList(){
      let self = this
        console.log(this.deleList)
        // let arr = Array.prototype.slice.call(this.deleList)
        self.$confirm({
            title: '确定要删除吗',
            onOk() {
              self.$axios.delete('api/suppliesMange/batchDelete?ids=' + JSON.stringify(arr)
                ).then(res => {
                  console.log(res)
                  if(res.code == 200){
                    return resolve
                  }
                })
            },
            onCancel() {},
        });
    },
    onChange(pageNumber) {
      console.log(pageNumber,'页数')
      this.$emit('pageSize',pageNumber)
    },
    onShowSizeChange( current,pageSize) {
      this.pageSize = pageSize;
      let obj = {
        current:current,
        pageSize:pageSize
      }
      this.$emit('sizeChange',obj)
    },
    importXML(){

    },
    exportXML(){

    },
  }
};
</script>

<style lang='less' scoped>
.ant-table-wrapper{
  background:white;
}
.ant-form-inline{
  background:#fff;
}
.table{
  min-width:1235px;
}
.ant-table-wrapper{
  background:#fff;
}
/deep/.ant-pagination{
  padding:10px 0;
  position: absolute;
  right:10px;
  top:0;
}
</style>
