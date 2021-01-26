import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

function Detail({ route }) {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.background_image }} />
      <Image source={{ uri: item.large_cover_image }} />
      <View style={styles.rowTextWrapper}>
        <Text style={styles.boldText}>설명</Text>
        <View style={styles.descriptionText}>
          <Text>{item.description_full}</Text>
        </View>
      </View>
      <View style={styles.rowTextWrapper}>
        <Text style={styles.boldText}>연도</Text>
        <Text>{item.year}</Text>
      </View>
      <View style={styles.rowTextWrapper}>
        <Text style={styles.boldText}>평점</Text>
        <Text>{item.rating}</Text>
      </View>
      <View style={styles.rowTextWrapper}>
        <Text style={styles.boldText}>시간</Text>
        <Text>{item.runtime}</Text>
      </View>
      <Text>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 15,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 50,
  },
  descriptionText: {
    width: '75%',
  },
});

export default Detail;
