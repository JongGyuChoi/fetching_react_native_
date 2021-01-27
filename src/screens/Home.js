/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { getMovieList } from '../api';

function Home({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const [movieList, setMovieList] = useState([]);
  const [longTitleIndexList, setLongTitleIndexList] = useState([]);
  const [footer, setFooter] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieList();
  }, []);

  const loadMovieList = async () => {
    let result = await getMovieList(page);
    if (result.data?.status === 'ok') {
      const { movies } = result.data.data;
      setTimeout(() => {
        setMovieList(movieList.concat(movies));
      }, 500);
      loadFooterItem(page + 1);
      setPage(page + 1);
      loading ? setLoading(false) : null;
    }
  };

  const loadFooterItem = async (num) => {
    let result = await getMovieList(num);
    if (result.data?.status === 'ok') {
      const { movies } = result.data.data;
      setFooter(movies[0]);
    }
  };

  useEffect(() => {
    movieList.map((val, idx) => {
      if (!longTitleIndexList.includes(idx)) {
        if (val.title.length > 20) {
          if (idx % 2 === 0) {
            setLongTitleIndexList((old) => [...old, idx, idx + 1]);
          } else {
            setLongTitleIndexList((old) => [...old, idx, idx - 1]);
          }
        }
      }
    });
  }, [movieList]);

  const renderMovieList = (item, index) => {
    const Buttonstyle = {
      height: height / 3.3,
      width: (width - 40 - 10) / 2,
      marginRight: index % 2 === 0 ? 10 : 0,
    };
    const WrapperStyle = {
      height: longTitleIndexList.includes(index) ? '30%' : '25%',
    };
    return (
      <TouchableOpacity
        style={[styles.cardContainer, Buttonstyle]}
        onPress={() => onPressDetail(item.id)}>
        <Image
          source={{ uri: item.medium_cover_image }}
          style={styles.imageStyle}
        />
        <View style={[styles.textWrapperAbsolute, WrapperStyle]}>
          <Text numberOfLines={2} style={styles.boldText}>
            {item.title}
          </Text>
          <Text style={styles.yearText}>{item.year}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressDetail = async (id) => {
    navigation.navigate('Detail', { id });
  };

  return (
    <>
      <SafeAreaView style={styles.header} />
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.container}>
        {movieList.length > 0 ? (
          <FlatList
            data={movieList}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => renderMovieList(item, index)}
            ListFooterComponent={
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => onPressDetail(footer.id)}>
                <Image
                  source={{ uri: footer.medium_cover_image }}
                  style={styles.imageStyleFooter}
                />
                <View style={styles.textWrapper}>
                  <Text style={styles.boldText}>{footer.title}</Text>
                  <Text style={styles.yearText}>{footer.year}</Text>
                </View>
              </TouchableOpacity>
            }
            onEndReached={loadMovieList}
            onEndReachedThreshold={1}
          />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingTop: 30,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 9,
    overflow: 'hidden',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  imageStyleFooter: {
    height: 150,
    width: '100%',
  },
  boldText: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 10,
  },
  yearText: {
    fontSize: 12,
  },
  textWrapper: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  textWrapperAbsolute: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Home;
