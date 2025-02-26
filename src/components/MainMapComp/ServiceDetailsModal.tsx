import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ServiceDetailsModal = ({ visible, onClose, details }: { visible: boolean; onClose: () => void; details: string }) => (
  <Modal
    transparent
    visible={visible}
    onRequestClose={onClose}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text>{details}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: { /* Add styles */ },
  modalContent: { /* Add styles */ },
});

export default ServiceDetailsModal;
