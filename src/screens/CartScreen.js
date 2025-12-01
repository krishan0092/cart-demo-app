import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, t } = useCart();

  const renderItem = ({ item }) => {
    const deleteTestID = `cart_item_delete_${item.id}`;

    return (
      <View style={styles.itemRow}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          testID={deleteTestID}
          accessibilityLabel={deleteTestID}
          style={styles.deleteBtn}>
          <Feather name="trash-2" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t.cart}
        navigation={navigation}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>{t.yourCart}</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          testID="cart_list"
          accessibilityLabel="cart_list"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  listContent: { padding: 12, paddingBottom: 20 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  info: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
    marginTop: 4,
  },
  deleteBtn: { paddingHorizontal: 8 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#6b7280' },
});

export default CartScreen;
