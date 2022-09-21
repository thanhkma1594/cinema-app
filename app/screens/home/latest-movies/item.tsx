import React from "react"
import { Image, ImageStyle, TouchableOpacity, View, ViewStyle, Text, TextStyle } from "react-native"
// import { useNavigation } from "@react-navigation/core"
// import { StackNavigationProp } from "@react-navigation/stack"
// import { NavigatorParamList } from "../../../navigators"
import { Movie } from "../../../models/movies/movies"

const { IMAGE_PREFIX } = require("../../../config/env")

interface Props {
  movie: Movie
  heightProps?: number
  widthProps?: number
  onPressItem?: Function
}

// type HomeScreenNavigationProp = StackNavigationProp<NavigatorParamList, "home">

export const Item = ({ movie, heightProps = 450, widthProps = 300, onPressItem }: Props) => {
  // const navigation = useNavigation<HomeScreenNavigationProp>()

  const uri = `${IMAGE_PREFIX}${movie.posterPath}`

  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem && onPressItem()
        return
      }}
      activeOpacity={0.8}
      style={CONTAINER}
    >
      <View style={[CONTAINER_IMAGE, SHADOW, { height: heightProps, width: widthProps }]}>
        <Image source={{ uri }} style={IMAGE} resizeMode="cover" />
      </View>
      <Text style={[TITLE, { width: widthProps }]} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  )
}
const CONTAINER: ViewStyle = {
  marginHorizontal: 2,
  paddingBottom: 10,
  paddingHorizontal: 7,
}
const CONTAINER_IMAGE: ViewStyle = {
  borderRadius: 18,
}
const IMAGE: ImageStyle = {
  borderRadius: 18,
  width: "100%",
  height: "100%",
}
const SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.24,
  shadowRadius: 7,
  elevation: 9,
}
const TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
  padding: 4,
}
