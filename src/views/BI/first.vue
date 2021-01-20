<template>
  <div class="first">
    <div class="bi-2-page">
      <div class="triangle-left"></div>1
      <div class="triangle-right" @click="changePage('/views/second')"></div>
    </div>
    <div class="header">
      <div class="bi-2-title">
        <img src="./images/bi2/logo@2x.png" alt />
        <div class="bi-2-title-text">示范评价及验证平台</div>
      </div>
      <div class="bi-2-top">
        <div class="bi-2-date">{{date | formatDate}}</div>
      </div>
    </div>
    <div class="content" v-loading="loading">
      <!-- 搜索展开 -->
      <!-- <div class="openTree" @click="treeShow">>>展开全部搜索</div> -->
      <el-collapse-transition>
        <div v-show="treeShowFlag" class="tree">
          <div>
            <div class="title">监控总览</div>
            <div class="treeContent">
              <Custom-Tree
                :nodes="nodes"
                :setting="setting"
                ref="ztreeDom"
                @onCustomClick="onCustomClick"
              ></Custom-Tree>
            </div>
            <!-- @onCustomCheck="onCustomCheck" -->
            <!-- <div class="treeBtn" @click="treeHide">
            <img src="@/assets/img/statistics/openTree.svg" alt />
            </div>-->
          </div>
        </div>
      </el-collapse-transition>

      <!-- 总数情况 -->
      <div class="total">
        <span>
          <span>车辆总数：</span>
          <span>{{vehicleTotal}}</span>
        </span>
        <span>
          <span>加氢站点数：</span>
          <span>{{siteTotal}}</span>
        </span>
        <span>
          <span>预警：</span>
          <span>{{warningTotal}}</span>
        </span>
      </div>
      <!-- 站点车辆情况 -->
      <div v-show="mapZoom>6" class="site">
        <span>
          <span>
            <img src="@/assets/img/statistics/site35.png" alt />
          </span>
          <span>加氢站(35MPa)</span>
        </span>
        <span>
          <span>
            <img src="@/assets/img/statistics/site70.png" alt />
          </span>
          <span>加氢站(70MPa)</span>
        </span>
        <!-- <span>
          <span>
            <img src="@/assets/img/statistics/site35Off.png" alt />
          </span>
          <span>空闲(35MPa)</span>
        </span>
        <span>
          <span>
            <img src="@/assets/img/statistics/site70Off.png" alt />
          </span>
          <span>空闲(70MPa)</span>
        </span> -->
        <span>
          <span>
            <img src="@/assets/img/statistics/vehicle35.png" alt />
          </span>
          <span>车辆(35MPa）</span>
        </span>
        <span>
          <span>
            <img src="@/assets/img/statistics/vehicle70.png" alt />
          </span>
          <span>车辆(70MPa）</span>
        </span>
        <!-- <span>
          <span>
            <img src="@/assets/img/statistics/vehicleOff35.png" alt />
          </span>
          <span>离线(35MPa）</span>
        </span>
        <span>
          <span>
            <img src="@/assets/img/statistics/vehicleOff70.png" alt />
          </span>
          <span>离线(70MPa）</span>
        </span> -->
      </div>
      <!-- 滑块 -->
      <!-- <div v-show="mapZoom>6" class="sliderBlock">
        <div v-show="radioType!=='2'" class="sliderVehicleBlock">
          <div class="sliderTitle">
            <div>全网车辆累计纯氢里程分布条</div>
            <div>
            <el-checkbox v-model="checkedVehicle35MPa" @change="sliderChange">35MPa</el-checkbox>
            <el-checkbox v-model="checkedVehicle70MPa" @change="sliderChange">70MPa</el-checkbox>
            </div>
          </div>
          <el-slider
            tooltip-class="slider_tooltop"
            :min="vehicleMin"
            :max="vehicleMax"
            v-model="vehicleSliderNum"
            :marks="marks_vin"
            @change="sliderChange"
          ></el-slider>
          <div class="labelContent">
            <span>最低累计纯氢里程值({{vehicleMin}})</span>
            <span>最低累计纯氢里程值({{vehicleMax}})</span>
          </div>
        </div>
        <div v-show="radioType!=='1'" class="sliderSiteBlock">
        <div class="sliderTitle">
          <div>加氢站累计加氢量分布条</div>
          <div>
            <el-checkbox v-model="checkedSite35MPa" @change="sliderChange">35MPa</el-checkbox>
            <el-checkbox v-model="checkedSite70MPa" @change="sliderChange">70MPa</el-checkbox>
          </div>
        </div>
        <el-slider
          tooltip-class="slider_tooltop"
          :min="siteMin"
          :max="siteMax"
          :marks="marks_site"
          v-model="siteSliderNum"
          @change="sliderChange"
        ></el-slider>
        <div class="labelContent">
          <span>全网最低累计加氢量({{siteMin}})</span>
          <span>全网最高累计加氢量({{siteMax}})</span>
        </div>
        </div>
      </div> -->
      <div class="map" id="map"></div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import AMap from "AMap";
import Config from "@/assets/js/config.js";
import CustomTree from "@/components/common/CustomTree";
import { getTree } from "@/assets/api/statistics.js";
import { formatTimeToStr } from "@/assets/js/date.js";
export default {
  name: "firts",
  data() {
    return {
      nodes: [],
      date: new Date(),
      treeShowFlag: true, //
      radioType: "3",
      searchName: "",
      setting: {
        check: {
          enable: false,
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
      },
      searchType: "3",
      loading: false, //载入动画
      ceshiindex: 0,
      vehicleTotal: 0,
      siteTotal: 0,
      warningTotal: 0,
      vehicleSliderNum: 1000, //车量加氢里程滑块值
      vehicleMin: 0, //车量加氢里程最小值
      vehicleMax: 1000, //车量加氢里程最大值
      siteSliderNum: 1000, //车站加氢量滑块值
      siteMin: 0, //加氢站加氢量最小值
      siteMax: 1000, //加氢站加氢量最大值
      selectMarkerIdOrVin: "", //当前选中的marker唯一标识
      provinceMarkers: [],
      markerLoaddingOver: true, //判断marker是否加载完成
      vehicleMarkers: [], //车辆存储的marker
      siteMarkers: [], //车站存储的marker
      overlayProvinceMarkersGroups: null, //省市整体车辆情况
      overlayVehicleMarkersGrops: null,
      haveVehicleMarkersGrops: false, //车辆market组是否存在
      overlaySiteMarkersGrops: null,
      haveSiteMarkersGrops: false, //站点market是否存在
      checkedVehicle35MPa: true,
      checkedVehicle70MPa: true,
      checkedSite35MPa: true,
      checkedSite70MPa: true,
      max_vin_hydrogen: true, //车辆加氢里程滑最大值是否重新渲染
      max_site_hydrogen: true,
      showSelectVehicleWindowFlag: false, //判断是否显示车辆提示框
      showSelectSiteWindowFlag: false, //的判断是否显示加氢站详情框
      marks_vin: {
        0: "",
        100: "",
        200: "",
        300: "",
        400: "",
        500: "",
        600: "",
        700: "",
        800: "",
        900: "",
        1000: "",
      },
      marks_site: {
        0: "",
        100: "",
        200: "",
        300: "",
        400: "",
        500: "",
        600: "",
        700: "",
        800: "",
        900: "",
        1000: "",
      },
      // fitView:false, //是否自动适配到合适视野范围
      province: 0,
      websocket1: null,
      websocket2: null,
      vehicleInfo: {},
      siteInfo: {},
      markers: [],
      infoWindow: null,
      map: null, //高德地图实例
      mapZoom: 5,
      qrCode: require("@/assets/img/statistics/prCode.png"),
      site: require("@/assets/img/statistics/site.png"),
      location: require("@/assets/img/statistics/location.png"),
      win_car: require("@/assets/img/statistics/win_car.png"),
      win_city: require("@/assets/img/statistics/win_city.png"),
      win_compay: require("@/assets/img/statistics/win_compay.png"),
      win_h_mileage: require("@/assets/img/statistics/win_h_mileage.png"),
      win_hyd: require("@/assets/img/statistics/win_hyd.png"),
      win_mileage: require("@/assets/img/statistics/win_mileage.png"),
      win_other: require("@/assets/img/statistics/win_other.png"),
      win_speed: require("@/assets/img/statistics/win_speed.png"),
      win_time: require("@/assets/img/statistics/win_time.png"),
      win_address: require("@/assets/img/statistics/win_address.png"),
      win_site: require("@/assets/img/statistics/win_site.png"),
    };
  },
  components: {
    CustomTree,
  },
  methods: {
    changePage(path) {
      this.$router.push(path);
    },
    searchMarker() {},
    //加载相关组件
    loadMapUi() {
      let that = this;
      AMapUI.load(["ui/geo/DistrictCluster", "lib/$"], function (
        DistrictCluster,
        $
      ) {
        //启动页面
        // that.initPage(DistrictCluster, $);
      });
    },
    treeShow() {
      this.treeShowFlag = true;
    },
    treeHide() {
      this.treeShowFlag = false;
    },
    mapInit() {
      this.map = new AMap.Map("map", {
        zoom: 5, //级别
        floorControl: false, //是否显示楼层
        viewMode: "3D", //设置3D否则罗盘控件无效
        center: [116.3239771, 40.056992], //中心点坐标
        mapStyle: "amap://styles/light",
      });
      AMap.plugin(
        ["AMap.ToolBar", "AMap.Geolocation", "AMap.ControlBar"],
        () => {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          this.map.addControl(
            new AMap.ToolBar({
              // 简易缩放模式，默认为 false
              liteStyle: true,
              defaultType: 0,
              offset: new AMap.Pixel(14, 150),
              position: "RB",
            })
          );
          this.map.addControl(
            new AMap.Geolocation({
              buttonOffset: new AMap.Pixel(18, 170),
              buttonPosition: "RB",
            })
          );
          // 添加 3D 罗盘控制
          this.map.addControl(
            new AMap.ControlBar({
              showZoomBar: !1,
              showControlButton: !0,
              position: {
                right: "0px",
                bottom: "100px",
              },
            })
          );
        }
      );
      //初始化一个markers组

      // this.overlayVehicleMarkersGrops = new AMap.OverlayGroup(
      //   this.strustureVehicleMarkerContent([[117.094048, 39.149218]])
      // );
      // this.overlaySiteMarkersGrops = new AMap.OverlayGroup(
      //   this.strustureSiteMarkerContent([[117.395048, 39.449218]])
      // );

      // this.map.add(this.overlayVehicleMarkersGrops);
      // this.map.add(this.overlaySiteMarkersGrops);
      // this.overlayVehicleMarkersGrops.hide();
      // this.overlaySiteMarkersGrops.hide();
      this.map.on("zoomend", () => {
        this.mapZoom = this.map.getZoom();
        if (this.map.getZoom() > 6) {
          // this.markerGroups.show();
          if (this.overlayProvinceMarkersGroups) {
            this.overlayProvinceMarkersGroups.hide();
          }
          if (this.overlayVehicleMarkersGrops) {
            this.overlayVehicleMarkersGrops.show();
            this.overlaySiteMarkersGrops.show();
          }
        } else {
          // this.markerGroups.hide();
          if (this.overlayVehicleMarkersGrops) {
            this.overlayVehicleMarkersGrops.hide();
            this.overlaySiteMarkersGrops.hide();
          }
          if (this.overlayProvinceMarkersGroups) {
            this.overlayProvinceMarkersGroups.show();
          }
        }
      });
      // this.loadMapUi();
    },
    //滑块更改时候，重新对websocket传值
    sliderChange() {
      this.$nextTick(() => {
        this.websocket2.send(
          JSON.stringify({ province: this.province, itemType: this.radioType })
        );
      });
    },
    //属性筛选变化
    radioTypeChange(e) {
      this.max_vin_hydrogen = true;
      this.max_site_hydrogen = true;
      this.websocket2.send(JSON.stringify({ province: "0", itemType: e }));
    },
    //获取属性结构数据
    getTree(type, initial) {
      getTree(type).then((res) => {
        if (res.ok) {
          let nodesStatusData = [];
          if (initial) {
            var lev2Node = null;
            var lev3Node = null;
            var lev2Flag = true;
            var lev3Flag = true;
          }
          if (this.$refs.ztreeDom.$data.zTreeNodes) {
            res.data.forEach((item, index) => {
              item.iconSkin = item.type;
              if (initial && index === 0) {
                item.open = true;
                lev2Node = item;
              }
              if (initial && lev2Flag) {
                if (lev2Node.id == item.pid) {
                  item.open = true;
                  lev3Node = item;
                  lev2Flag = false;
                }
              }
              if (initial && !lev2Flag && lev3Flag) {
                if (lev3Node.id == item.pid) {
                  item.open = true;
                  lev3Flag = false;
                }
              }
              this.$refs.ztreeDom.$data.zTreeNodes.forEach((node) => {
                if (item.id === node.id) {
                  item.open = node.open;
                }
              });
            });
            this.nodes = res.data;
          } else {
            this.nodes = res.data;
          }
        }
      });
    },
    //省市整体情况推送
    webSocketLink1(url) {
      let that = this;
      let heartCheck = {
        timeout: 30000,
        timeoutObj: null,
        reset: function () {
          clearInterval(this.timeoutObj);
          return this;
        },
        start: function () {
          this.timeoutObj = setInterval(function () {
            that.websocket = new WebSocket(url);
          }, this.timeout);
        },
      };
      that.websocket1 = new WebSocket(url);
      that.websocket1.onopen = function () {
        console.log("连接成功");
        that.websocket1.send(that.$store.state.userId);
        heartCheck.reset();
      };
      that.websocket1.onmessage = function (event) {
        let data = JSON.parse(event.data);
        that.strustureProvinceMarkerContent(data.siteAndVehicleCounts);
        that.vehicleTotal = data.vinCountSum;
        that.siteTotal = data.siteCountSum;
        that.warningTotal = data.warningCount;
        // that.statistics = data;
      };
      that.websocket1.onclose = function (event) {
        that.$message.error("断开连接，30s后重新了连接");
        heartCheck.reset().start();
      };
    },
    //
    webSocketLink2(url) {
      let that = this;
      let heartCheck = {
        timeout: 30000,
        timeoutObj: null,
        reset: function () {
          clearInterval(this.timeoutObj);
          return this;
        },
        start: function () {
          this.timeoutObj = setInterval(function () {
            that.websocket = new WebSocket(url);
          }, this.timeout);
        },
      };
      that.websocket2 = new WebSocket(url);
      that.websocket2.onopen = function () {
        that.websocket2.send(
          JSON.stringify({ province: that.province, itemType: that.radioType })
        );
        heartCheck.reset();
      };
      that.websocket2.onmessage = function (event) {
        let data = JSON.parse(event.data);
        that.renderWebsocket2Data(data);
        // that.getTree({ dataType: that.radioType });
      };
      that.websocket2.onclose = function (event) {
        that.$message.error("断开连接，30s后重新了连接");
        heartCheck.reset().start();
      };
    },
    // 渲染websoket2数据
    renderWebsocket2Data(data) {
      if (data.hydrogenationSumVehicle) {
        this.vehicleMin = Number(data.hydrogenationSumVehicle.min);
        this.vehicleMax = Number(data.hydrogenationSumVehicle.max);
        if (this.max_vin_hydrogen && data.hydrogenationSumVehicle) {
          this.vehicleSliderNum = Number(data.hydrogenationSumVehicle.max);
          this.max_vin_hydrogen = false;
        }
        this.marks_vin = this.strustureMarks(this.vehicleMin, this.vehicleMax);
      }
      if (data.hydrogenationSumSite) {
        this.siteMin = Number(data.hydrogenationSumSite.min);
        this.siteMax = Number(data.hydrogenationSumSite.max);
        if (this.max_site_hydrogen && data.hydrogenationSumSite) {
          this.siteSliderNum = Number(data.hydrogenationSumSite.max);
          this.max_site_hydrogen = false;
        }
        this.marks_site = this.strustureMarks(this.siteMin, this.siteMax);
      }
      this.ceshiindex++;
      if (data.vehiclePositionStatusList) {
        //判断是否有车辆数据

        this.strustureVehicleMarkerContent(data.vehiclePositionStatusList);
      } else {
        this.vehicleMarkers = [];
        if (this.overlayVehicleMarkersGrops) {
          this.overlayVehicleMarkersGrops.clearOverlays();
        }
      }
      if (data.tenantList) {
        //判断是否加氢站信息
        this.strustureSiteMarkerContent(data.tenantList);
      } else {
        this.siteMarkers = [];
        if (this.overlaySiteMarkersGrops) {
          this.overlaySiteMarkersGrops.clearOverlays();
        }
      }
      this.loading = false;
      // if (this.fitView) {
      //   let allMakers = [].concat(this.siteMarkers, this.vehicleMarkers);
      //   this.map.setFitView(allMakers);
      //   this.fitView = false;
      // }
    },
    strustureMarks(min, max) {
      let unitNum = Math.round((max - min) / 10);
      return {
        [min]: "",
        [min + unitNum]: "",
        [min + unitNum * 2]: "",
        [min + unitNum * 3]: "",
        [min + unitNum * 4]: "",
        [min + unitNum * 5]: "",
        [min + unitNum * 6]: "",
        [min + unitNum * 7]: "",
        [min + unitNum * 8]: "",
        [max]: "",
      };
    },
    //点击属性菜单省份
    onCustomClick(e, treeId, treeNode) {
      if (treeNode.pid == "0") {
        if (this.province !== treeNode.id && this.infoWindow) {
          //如果点击省份不同切存在弹框，则关闭弹框
          this.infoWindow.close();
        }
        this.province = treeNode.id;

        this.max_vin_hydrogen = true;
        this.max_site_hydrogen = true;
        this.provinceMarkers.forEach((item) => {
          if (item.getExtData().areaId == this.province) {
            this.map.setZoomAndCenter(8, item.getPosition());
            return false;
          }
        });
      } else if (treeNode.type === "VEHICLE") {
        let selectCurrentMarker;
        this.selectMarkerIdOrVin = treeNode.vin; //用来让选中的标识Marker保持显示状态
        this.loading == true;
        this.showSelectVehicleWindowFlag = false;
        let id = treeNode.getParentNode().getParentNode().getParentNode().id;
        if (this.province !== id && this.infoWindow) {
          //如果点击省份不同切存在弹框，则关闭弹框
          this.infoWindow.close();
        }
        this.province = id;
      } else if (treeNode.type === "SITE") {
        let selectCurrentMarker;
        this.selectMarkerIdOrVin = treeNode.id; //用来让选中的标识Marker保持显示状态
        this.showSelectSiteWindowFlag = false;
        let id = treeNode.getParentNode().id;
        if (this.province !== id && this.infoWindow) {
          //如果点击省份不同切存在弹框，则关闭弹框
          this.infoWindow.close();
        }
        this.province = treeNode.getParentNode().id;
        // this.siteMarkers.forEach((item) => {
        //   if (item.getExtData().platformId === treeNode.id) {
        //     selectCurrentMarker = item;
        //     return false;
        //   }
        // });
        // let position = selectCurrentMarker.getPosition();
        // this.map.setZoomAndCenter(10, position);
        // this.newSiteVueComponentWindow(
        //   selectCurrentMarker.getExtData(),
        //   position
        // ); //窗体
        this.loading == true;
      }

      this.websocket2.send(
        JSON.stringify({ province: this.province, itemType: this.radioType })
      );
    },
    strustureProvinceMarkerContent(data) {
      let marker = null;
      if (!this.overlayProvinceMarkersGroups) {
        data.map((item, index) => {
          let html = `<div class="provincemarker" style="">
        <div>${item.areaName}</div>
        <div>车辆在线数：${item.vinCount}</div>
        <div>加氢站点数：${item.siteCount}</div>
        <div class="pointmarker"></div>
        </div>`;
          marker = new AMap.Marker({
            content: html,
            extData: item,
            position: [item.lon, item.lat],
            offset: new AMap.Pixel(-69, -94),
            autoRotation: true,
          });
          marker.on("click", (e) => {
            e.target.setTop(true);
          });
          marker.on("dblclick", (e) => {
            this.websocket2.send(
              JSON.stringify({
                province: e.target.getExtData().areaId,
                itemType: this.radioType,
              })
            );
            this.map.setZoomAndCenter(8, e.target.getPosition());
          });
          let that = this;
          this.provinceMarkers.push(marker);
          this.overlayProvinceMarkersGroups = new AMap.OverlayGroup(
            this.provinceMarkers
          );
          this.map.add(this.overlayProvinceMarkersGroups);
        });
      } else {
        data.map((item, index) => {
          let html = `<div class="provincemarker" style="">
        <div>${item.areaName}</div>
        <div>车辆在线数：${item.vinCount}</div>
        <div>加氢站点数：${item.siteCount}</div>
        <div class="pointmarker"></div>
        </div>`;

          let that = this;
          // this.provinceMarkers.push(
          //   new AMap.Marker({
          //     content: html,
          //     position: [item.lon, item.lat],
          //     offset: new AMap.Pixel(-69, -94),
          //     autoRotation: true
          //   })
          // );
          this.provinceMarkers[index].setContent(html);
        });
      }
    },
    strustureVehicleMarkerContent(vehicles) {
      let filtersVehicles = null;
      filtersVehicles = vehicles.filter((item) => {
        if (
          this.vehicleSliderNum >= Number(item.pureHydOdometer) ||
          this.selectMarkerIdOrVin == item.vin
        ) {
          if (
            (this.checkedVehicle35MPa == true &&
              this.checkedVehicle70MPa == true) ||
            this.selectMarkerIdOrVin == item.vin
          ) {
            return true;
          } else if (this.checkedVehicle35MPa == true) {
            return item.mpa == "MPA35";
          } else if (this.checkedVehicle70MPa == true) {
            return item.mpa == "MPA70";
          } else {
            return false;
          }
        }
      });
      //判断站点vehiclemarkers是为空，为空则添加，非空则控制及增删
      if (this.vehicleMarkers.length === 0) {
        this.addVehicleMarkers(filtersVehicles);
      } else {
        this.upDataVehicleMarkers(filtersVehicles);
      }
      if (!this.showSelectVehicleWindowFlag) {
        this.showSelectVehicleWindow();
      }
    },
    //添加车辆markers
    addVehicleMarkers(filtersVehicles) {
      let that = this;
      let arr = [];
      let icon = null;
      let marker = null;
      filtersVehicles.forEach((item, index) => {
        if (item.mpa === "MPA35" && item.status === "1") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 65), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle35-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 65), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA35" && item.status === "0") {
          icon = new AMap.Icon({
            size: new AMap.Size(40, 65), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle35-off-map.png"), // Icon的图像
            imageSize: new AMap.Size(40, 65), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA70" && item.status === "1") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 66), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle70-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 66), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA70" && item.status === "0") {
          icon = new AMap.Icon({
            size: new AMap.Size(40, 64), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle70-off-map.png"), // Icon的图像
            imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
          });
        }
        marker = new AMap.Marker({
          icon: icon,
          extData: item,
          position: [item.longitude, item.latitude],
          offset: new AMap.Pixel(-16.5, -40),
          autoRotation: true,
        });
        marker.on("click", (e) => {
          this.newVehicleVueComponentWindow(
            item,
            e.target.getPosition(),
            marker
          );
        });
        arr.push(marker);
      });
      if (!this.haveVehicleMarkersGrops) {
        this.overlayVehicleMarkersGrops = new AMap.OverlayGroup(arr);
        this.map.add(this.overlayVehicleMarkersGrops);
        this.overlayVehicleMarkersGrops.hide();
        this.haveVehicleMarkersGrops = true;
      } else {
        this.overlayVehicleMarkersGrops.addOverlays(arr);
      }
      this.vehicleMarkers = this.vehicleMarkers.concat(arr);
      if (this.mapZoom <= 6 && this.overlayVehicleMarkersGrops) {
        this.overlayVehicleMarkersGrops.hide();
      } else {
        this.overlayVehicleMarkersGrops.show();
      }
    },
    //改变车辆位置及状态
    setVehicleSituation(marker, vehicle) {
      if (marker.getExtData().status !== vehicle.status) {
        let icon = null;
        if (vehicle.mpa === "MPA35") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 65), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle35-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 65), // 根据所设置的大小拉伸或压缩图片
          });
        }
        // if (vehicle.mpa === "MPA35" && item.status === "0") {
        //   icon = new AMap.Icon({
        //     size: new AMap.Size(40, 65), // 图标尺寸
        //     image: require("@/assets/img/statistics/vehicle35-off-map.png"), // Icon的图像
        //     imageSize: new AMap.Size(40, 65), // 根据所设置的大小拉伸或压缩图片
        //   });
        // }
        if (vehicle.mpa === "MPA70") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 66), // 图标尺寸
            image: require("@/assets/img/statistics/vehicle70-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 66), // 根据所设置的大小拉伸或压缩图片
          });
        }
        // if (vehicle.mpa === "MPA70" && item.status === "0") {
        //   icon = new AMap.Icon({
        //     size: new AMap.Size(40, 64), // 图标尺寸
        //     image: require("@/assets/img/statistics/vehicle70-off-map.png"), // Icon的图像
        //     imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
        //   });
        // }
        marker.setIcon(icon);
      }
      if (
        marker.getExtData().latitude !== vehicle.latitude ||
        marker.getExtData().longitude !== vehicle.longitude
      ) {
        marker.setPosition([vehicle.longitude, vehicle.latitude]);
      }
    },
    newVehicleVueComponentWindow(item, position, marker) {
      let that = this;
      let component = Vue.extend({
        template: `<div class="infoWindow">
      <div class="title">
      <img src="${this.location}" alt /><span>{{vehicleInfo.vehicleNum}} （{{vehicleInfo.mpa=="MPA70"?"70MPa":"35MPa"}}）</span>
      </div>
      <div class="infoWindowContent">
        <img class="qrCode" src="${this.qrCode}" alt />
        <div class="contentText">
          <ul style="margin-top:2px;">
            <li>
              <div>
                <img src="${this.win_compay}" alt />
                <span>企业：</span>
                <span>交通集团公司</span>
              </div>
              <div>
              <img src="${this.win_city}" alt />
                <span>城市：</span>
                <span>{{vehicleInfo.city}}</span>
              </div>
            </li>
            <li>
              <div>
              <img src="${this.win_car}" alt />
                <span>车辆状态：</span>
                <span>{{vehicleInfo.status=="1"?"在线":"离线"}}<span v-if="vehicleInfo.status=='1'" class="onLine"></span><span v-if="vehicleInfo.status=='0'" class="offLine"></span></span>
              </div>
              <div>
              <img src="${this.win_speed}" alt />
                <span>车速：</span>
                <span>{{vehicleInfo.vehicleSpeed}}</span>
              </div>
            </li>
            <li>
              <div>
               <img src="${this.win_mileage}" alt />
                <span>累计总里程：</span>
                <span>2055km</span>
              </div>
              <div>
               <img src="${this.win_h_mileage}" alt />
                <span>累计纯氢里程：</span>
                <span>{{vehicleInfo.pureHydOdometer}}km</span>
              </div>
            </li>
            <li>
              <div>
               <img src="${this.win_hyd}" alt />
                <span>累计纯氢里程比例：</span>
                <span>{{vehicleInfo.ratio}}</span>
              </div>
              <div>
              <img src="${this.win_other}" alt />
                <span>其他信息：</span>
                <span>{{vehicleInfo.otherInfo}}</span>
              </div>
            </li>
            <li>
              <div style="width:100%;">
              <img src="${this.win_time}" alt />
                <span>上线时间：</span>
                <span>{{vehicleInfo.onlineTime}}</span>
              </div>
            </li>
          </ul>
        </div>

         <div class="triangle"></div>
      </div>
    </div>`,
        data: function () {
          return {
            vehicleInfo: item,
          };
        },
        methods: {
          goBicle() {
            that.$router.push({
              name: "Bicycle",
              query: { vin: this.vehicleInfo.vin },
            });
          },
        },
      });
      let newComponent = new component().$mount();
      this.infoWindow = new AMap.InfoWindow({
        content: newComponent.$el, //将实例的根 DOM 元素挂载到信息窗体上
        offset: new AMap.Pixel(0, -40),
        autoMove: true,
        isCustom: true,
        closeWhenClickMap: true,
        retainWhenClose: true,
      });
      this.infoWindow.open(this.map, position);
      this.infoWindow.on("close", function () {
        newComponent.$destroy(); //销毁
        if (that.selectMarkerIdOrVin) {
          that.overlayVehicleMarkersGrops.removeOverlay(marker);
          that.vehicleMarkers = that.vehicleMarkers.filter((item) => {
            return item.getExtData().vin !== that.selectMarkerIdOrVin;
          });
          that.selectMarkerIdOrVin = "";
        }
      });
    },
    //更新车辆marker
    upDataVehicleMarkers(filtersVehicles) {
      let removeMarkers = [];
      let cloneFiltersVehicles = JSON.parse(JSON.stringify(filtersVehicles));

      let fileterLength = filtersVehicles.length;
      let removeMarkerFlag = true;
      let reduceIndex = 0;
      //获取已经存在的车辆信息
      this.vehicleMarkers.forEach((item, itemIndex) => {
        removeMarkerFlag = true;
        filtersVehicles.forEach((vehicle, index) => {
          if (item.getExtData().vin == vehicle.vin) {
            this.setVehicleSituation(item, vehicle);
            cloneFiltersVehicles.splice(index - reduceIndex, 1);
            reduceIndex++;
            removeMarkerFlag = false;
          }
        });
        if (removeMarkerFlag) {
          removeMarkers.push(this.vehicleMarkers[itemIndex]);
        }
      });
      this.overlayVehicleMarkersGrops.removeOverlays(removeMarkers);
      this.vehicleMarkers = this.overlayVehicleMarkersGrops.getOverlays();
      this.addVehicleMarkers(cloneFiltersVehicles);
    },
    //判断是否执行了树形选择，如果执行，调用显示窗体
    showSelectVehicleWindow() {
      let selectMarker = this.vehicleMarkers.filter((item) => {
        //判断是否进行了树形选择
        return item.getExtData().vin == this.selectMarkerIdOrVin;
      });
      if (selectMarker.length > 0) {
        let marker = selectMarker[0];
        this.showSelectVehicleWindowFlag = true;
        this.newVehicleVueComponentWindow(
          marker.getExtData(),
          marker.getPosition(),
          marker
        );
        this.map.setZoomAndCenter(10, marker.getPosition());
      }
    },
    strustureSiteMarkerContent(sites) {
      let filtersSites = [];
      filtersSites = sites.filter((item) => {
        if (
          this.siteSliderNum >= Number(item.addTotal) ||
          this.selectMarkerIdOrVin == item.platformId
        ) {
          if (
            (this.checkedSite35MPa == true && this.checkedSite70MPa == true) ||
            this.selectMarkerIdOrVin == item.platformId
          ) {
            return true;
          } else if (this.checkedSite35MPa == true) {
            return item.mpa == "MPA35";
          } else if (this.checkedSite70MPa == true) {
            return item.mpa == "MPA70";
          } else {
            return false;
          }
        }
      });
      //判断站点sitemarkers是为空，为空则添加，非空则控制及增删
      if (this.siteMarkers.length === 0) {
        this.addSiteMarkers(filtersSites);
      } else {
        this.upDataSiteMarkers(filtersSites);
      }
      if (!this.showSelectSiteWindowFlag) {
        this.showSelectSiteWindow();
      }
    },
    //添加sites到地图
    addSiteMarkers(filtersSites) {
      let arr = [];
      let icon = null;
      let marker = null;
      let that = this;
      filtersSites.forEach((item, index) => {
        if (item.mpa === "MPA35") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 67), // 图标尺寸
            image: require("@/assets/img/statistics/site35-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 67), // 根据所设置的大小拉伸或压缩图片
          });
        }
        // if (item.mpa === "MPA35" && item.status === "0") {
        //   icon = new AMap.Icon({
        //     size: new AMap.Size(40, 64), // 图标尺寸
        //     image: require("@/assets/img/statistics/site35-off-map.png"), // Icon的图像
        //     imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
        //   });
        // }
        if (item.mpa === "MPA70") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 67), // 图标尺寸
            image: require("@/assets/img/statistics/site70-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 67), // 根据所设置的大小拉伸或压缩图片
          });
        }
        // if (item.mpa === "MPA70" && item.status === "0") {
        //   icon = new AMap.Icon({
        //     size: new AMap.Size(40, 64), // 图标尺寸
        //     extData: item,
        //     image: require("@/assets/img/statistics/site70-off-map.png"), // Icon的图像
        //     imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
        //   });
        // }
        marker = new AMap.Marker({
          icon: icon,
          position: [item.lon, item.lat],
          extData: item,
          offset: new AMap.Pixel(-16.5, -40),
          autoRotation: true,
        });
        marker.on("click", (e) => {
          this.newSiteVueComponentWindow(item, e.target.getPosition());
        });

        arr.push(marker);
      });
      if (!this.haveSiteMarkersGrops) {
        this.overlaySiteMarkersGrops = new AMap.OverlayGroup(arr);
        this.map.add(this.overlaySiteMarkersGrops);
        this.haveSiteMarkersGrops = true;
      } else {
        this.overlaySiteMarkersGrops.addOverlays(arr);
        this.siteMarkers = this.siteMarkers.concat(arr);
      }
      if (this.mapZoom <= 6 && this.overlaySiteMarkersGrops) {
        this.overlaySiteMarkersGrops.hide();
      } else {
        this.overlaySiteMarkersGrops.show();
      }
    },
    //生成vue子类，加入到信息窗口
    newSiteVueComponentWindow(item, position, marker) {
      let that = this;
      let component = Vue.extend({
        template: `<div
      class="siteInfoWindow">
      <div class="title">
      <img src="${this.site}" alt /><span>站点名称：{{siteInfo.tenantName}}({{siteInfo.mpa=="MPA70"?"70MPa":"35MPa"}}）</span></div>
      <div class="infoWindowContent">
        <img class="qrCode" src="${this.qrCode}" alt />
        <div class="contentText">
          <ul>
            <li>
              <div>
               <img src="${this.win_city}" alt />
                <span>城市：</span>
                <span>{{siteInfo.city}}</span>
              </div>
              <div>
               <img src="${this.win_address}" alt />
                <span>地址：</span>
                <span>{{siteInfo.address}}</span>
              </div>
            </li>
            <li>
              <div>
               <img src="${this.win_site}" alt />
                <span>是否加氢中：</span>
                <span>{{siteInfo.status == '0'?'否':'是'}}</span>
              </div>
              <div>
                <img src="${this.win_h_mileage}" alt />
                <span>累计加氢量：</span>
                <span>{{siteInfo.addTotal}}kg</span>
              </div>
            </li>
            <li>
              <div>
               <img src="${this.win_hyd}" alt />
                <span>累计35MPa加氢量：</span>
                <span>{{siteInfo.addTotalThr}}kg</span>
              </div>
              <div>
               <img src="${this.win_hyd}" alt />
                <span>累计70MPa加氢量：</span>
                <span>{{siteInfo.addTotalSev}}kg</span>
              </div>
            </li>
            <li>
              <div style="width:100%;">
                <img src="${this.win_time}" alt />
                <span>上线时间：</span>
                <span>{{siteInfo.onlineTime}}</span>
              </div>
            </li>
          </ul>
        </div>

         <div class="triangle"></div>
      </div>
    </div>`,
        data: function () {
          return {
            siteInfo: item,
          };
        },
        methods: {
          goHydrogenationStation() {
            that.$router.push({
              name: "HydrogenationStation",
              query: {
                platformId: this.siteInfo.platformId,
                mpa: this.siteInfo.mpa,
              },
            });
          },
        },
      });
      let newComponent = new component().$mount();
      this.infoWindow = new AMap.InfoWindow({
        content: newComponent.$el, //将实例的根 DOM 元素挂载到信息窗体上
        isCustom: true,
        offset: new AMap.Pixel(0, -40),
        closeWhenClickMap: true,
        retainWhenClose: true,
      });
      this.infoWindow.open(this.map, position);
      this.infoWindow.on("close", function () {
        newComponent.$destroy(); //销毁
        if (that.selectMarkerIdOrVin) {
          that.overlaySiteMarkersGrops.removeOverlay(marker);
          that.siteMarkers = that.siteMarkers.filter((item) => {
            return item.getExtData().id !== that.selectMarkerIdOrVin;
          });
          that.selectMarkerIdOrVin = "";
        }
      });
    },
    upDataSiteMarkers(siteFilters) {
      let removeMarkers = [];
      let cloneFiltersSite = JSON.parse(JSON.stringify(siteFilters));

      let fileterLength = siteFilters.length;
      let removeMarkerFlag = true;
      let reduceIndex = 0;
      //获取已经存在的车辆信息
      this.siteMarkers.forEach((item, itemIndex) => {
        removeMarkerFlag = true;
        siteFilters.forEach((site, index) => {
          if (item.getExtData().platformId == site.platformId) {
            this.setSiteSituation(item, site);
            cloneFiltersSite.splice(index - reduceIndex, 1);
            reduceIndex++;
            removeMarkerFlag = false;
          }
        });
        if (removeMarkerFlag) {
          removeMarkers.push(this.siteMarkers[itemIndex]);
        }
      });
      this.overlaySiteMarkersGrops.removeOverlays(removeMarkers);
      this.siteMarkers = this.overlaySiteMarkersGrops.getOverlays();
      this.addSiteMarkers(cloneFiltersSite);
    },
    setSiteSituation(marker, site) {
      if (marker.getExtData().status !== site.status) {
        let icon = null;
        if (item.mpa === "MPA35" && item.status === "1") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 67), // 图标尺寸
            image: require("@/assets/img/statistics/site35-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 67), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA35" && item.status === "0") {
          icon = new AMap.Icon({
            size: new AMap.Size(40, 64), // 图标尺寸
            image: require("@/assets/img/statistics/site35-off-map.png"), // Icon的图像
            imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA70" && item.status === "1") {
          icon = new AMap.Icon({
            size: new AMap.Size(53, 67), // 图标尺寸
            image: require("@/assets/img/statistics/site70-map.png"), // Icon的图像
            imageSize: new AMap.Size(53, 67), // 根据所设置的大小拉伸或压缩图片
          });
        }
        if (item.mpa === "MPA70" && item.status === "0") {
          icon = new AMap.Icon({
            size: new AMap.Size(40, 64), // 图标尺寸
            extData: item,
            image: require("@/assets/img/statistics/site70-off-map.png"), // Icon的图像
            imageSize: new AMap.Size(40, 64), // 根据所设置的大小拉伸或压缩图片
          });
        }
        marker.setIcon(icon);
      }
      if (
        marker.getExtData().lon !== site.lon ||
        marker.getExtData().lat !== site.lat
      ) {
        marker.setPosition([site.lon, site.lat]);
      }
    },
    //判断是否执行了树形选择，如果执行，调用显示窗体
    showSelectSiteWindow() {
      let selectMarker = this.siteMarkers.filter((item) => {
        //判断是否进行了树形选择
        return item.getExtData().platformId == this.selectMarkerIdOrVin;
      });
      if (selectMarker.length > 0) {
        let marker = selectMarker[0];
        this.showSelectSiteWindowFlag = true;
        this.newSiteVueComponentWindow(
          marker.getExtData(),
          marker.getPosition(),
          marker
        );
        this.map.setZoomAndCenter(10, marker.getPosition());
      }
    },
  },
  beforeDestroy() {
    if (this.websocket1) {
      //判断websoket存在关闭
      this.websocket1.onclose = function () {
        console.log("关闭心跳发送");
      };
      this.websocket1.close();
    }
    if (this.websocket2) {
      //判断websoket存在关闭
      this.websocket2.onclose = function () {
        console.log("关闭心跳发送");
      };
      this.websocket2.close();
    }
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    this.getTree({ dataType: this.radioType }, true);
  },
  filters: {
    formatDate: function (time) {
      //时间过滤器，用于格式化时间
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy/MM/dd hh:mm");
      } else {
        return "";
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
    if (this.dataTimer) {
      clearInterval(this.dataTimer); // 在Vue实例销毁前，清除定时器
    }
  },
  mounted() {
    this.mapInit();
    this.webSocketLink1(Config.webLocalHost + "/provinceAnalysis");
    this.webSocketLink2(Config.webLocalHost + "/itemDetail");
    let that = this;
    this.timer = setInterval(() => {
      that.date = new Date();
    }, 1000); //设置时间定时器
  },
};
</script>
<style>
.slider_tooltop {
  width: auto !important;
}
</style>
<style lang="less" scoped>
.first {
  position: relative;
  height: 100%;
  width: 100%;
}
.header {
  background-image: url(../../assets/img/statistics/bg.png);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}
.bi-2-title {
  height: 4.6875vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.bi-2-title img {
  width: 3.125vh;
  height: 3.125vh;
  margin-right: 1.5625vh;
}
.bi-2-title-text {
  width: 25.130261266vh;
  height: 2.734389791vh;
  font-size: 2.734389791vh;
  font-family: PingFang SC;
  font-weight: bold;
  color: #0063cf;
  line-height: 2.134389791vh;
}

.bi-2-top {
  margin-top: -4.6875vh;
  font-size: 1.692708vh;
  /*font-size: 0.951684vw;*/
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(12, 128, 255, 1);
  line-height: 4.6875vh;
  height: 4.6875vh;
}

.bi-2-page {
  position: absolute;
  display: inline-flex;
  align-items: center;
  line-height: 4.6875vh;
  left: 1.5em;
  font-size: 1.692708vh;
  /*font-size: 0.951684vw;*/
  z-index: 999;
}
.triangle-left {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-right: 10px solid rgba(13, 119, 249, 0.2);
  border-bottom: 6px solid transparent;
  margin-right: 1vw;
}

.triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 10px solid #0d77f9;
  border-bottom: 6px solid transparent;
  margin-left: 1vw;
}
.bi-2-date {
  float: right;
  margin-right: 1.5em;
  height: 100%;
}
/deep/.el-checkbox__inner {
  height: 12px;
  width: 12px;
}
/deep/.el-slider__runway {
  background-image: url("../../assets/img/statistics/slider-bg.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 22px;
  background-color: #ffffff;
}
/deep/.el-slider__marks-stop {
  bottom: 0px;
  background: black;
  height: 3px;
  width: 1px;
  border-radius: 0;
}
/deep/ .el-slider__bar {
  display: none;
}
/deep/ .el-slider__button-wrapper {
  top: -10px;
}
/deep/.el-slider__button {
  border: 1px solid #ebebeb;
  width: 5.5px;
  height: 24px;
  border-radius: 0;
}
/deep/ .el-slider__runway {
  margin: 8px 0;
}
/deep/.provincemarker {
  background: #ffffff;
  position: relative;
  width: 138px;
  height: 86px;
  padding-left: 17px;
  font-size: 13px;
  box-shadow: 0 0 5px 5px #eeeeee;
  > div:first-child {
    color: #575757;
    padding-top: 3px;
  }
  > div {
    line-height: 27px;
    height: 27px;
    color: #4a90e2;
  }
  .pointmarker {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    height: 0;
    width: 0;
    border-width: 8px 5px 0px;
    border-style: solid;
    border-color: #ffffff transparent transparent;
  }
}
//marker弹出窗体
/deep/.siteInfoWindow,
/deep/.infoWindow {
  position: relative;
  height: 210px;
  width: 599px;
  background-color: #ffffff;
  .title {
    height: 39px;
    padding-left: 20px;
    line-height: 39px;
    border-bottom: 1px solid #f1f1f1;
    img {
      height: 20px;
      width: 20px;
      vertical-align: middle;
    }
    span {
      font-weight: 600;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .infoWindowContent {
    margin: 20px;
    .qrCode {
      width: 112px;
      height: 112px;
      border: 7px solid #eeeeee;
      vertical-align: top;
    }
    .contentText {
      display: inline-block;
      width: 392px;
      margin-left: 21px;
      ul {
        padding-left: 20px;
      }
      li {
        display: flex;
        > div {
          line-height: 24px;
          height: 24px;
          display: inline-block;
          font-size: 12px;
          width: 50%;
          img {
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
          .offLine {
            display: inline-block;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background-color: red;
            margin-left: 5px;
            margin-top: 8px;
            vertical-align: top;
          }
          .onLine {
            display: inline-block;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background-color: #30bf78;
            margin-left: 5px;
            margin-top: 8px;
            vertical-align: top;
          }
        }
      }
    }
  }
  .vehicleTrack {
    float: right;
    margin-right: 24px;
    .el-button {
      padding: 0;
      background-color: #2080e3;
      color: #ffffff;
      height: 24px;
      width: 100px;
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
    }
  }
  .triangle {
    height: 0;
    width: 0;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 8px 0px;
    border-style: solid;
    border-color: #ffffff transparent transparent;
  }
}
.content {
  position: absolute;
  height: 100%;
  width: 100%;
  .total {
    position: absolute;
    right: 10px;
    top: 8.33333vh;
    padding: 9px 0px;
    z-index: 1;
    background: #ffffff;
    border: 1px solid #d6d6d6;
    width: 400px;
    font-size: 14px;
    > span {
      margin-left: 30px;
      color: #666666;
    }
  }
  .openTree {
    position: absolute;
    background: #ffffff;
    top: 13px;
    left: 10px;
    z-index: 1;
    color: #275998;
    width: 140px;
    height: 37px;
    line-height: 37px;
    font-size: 14px;
    text-indent: 17px;
  }
  .tree {
    position: absolute;
    top: 8.33333vh;
    left: 10px;
    z-index: 2;
    height: calc(100% - 8.33333vh - 50px);
    width: 240px;
    overflow: hidden;
    .title {
      height: 32px;
      color: rgba(102, 102, 102, 1);
      line-height: 32px;
      font-size: 14px;
      font-weight: 600;
      background-color: rgba(241, 245, 252, 1);
      padding-left: 14px;
    }
    > div {
      margin-bottom: 20px;
      background: #ffffff;
      height: 100%;
      .treeContent {
        height: calc(100% - 32px);
        overflow: auto;
        padding: 14px 16px;
      }
      .treeBtn {
        position: absolute;
        bottom: 0px;
        right: 50%;
        transform: translateX(50%);
        height: 20px;
        width: 80px;
        background: #ffffff;
        padding: 0;
        border-bottom: 0;
        img {
          height: 10px;
          width: 80px;
        }
      }
    }
  }
  .sliderBlock {
    position: absolute;
    right: 10px;
    top: calc(8.33333vh + 60px);
    z-index: 1;

    .sliderVehicleBlock {
      padding: 9px 30px;
      background: #ffffff;
      width: 340px;
      height: 80px;
      border: 1px solid #d6d6d6;
      margin-bottom: 10px;
      .sliderTitle {
        display: flex;
        justify-content: space-between;
        text-align: left;
        font-size: 12px;
        color: #949494;
      }
      /deep/ .el-slider {
        margin-top: 5px;
      }
      .labelContent {
        font-size: 12px;
        color: #949494;
        > span:first-child {
          float: left;
        }
        > span:last-child {
          float: right;
        }
      }
    }
    .sliderSiteBlock {
      background: #ffffff;
      width: 385px;
      height: 90px;
      padding: 9px 27px;
      border: 1px solid #d6d6d6;

      .sliderTitle {
        display: flex;
        justify-content: space-between;
        text-align: left;
        font-size: 12px;
        color: #949494;
      }
      .labelContent {
        font-size: 12px;
        color: #949494;
        > span:first-child {
          float: left;
        }
        > span:last-child {
          float: right;
        }
      }
    }
  }
  .site {
    position: absolute;
    background: rgba(227, 243, 254, 1);
    bottom: 10px;
    right: 10px;
    z-index: 1;
    height: 40px;
    padding: 0px 17px;
    border-radius: 4px;
    box-shadow: 0px 5px 50px 0px rgba(0, 15, 26, 0.17);
    > span {
      line-height: 41px;
      vertical-align: middle;
      margin-left: 5px;
      color: rgba(102, 102, 102, 1);
    }
    img {
      width: 37px;
      height: 42px;
      line-height: 41px;
      vertical-align: middle;
      /*margin-right: 5px;*/
    }
  }
  .map {
    height: 100%;
    width: 100%;
  }
}
/deep/.el-radio:last-of-type {
  margin-right: 0px;
}
/deep/.el-radio__label {
  font-size: 12px;
  padding-left: 5px;
}
/deep/.amap-controlbar {
  transform: scale(0.4);
}
/deep/ .amap-container {
  cursor: pointer;
}
</style>
