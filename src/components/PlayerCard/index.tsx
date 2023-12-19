import React from 'react';
import { ButtonIcon } from '../ButtonIcon';
import { Container, Icon, Title } from './styles';

type Props = {
  title: string;
  onRemove: () => void;
}

export function PlayerCard({title,onRemove} : Props) {
  return (
    <Container>
      <Icon name='person' />
      <Title>{title}</Title>
      <ButtonIcon icon="close" type='SECONDARY' onPress={onRemove}/>
    </Container>
  )
}
