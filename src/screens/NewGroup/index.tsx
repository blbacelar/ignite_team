import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/appError";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if(group.trim().length > 0) {
        await groupCreate(group)
        navigation.navigate('players', { group });
      } else {
        Alert.alert("New group", "Please enter a group name")
      }
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('New group',error.message);
      } else {
        Alert.alert('New group','Error creating group');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton/>
      <Content>
        <Icon />
        <Highlight
          title="New Group"
          subtitle="Create a new group to add members to"
        />
        <Input
          placeholder="Group Name"
          onChangeText={setGroup}
        />
        <Button
          onPress={handleCreateGroup}
          title="Create"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
