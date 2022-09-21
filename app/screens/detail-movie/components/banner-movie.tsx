import React from "react"
import { TextStyle, Text, ImageBackground, TouchableOpacity } from "react-native"
const { IMAGE_PREFIX } = require("../../../config/env")

interface Props {
  data?: {
    movies?: {
      posterPath?: string
    }
  }
  onPress?: Function
  onPressItem?: Function
}
export const BannerMovie = ({ onPressItem, data }: Props) => {
  const uri = `${IMAGE_PREFIX}${data?.movies?.posterPath}`

  return (
    <ImageBackground source={{ uri }} style={{ width: "100%", height: 400 }} resizeMode="cover">
      <TouchableOpacity
        onPress={() => {
          onPressItem && onPressItem()
        }}
        activeOpacity={0.8}
      >
        <Text style={backButton}>{`<<Back`}</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
const backButton: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  padding: 16,
  color: "#ffff",
  paddingTop: 40,
}
