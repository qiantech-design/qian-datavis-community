// echarts按需加载
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'
// import { GraphicComponent, PolarComponent } from 'echarts/components'
import {
  BarChart,
  RadarChart,
  GaugeChart,
  PieChart,
  SankeyChart,
  ScatterChart,
  LineChart,
  PictorialBarChart,
  LinesChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  BarChart,
  RadarChart,
  GaugeChart,
  PieChart,
  SankeyChart,
  ScatterChart,
  LineChart,
  PictorialBarChart,
  LinesChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer,
  MarkLineComponent,
  MarkPointComponent
])
