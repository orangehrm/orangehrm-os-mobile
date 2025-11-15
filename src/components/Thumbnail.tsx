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
import {
  View,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
} from 'react-native';

interface ThumbnailProps {
  /**
   * Image source for the thumbnail
   */
  source?: ImageSourcePropType;
  /**
   * Dimension of thumbnail.
   * Default: 30
   */
  size?: number;
  /**
   * Represents shape of thumbnail.
   * By default thumbnail is circle in shape.
   */
  circular?: boolean;
  /**
   * Represents shape of thumbnail.
   * By default thumbnail is circle in shape.
   */
  square?: boolean;
  /**
   * Small size thumbnail
   */
  small?: boolean;
  /**
   * Large size thumbnail
   */
  large?: boolean;
  /**
   * Additional style for the container
   */
  style?: ViewStyle;
  /**
   * Additional style for the image
   */
  imageStyle?: ImageStyle;
  /**
   * Test ID for testing purposes
   */
  testID?: string;
  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
  /**
   * Other Image props
   */
  [key: string]: any;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  source,
  size,
  circular = true,
  square = false,
  small = false,
  large = false,
  style,
  imageStyle,
  testID,
  accessibilityLabel,
  ...otherProps
}) => {
  // Calculate the actual size based on props
  let actualSize = size || 30;

  if (small) {
    actualSize = 20;
  } else if (large) {
    actualSize = 60;
  }

  // Determine if the thumbnail should be circular
  const isCircular = circular && !square;

  const containerStyle: ViewStyle = {
    width: actualSize,
    height: actualSize,
    borderRadius: isCircular ? actualSize / 2 : 0,
    overflow: 'hidden',
    ...style,
  };

  const imageStyleFinal: ImageStyle = {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    ...imageStyle,
  };

  return (
    <View style={containerStyle}>
      <Image
        source={source}
        style={imageStyleFinal}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        {...otherProps}
      />
    </View>
  );
};

export default Thumbnail;
