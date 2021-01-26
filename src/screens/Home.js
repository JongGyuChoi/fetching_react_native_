/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { getMovieList, getMovieDetail } from '../api';

function Home({ navigation }) {
  const { width } = Dimensions.get('window');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    loadMovieList();
  }, []);

  const loadMovieList = async () => {
    let result = await getMovieList(1);
    if (result.data?.status === 'ok') {
      const { movies } = result.data.data;
      console.log(movies);
      setMovieList(movies);
    }
  };

  const renderMovieList = (item) => {
    return (
      <TouchableOpacity
        style={[styles.cardContainer, { width: (width - 30) / 2 }]}
        onPress={() => onPressDetail(item.id)}>
        <Image
          source={{ uri: item.medium_cover_image }}
          style={styles.imageStyle}
        />
        <Text>{item.title}</Text>
        <Text>{item.year}</Text>
      </TouchableOpacity>
    );
  };

  const onPressDetail = async (id) => {
    let result = await getMovieDetail(id);
    if (result.data?.status === 'ok') {
      const { movie } = result.data.data;
      console.log(movie);
      navigation.navigate('Detail', { item: movie });
    } else {
      Alert.alert('다시 시도해 주세요');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => renderMovieList(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingTop: 30,
    paddingBottom: 45,
  },
  cardContainer: {
    height: 400,
    backgroundColor: '#ffffff',
  },
  imageStyle: {
    height: 300,
    width: '100%',
  },
});

export default Home;
