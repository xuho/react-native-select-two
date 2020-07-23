import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TagItem = ({ tagName, onRemoveTag, tagStyle, tagTextStyle }) => {
  return (
    <TouchableOpacity
      onPress={onRemoveTag}
      style={{
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f6f5",
        borderWidth: 1,
        borderColor: "#e9e9e9",
        margin: 4,
        borderRadius: 3,
        ...tagStyle,
      }}
    >
      <Icon size={14} color="#333" name="close" />
      <Text
        style={{
          fontSize: 14,
          color: "#333",
          paddingLeft: 4,
          ...tagTextStyle,
        }}
      >
        {tagName}
      </Text>
    </TouchableOpacity>
  );
};
export default TagItem;
