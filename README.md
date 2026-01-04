# React Native Activity Heatmap

A simple and customizable LeetCode-style activity heatmap component for React Native.

Inspired by [react-activity-heatmap](https://github.com/stefan5441/react-activity-heatmap) for React web.

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```sh
npm install react-native-activity-heatmap
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```sh
yarn add react-native-activity-heatmap
```

## Usage

This package provides a simple and reusable React Native component to visualize activity data over time in a calendar-style heatmap. It allows you to display daily activity intensity using colored squares, similar to LeetCode's contribution graph. You can easily customize the start and end dates, color scales, and activity data, making it suitable for dashboards, habit trackers, or any app that needs a compact overview of activity trends.

```tsx
import React from "react";
import { View, Text } from "react-native";
import { ActivityHeatmap } from "react-native-activity-heatmap";

const activities = [
  { date: "2025-08-01", count: 5, level: 2 },
  { date: "2025-08-02", count: 2, level: 1 },
  { date: "2025-08-03", count: 8, level: 3 },
  // add more activity objects here
];

const startDate = new Date("2025-08-01");
const endDate = new Date("2025-08-31");

const App = () => {
  return (
    <View>
      <Text>My Activity Heatmap</Text>
      <ActivityHeatmap 
        activities={activities} 
        startDate={startDate} 
        endDate={endDate} 
      />
    </View>
  );
};

export default App;
```

## Props

| Prop            | Type                                   | Required | Description                                                                                                                                                                  |
| --------------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activities      | `Array<HeatmapActivity>`               | ✅       | Array of activity objects. `level` controls color intensity, and `count` is the number of activities displayed in the tooltip.                                              |
| startDate       | `Date`                                 | ❌       | The first date in the heatmap. If not specified, it defaults to today's date - 365 days.                                                                                    |
| endDate         | `Date`                                 | ❌       | The last date in the heatmap. If not specified, it defaults to today's date.                                                                                                |
| cellColors      | `CellColors`                           | ❌       | Customization for the cell colors. Level 0 is the no activities color and the others are for each level of activity. If not specified, it uses the default green colors.   |
| renderTooltip   | `(cell: HeatmapCell) => React.ReactNode` | ❌     | Custom function to render a tooltip for a given cell.                                                                                                                        |
| style           | `ViewStyle`                            | ❌       | Style for the heatmap container.                                                                                                                                             |
| monthLabelStyle | `object`                               | ❌       | Style for the month labels displayed above the heatmap.                                                                                                                      |
| tooltipStyle    | `object`                               | ❌       | Style for the tooltip element.                                                                                                                                               |
| cellSize        | `number`                               | ❌       | Size of each cell in pixels. Defaults to `12`.                                                                                                                               |

## Types

```ts
export type HeatmapActivity = {
  date: string;
  count: number;
  level: number;
};

export type HeatmapCell = HeatmapActivity | "invisible";

export type CellColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
};
```

## Customization

You can customize the colors to match your app's theme:

```tsx
const customColors = {
  level0: '#161b22',
  level1: '#0e4429',
  level2: '#006d32',
  level3: '#26a641',
  level4: '#39d353',
};

<ActivityHeatmap 
  activities={activities} 
  cellColors={customColors}
  cellSize={10}
/>
```

## Compatibility

This package supports React Native projects using:

- **React Native**: `>=0.70.0`
- **React**: `>=18.0.0`

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

This project is licensed under the **MIT License**.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
