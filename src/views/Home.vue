<template>
  <div class="flexBlock">
    <div class="content">
      <!--上半部分-->
      <div style="margin:0.2% 0 0 0;display: flex;justify-content: center;height:47%">
        <div style="width:49.5%;height:100%">
          <div class="one">
            <div style="font-size:16px;font-weight:bold;color:#333;">我的工作</div>
            <div style="height:18%;width:100%;background:#FEF2D6;border-radius:8px;margin-top: 2%;display:flex;justify-content: center;align-items: center;">
              <div style="width:30%;display: flex">
                <div class="todoWork">待办工作：</div>
                <div class="todoWorkNum">{{workCount}}</div>
              </div>
              <div class="workIcon">
                <div class="more" @click="goEnterpriseCheck">更多</div>
              </div>

            </div>
            <div style="height:53%;margin-top: 3%" ref="work">
              <div class="workHeight" v-for="workItem in dataWork">
                <span class="point">{{workItem.nameShort}}（由{{workItem.assigneeName}}发起）</span><span class="newsHeightDate">2020-06-23</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width:49.5%;height:100%">
          <div class="two">
            <div style="font-size:16px;font-weight:bold;color:#333;">示范评价及验证</div>
            <div style="padding:3.8%;width:100%;height:100%;display:flex;justify-content: center">
              <img src="@/assets/img/firstPage/car-model.png" alt="" style="width:80%;height:100%;">
            </div>
          </div>
        </div>
      </div>
      <!--下半部分-->
      <div style="margin:0.75% 0 0 0;display: flex;height:48%;justify-content: center">
        <div style="width:33%">
          <div class="four">
            <div style="display:flex">
              <div style="font-size:16px;font-weight:bold;color:#333;">政策公告</div>
              <span class="more">更多</span>
            </div>
            <div style="height:90%;margin-top: 3%" ref="notice">
              <div class="noticeHeight" v-for="(item,index) in dataNotice">
                <div class="point" @click="">{{item.title}}</div><span class="new" v-if="index==0">NEW</span><span class="newsHeightDate">{{item.createrTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width:33%">
          <div class="five">
            <div style="display:flex">
              <div style="font-size:16px;font-weight:bold;color:#333;">行业新闻</div>
              <span class="more">更多</span>
            </div>
            <div style="height:90%;margin-top: 3%" ref="news">
              <div class="newsHeight" v-for="news in dataNews">
                <div class="point">{{news.title}}</div><span class="hotNews" v-if="news.count > 50">热</span>
                <span class="newsHeightDate">{{news.createrTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width:33%">
          <div class="three">
            <div style="font-size:16px;font-weight:bold;color:#333;">日历</div>
            <div class="calendarHeight">
              <el-calendar v-model="value" id="calendar">
                <template
                  slot="dateCell"
                  slot-scope="{date, data}">
                  <!--自定义内容-->
                  <div>
                    <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                    <div v-for="item in calendarData">
                      <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                        <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                          <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                            <div class="selected-verify" v-if="item.things=='已审核'">{{item.things}}</div>
                            <div class="selected-todo" v-if="item.things=='待办'">{{item.things}}</div>
                          </el-tooltip>
                        </div>
                        <div v-else></div>
                      </div>
                      <div v-else></div>
                    </div>
                  </div>
                </template>
              </el-calendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTodoWork, getPolicyNotice, getIndustryNews } from "@/assets/api/home.js";
  export default {
    name: 'Home',
    data(){
      return {
        workDataRequest:{
          "assignee": "1280045291061088257",
          "initiatorName": "",
          "name": "",
          "pageNo": 1,
          "pageSize": 7
        },
        noticeDataRequest:{
          "page": {
            "current": 1,
            "size": 10
          },
          "querys": [{}]
        },
        newsDataRequest:{
          "page": {
            "current": 1,
            "size": 10
          },
          "querys": [{}]
        },
        dataWork:[],
        dataNotice:[],
        dataNews:[],
        noticeFlag: false,
        newsFlag: false,
        workCount:0,
        //日历
        calendarData: [
          { months: ['07'],days: ['16'],things: '已审核' },
          { months: ['07'], days: ['23'],things: '已审核' },
          { months: ['07'], days: ['30'],things: '已审核' },
          { months: ['07'], days: ['31'],things: '已审核' },
          { months: ['08'],days: ['03'],things: '待办' },
          { months: ['08'], days: ['05'],things: '待办' }
        ],
      }

    },
    methods:{
      getTodoWork(data1){
        getTodoWork(data1).then(res => {
          if (res.ok == true) {
            this.dataWork = res.data.list;
            this.workCount = res.data.count;
          }
        });
      },
      getPolicyNotice(data2)
      {
        getPolicyNotice(data2).then(res => {
          if (res.code == '200') {
            this.dataNotice = res.data.records;
          }
        });
      },
      getIndustryNews(data3)
      {
        getIndustryNews(data3).then(res => {
          if (res.code == '200') {
            this.dataNews = res.data.records;
          }
        });
      },
      goEnterpriseCheck(){
        this.$router.push('/industryService/companyEntry');
      },
      // goModelCheck(){
      //   this.$router.push('/industryService/companyEntry');
      // },
      // goCarCheck(){
      //   this.$router.push('/industryService/companyEntry');
      // },
      // goPartsCheck(){
      //   this.$router.push('/industryService/companyEntry');
      // },
    },
    mounted() {
      this.getTodoWork(this.workDataRequest);
      this.getPolicyNotice(this.noticeDataRequest);
      this.getIndustryNews(this.newsDataRequest);
    }
  }
</script>

<style scoped>
  .flexBlock{
    min-width: 1850px;
    min-height: 900px;
    overflow:auto;
  }
  .content{
    height: 100%;
    overflow: auto;
    margin: 0.5%;
  }
  .one{
    background-color:#fff;
    border:#DCDFE6 solid 1px;
    border-radius:5px;
    padding:1.5%;
    height:100%
  }
  .two{
    background-color:#fff;
    border:#DCDFE6 solid 1px;
    border-radius:5px;
    margin-left:1.5%;
    padding:3%;
    height:100%
  }
  .three{
    margin-left:2%;
    background-color:#fff;
    border:#DCDFE6 solid 1px;
    border-radius:5px;padding:3%;
    height:100%
  }
  .four{
    background-color:#fff;
    border:#DCDFE6 solid 1px;
    border-radius:5px;
    padding:3%;
    height:100%
  }
  .five{
    margin-left:2%;
    background-color:#fff;
    border:#DCDFE6 solid 1px;
    border-radius:5px;
    padding:3%;
    height:100%
  }
  .point{
    cursor:pointer;
    width:auto;
    max-width:70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .point:hover{
    color: #448EE0;
  }
  .calendarHeight{
    height:100%;
    width:100%;
    margin-top: -6%;
  }
  .thead{
    background: #F8F9FB!important;
  }
  .flexBlock {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0.5%;
  }
  .workBackground{
    background:url(../assets/img/firstPage/work-background.png) no-repeat;
    background-size:100%;
    width:100%;
    height:100%;
  }
  .todoWork{
    font-size:18px;
    margin-left: 12%;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:400;
    color:rgba(101,73,8,1);
  }
  .todoWorkNum{
    font-size:18px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(101,73,8,1);
    letter-spacing:1px;
  }
  .calendarHeight{
    height:100%;
    width:100%;
    margin-top: -6%;
  }
  .workIcon{
    width: 80%;
    height: 100%;
    background: url(../assets/img/firstPage/work-background.png) no-repeat;
    background-size:100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .workHeight{
    height: 17%;
    display: flex;
  }
  .noticeHeight{
    height: 10%;
    display: flex;
  }
  .new{
    width:27px;
    font-size:14px;
    margin:2px;
    font-style: italic;
    font-family:ArialNarrow-Italic,ArialNarrow;
    font-weight:normal;
    color:rgba(224,32,32,1);
  }
  .hotNews{
    background-color: #FA6400;
    padding: 2px;
    height:20px;
    margin-left: 8px;
    font-size: 12px;
    color: #fff;
  }
  .newsHeight{
    height: 10%;
    display: flex;
  }
  .newsHeightDate{
    height: 15%;
    margin-right: 2px;
    margin-left: auto;
  }
  .more{
    font-size: 14px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-right: 20px;
    margin-left: auto;
    cursor:pointer;
  }
  .more:hover{
    color: #448EE0;
  }
  @media screen and (max-width: 1600px) {
    .flexBlock{
      min-width: 1330px;
      min-height: 450px;
      overflow:auto;
    }
    .calendarHeight{
      height:100%;
      width:100%;
      margin-top: -8%;
    }
  }
</style>
<style scoped>
  /deep/.el-calendar__body {
    padding: 0px 20px 5px;
  }
  /deep/.el-calendar__title {
  }
  /deep/ .el-calendar__body {
    padding: 5px 20px 5px;
  }
  /deep/ .el-calendar__title {
    color: #000;
    -ms-flex-item-align: center;
    align-self: center;
    margin-left: 45%;
  }
  /deep/.el-calendar__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 0px solid #EBEEF5;
  }
  /deep/thead{
    background:rgba(248,249,251,1);
  }
  /deep/.el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*padding: 8px;*/
    padding-top: 18px;
    height: 51px!important;
    text-align: center;
  }
  /deep/.el-calendar-table tr td:first-child {
    border-left: 0px solid #EBEEF5!important;
  }
  /deep/.el-calendar-table thead th {
    padding: 12px 0;
    color: #000000;
    font-weight: 600;
  }
  /deep/.el-calendar-table td {
    border-bottom: 0px solid #EBEEF5!important;
    border-right: 0px solid #EBEEF5!important;
    vertical-align: top;
    -webkit-transition: background-color .2s ease;
    transition: background-color .2s ease;
  }
  /deep/.selected-verify{
    font-size: 12px;
    color:#CCCCCC;
    margin-top: -5px;
  }
  /deep/.selected-todo{
    font-size: 12px;
    color:#FA6400;
    margin-top: -5px;
  }
  @media screen and (max-width: 1600px) {
    /deep/thead {
      background: rgba(248,249,251,1);
      font-size: 13px;
    }
    /deep/.el-calendar-table .el-calendar-day {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 8px;
      height: 32px!important;
      text-align: center;
    }
    /deep/.el-calendar-table thead th {
      padding: 6px 0;
      color: #000000;
      font-weight: 600;
    }
    /deep/.el-calendar__title {
      color: #000;
      -ms-flex-item-align: center;
      align-self: center;
      margin-left: 40%;
      font-size: 12px;
    }
    /deep/.el-button--mini, .el-button--mini.is-round {
      padding: 7px 5px;
    }
    /deep/.selected-verify{
      font-size: 9px;
    }
    /deep/.selected-todo{
      font-size: 9px;
    }
  }
</style>
