import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {useCart} from '../context/CartContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const BASE_PRODUCTS = Array.from({length: 20}).map((_, idx) => ({
  id: idx + 1,
  name: `Product ${idx + 1}`,
  price: ((idx + 1) * 10).toFixed(2),
  image: `https://picsum.photos/200?random=${idx + 1}`,
}));

const HomeScreen = ({navigation}) => {
  const {cartItems, addToCart, hydrated, t} = useCart();

  const [listData, setListData] = useState(BASE_PRODUCTS);
  const [loadingMore, setLoadingMore] = useState(false);

  const cartIds = useMemo(() => cartItems.map(p => p.id), [cartItems]);

  const loadMoreData = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setListData(prev => [...prev, ...BASE_PRODUCTS]);
      setLoadingMore(false);
    }, 800);
  };

  const renderItem = ({item}) => {
    const isInCart = cartIds.includes(item.id);
    const addButtonTestID =
      item.id === 4 ? 'product_4_add_button' : `product_${item.id}_add_button`;

    return (
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />

        <View style={styles.infoRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity
          disabled={isInCart}
          onPress={() => addToCart(item)}
          style={[styles.button, isInCart && styles.buttonAdded]}
          testID={addButtonTestID}
          accessibilityLabel={addButtonTestID}>
          <Text style={styles.buttonText}>
            {isInCart ? t.added : t.addToCart}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!hydrated) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#2563eb" />
        <Text style={styles.footerText}>
          {t.loadingMoreProducts || 'Loading more products...'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t.home} navigation={navigation} />

      <FlatList
        data={listData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        testID="products_list"
        accessibilityLabel="products_list"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f4f6'},
  centered: {justifyContent: 'center', alignItems: 'center'},
  listContent: {padding: 10, paddingBottom: 30},
  row: {justifyContent: 'space-between'},
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonAdded: {
    backgroundColor: '#16a34a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 6,
    fontSize: 12,
    color: '#4b5563',
  },
});

export default HomeScreen;
