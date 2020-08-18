/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import {pickMultipleDayPartialOption as pickMultipleDayPartialOptionAction} from 'store/leave/common-screens/actions';
import PickMultipleDayPartialOption from 'screens/leave/components/PickMultipleDayPartialOption';
import {
  HALF_DAY,
  HALF_DAY_MORNING,
  HALF_DAY_AFTERNOON,
  PARTIAL_OPTION_ALL,
  PARTIAL_OPTION_START,
  PARTIAL_OPTION_END,
  PARTIAL_OPTION_START_END,
  MultipleDayPartialOption,
  SPECIFY_TIME,
  WorkShift,
} from 'store/leave/common-screens/types';

class PickPartialDayDuration extends React.Component<
  PickPartialDayDurationProps
> {
  isStartDayHalfDayAfternoon = (partialOption?: MultipleDayPartialOption) => {
    return (
      (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START) &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isStartDayHalfDayMorning = (partialOption?: MultipleDayPartialOption) => {
    return (
      (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START) &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_MORNING
    );
  };

  isStartDayHalfDaySpecifyTime = (partialOption?: MultipleDayPartialOption) => {
    return (
      (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START) &&
      partialOption?.startDayType === SPECIFY_TIME
    );
  };

  isEndDayHalfDayAfternoon = (partialOption?: MultipleDayPartialOption) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isEndDayHalfDayMorning = (partialOption?: MultipleDayPartialOption) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_MORNING
    );
  };

  isEndDayHalfDaySpecifyTime = (partialOption?: MultipleDayPartialOption) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === SPECIFY_TIME
    );
  };

  isStartEndOptionEndDayHalfDayAfternoon = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isStartEndOptionEndDayHalfDayMorning = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_MORNING
    );
  };

  isStartEndOptionEndDayHalfDaySpecifyTime = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === SPECIFY_TIME
    );
  };

  isStartEndOptionStartDayHalfDayAfternoon = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isStartEndOptionStartDayHalfDayMorning = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_MORNING
    );
  };

  isStartEndOptionStartDayHalfSpecifyTime = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === SPECIFY_TIME
    );
  };

  getFromTime = (
    partialOption?: MultipleDayPartialOption,
    partialStartEndType?: 'start' | 'end',
  ) => {
    if (
      (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START) &&
      partialOption?.startDayType === SPECIFY_TIME
    ) {
      return partialOption.startDayFromTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === SPECIFY_TIME
    ) {
      return partialOption.endDayFromTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === SPECIFY_TIME &&
      partialStartEndType === 'end'
    ) {
      return partialOption.endDayFromTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === SPECIFY_TIME &&
      partialStartEndType === 'start'
    ) {
      return partialOption.startDayFromTime;
    }
    return undefined;
  };

  getToTime = (
    partialOption?: MultipleDayPartialOption,
    partialStartEndType?: 'start' | 'end',
  ) => {
    if (
      (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START) &&
      partialOption?.startDayType === SPECIFY_TIME
    ) {
      return partialOption.startDayToTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === SPECIFY_TIME
    ) {
      return partialOption.endDayToTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === SPECIFY_TIME &&
      partialStartEndType === 'end'
    ) {
      return partialOption.endDayToTime;
    } else if (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === SPECIFY_TIME &&
      partialStartEndType === 'start'
    ) {
      return partialOption.startDayToTime;
    }
    return undefined;
  };

  render() {
    const {
      partialOption,
      pickMultipleDayPartialOption,
      forceUpdateSlider,
      workShift,
    } = this.props;

    return (
      <>
        {partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START ? (
          <>
            <PickMultipleDayPartialOption
              title={
                partialOption?.partialOption === PARTIAL_OPTION_ALL
                  ? 'All Days'
                  : 'Start Day'
              }
              isHalfDayMorning={this.isStartDayHalfDayMorning(partialOption)}
              isHalfDayAfternoon={this.isStartDayHalfDayAfternoon(
                partialOption,
              )}
              isSpecifyTime={this.isStartDayHalfDaySpecifyTime(partialOption)}
              onPressHalfDayMorning={() => {
                if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_ALL,
                    startDayType: HALF_DAY,
                    startDayAMPM: HALF_DAY_MORNING,
                  });
                } else {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_START,
                    startDayType: HALF_DAY,
                    startDayAMPM: HALF_DAY_MORNING,
                  });
                }
              }}
              onPressHalfDayAfternoon={() => {
                if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_ALL,
                    startDayType: HALF_DAY,
                    startDayAMPM: HALF_DAY_AFTERNOON,
                  });
                } else {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_START,
                    startDayType: HALF_DAY,
                    startDayAMPM: HALF_DAY_AFTERNOON,
                  });
                }
              }}
              onPressSpecifyTime={() => {
                if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_ALL,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime: workShift.startTime,
                    startDayToTime: workShift.endTime,
                  });
                } else {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_START,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime: workShift.startTime,
                    startDayToTime: workShift.endTime,
                  });
                }
              }}
              specificTimeFrom={this.getFromTime(partialOption)}
              specificTimeTo={this.getToTime(partialOption)}
              setSpecificTimeFrom={(time) => {
                if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_ALL,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime: time,
                    startDayToTime:
                      partialOption.startDayType === SPECIFY_TIME
                        ? partialOption.startDayToTime
                        : workShift.endTime,
                  });
                } else {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_START,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime: time,
                    startDayToTime:
                      partialOption.startDayType === SPECIFY_TIME
                        ? partialOption.startDayToTime
                        : workShift.endTime,
                  });
                }
              }}
              setSpecificTimeTo={(time) => {
                if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_ALL,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime:
                      partialOption.startDayType === SPECIFY_TIME
                        ? partialOption.startDayFromTime
                        : workShift.startTime,
                    startDayToTime: time,
                  });
                } else {
                  pickMultipleDayPartialOption({
                    partialOption: PARTIAL_OPTION_START,
                    startDayType: SPECIFY_TIME,
                    startDayFromTime:
                      partialOption.startDayType === SPECIFY_TIME
                        ? partialOption.startDayFromTime
                        : workShift.startTime,
                    startDayToTime: time,
                  });
                }
              }}
              forceUpdateSlider={forceUpdateSlider}
            />
          </>
        ) : null}

        {partialOption?.partialOption === PARTIAL_OPTION_END ? (
          <>
            <PickMultipleDayPartialOption
              title={'End Day'}
              isHalfDayMorning={this.isEndDayHalfDayMorning(partialOption)}
              isHalfDayAfternoon={this.isEndDayHalfDayAfternoon(partialOption)}
              isSpecifyTime={this.isEndDayHalfDaySpecifyTime(partialOption)}
              onPressHalfDayMorning={() => {
                pickMultipleDayPartialOption({
                  partialOption: PARTIAL_OPTION_END,
                  endDayType: HALF_DAY,
                  endDayAMPM: HALF_DAY_MORNING,
                });
              }}
              onPressHalfDayAfternoon={() => {
                pickMultipleDayPartialOption({
                  partialOption: PARTIAL_OPTION_END,
                  endDayType: HALF_DAY,
                  endDayAMPM: HALF_DAY_AFTERNOON,
                });
              }}
              onPressSpecifyTime={() => {
                pickMultipleDayPartialOption({
                  partialOption: PARTIAL_OPTION_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime: workShift.startTime,
                  endDayToTime: workShift.endTime,
                });
              }}
              specificTimeFrom={this.getFromTime(partialOption)}
              specificTimeTo={this.getToTime(partialOption)}
              setSpecificTimeFrom={(time) => {
                pickMultipleDayPartialOption({
                  partialOption: PARTIAL_OPTION_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime: time,
                  endDayToTime:
                    partialOption.endDayType === SPECIFY_TIME
                      ? partialOption.endDayToTime
                      : workShift.endTime,
                });
              }}
              setSpecificTimeTo={(time) => {
                pickMultipleDayPartialOption({
                  partialOption: PARTIAL_OPTION_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime:
                    partialOption.endDayType === SPECIFY_TIME
                      ? partialOption.endDayFromTime
                      : workShift.startTime,
                  endDayToTime: time,
                });
              }}
              forceUpdateSlider={forceUpdateSlider}
            />
          </>
        ) : null}

        {partialOption?.partialOption === PARTIAL_OPTION_START_END ? (
          <>
            <PickMultipleDayPartialOption
              title={'Start Day'}
              isHalfDayMorning={this.isStartEndOptionStartDayHalfDayMorning(
                partialOption,
              )}
              isHalfDayAfternoon={this.isStartEndOptionStartDayHalfDayAfternoon(
                partialOption,
              )}
              isSpecifyTime={this.isStartEndOptionStartDayHalfSpecifyTime(
                partialOption,
              )}
              onPressHalfDayMorning={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.startDayType === SPECIFY_TIME && {
                    startDayFromTime: undefined,
                    startDayToTime: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  startDayType: HALF_DAY,
                  startDayAMPM: HALF_DAY_MORNING,
                });
              }}
              onPressHalfDayAfternoon={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.startDayType === SPECIFY_TIME && {
                    startDayFromTime: undefined,
                    startDayToTime: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  startDayType: HALF_DAY,
                  startDayAMPM: HALF_DAY_AFTERNOON,
                });
              }}
              onPressSpecifyTime={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.startDayType === HALF_DAY && {
                    startDayAMPM: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  startDayType: SPECIFY_TIME,
                  startDayFromTime: workShift.startTime,
                  startDayToTime: workShift.endTime,
                });
              }}
              specificTimeFrom={this.getFromTime(partialOption, 'start')}
              specificTimeTo={this.getToTime(partialOption, 'start')}
              setSpecificTimeFrom={(time) => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  partialOption: PARTIAL_OPTION_START_END,
                  startDayType: SPECIFY_TIME,
                  startDayFromTime: time,
                  startDayToTime:
                    partialOption.startDayType === SPECIFY_TIME
                      ? partialOption.startDayToTime
                      : workShift.endTime,
                });
              }}
              setSpecificTimeTo={(time) => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  partialOption: PARTIAL_OPTION_START_END,
                  startDayType: SPECIFY_TIME,
                  startDayFromTime:
                    partialOption.startDayType === SPECIFY_TIME
                      ? partialOption.startDayFromTime
                      : workShift.startTime,
                  startDayToTime: time,
                });
              }}
              forceUpdateSlider={forceUpdateSlider}
            />
            <PickMultipleDayPartialOption
              title={'End Day'}
              isHalfDayMorning={this.isStartEndOptionEndDayHalfDayMorning(
                partialOption,
              )}
              isHalfDayAfternoon={this.isStartEndOptionEndDayHalfDayAfternoon(
                partialOption,
              )}
              isSpecifyTime={this.isStartEndOptionEndDayHalfDaySpecifyTime(
                partialOption,
              )}
              onPressHalfDayMorning={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.endDayType === SPECIFY_TIME && {
                    endDayFromTime: undefined,
                    endDayToTime: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  endDayType: HALF_DAY,
                  endDayAMPM: HALF_DAY_MORNING,
                });
              }}
              onPressHalfDayAfternoon={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.endDayType === SPECIFY_TIME && {
                    endDayFromTime: undefined,
                    endDayToTime: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  endDayType: HALF_DAY,
                  endDayAMPM: HALF_DAY_AFTERNOON,
                });
              }}
              onPressSpecifyTime={() => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  ...(partialOption.endDayType === HALF_DAY && {
                    endDayAMPM: undefined,
                  }),
                  partialOption: PARTIAL_OPTION_START_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime: workShift.startTime,
                  endDayToTime: workShift.endTime,
                });
              }}
              specificTimeFrom={this.getFromTime(partialOption, 'end')}
              specificTimeTo={this.getToTime(partialOption, 'end')}
              setSpecificTimeFrom={(time) => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  partialOption: PARTIAL_OPTION_START_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime: time,
                  endDayToTime:
                    partialOption.endDayType === SPECIFY_TIME
                      ? partialOption.endDayToTime
                      : workShift.endTime,
                });
              }}
              setSpecificTimeTo={(time) => {
                pickMultipleDayPartialOption({
                  ...partialOption,
                  partialOption: PARTIAL_OPTION_START_END,
                  endDayType: SPECIFY_TIME,
                  endDayFromTime:
                    partialOption.endDayType === SPECIFY_TIME
                      ? partialOption.endDayFromTime
                      : workShift.startTime,
                  endDayToTime: time,
                });
              }}
              forceUpdateSlider={forceUpdateSlider}
            />
          </>
        ) : null}
      </>
    );
  }
}

interface PickPartialDayDurationProps {
  partialOption?: MultipleDayPartialOption;
  pickMultipleDayPartialOption: typeof pickMultipleDayPartialOptionAction;
  forceUpdateSlider?: number;
  workShift: WorkShift;
}

export default PickPartialDayDuration;
