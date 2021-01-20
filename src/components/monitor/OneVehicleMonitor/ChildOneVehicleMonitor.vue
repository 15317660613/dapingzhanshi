<template>
  <div class="contentChild">
    <div class="vehicleDetail">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>VIN：</span>
            <span class="detailtext">{{vehicle.vin}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>车牌号：</span>
            <span class="detailtext">{{vehicle.vehicleNum}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>型号：</span>
            <span class="detailtext">{{vehicle.model||vehicle.vehicleModle||"-"}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>诊断协议：</span>
            <span
              v-if="vehicleDataOBD.diagnosticProtocol!== undefined"
              class="detailtext"
            >{{vehicleDataOBD.diagnosticProtocol|formatDiagnosticProtocol}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>软件标定识别号：</span>
            <span
              v-if="vehicleDataOBD.softIdenNumber"
              class="detailtext"
            >{{vehicleDataOBD.softIdenNumber}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>标定验证码：</span>
            <span v-if="vehicleDataOBD.cvn" class="detailtext">{{vehicleDataOBD.cvn}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>MIL状态：</span>
            <span v-if="vehicleDataOBD.mil" class="detailtext">{{vehicleDataOBD.mil|formatMil}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>故障码总数：</span>
            <span v-if="vehicleDataOBD.dtcCount" class="detailtext">{{vehicleDataOBD.dtcCount}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <span>IUPR：</span>
            <span v-if="vehicleDataOBD.iupr" class="detailtext">{{vehicleDataOBD.iupr}}</span>
            <span v-else class="detailtext">-</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="halfContent">
          <div class="title">
            <span class="titleText">位置轨迹</span>
          </div>
          <div id="railMap"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="halfContent">
          <div class="title">
            <span class="titleText">仪表数据</span>
          </div>
          <div class="meterTitle">
            <div>总里程</div>
            <div v-if="vehicleDataStream.odometer">{{vehicleDataStream.odometer}}km</div>
            <div v-else>-</div>
          </div>
          <div style="height: calc(100% - 150px)">
            <v-chart ref="meterChart" :autoresize="true" :options="meterOption" />
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="dataContent">
      <div class="title">
        <span class="titleText">发动机排放相关数据</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">车速：</div>
              <div class="rightTitle">大气压力：</div>
              <div class="rightTitle">发动机净输出扭矩：</div>
              <div class="rightTitle">摩擦扭矩：</div>
              <div class="rightTitle">发动机转速：</div>
              <div class="rightTitle">发动机燃料流量：</div>
              <div class="rightTitle">SCR上游NOx传感器输出值：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div
                v-if="vehicleDataStream.speed !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.speed+'km/h'"
              >{{vehicleDataStream.speed}}km/h</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.baro !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.baro+'kPa'"
              >{{vehicleDataStream.baro}}kPa</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.engineActualTorque !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.engineActualTorque+'%'"
              >{{vehicleDataStream.engineActualTorque}}%</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.frictionTorque !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.frictionTorque+'%'"
              >{{vehicleDataStream.frictionTorque}}%</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.engineSpeed !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.engineSpeed+'rpm'"
              >{{vehicleDataStream.engineSpeed}}rpm</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.engineFuelFlowRate !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.engineFuelFlowRate+'L/h'"
              >{{vehicleDataStream.engineFuelFlowRate}}L/h</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.scrUpstream !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.scrUpstream+'ppm'"
              >{{vehicleDataStream.scrUpstream}}ppm</div>
              <div v-else class="rightTitleNoValue">-</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">SCR下游NOx传感器输出值：</div>
              <div class="rightTitle">反应剂余量：</div>
              <div class="rightTitle">进气量：</div>
              <div class="rightTitle">SCR入口温度：</div>
              <div class="rightTitle">SCR出口温度：</div>
              <div class="rightTitle">DPF压差：</div>
              <div class="rightTitle">油箱液位：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div
                v-if="vehicleDataStream.scrDownstream !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.scrDownstream+'ppm'"
              >{{vehicleDataStream.scrDownstream}}ppm</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.reactantMargin !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.reactantMargin+'%'"
              >{{vehicleDataStream.reactantMargin}}%</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.intakeVolume !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.intakeVolume+'kg/h'"
              >{{vehicleDataStream.intakeVolume}}kg/h</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.scrInletTemperature !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.scrInletTemperature+'deg C'"
              >{{vehicleDataStream.scrInletTemperature}}deg C</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.scrOutletTemperature !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.scrOutletTemperature+'deg C'"
              >{{vehicleDataStream.scrOutletTemperature}}deg C</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.dpfPressureDiff !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.dpfPressureDiff+'kPa'"
              >{{vehicleDataStream.dpfPressureDiff}}kPa</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.tankLevel !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.tankLevel+'%'"
              >{{vehicleDataStream.tankLevel}}%</div>
              <div v-else class="rightTitleNoValue">-</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">定位状态：</div>
              <div class="rightTitle">经度：</div>
              <div class="rightTitle">纬度：</div>
              <div class="rightTitle">累计里程：</div>
              <div class="rightTitle">发动机冷却液温度：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div
                v-if="vehicleDataStream.locationEW !== undefined"
                class="rightTitleValue"
              >{{vehicleDataStream.locationEW==0?"东经":"西经"}}</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.longitude !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.longitude+'°'"
              >{{vehicleDataStream.longitude}}°</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.latitude !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.latitude+'°'"
              >{{vehicleDataStream.latitude}}°</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.odometer !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.odometer+'km'"
              >{{vehicleDataStream.odometer}}km</div>
              <div v-else class="rightTitleNoValue">-</div>
              <div
                v-if="vehicleDataStream.engineCoolantTemperature !== undefined"
                class="rightTitleValue"
                :title="vehicleDataStream.engineCoolantTemperature+'deg C'"
              >{{vehicleDataStream.engineCoolantTemperature}}deg C</div>
              <div v-else class="rightTitleNoValue">-</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="dataContent">
      <div class="title">
        <span class="titleText">诊断支持数据</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">催化转换器监控：</div>
              <div class="rightTitle">加热催化转换器监控：</div>
              <div class="rightTitle">蒸发系统监控：</div>
              <div class="rightTitle">二次空气系统监控：</div>
              <div class="rightTitle">A/C系统致冷剂监控：</div>
              <div class="rightTitle">排期传感器加热器监控：</div>
              <div class="rightTitle">排期传感器加热器监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div :class="vehicleDataOBD.supportCMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.supportCMS !== undefined"
                >{{vehicleDataOBD.supportCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportHCMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportHCMS !== undefined"
                >{{vehicleDataOBD.supportHCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportESMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportESMS !== undefined"
                >{{vehicleDataOBD.supportESMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportSASMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportSASMS !== undefined"
                >{{vehicleDataOBD.supportSASMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportACSRMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportACSRMS !== undefined"
                >{{vehicleDataOBD.supportACSRMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportEGSMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportEGSMS !== undefined"
                >{{vehicleDataOBD.supportEGSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportEGSHMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportEGSHMS !== undefined"
                >{{vehicleDataOBD.supportEGSHMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">EGR系统和VVT监控：</div>
              <div class="rightTitle">冷启动辅助系统监控：</div>
              <div class="rightTitle">增压压力控制系统：</div>
              <div class="rightTitle">DPF监控：</div>
              <div class="rightTitle">选择性催化还原系统（SCR）或NOx吸附器：</div>
              <div class="rightTitle">NMHC氧化催化器监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div
                :class="vehicleDataOBD.supportEGRVVTSM == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportEGRVVTSM !== undefined"
                >{{vehicleDataOBD.supportEGRVVTSM == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportCSASMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportCSASMS !== undefined"
                >{{vehicleDataOBD.supportCSASMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportBPCSMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportBPCSMS !== undefined"
                >{{vehicleDataOBD.supportBPCSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportDPFMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportDPFMS !== undefined"
                >{{vehicleDataOBD.supportDPFMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                class="stance"
                :class="vehicleDataOBD.supportNOXCCNOXAMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportNOXCCNOXAMS !== undefined"
                >{{vehicleDataOBD.supportNOXCCNOXAMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportNMHCCCMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportNMHCCCMS !== undefined"
                >{{vehicleDataOBD.supportNMHCCCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">失火监控：</div>
              <div class="rightTitle">燃油系统监控：</div>
              <div class="rightTitle">综合成分监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div :class="vehicleDataOBD.supportMMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.supportMMS !== undefined"
                >{{vehicleDataOBD.supportMMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportFSMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportFSMS !== undefined"
                >{{vehicleDataOBD.supportFSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.supportCCMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.supportCCMS !== undefined"
                >{{vehicleDataOBD.supportCCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="dataContent">
      <div class="title">
        <span class="titleText">诊断就绪数据</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">催化转换器监控：</div>
              <div class="rightTitle">加热催化转换器监控：</div>
              <div class="rightTitle">蒸发系统监控：</div>
              <div class="rightTitle">二次空气系统监控：</div>
              <div class="rightTitle">A/C系统致冷剂监控：</div>
              <div class="rightTitle">排期传感器加热器监控：</div>
              <div class="rightTitle">排期传感器加热器监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div :class="vehicleDataOBD.readyCMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyCMS !== undefined"
                >{{vehicleDataOBD.readyCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyHCMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyHCMS !== undefined"
                >{{vehicleDataOBD.readyHCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyESMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyESMS !== undefined"
                >{{vehicleDataOBD.readyESMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readySASMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readySASMS !== undefined"
                >{{vehicleDataOBD.readySASMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.readyACSRMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyACSRMS !== undefined"
                >{{vehicleDataOBD.readyACSRMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyEGSMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyEGSMS !== undefined"
                >{{vehicleDataOBD.readyEGSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.readyEGSHMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyEGSHMS !== undefined"
                >{{vehicleDataOBD.readyEGSHMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">EGR系统和VVT监控：</div>
              <div class="rightTitle">冷启动辅助系统监控：</div>
              <div class="rightTitle">增压压力控制系统：</div>
              <div class="rightTitle">DPF监控：</div>
              <div class="rightTitle">选择性催化还原系统（SCR）或NOx吸附器：</div>
              <div class="rightTitle">NMHC氧化催化器监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div
                :class="vehicleDataOBD.readyEGRVVTSM == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyEGRVVTSM !== undefined"
                >{{vehicleDataOBD.readyEGRVVTSM == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.readyCSASMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyCSASMS !== undefined"
                >{{vehicleDataOBD.readyCSASMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.readyBPCSMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyBPCSMS !== undefined"
                >{{vehicleDataOBD.readyBPCSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyDPFMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyDPFMS !== undefined"
                >{{vehicleDataOBD.readyDPFMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                class="stance"
                :class="vehicleDataOBD.readyNOXCCNOXAMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyNOXCCNOXAMS !== undefined"
                >{{vehicleDataOBD.readyNOXCCNOXAMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div
                :class="vehicleDataOBD.readyNMHCCCMS == true?'rightTitleValue':'rightTitleNoValue'"
              >
                <template
                  v-if="vehicleDataOBD.readyNMHCCCMS !== undefined"
                >{{vehicleDataOBD.readyNMHCCCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16" style="background: #eee;height: 290px">
              <div class="rightTitle">失火监控：</div>
              <div class="rightTitle">燃油系统监控：</div>
              <div class="rightTitle">综合成分监控：</div>
            </el-col>
            <el-col :span="8" class="listText">
              <div :class="vehicleDataOBD.readyMMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyMMS !== undefined"
                >{{vehicleDataOBD.readyMMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyFSMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyFSMS !== undefined"
                >{{vehicleDataOBD.readyFSMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
              <div :class="vehicleDataOBD.readyCCMS == true?'rightTitleValue':'rightTitleNoValue'">
                <template
                  v-if="vehicleDataOBD.readyCCMS !== undefined"
                >{{vehicleDataOBD.readyCCMS == true?'支持':'不支持'}}</template>
                <template v-else>-</template>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-row>
        <div class="historyMap">
          <div class="title">
            <span class="titleText">轨迹回放</span>
          </div>
          <el-form
            :model="railHistoryParams"
            :inline="true"
            label-width="80px"
            @submit.native.prevent
          >
            <el-form-item label>
              <el-date-picker
                v-model="railHistoryParams.date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="railHistoryPickerOptionsChange"
              ></el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="searchRailHistory">查询</el-button>
          </el-form>
          <div id="railPlaybackMap"></div>
        </div>
      </el-row>
      <el-row>
        <div class="historyChart">
          <div class="title">
            <span class="titleText">动态参数</span>
          </div>
          <el-form
            :model="valueHistoryParams"
            :inline="true"
            label-width="80px"
            @submit.native.prevent
          >
            <el-form-item label>
              <el-select
                v-model="valueHistoryParams.parameter"
                placeholder="请选择参数"
                style="width: 150px"
              >
                <el-option label="大气压力" value="baro"></el-option>
                <el-option label="DPF压差" value="dpfPressureDiff"></el-option>
                <el-option label="发动机实际扭矩" value="engineActualTorque"></el-option>
                <el-option label="发动机冷却液温度" value="engineCoolantTemperature"></el-option>
                <el-option label="发动机燃料流量" value="engineFuelFlowRate"></el-option>
                <el-option label="发动机转速" value="engineSpeed"></el-option>
                <el-option label="摩擦扭矩" value="frictionTorque"></el-option>
                <el-option label="信息采集时间" value="infoCollectionTime"></el-option>
                <el-option label="信息类型标志车辆状态" value="infoType"></el-option>
                <el-option label="进气量" value="intakeVolume"></el-option>
                <el-option label="定位有效性" value="locationEffectiveness"></el-option>
                <el-option label="累计里程" value="odometer"></el-option>
                <el-option label="反应剂余量" value="reactantMargin"></el-option>
                <el-option label="SCR入口温度" value="scrInletTemperature"></el-option>
                <el-option label="SCR出口温度" value="scrOutletTemperature"></el-option>
                <el-option label="SCR上游NOx传感器输出值" value="scrUpstream"></el-option>
                <el-option label="SCR下游NOx传感器输出值" value="scrDownstream"></el-option>
                <el-option label="车速" value="speed"></el-option>
                <el-option label="油箱液位" value="tankLevel"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label>
              <el-date-picker
                v-model="valueHistoryParams.date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                 @change="valueHistoryPickerOptionsChange"
              ></el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="searchParamValuesHistory">查询</el-button>
          </el-form>
          <v-chart v-if="paramsFlag === true" :autoresize="true" :options="paramsOption"></v-chart>
          <div class="imgBox">
            <img v-if="paramsFlag === false" src="@/assets/img/noData.jpg" alt />
          </div>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import Config from "@/assets/js/config.js";
import AMap from "AMap";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import startIcon from "@/assets/img/map/startPoint.svg";
import endIcon from "@/assets/img/map/endPoint.svg";
export default {
  name: "ChildOneVehicleMonitor",
  props: ["vehicle"],
  data() {
    return {
      wsUrl: "",
      websoket: null,
      paramsFlag: "", //
      carIcon: null, //车辆icon
      currentMarker: null, //试试轨迹车辆market
      valueHistoryParams: {}, //历史参数数据
      vehicleDataStream: {}, //发动机排放相关数据
      vehicleDataOBD: {}, // 诊断数据
      allPositionList: [], //车辆轨迹点，不超过3600
      lastPositionlist: [], //车辆上一发送的websocket轨迹
      railInitFlag: false, //判断是否轨迹高德初始化完成
      railMap: null,
      railPlaybackMap: null,
      railPlaybackInitFlag: false, //判断是否轨迹回放高德初始化完成
      railHistoryParams: {}, //轨迹历史数据
      paramsOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#ccc",
              borderColor: "#aaa",
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textStyle: {
                color: "#222"
              }
            }
          }
        },
        //参数值
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      },
      meterOption: {
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: "速度",
            type: "gauge",
            z: 3,
            min: 0,
            max: 260,
            splitNumber: 10,
            radius: "100%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            axisLabel: {
              backgroundColor: "auto",
              borderRadius: 2,
              color: "#eee",
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: "#222"
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic"
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: function(value) {
                value = (value + "").split(".");
                value.length < 2 && value.push("00");
                return (
                  ("00" + value[0]).slice(-2) +
                  "." +
                  (value[1] + "00").slice(0, 2)
                );
              },
              fontWeight: "bolder",
              borderRadius: 3,
              backgroundColor: "#444",
              borderColor: "#aaa",
              shadowBlur: 5,
              shadowColor: "#333",
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderColor: "#000",
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: "#fff",
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: "Arial",
              width: 100,
              color: "#eee",
              rich: {}
            },
            data: [{ value: 0, name: "km/h" }]
          },
          {
            name: "转速",
            type: "gauge",
            center: ["20%", "55%"], // 默认全局居中
            radius: "70%",
            min: 0,
            max: 10,
            endAngle: 45,
            splitNumber: 10,
            tooltip: {
              formatter: function(params) {
                return Number(params.value) * 1000 + "rmp";
              }
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, "-30%"] // x, y，单位px
            },
            detail: {
              fontSize: 18,
              formatter: function(value) {
                return Math.round(value * 1000);
              }
            },
            data: [{ value: 0 }]
          },
          {
            name: "油表",
            type: "gauge",
            center: ["80%", "55%"], // 默认全局居中
            radius: "70%",
            min: 0,
            max: 10,
            startAngle: 135,
            // endAngle: 300,
            splitNumber: 10,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            tooltip: {
              formatter: function(params) {
                return Number(params.value) * 10 + "%";
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, "-30%"] // x, y，单位px
            },
            detail: {
              fontSize: 16,
              formatter: function(value) {
                return value * 10 + "%";
              }
            },
            data: [{ value: 0 }]
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.$refs.meterChart.resize(); //echarts重新计算尺寸
    let deviceSize = new AMap.Size(26, 13);
    this.carIcon = new AMap.Icon({
      image: "https://webapi.amap.com/images/car.png",
      size: deviceSize,
      //会以base64的方式传参iconCar
      imageSize: deviceSize
    });
    this.mapInit();
    this.webSocketLink(Config.webLocalHost + "/vehicle/" + this.vehicle.vin);
  },
  methods: {
    //兼容ie的格式转换
    newDate(strTime) {
      //解决new Date()IE10不支持参数
      //首先将日期分隔 ，获取到日期部分 和 时间部分
      var day = strTime.split(" ");
      //获取日期部分的年月日
      var days = day[0].split("-");
      //获取时间部分的 时分秒
      var mi = day[day.length - 1].split(":");
      //获取当前date类型日期
      var date = new Date();
      //给date赋值  年月日
      date.setUTCFullYear(days[0], days[1] - 1, days[2]);
      //给date赋值 时分秒  首先转换utc时区 ：+8
      date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
      return date;
    },
    //结束时间+1秒
    endTimeFormat(time) {
      let date = new Date(this.newDate(time).getTime() + 1000);
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1).toString();
      let D =
        date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString();
      let h =
        date.getHours() > 9
          ? date.getHours()
          : "0" + date.getHours().toString();
      let m =
        date.getMinutes() > 9
          ? date.getMinutes()
          : "0" + date.getMinutes().toString();
      let s =
        date.getSeconds() > 9
          ? date.getSeconds()
          : "0" + date.getSeconds().toString();
      return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    },
    railHistoryPickerOptionsChange(option) {
      if (
        Math.abs(
          (this.newDate(option[0]) - this.newDate(option[1])) / 86400000
        ) > 3
      ) {
        this.$message.error("时间范围不能超过3天！");
      }
    },
    //点击查询历史轨迹
    searchRailHistory() {
      if (!this.railHistoryParams.date) {
        this.$message.error("请选择时间");
        return;
      }
      this.railPlaybackMap.clearMap(); //清除覆盖物
      let deviceSize = new AMap.Size(16, 16);
      if (
        Math.abs(
          this.newDate(this.railHistoryParams.date[0]).getTime() -
            this.newDate(this.railHistoryParams.date[1]).getTime()
        ) /
          86400000 >
        3
      ) {
        this.$message.error("时间范围不能超过3天！");
        return;
      }
      let params = {
        vin: this.vehicle.vin,
        startTime: this.railHistoryParams.date[0],
        endTime: this.endTimeFormat(this.railHistoryParams.date[1])
      };
      this.$http.post("/monitor/history-position", params).then(({ data }) => {
        if (data.code == "200") {
          if (data.data.vehicleDataStreamList) {
            let postionList = data.data.vehicleDataStreamList;
            let index = 0;
            //展示车辆轨迹
            let trackPoint = [];
            for (let i = 0; i < postionList.length; i++) {
              trackPoint.push([
                postionList[i].longitude,
                postionList[i].latitude
              ]);
            }
            this.railMap.setCenter(trackPoint[0]);
            let marker = new AMap.Marker({
              map: this.railPlaybackMap,
              position: trackPoint[0],
              icon: this.carIcon,
              offset: new AMap.Pixel(-13, -7.5),
              autoRotation: true,
              angle: -90
            });
            // 绘制轨迹
            let polyline = new AMap.Polyline({
              map: this.railPlaybackMap,
              path: trackPoint,
              showDir: true,
              strokeColor: "#28F", //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 6 //线宽
              // strokeStyle: "solid"  //线样式
            });
            var passedPolyline = new AMap.Polyline({
              map: this.railPlaybackMap,
              // path: lineArr,
              strokeColor: "#AF5", //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 6 //线宽
              // strokeStyle: "solid"  //线样式
            });
            this.railPlaybackMap.setFitView(polyline);
            marker.on("moving", function(e) {
              passedPolyline.setPath(e.passedPath);
            });
            marker.moveAlong(trackPoint, 1000);
          } else {
            this.$message.error("无数据");
          }
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 地图初始化
    mapInit() {
      this.railMap = new AMap.Map("railMap", {
        zoom: 13, //级别
        center: [117.094048, 39.149218] //中心点坐标
      });

      this.railMap.on("zoomend", () => {});
      this.railPlaybackMap = new AMap.Map("railPlaybackMap", {
        resizeEnable: true,
        zoom: 5, //级别
        center: [117.094048, 39.149218] //中心点坐标
      });
      AMap.plugin(["AMap.ToolBar"], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.railMap.addControl(
          new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
          })
        );
        this.railPlaybackMap.addControl(
          new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
          })
        );
      });
    },
    webSocketLink(url) {
      let that = this;
      let heartCheck = {
        timeout: 30000,
        timeoutObj: null,
        reset: function() {
          clearInterval(this.timeoutObj);
          return this;
        },
        start: function() {
          this.timeoutObj = setInterval(function() {
            that.websocket = new WebSocket(url);
          }, this.timeout);
        }
      };
      that.websocket = new WebSocket(url);
      that.websocket.onopen = function() {
        console.log("连接成功");
        that.websocket.send(that.$store.state.userId);
        heartCheck.reset();
      };
      that.websocket.onmessage = function(event) {
        let data = JSON.parse(event.data);
        //判断data是否为空
        if (data.vehicleDataStream !== undefined) {
          that.vehicleDataStream = data.vehicleDataStream;
          that.meterOption.series[0].data[0].value =
            data.vehicleDataStream.speed;
          that.meterOption.series[1].data[0].value = (
            data.vehicleDataStream.engineSpeed / 1000
          ).toFixed(4);
          that.meterOption.series[2].data[0].value = (
            data.vehicleDataStream.tankLevel / 10
          ).toFixed(2);
        } else {
          that.vehicleDataStream = {};
          that.meterOption.series[0].data[0].value = 0;
          that.meterOption.series[1].data[0].value = 0;
          that.meterOption.series[2].data[0].value = 0;
        }
        if (data.vehicleDataOBD !== undefined) {
          that.vehicleDataOBD = data.vehicleDataOBD;
        } else {
          that.vehicleDataOBD = {};
        }
        if (
          that.railMap &&
          (data.durationPositionList !== undefined ||
            data.positionList !== undefined)
        ) {
          if (data.durationPositionList) {
            //判断是否为第一次连接，是否未历史轨迹
            that.allPositionList = that.allPositionList.concat(
              data.durationPositionList
            );
            that.railMap.setCenter([
              that.allPositionList[0].longitude,
              that.allPositionList[0].latitude
            ]);
            that.showRailFrist(that.allPositionList);
            that.railMap.setFitView();
          } else {
            //判断上一轨迹是否存在
            if (that.lastPositionlist.length > 0) {
              if (that.lastPositionlist == data.positionList) {
                //判断上次轨迹和本次是否相等
                that.showRail([]);
              } else {
                data.positionList.push(
                  that.allPositionList[that.allPositionList.length - 1]
                );
                that.allPositionList = data.positionList;
                that.showRail(that.allPositionList);
              }
            } else {
              data.positionList.unshift(
                that.allPositionList[that.allPositionList.length - 1]
              );
              that.allPositionList = data.positionList;
              that.showRail(that.allPositionList);
            }
          }
        } else if (that.railMap) {
          that.railMap.clearMap();
        }
      };
      that.websocket.onclose = function(event) {
        that.$message.error("断开连接，30s后重新了连接");
        that.vehicleDataOBD = {};
        that.railMap.clearMap();
        heartCheck.reset().start();
      };
    },
    showRailFrist(allPositionList) {
      let deviceSize = new AMap.Size(26, 13);
      //展示车辆轨迹
      let trackPoint = [];
      allPositionList.forEach((item, index) => {
        trackPoint.push([item.longitude, item.latitude]);
      });
      // 绘制轨迹
      let polyline = new AMap.Polyline({
        map: this.railMap,
        path: trackPoint,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      let startDeviceIcon = new AMap.Icon({
        image: startIcon,
        size: deviceSize,
        //会以base64的方式传参iconCar
        imageSize: deviceSize
      });
      let startMarker = new AMap.Marker({
        map: this.railMap,
        position: trackPoint[0],
        icon: startDeviceIcon
      });
      this.currentMarker = new AMap.Marker({
        map: this.railMap,
        position: trackPoint[trackPoint.length - 1],
        icon: this.carIcon,
        offset: new AMap.Pixel(-13, -7.5),
        autoRotation: true,
        angle: -90
      });
    },
    showRail(allPositionList) {
      //展示车辆轨迹
      let that = this;
      let trackPoint = [];
      allPositionList.forEach((item, index) => {
        trackPoint.push([item.longitude, item.latitude]);
      });
      let passedPolyline = new AMap.Polyline({
        map: this.railMap,
        // path: lineArr,
        strokeColor: "#28F", //线颜色
        showDir: true,
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      let polyline = new AMap.Polyline({
        path: trackPoint,
        strokeColor: "#28F", //线颜色
        showDir: true,
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
      this.railMap.setFitView();
      this.currentMarker.on("moving", function(e) {
        passedPolyline.setPath(e.passedPath);
      });
      this.currentMarker.moveAlong(trackPoint, 1000);
      this.currentMarker.on("movealong", function() {
        that.railMap.add(polyline);
      });
    },
    //添加起点
    addStartMarker() {},
    //点击查询车辆历史动态参数
    searchParamValuesHistory(option) {
      if (!this.valueHistoryParams.date) {
        this.$message.error("请选择时间");
        return;
      }
      if (
        Math.abs(
          this.newDate(this.valueHistoryParams.date[0]).getTime() -
            this.newDate(this.valueHistoryParams.date[1]).getTime()
        ) /
          43200000 >
        1
      ) {
        this.$message.error("时间范围不能超过6小时！");
        return;
      }
      let params = {
        vin: this.vehicle.vin,
        parameter: this.valueHistoryParams.parameter,
        startTime: this.valueHistoryParams.date[0],
        endTime: this.endTimeFormat(this.valueHistoryParams.date[1])
      };
      this.$http.post("/monitor/history-position", params).then(({ data }) => {
        if (data.code == "200") {
          if (data.data.vehicleDataStreamList) {
            let arrValue = [];
            let arrTime = [];
            this.paramsFlag = true;
            let arrList = data.data.vehicleDataStreamList;
            arrList.forEach((item, index) => {
              arrValue.push(item[this.valueHistoryParams.parameter]);
              arrTime.push(this.formateRowKey(item.rowKey));
            });
            this.paramsOption.xAxis.data = arrTime;
            this.paramsOption.series[0].data = arrValue;
          } else {
            this.$message.error("无数据");
            this.paramsFlag = false;
          }
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    valueHistoryPickerOptionsChange(option){
      if (
        Math.abs(
          (this.newDate(option[0]) - this.newDate(option[1])) / 43200000
        ) > 1
      ) {
        this.$message.error("时间范围不能超过6小时！");
      }
    },
    // 格式化rowKey成时间
    formateRowKey(k) {
      return `20${k.substr(17, 2)}-${k.substr(19, 2)}-${k.substr(
        21,
        2
      )} ${k.substr(23, 2)}:${k.substr(25, 2)}:${k.substr(27, 2)}`;
    }
  },
  watch: {
    vehicle: function() {
      if (this.websocket) {
        this.websocket.onclose = function() {
          console.log("关闭重连");
        };
        this.websocket.close();
      }
      this.webSocketLink(Config.webLocalHost + "/vehicle/" + this.vehicle.vin);
      //重置轨迹点
      this.allPositionList = [];
    }
  },
  filters: {
    //诊断协议格式化
    formatDiagnosticProtocol(diagnosticProtocol) {
      let str = "";
      switch (diagnosticProtocol) {
        case "0":
          str = "IOS15765";
          break;
        case "1":
          str = "IOS27145";
          break;
        case "2":
          str = "SAEJ1939";
          break;
        default:
          str = "无效";
          break;
      }
      return str;
    },
    //MIL 状态格式化
    formatMil(mil) {
      let str = "";
      switch (mil) {
        case "0":
          str = "未点亮";
          break;
        case "1":
          str = "点亮";
          break;
        default:
          str = "无效";
          break;
      }
      return str;
    }
  },
  activated() {},
  beforeDestroy() {
    if (this.websocket) {
      //判断websoket存在关闭
      this.websocket.onclose = function() {
        console.log("关闭心跳发送");
      };
      this.websocket.close();
    }
  }
};
</script>
<style lang='less' scoped>
.echarts {
  width: 100%;
  height: 100%;
}
#railMap {
  width: 100%;
  height: calc(100% - 20px);
}
#railPlaybackMap {
  width: 100%;
  height: calc(100% - 80px);
}
@media screen and(max-width: 1800px) {
  .rightTitleValue.stance {
    margin-top: 40px;
  }
  .rightTitleNoValue.stance {
    margin-top: 40px;
  }
}
/deep/.el-date-editor .el-range-separator {
  width: 8%;
}
.vehicleDetail {
  width: 100%;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
}

.detailtext {
  color: #aaa;
}

.el-row {
  margin-bottom: 5px;
}
.listText div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.el-row:last-child {
  margin-bottom: 0;
}
.historyMap {
  background: #fff;
  height: 600px;
  padding: 10px;
}
.historyChart {
  background: #fff;
  height: 600px;
  padding: 10px;
  .echarts {
    width: 100%;
    height: 500px;
  }
  .imgBox {
    width: 100%;
    height: 100%;
    text-align: center;
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
}
.halfContent {
  background: #fff;
  height: 400px;
  padding: 10px;
}
.meterTitle {
  > div:first-child {
    text-align: center;
    font-size: 28px;
  }
  > div:last-child {
    text-align: center;
    font-size: 32px;
    color: #248c24;
  }
}
.title {
  margin-bottom: 10px;
}

.titleText {
  padding-left: 10px;
  border-left: 3px solid #66b1ff;
}

.dataContent {
  background: #fff;
  padding: 10px;
  margin: 10px 0;
}

.rightTitle {
  text-align: right;
  margin: 10px;
  line-height: 30px;
}

.rightTitleValue {
  margin: 10px;
  color: #66b1ff;
  line-height: 30px;
}
.rightTitleNoValue {
  margin: 10px;
  color: #666666;
  line-height: 30px;
}
</style>
