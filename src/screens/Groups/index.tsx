import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { Button } from '../../components/Button'
import { GroupCard } from '../../components/GroupCard'
import { Header } from '../../components/Header'
import { Highlight } from '../../components/Highlight'
import { EmptyList } from '../../components/ListEmpty'
import { Loading } from '../../components/Loading'
import { fetchAllGroups } from '../../storage/group/groupFecth'
import { Container } from './styles'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function loadGroups() {
    try {
      setIsLoading(true)
      const fetchedGroups = await fetchAllGroups()
      setGroups(fetchedGroups)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      loadGroups()
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title="Groups" subtitle="Play with your mates" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <EmptyList message="Let's add the first group" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title="Create a new group" onPress={handleNewGroup} />
    </Container>
  )
}
