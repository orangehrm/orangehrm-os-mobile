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

import React, {useState, useEffect} from 'react';
import Slider, {SliderProps} from '@react-native-community/slider';
import useTheme from 'lib/hook/useTheme';

const LeaveSpecificTimeSlider = (props: LeaveSpecificTimeSliderProps) => {
  const [sliderInitialValue, setSliderInitialValue] = useState<number>();
  const theme = useTheme();
  const {values, value, setValue, forceUpdate, ...sliderProps} = props;

  useEffect(() => {
    setSliderInitialValue(
      values.findIndex((sliderValue) => sliderValue === value),
    );
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [forceUpdate]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <Slider
        value={sliderInitialValue}
        step={1}
        minimumValue={0}
        maximumValue={values.length - 1}
        minimumTrackTintColor={theme.palette.secondary}
        maximumTrackTintColor={theme.palette.default}
        thumbTintColor={theme.palette.secondary}
        onValueChange={(index) => {
          setValue(values[index]);
        }}
        {...sliderProps}
      />
    </>
  );
};

interface LeaveSpecificTimeSliderProps extends Omit<SliderProps, 'value'> {
  values: string[];
  value: string;
  setValue: (value: string) => void;
  forceUpdate?: number;
}

export default LeaveSpecificTimeSlider;
