/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { getMovieDetail } from '../api';

function Detail({ route }) {
  const { width } = Dimensions.get('window');
  const { id } = route.params;
  const [detailItem, setDetailItem] = useState([]);

  useEffect(() => {
    id ? loadDetailItem() : null;
  }, []);

  const loadDetailItem = async () => {
    let result = await getMovieDetail(id);
    if (result.data?.status === 'ok') {
      const { movie } = result.data.data;
      setDetailItem(movie);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          style={[styles.backgroundImage, { width }]}
          source={{ uri: detailItem.background_image }}>
          <Image
            style={styles.coverImage}
            source={{ uri: detailItem.large_cover_image }}
          />
          <Text style={styles.titleText}>{detailItem.title}</Text>
        </ImageBackground>
        <View style={styles.rowTextWrapper}>
          <Text style={styles.boldText}>설명</Text>
          <View style={styles.descriptionText}>
            <Text style={styles.itemText}>{detailItem.description_full}</Text>
          </View>
        </View>
        <View style={styles.rowTextWrapper}>
          <Text style={styles.boldText}>연도</Text>
          <Text style={styles.itemText}>{detailItem.year}</Text>
        </View>
        <View style={styles.rowTextWrapper}>
          <Text style={styles.boldText}>평점</Text>
          {detailItem.rating !== undefined && (
            <Text style={styles.itemText}>{detailItem.rating}점</Text>
          )}
        </View>
        <View style={styles.rowTextWrapper}>
          <Text style={styles.boldText}>시간</Text>
          {detailItem.runtime !== undefined && (
            <Text style={styles.itemText}>{detailItem.runtime}분</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  rowTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  boldText: {
    fontSize: 16,
    fontWeight: '900',
    marginRight: 50,
  },
  itemText: {
    textAlignVertical: 'bottom',
  },
  descriptionText: {
    width: '75%',
  },
  backgroundImage: {
    height: '45%',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
    backgroundColor: '#e0dede',
    paddingHorizontal: 15,
  },
  coverImage: {
    height: '70%',
    width: '30%',
    marginBottom: 9,
  },
  titleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Detail;
