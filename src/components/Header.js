import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({ title, showBack, onBackPress, navigation }) => {
  const { cartCount, language, setLanguage, t } = useCart();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const toggleSettings = () => setSettingsVisible(v => !v);

  const changeLanguage = lang => {
    setLanguage(lang);
    setSettingsVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack ? (
            <TouchableOpacity
              onPress={onBackPress}
              testID="back_to_home"
              accessibilityLabel="back_to_home">
              <Ionicons name="arrow-back" size={24} color="#111" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 24 }} />
          )}
        </View>

        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartWrapper}
            testID="cart_icon"
            accessibilityLabel="cart_icon">
            <MaterialCommunityIcons name="cart-outline" size={24} color="#111" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleSettings}
            style={styles.settingsBtn}
            testID="settings_icon"
            accessibilityLabel="settings_icon">
            <Feather name="settings" size={22} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent
        visible={settingsVisible}
        animationType="fade"
        onRequestClose={toggleSettings}>
        <Pressable style={styles.modalOverlay} onPress={toggleSettings}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{t.selectLanguage}</Text>

            <Pressable
              style={styles.langRow}
              onPress={() => changeLanguage('en')}
              testID="lang_en"
              accessibilityLabel="lang_en">
              <Text style={styles.langLabel}>{t.english}</Text>
              {language === 'en' && (
                <Feather name="check" size={18} color="#2563eb" />
              )}
            </Pressable>

            <View style={styles.separator} />

            <Pressable
              style={styles.langRow}
              onPress={() => changeLanguage('ar')}
              testID="lang_ar"
              accessibilityLabel="lang_ar">
              <Text style={styles.langLabel}>{t.arabic}</Text>
              {language === 'ar' && (
                <Feather name="check" size={18} color="#2563eb" />
              )}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  left: { flex: 1 },
  center: { flex: 2, alignItems: 'center' },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  cartWrapper: { position: 'relative' },
  settingsBtn: { marginLeft: 16 },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: { fontSize: 10, color: '#fff' },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  langLabel: {
    fontSize: 14,
    color: '#111827',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
  },
});

export default Header;
