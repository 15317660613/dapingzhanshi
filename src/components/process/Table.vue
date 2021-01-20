<template>
        <el-table
          ref="multipleTable"
          :data="tableData.filter(data => !input || data.name.toLowerCase().includes(input.toLowerCase()))"
          border
          stripe 
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column prop="name" label='任务名称'></el-table-column>
          <el-table-column prop="assigneeName" label='受理人'></el-table-column>
          <el-table-column prop="createTimeStr" label='任务创建时间'></el-table-column>
          <el-table-column prop="status" label='状态'></el-table-column>
          <el-table-column prop="finishTimeStr" label='任务完成时间'></el-table-column>
          <el-table-column label="操作">
               <template>
                <el-button
                    type="text"
                    size="small">
                    {{ buttonName }}
                </el-button>
            </template>
          </el-table-column>
        </el-table>
</template>

<script>

export default {
    data(){
        return {
            buttonName:''
        }
    },
    mounted(){
        this.scopeRender(this.tableType);
    },
    methods:{
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return "background-color:#F2F6FC;font-weight: 500; text-algin:center";
            }
        },
        scopeRender(type){
            if(type == 'HistoryTask'){
                this.buttonName = '查看任务';
            }else if(type == 'allTask'){
                this.buttonName = '查看任务';
            }else if(type == 'ActivitiTask'){
                this.buttonName = '处理任务'
            }else if(type == 'RepositoryTask'){
                this.buttonName = '查看任务';
            }
        }
    },
    props:['tableData','tableType','input'],
}
</script>

<style scoped>

</style>



