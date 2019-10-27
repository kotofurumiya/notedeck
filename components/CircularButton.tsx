import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CircularButtonProps extends TouchableOpacityProps {
  icon: any;
}

export const CircularButton: React.FC<CircularButtonProps> = ({icon, style, ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <View>
        <Image style={styles.icon} source={icon}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50
  },

  icon: {
    width: 30,
    height: 30
  }
});
