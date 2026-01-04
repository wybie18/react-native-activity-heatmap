import { Text, View, StyleSheet } from 'react-native';
import {
  ActivityHeatmap,
  type HeatmapActivity,
} from 'react-native-activity-heatmap';

const generateSampleActivities = (): HeatmapActivity[] => {
  const activities: HeatmapActivity[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const random = Math.random();
    let count = 0;
    let level = 0;

    if (random > 0.3) {
      if (random > 0.9) {
        count = Math.floor(Math.random() * 10) + 10;
        level = 4;
      } else if (random > 0.7) {
        count = Math.floor(Math.random() * 5) + 5;
        level = 3;
      } else if (random > 0.5) {
        count = Math.floor(Math.random() * 3) + 2;
        level = 2;
      } else {
        count = 1;
        level = 1;
      }
    }

    activities.push({
      date: d.toISOString().split('T')[0]!,
      count,
      level,
    });
  }

  return activities;
};

const sampleActivities = generateSampleActivities();

const totalSubmissions = sampleActivities.reduce((sum, a) => sum + a.count, 0);
const activeDays = sampleActivities.filter((a) => a.count > 0).length;
const maxStreak = (() => {
  let max = 0;
  let current = 0;
  for (const activity of sampleActivities) {
    if (activity.count > 0) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }
  return max;
})();

const leetcodeColors = {
  level0: '#161b22',
  level1: '#0e4429',
  level2: '#006d32',
  level3: '#26a641',
  level4: '#39d353',
};

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>📊 Submission Activity</Text>
          <Text style={styles.subtitle}>
            {totalSubmissions} submissions in the last year
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalSubmissions}</Text>
            <Text style={styles.statLabel}>Total submissions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{activeDays}</Text>
            <Text style={styles.statLabel}>Active days</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{maxStreak}</Text>
            <Text style={styles.statLabel}>Max streak</Text>
          </View>
        </View>

        <ActivityHeatmap
          activities={sampleActivities}
          cellColors={leetcodeColors}
          cellSize={11}
          monthLabelStyle={styles.monthLabel}
          renderTooltip={(cell) => {
            if (cell === 'invisible') return null;
            return (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>
                  {cell.count} submission{cell.count !== 1 ? 's' : ''} on{' '}
                  {cell.date}
                </Text>
              </View>
            );
          }}
        />

        <View style={styles.legend}>
          <Text style={styles.legendLabel}>Less</Text>
          {Object.values(leetcodeColors).map((color, index) => (
            <View
              key={index}
              style={[styles.legendCell, { backgroundColor: color }]}
            />
          ))}
          <Text style={styles.legendLabel}>More</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#141414ff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2d2d2d',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b8b8b',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#242424',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#39d353',
  },
  statLabel: {
    fontSize: 12,
    color: '#8b8b8b',
    marginTop: 4,
  },
  monthLabel: {
    fontSize: 11,
    color: '#8b8b8b',
    fontWeight: '500',
  },
  tooltip: {
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#404040',
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 4,
  },
  legendLabel: {
    fontSize: 11,
    color: '#8b8b8b',
    marginHorizontal: 4,
  },
  legendCell: {
    width: 11,
    height: 11,
    borderRadius: 2,
  },
});
