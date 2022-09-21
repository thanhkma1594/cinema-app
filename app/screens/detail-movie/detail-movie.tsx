import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle, ScrollView } from "react-native"
import React, { FC, useEffect } from "react"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { BannerMovie } from "./components/banner-movie"

interface Props {
  navigation?: any
  props?: object
  route?: {
    params?: {
      movieId?: number
    }
  }
  params?: object
}
export const DetailMovies: FC<StackScreenProps<NavigatorParamList, "detailMovies">> = observer(
  ({ navigation, ...props }: Props) => {
    const { detailMoviesStore } = useStores()

    useEffect(() => {
      async function fetchData() {
        const { movieId } = props?.route.params
        await Promise.all([detailMoviesStore.getDetailMovies({ movieId })])
      }
      fetchData()
    }, [])

    const goBackToHome = () => navigation.goBack()

    return (
      <View style={CONTAINER} testID="movieDetail">
        <ScrollView>
          <BannerMovie data={detailMoviesStore} onPressItem={goBackToHome} />
          <Text style={TITLE} numberOfLines={2}>
            {detailMoviesStore?.movies?.title}
          </Text>
          <Text style={DATE}>
            <Text style={TITLE_ROW}>Release Date: </Text>
            {detailMoviesStore?.movies?.releaseDate}
          </Text>
          <Text style={DATE}>
            <Text style={TITLE_ROW}>Vote: </Text>
            {detailMoviesStore?.movies?.voteCount}
          </Text>
          <Text style={DATE}>
            <Text style={TITLE_ROW}>Popularity: </Text>
            {detailMoviesStore?.movies?.popularity}
          </Text>
          <Text style={DATE}>
            <Text style={TITLE_ROW}>Description: </Text>
            {detailMoviesStore?.movies?.overview}
          </Text>
        </ScrollView>
      </View>
    )
  },
)
const CONTAINER: ViewStyle = {
  flex: 1,
}
const TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#000",
  padding: 16,
}
const TITLE_ROW: TextStyle = {
  fontSize: 16,
  color: "#000",
}
const DATE: TextStyle = {
  fontSize: 16,
  color: "gray",
  paddingHorizontal: 16,
  paddingVertical: 4,
}
