import React from "react"
import { FlatList, View, TextStyle, Text } from "react-native"
// import { useNavigation } from "@react-navigation/core"
// import { StackNavigationProp } from "@react-navigation/stack"
// import { NavigatorParamList } from "../../../navigators"
import { Movie } from "../../../models/movies/movies"
import { Item } from "./item"

interface Props {
  title?: string
  onPress?: Function
  movies: Movie[]
}

// type HomeScreenNavigationProp = StackNavigationProp<NavigatorParamList, "home">

export const LatestMovies = ({ title, movies, onPress }: Props) => {
  return (
    <View>
      {title && <Text style={TITLE}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }: any) => (
          <Item
            onPressItem={() => onPress && onPress(item)}
            movie={item}
            widthProps={150}
            heightProps={210}
          />
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
const TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginLeft: 10,
  color: "#000",
  marginBottom: 8,
}
