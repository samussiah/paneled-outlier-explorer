## settings.measure_col
`string`

measure variable name

**default:** `"TEST"`



## settings.time_cols
`array`

an array of each time variable and associated metadata

**default:**
```
[
  {
    "value_col": "DY",
    "type": "linear",
    "label": "Study Day",
    "rotate_tick_labels": false,
    "vertical_space": 0
  },
  {
    "value_col": "VISIT",
    "type": "ordinal",
    "label": "Visit",
    "rotate_tick_labels": true,
    "vertical_space": 100
  },
  {
    "value_col": "VISITN",
    "type": "ordinal",
    "label": "Visit Number",
    "rotate_tick_labels": false,
    "vertical_space": 0
  }
]
```

### settings.time_cols.value_col
`string`

Time variable name

### settings.time_cols.type
`string`

Time variable data type

### settings.time_cols.label
`string`

Time variable label

### settings.time_cols.rotate_tick_labels
`boolean`

Rotate x-axis tick labels?

### settings.time_cols.vertical_space
`number`

X-axis vertical space





## settings.value_col
`string`

result variable name

**default:** `"STRESN"`



## settings.id_col
`string`

identifier variable name

**default:** `"USUBJID"`



## settings.unit_col
`string`

unit variable name

**default:** `"STRESU"`



## settings.lln_col
`string`

lower limit of normal variable name

**default:** `"STNRLO"`



## settings.uln_col
`string`

upper limit of normal variable name

**default:** `"STNRHI"`



## settings.measures
`array`

list of initially displayed measures

**default:** none



## settings.filters
`array`

an array of each filter variable and associated metadata

**default:** none
### settings.filters.value_col
`string`

Variable name

### settings.filters.label
`string`

Variable label




