
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { FilterButton } from '../../components/Filter'
import { Header } from '../../components/Header'
import { Highlight } from '../../components/Highlight'
import { Input } from '../../components/Input'
import { EmptyList } from '../../components/ListEmpty'
import { Loading } from '../../components/Loading'
import { PlayerCard } from '../../components/PlayerCard'
import { removeGroupByName } from '../../storage/group/removeGroupByName'
import { PlayerStorageDTO } from '../../storage/player/PlayerStorageDTO'
import { fetchPlayerByGroupAndTeam } from '../../storage/player/fecthPlayerByGroupAndTeam'
import { addPlayerByGroup } from '../../storage/player/playerAddByGroup'
import { removePlayerByGroup } from '../../storage/player/removePlayerByGroup'
import { AppError } from '../../utils/appError'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Team A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  const newPlayerNameRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('New Player', 'Please enter a player name')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await addPlayerByGroup(newPlayer, group)
      await fetchPlayersByTeam()

      newPlayerNameRef.current?.blur()
      setNewPlayerName('')
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('New Player', error.message)
      } else {
        Alert.alert('New Player', 'Error trying to add player')
        console.log(error);
      }
    }
  }

  async function handleDeletePlayer(playerName: string){
    try {
      await removePlayerByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Delete Player', error.message)
      } else {
        Alert.alert('Delete Player', 'Error trying to delete player')
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const players = await fetchPlayerByGroupAndTeam(group, team)
      setPlayers(players)
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Players', 'Could not fetch players by team')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function removeGroup(){
    try {
      await removeGroupByName(group)
      navigation.navigate('groups')
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Delete Group', error.message)
      } else {
        Alert.alert('Delete Group', 'Error trying to delete group')
        console.log(error);
      }
    }
  }

  async function handleRemoveGroup() {
    try {
      Alert.alert(
        'Remove Group', 'Are you sure you want to remove this group?',[
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Remove', onPress: () => { removeGroup() }},
        ])
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Remove Group', error.message)
      } else {
        Alert.alert('Remove Group', 'Error trying to remove group')
        navigation.navigate('groups')
        console.log(error);
      }
    }
  }

  useEffect(() => {
      fetchPlayersByTeam()
    }, [team])

  return (
    <Container>
        <Header showBackButton/>

        <Highlight
          title={group}
          subtitle='add players to your group and choose the team'
        />

        <Form>
          <Input
            inputRef={newPlayerNameRef}
            placeholder='Player Name'
            onChangeText={setNewPlayerName}
            value={newPlayerName}
            autoCorrect={false}
            onSubmitEditing={handleAddPlayer}
            returnKeyType='send'
          />
          <ButtonIcon
            icon='add'
            onPress={handleAddPlayer}
          />
        </Form>

        <HeaderList>
          <FlatList
            data={['Team A', 'Team B']}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <FilterButton
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />

          <NumberOfPlayers>
            {players.length}
          </NumberOfPlayers>
        </HeaderList>

        {
          isLoading? <Loading /> : (
              <FlatList
              data={players}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <PlayerCard
                  title={item.name}
                  onRemove={() => {
                    handleDeletePlayer(item.name);
                } }/>
              )}
              ListEmptyComponent={() => <EmptyList message='Player list is empty' />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                { paddingBottom: 100 },
                players.length === 0 && { flex: 1 }
              ]}
            />
          )
        }
        <Button
          title='Remove group'
          onPress={handleRemoveGroup}
          type='SECONDARY'
        />
    </Container>
  )
}
