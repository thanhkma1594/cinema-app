import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ScrollView, SafeAreaView } from "react-native"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { LatestMovies } from "./latest-movies/latest-movies"
import styles from "./home-screen.styles"

interface Props {
  navigation?: any
  movieId?: number
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }: Props) => {
    const { nowShowingMoviesStore, comingSoonMoviesStore } = useStores()

    useEffect(() => {
      async function fetchData() {
        await Promise.all([
          nowShowingMoviesStore.getNowShowingMoviesStoreList(),
          comingSoonMoviesStore.getComingSoonMoviesStoreList(),
        ])
      }

      fetchData()
    }, [])

    const gotoHomeScreen = (item) => {
      navigation.navigate("detailMovies", { movieId: item?.id })
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView showsVerticalScrollIndicator={false} testID="moviesList">
            <LatestMovies
              movies={nowShowingMoviesStore?.movies}
              title="Now Showing"
              onPress={gotoHomeScreen}
            />
            <LatestMovies
              movies={comingSoonMoviesStore?.movies}
              title="Coming soon"
              onPress={gotoHomeScreen}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  },
)
