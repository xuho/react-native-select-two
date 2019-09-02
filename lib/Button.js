//import liraries
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// create a component
const Button = ({ title, backgroundColor, textColor, style, textStyle, onPress, disabled, defaultFont }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            onPress={onPress}
            style={[styles.button, defaultFont, {
                backgroundColor: disabled ? 'gray' : backgroundColor,
                alignSelf: 'center', borderRadius: 25
            }, style]}>
            <Text style={[styles.buttonText, defaultFont, { color: textColor || '#fff' }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    button: {
        height: 45, borderRadius: 2, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    },
    buttonText: { fontSize: 16, fontWeight: 'bold' },
});

//make this component available to the app
export default Button;
