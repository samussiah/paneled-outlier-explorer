library(tidyverse)

### Input data
    ADBDS <- read.csv(
        'ADBDS.csv',
        na.strings = ' ',
        colClasses = 'character'
    )

### Data manipulation
    ADBDS_long <- ADBDS %>%
        select(
            USUBJID, VISIT, VISITNUM, DY, TEST, STRESN
        )
    ADBDS_wide <- ADBDS_long %>%
        spread(
            TEST,
            STRESN
        ) %>%
        mutate(
            id = paste(USUBJID, DY, sep = ':')
        )

### Output data
    write.csv(
        ADBDS_wide,
        'ADBDS_wide.csv',
        na = '',
        row.names = FALSE
    )