# Garmin Workout API 規格

參考來源: [garmin-workouts-mcp](https://github.com/st3v/garmin-workouts-mcp/blob/main/garmin_workouts_mcp/garmin_workout.py)

## Step Type (步驟類型)

| Type | ID | Key |
|------|-----|-----|
| Warmup | 1 | warmup |
| Cooldown | 2 | cooldown |
| Interval | 3 | interval |
| Recovery | 4 | recovery |
| Rest | 5 | rest |
| Repeat | 6 | repeat |

## Target Type (目標類型)

| Type | ID | Key |
|------|-----|-----|
| No target | 1 | no.target |
| Power | 2 | power.zone |
| Cadence | 3 | cadence.zone |
| Heart rate | 4 | heart.rate.zone |
| Speed | 5 | speed.zone |
| Pace | 6 | pace.zone |

## End Condition (結束條件)

| Type | ID | Key | Displayable |
|------|-----|-----|-------------|
| Lap button | 1 | lap.button | Yes |
| Time | 2 | time | Yes |
| Distance | 3 | distance | Yes |
| Iterations | 7 | iterations | No |

## Workout Step 結構

### ExecutableStepDTO (一般步驟)

```json
{
  "type": "ExecutableStepDTO",
  "stepId": 1,
  "stepOrder": 1,
  "childStepId": null,
  "stepType": {
    "stepTypeId": 3,
    "stepTypeKey": "interval"
  },
  "endCondition": {
    "conditionTypeId": 2,
    "conditionTypeKey": "time"
  },
  "endConditionValue": 600,
  "targetType": {
    "workoutTargetTypeId": 2,
    "workoutTargetTypeKey": "power.zone"
  },
  "targetValueOne": 176,
  "targetValueTwo": 188,
  "secondaryTargetType": {
    "workoutTargetTypeId": 3,
    "workoutTargetTypeKey": "cadence.zone"
  },
  "secondaryTargetValueOne": 85,
  "secondaryTargetValueTwo": 95,
  "description": "Sweet Spot 176-188W @85-95rpm"
}
```

### RepeatGroupDTO (重複步驟)

```json
{
  "type": "RepeatGroupDTO",
  "stepId": 2,
  "stepOrder": 2,
  "childStepId": null,
  "stepType": {
    "stepTypeId": 6,
    "stepTypeKey": "repeat"
  },
  "numberOfIterations": 5,
  "workoutSteps": [
    {
      "type": "ExecutableStepDTO",
      "stepOrder": 1,
      "stepType": { "stepTypeId": 3, "stepTypeKey": "interval" },
      "endCondition": { "conditionTypeId": 2, "conditionTypeKey": "time" },
      "endConditionValue": 300,
      "targetType": { "workoutTargetTypeId": 2, "workoutTargetTypeKey": "power.zone" },
      "targetValueOne": 200,
      "targetValueTwo": 220
    },
    {
      "type": "ExecutableStepDTO",
      "stepOrder": 2,
      "stepType": { "stepTypeId": 5, "stepTypeKey": "rest" },
      "endCondition": { "conditionTypeId": 2, "conditionTypeKey": "time" },
      "endConditionValue": 180,
      "targetType": { "workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target" }
    }
  ]
}
```

## Target Value 格式

### Pace (配速)

配速目標使用 **meters per second** 格式：

```javascript
// 將 min:ss/km 轉換為 m/s
function paceToMetersPerSecond(paceSecondsPerKm) {
    return 1000 / paceSecondsPerKm;
}

// 例如: 6:00/km = 360 秒/km
// 1000 / 360 = 2.778 m/s
```

- `targetValueOne`: 較慢配速 (較小的 m/s 值)
- `targetValueTwo`: 較快配速 (較大的 m/s 值)

### Swim Pace (游泳配速)

游泳配速也使用 **meters per second** 格式：

```javascript
// 將 min:ss/100m 轉換為 m/s
function swimPaceToMetersPerSecond(paceSecondsPer100m) {
    return 100 / paceSecondsPer100m;
}

// 例如: 2:00/100m = 120 秒/100m
// 100 / 120 = 0.833 m/s
```

### Power (功率)

功率目標直接使用 **瓦特 (W)** 值：

```javascript
targetValueOne: 176,  // 下限 W
targetValueTwo: 188   // 上限 W
```

### Cadence (迴轉數)

迴轉數目標使用 **RPM** 值：

```javascript
secondaryTargetValueOne: 85,   // 下限 rpm
secondaryTargetValueTwo: 95    // 上限 rpm
```

## End Condition Value 格式

### Time (時間)

時間以 **秒** 為單位：

```javascript
endConditionValue: 600  // 10 分鐘
```

### Distance (距離)

距離以 **公尺** 為單位：

```javascript
endConditionValue: 5000  // 5 km
```

## 完整 Workout 結構

```json
{
  "workoutName": "Sweet Spot 訓練",
  "description": "3x10分鐘 Sweet Spot 間歇",
  "sportType": {
    "sportTypeId": 2,
    "sportTypeKey": "cycling"
  },
  "workoutSegments": [{
    "segmentOrder": 1,
    "sportType": {
      "sportTypeId": 2,
      "sportTypeKey": "cycling"
    },
    "workoutSteps": [...]
  }],
  "estimatedDurationInSecs": 3600,
  "estimatedDistanceInMeters": 30000
}
```

## Sport Type (運動類型)

| Sport | ID | Key |
|-------|-----|-----|
| Running | 1 | running |
| Cycling | 2 | cycling |
| Swimming (Pool) | 5 | pool_swimming |
| Swimming (Open Water) | 4 | open_water_swimming |

## 游泳特有欄位

```json
{
  "poolLength": 25,
  "poolLengthUnit": {
    "unitId": 1,
    "unitKey": "meter"
  }
}
```
