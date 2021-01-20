<template>
    <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.pageNo"
            :page-sizes="[10, 20, 40, 100]"
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.count">
        </el-pagination>
    </div>
</template>

<script>
export default {
    methods:{
        handleSizeChange(val) {
            this.setHistoryTask(this.pageData.pageNo,val);
        },
        handleCurrentChange(val) {
            this.setHistoryTask(val,this.pageData.pageSize);
        },
    },
    props:['pageData','setHistoryTask']
}
</script>

<style>
.block {
    margin-top:14px;
    text-align: right;
}
.el-pagination__total{
    float: left;
}
.el-pagination__sizes{
    float: left;
}
.btn-prev {
    display: inline-block;
}
.el-pager {
    display: inline-block;
}
.btn-next {
    display: inline-block;
}
.el-pagination__jump {
    display: inline-block;
}
</style>

