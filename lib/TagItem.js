import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TagItem = ({ tagName, onRemoveTag, style={} }) => {
  iconColor = () => {
    return (style.icon && style.icon.color) ||
             (style.selectedTagText && style.selectedTagText.color) ||
             defaultStyles.selectedTagText.color
  }

  return (
    <TouchableOpacity
      onPress={onRemoveTag}
      style={[defaultStyles.selectedTagArea, style.selectedTagArea]}>
        <Icon size={14} color={this.iconColor()} name='close' />
        <Text style={[defaultStyles.selectedTagText, style.selectedTagText]}>
          {tagName}
        </Text>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  selectedTagArea: {
    alignItems: 'center',
    backgroundColor: '#f5f6f5',
    borderColor: '#e9e9e9',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectedTagText: {
    color: '#333',
    fontSize: 14,
    paddingLeft: 4
  },
});

export default TagItem;
