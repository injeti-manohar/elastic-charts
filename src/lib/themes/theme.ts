import { GeometryStyle } from '../series/rendering';
import { Margins } from '../utils/dimensions';
import { LIGHT_THEME } from './light_theme';

interface Visible {
  visible: boolean;
}
interface Radius {
  radius: number;
}
export interface TextStyle {
  fontSize: number;
  fontFamily: string;
  fontStyle?: string;
  fill: string;
  padding: number;
}
export interface GeometryStyle {
  stroke: string;
  strokeWidth: number;
  fill?: string;
  opacity?: number;
}

export interface SharedGeometryStyle {
  [key: string]: GeometryStyle;
}

export interface StrokeStyle {
  /** The stroke color in hex, rgba, hsl */
  stroke: string;
  /** The stroke width in pixel */
  strokeWidth: number;
  /** The dash array for dashed strokes */
  dash?: number[];
}
export interface FillStyle {
  /** The fill color in hex, rgba, hsl */
  fill: string;
}
export interface Opacity {
  /** The opacity value from 0 to 1 */
  opacity: number;
}

export interface AxisConfig {
  axisTitleStyle: TextStyle;
  axisLineStyle: StrokeStyle;
  tickLabelStyle: TextStyle;
  tickLineStyle: StrokeStyle;
}
export interface GridLineConfig {
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  dash?: number[];
}
export interface ScalesConfig {
  ordinal: {
    padding: number;
  };
}
export interface ColorConfig {
  vizColors: string[];
  defaultVizColor: string;
}
export interface LegendStyle {
  verticalWidth: number;
  horizontalHeight: number;
}
export interface Theme {
  /**
   * Space btw parent DOM element and first available element of the chart (axis if exists, else the chart itself)
   */
  chartMargins: Margins;
  /**
   * Space btw the chart geometries and axis; if no axis, pads space btw chart & container
   */
  chartPaddings: Margins;
  lineSeriesStyle: LineSeriesStyle;
  areaSeriesStyle: AreaSeriesStyle;
  barSeriesStyle: BarSeriesStyle;
  sharedStyle: SharedGeometryStyle;
  axes: AxisConfig;
  scales: ScalesConfig;
  colors: ColorConfig;
  legend: LegendStyle;
  crosshair: CrosshairStyle;
}
export interface BarSeriesStyle {
  border: StrokeStyle & Visible;
}
export interface LineSeriesStyle {
  line: StrokeStyle & Visible;
  border: StrokeStyle & Visible;
  point: StrokeStyle & Opacity & Visible & Radius;
}
export interface AreaSeriesStyle {
  area: FillStyle & Opacity & Visible;
  line: StrokeStyle & Visible;
  border: StrokeStyle & Visible;
  point: StrokeStyle & Opacity & Visible & Radius;
}
export interface CrosshairStyle {
  band: FillStyle & Visible;
  line: StrokeStyle & Visible;
}
export interface PartialTheme {
  chartMargins?: Margins;
  chartPaddings?: Margins;
  lineSeriesStyle?: LineSeriesStyle;
  areaSeriesStyle?: AreaSeriesStyle;
  barSeriesStyle?: BarSeriesStyle;
  sharedStyle?: SharedGeometryStyle;
  axes?: Partial<AxisConfig>;
  scales?: Partial<ScalesConfig>;
  colors?: Partial<ColorConfig>;
  legend?: Partial<LegendStyle>;
  crosshair?: Partial<CrosshairStyle>;
}

export const DEFAULT_GRID_LINE_CONFIG: GridLineConfig = {
  stroke: 'red',
  strokeWidth: 1,
  opacity: 1,
};

export function mergeWithDefaultGridLineConfig(config: GridLineConfig): GridLineConfig {
  const strokeWidth =
    config.strokeWidth != null ? config.strokeWidth : DEFAULT_GRID_LINE_CONFIG.strokeWidth;
  const opacity = config.opacity != null ? config.opacity : DEFAULT_GRID_LINE_CONFIG.opacity;

  return {
    stroke: config.stroke || DEFAULT_GRID_LINE_CONFIG.stroke,
    dash: config.dash || DEFAULT_GRID_LINE_CONFIG.dash,
    strokeWidth,
    opacity,
  };
}

export function mergeWithDefaultTheme(
  theme: PartialTheme,
  defaultTheme: Theme = LIGHT_THEME,
): Theme {
  const customTheme: Theme = {
    ...defaultTheme,
  };
  if (theme.chartMargins) {
    customTheme.chartMargins = {
      ...defaultTheme.chartMargins,
      ...theme.chartMargins,
    };
  }
  if (theme.chartPaddings) {
    customTheme.chartPaddings = {
      ...defaultTheme.chartPaddings,
      ...theme.chartPaddings,
    };
  }
  if (theme.areaSeriesStyle) {
    customTheme.areaSeriesStyle = {
      ...defaultTheme.areaSeriesStyle,
      ...theme.areaSeriesStyle,
    };
  }
  if (theme.lineSeriesStyle) {
    customTheme.lineSeriesStyle = {
      ...defaultTheme.lineSeriesStyle,
      ...theme.lineSeriesStyle,
    };
  }
  if (theme.barSeriesStyle) {
    customTheme.barSeriesStyle = {
      ...defaultTheme.barSeriesStyle,
      ...theme.barSeriesStyle,
    };
  }
  if (theme.sharedStyle) {
    customTheme.sharedStyle = {
      ...defaultTheme.sharedStyle,
      ...theme.sharedStyle,
    };
  }
  if (theme.scales) {
    customTheme.scales = {
      ...defaultTheme.scales,
      ...theme.scales,
    };
  }
  if (theme.axes) {
    customTheme.axes = {
      ...defaultTheme.axes,
      ...theme.axes,
    };
  }
  if (theme.colors) {
    customTheme.colors = {
      ...defaultTheme.colors,
      ...theme.colors,
    };
  }
  if (theme.legend) {
    customTheme.legend = {
      ...defaultTheme.legend,
      ...theme.legend,
    };
  }
  if (theme.crosshair) {
    customTheme.crosshair = {
      ...defaultTheme.crosshair,
      ...theme.crosshair,
    };
  }
  return customTheme;
}
