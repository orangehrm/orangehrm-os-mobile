import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {Thumbnail} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';

const ProfilePicture = (props: ProfilePictureProps) => {
  const {theme, imageSource, name, jobTitle} = props;
  return (
    <View>
      <ImageBackground
        source={imageSource ? imageSource : require('images/default-photo.png')}
        style={styles.backgroundImageWidth}
        imageStyle={styles.backgroundImage}>
        <View>
          <View style={styles.thumbnailContainer}>
            <Thumbnail
              large
              source={
                imageSource ? imageSource : require('images/default-photo.png')
              }
              style={{margin: theme.spacing * 4}}
            />
          </View>
          <View
            style={{
              marginLeft: theme.spacing * 4,
              marginBottom: theme.spacing * 4,
            }}>
            {name === undefined ? null : (
              <Text style={styles.nameText}>{name}</Text>
            )}
            {jobTitle === undefined ? null : <Text>{jobTitle}</Text>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

interface ProfilePictureProps extends WithTheme {
  imageSource?: ImageSourcePropType;
  name?: string;
  jobTitle?: string;
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.5,
  },
  backgroundImageWidth: {},
  thumbnailContainer: {
    elevation: 4,
  },
  nameText: {
    fontWeight: 'bold',
  },
});

export default withTheme<ProfilePictureProps>()(ProfilePicture);
